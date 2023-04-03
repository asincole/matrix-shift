export function rotateMatrix(matrix: number[]): {
  result: number[];
  is_valid: boolean;
} {
  // We try to find the square root of the matrix.
  const N = Math.sqrt(matrix.length);
  /*
   * If the square root is not an integer, the matrix is not square.
   * If the square root is 0, the matrix is empty.
   * In both cases, we return an empty array.
   */
  if (!N || !Number.isInteger(N)) {
    return { result: [], is_valid: false };
  }

  // Here, we create a new array to store the result.
  const result: number[] = Array(matrix.length).fill(0);

  /*
   * While modelling the matrix on paper, I found out that everything revolves around
   * the Matrix dimension. What changes in terms of adding/subtracting 1/N is what edge
   * we are currently on. And to decide which edge we are on, we need to know the number
   * of rings. So, we calculate the number of rings.
   * For example, a 1*1 and 2*2 matrix both have 1 layer, while a 3*3 and 4*4 matrix both have two rings.
   */
  const rings = Math.ceil(N / 2);

  /*
   * If N is odd, the center element does not need to be rotated.
   * As we rotate the matrix around the central axis (either being an inner ring; for even N,
   * or the center element; for odd N), the center element will always be the same.
   */
  if (N % 2 === 1) {
    const center = Math.floor(N / 2);
    result[center * N + center] = matrix[center * N + center];
  }

  for (let ring = 0; ring < rings; ring++) {
    /*
     * The size of the layer is the width of the current ring we are on, this reduces by 2
     * for each ring we go down.
     */
    const layerSize = N - 2 * ring;

    /*
     * Top edge
     * We need to move each element of the top edge to the right by 1 position.
     */
    for (let i = 0; i < layerSize - 1; i++) {
      result[ring * N + (ring + i)] = matrix[ring * N + (ring + i + 1)];
    }

    // Left edge
    for (let i = 0; i < layerSize - 1; i++) {
      result[(N - ring - i - 1) * N + ring] = matrix[(N - ring - i - 2) * N + ring];
    }

    // Bottom edge
    for (let i = 0; i < layerSize - 1; i++) {
      result[(N - 1 - ring) * N +( N - 1 - ring - i)] = matrix[(N - 1 - ring) * N +(N - ring - i - 2)];
    }

    // Right edge
    for (let i = 0; i < layerSize - 1; i++) {
      result[(ring + i) * N + (N - 1 - ring)] = matrix[(ring + i + 1) * N + (N - 1 - ring)];
    }
  }

  return { result, is_valid: true };
}
