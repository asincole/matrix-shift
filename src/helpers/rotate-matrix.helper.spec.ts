import {rotateMatrix} from './rotate-matrix.helper';


describe('circularShiftMatrix', () => {


	describe('using jest.each', () => {
		const table: {
			matrix: number[],
			size: string,
			expected: { result: number[], is_valid: boolean }
		}[] = [
			{
				matrix: [],
				size: 'empty',
				expected: {
					result: [],
					is_valid: false
				}
			},
			{
				matrix: [1, 2, 3],
				size: 'not square',
				expected: {
					result: [],
					is_valid: false
				}
			},
			{
				matrix: [1],
				size: '1 * 1',
				expected: {
					result: [1],
					is_valid: true
				}
			},
			{
				matrix: [
					1, 2, 3, 4,
					5, 6, 7, 8,
					9, 10, 11, 12,
					13, 14, 15, 16
				],
				size: '4 * 4',
				expected: {
					result: [
						2, 3, 4, 8,
						1, 7, 11, 12,
						5, 6, 10, 16,
						9, 13, 14, 15
					],
					is_valid: true
				}
			},
		];

		test.each(table)('given a matrix that is $size, rotateMatrix should return accurate rotated matrix',
			({matrix, expected}: {
				matrix: number[],
				expected: { result: number[], is_valid: boolean }
			}) => {
				const result = rotateMatrix(matrix);
				expect(result).toEqual(expected);
			});
	})


	describe('using individual tests', () => {
		it('should return empty array is matrix is empty', () => {
			const matrix = [];
			const result = rotateMatrix(matrix);
			const expected = {result: [], is_valid: false};
			expect(result).toEqual(expected);
		});

		it('should return empty array is matrix is not square', () => {
			const matrix = [1, 2, 3];
			const result = rotateMatrix(matrix);
			const expected = {result: [], is_valid: false};

			expect(result).toEqual(expected);
		});

		it('should shift a 1 * 1 matrix', () => {
			const matrix = [1];
			const expected = {result: [1], is_valid: true};

			const result = rotateMatrix(matrix);
			expect(result).toEqual(expected);
		});

		it('should shift a 2 * 2 matrix', () => {
			const matrix = [
				1, 2,
				3, 4
			];
			const expected = {
				result: [
					2, 4,
					1, 3
				], is_valid: true
			};

			const result = rotateMatrix(matrix);
			expect(result).toEqual(expected);
		});

		it('should shift a 3 * 3 matrix', () => {
			const matrix = [
				1, 2, 3,
				4, 5, 6,
				7, 8, 9
			];

			const expected = {
				result: [
					2, 3, 6,
					1, 5, 9,
					4, 7, 8
				], is_valid: true
			};

			const result = rotateMatrix(matrix);
			expect(result).toEqual(expected);
		});

		it('should shift a 4 * 4 matrix', () => {
			const matrix = [
				1, 2, 3, 4,
				5, 6, 7, 8,
				9, 10, 11, 12,
				13, 14, 15, 16
			];

			const expected = {
				result: [
					2, 3, 4, 8,
					1, 7, 11, 12,
					5, 6, 10, 16,
					9, 13, 14, 15
				], is_valid: true
			};

			const result = rotateMatrix(matrix);
			expect(result).toEqual(expected);
		});

		it('should shift a 5 * 5 matrix', () => {
			const matrix = [
				1, 2, 3, 4, 5,
				6, 7, 8, 9, 10,
				11, 12, 13, 14, 15,
				16, 17, 18, 19, 20,
				21, 22, 23, 24, 25
			];

			const expected = {
				result: [
					2, 3, 4, 5, 10,
					1, 8, 9, 14, 15,
					6, 7, 13, 19, 20,
					11, 12, 17, 18, 25,
					16, 21, 22, 23, 24
				], is_valid: true
			};

			const result = rotateMatrix(matrix);
			expect(result).toEqual(expected);
		});

		it('should shift a 6 * 6 matrix', () => {
			const matrix = [
				1, 2, 3, 4, 5, 6,
				7, 8, 9, 10, 11, 12,
				13, 14, 15, 16, 17, 18,
				19, 20, 21, 22, 23, 24,
				25, 26, 27, 28, 29, 30,
				31, 32, 33, 34, 35, 36
			];

			const expected = {
				result: [
					2, 3, 4, 5, 6, 12,
					1, 9, 10, 11, 17, 18,
					7, 8, 16, 22, 23, 24,
					13, 14, 15, 21, 29, 30,
					19, 20, 26, 27, 28, 36,
					25, 31, 32, 33, 34, 35
				], is_valid: true
			};

			const result = rotateMatrix(matrix);
			expect(result).toEqual(expected);
		});
	})
})
