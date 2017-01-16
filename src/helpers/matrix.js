const slice = Array.prototype.slice
export function generateBitMatrix (options) {
  const { col, row, factor = 0.5 } = options
  const matrix = []
  for (let i = 0; i < row; i += 1) {
    matrix[i] = []
    for (let j = 0; j < col; j += 1) {
      matrix[i].push(Math.random() > factor ? 1 : 0)
    }
  }
  return matrix
}

export function generateFlippedMatrix (matrix) {
  const flippedMatrix = []
  const row = matrix.length
  for (let i = 0; i < row; i += 1) {
    flippedMatrix.push(slice.call(matrix[i]).reverse())
  }
  return flippedMatrix
}

export function mapOver (matrix, cb) {
  const row = matrix.length
  const col = matrix[0].length
  const result = []
  for (let i = 0; i < row; i += 1) {
    result[i] = []
    for (let j = 0; j < col; j += 1) {
      result[i][j] = cb(i, j, matrix[i][j], matrix)
    }
  }
  return result
}
