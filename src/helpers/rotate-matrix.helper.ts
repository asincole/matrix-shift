export function rotateTable(table: number[]): {
  result: number[];
  is_valid: boolean;
} {
  // We try to find the square root of the matrix.
  const N = Math.sqrt(table.length);
  /*
   * If the square root is not an integer, the matrix is not square.
   * If the square root is 0, the matrix is empty.
   * In both cases, we return an empty array.
   */
  if (!N || !Number.isInteger(N)) {
    return { result: [], is_valid: false };
  }

  /*
   * While modelling the matrix on paper, I found out that everything revolves around
   * the Matrix dimension. What changes in terms of adding/subtracting 1/N is what edge
   * we are currently on. And to decide which edge we are on, we need to know the number
   * of rings. So, we calculate the number of rings.
   * For example, a 1*1 and 2*2 matrix both have 1 layer, while a 3*3 and 4*4 matrix both have two rings.
   */
  const rings = Math.floor(N / 2);

  /*
   * If N is odd, the center element does not need to be rotated.
   * As we rotate the matrix around the central axis (either being an inner ring; for even N,
   * or the center element; for odd N), the center element will always be the same.
   */
  if (N % 2 === 1) {
    const center = Math.floor(N / 2);
    table[center * N + center] = table[center * N + center];
  }

  // a ring is the number of cells to the side of the current edge.
  for (let ring = 0; ring < rings; ring++) {
    /*
     * The size of the layer is the width of the current ring we are on, this reduces by 2
     * for each ring we go down.
     */
    const layerSize = N - 2 * ring;
    const tempCellValue = table[ring * N + (ring)]

    /*
     * Top edge
     * We need to move each element of the top edge to the right by 1 position.
     * ring * N gets the number of cells above the current ring
     * ring + i gets the number of cells to the right of the first cell
     *
     * if I wanted to rotate the other way, I could use (ring + i) * N + (N - 1 - ring)
     */
    for (let i = 0; i < layerSize - 1; i++) {
      table[ring * N + (ring + i)] = table[ring * N + (ring + i + 1)];
    }

    // Right edge
    /*
     * (ring + i) * N gets the index of the first cell of the row of the current ring
     * (N - 1 - ring) gets the column number of the cell at the right edge of the current ring
     *
     *
     * if I wanted to rotate the other way, I could use (N - 1 - ring) * N + (N - 1 - ring - i)
     */
    for (let i = 0; i < layerSize - 1; i++) {
      table[(ring + i) * N + (N - 1 - ring)] = table[(ring + i + 1) * N + (N - 1 - ring)];
    }

    // Bottom edge
    /*
     * (N - 1 - ring) * N should calculate the number of cells before the last row in each ring
     * (N - 1 - ring - i) gets the cells to the left or a cell in each ring
     *
     *
     * if I wanted to rotate the other way, I could use (N - 1 - ring) * N + (ring + i)
     */
    for (let i = 0; i < layerSize - 1; i++) {
      table[(N - 1 - ring) * N + (N - 1 - ring - i)] = table[(N - 1 - ring) * N + (N - ring - i - 2)];
    }

    // Left edge
    /*
     * (N - ring - i - 1) calculates the row number of the cell in the last row and first column of the current ring.
     * the above * N calculates the number of cells above the current row
     *
     * if I wanted to rotate the other way, I could use (ring + i) * N + ring
     */
    for (let i = 0; i < layerSize - 2; i++) {
      table[(N - ring - i - 1) * N + ring] = table[(N - ring - i - 2) * N + ring];
    }
    table[(N - ring - (layerSize - 2) - 1) * N + ring] = tempCellValue
  }

  return { result: table, is_valid: true };
}
