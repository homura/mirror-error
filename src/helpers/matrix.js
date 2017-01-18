const slice = Array.prototype.slice

export function generateMatrixWithZero ({ row, col }) {
  const matrix = []
  for (let i = 0; i < row; i += 1) {
    matrix[i] = []
    for (let j = 0; j < col; j += 1) {
      matrix[i].push(0)
    }
  }
  return matrix
}

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

export function isInPath (paths, [r, c]) {
  return paths.findIndex(([row, col]) => row === r && col === c) > -1
}

function random0 (max) {
  return Math.floor(Math.random() * max)
}

function randomPick (args) {
  return args[random0(args.length)]
}

export function generatePath (row, col, paths = [[0, 0]]) {
  const [y, x] = paths[paths.length - 1]
  const nextSteps = []
  const uy = [y - 1, x]
  if (y - 1 > -1 && !isInPath(paths, uy)) nextSteps.push(uy)
  const ux = [y, x - 1]
  if (x - 1 > -1 && !isInPath(paths, ux)) nextSteps.push(ux)
  const dy = [y + 1, x]
  if (y + 1 < row && !isInPath(paths, dy)) nextSteps.push(dy)
  const dx = [y, x + 1]
  if (x + 1 < col && !isInPath(paths, dx)) nextSteps.push(dx)
  const nextStepsLength = nextSteps.length
  if (nextStepsLength === 0) return generatePath(row, col)
  const nextStep = randomPick(nextSteps)
  paths.push(nextStep)
  const [ny, nx] = nextStep
  if (ny === row - 1 && nx === col - 1) return paths
  return generatePath(row, col, paths)
}

export function generatePathWithStep ({ row, col, min, max }) {
  let path = [[0, 0]]
  if (!min) min = (row + col) - 1
  if (!max) max = row * col
  for (; path.length < min || path.length > max; path = generatePath(5, 5));
  return path
}
