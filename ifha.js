const {INTUITIONISTIC_FUZZY_DM, INTUITIONISTIC_FUZZY_DM_FINAL, W_IFNS, W_IFHA_OPERATOR} = require('./matrixes')
const IFNs = [
  [0.2, 0.5],
  [0.4, 0.2],
  [0.5, 0.4],
  [0.3, 0.3],
  [0.7, 0.1],
]

// const W_IFNS = [0.25, 0.20, 0.15, 0.18, 0.22]
// const W_IFHA_OPERATOR = [0.112, 0.236, 0.304, 0.236, 0.112]

function getWeightedIFNs(ifns, w_ifns) {
  const n = ifns.length
  return ifns.map((ifn, i) => {
    return [
      1 - Math.pow((1 - ifn[0]), n * w_ifns[i]),
      Math.pow(ifn[1], n * w_ifns[i]),
    ]
  })
}

// const WIFNs = getWeightedIFNs(IFNs, W_IFNS)
// console.log('weighted ifns: ', WIFNs)

function getScoreOfWeightedIFNs(wifns) {
  const wifnsWithScore = wifns.map((ifn, index) => {
    return {
      rowIndexZeroBased: index,
      rowIndex: index + 1,
      score: ifn[0] - ifn[1],
      ifn,
    }
  })
  console.log('wifnsWithScore', wifnsWithScore)
  return wifnsWithScore.sort((a, b) => b.score - a.score)
}

// const ORDERED_WIFNs = getScoreOfWeightedIFNs(WIFNs)
// console.log('scores: ', ORDERED_WIFNs)

function getIFH(ordered_wifns, w_ifha_operator) {
  const mu = 1 - ordered_wifns.reduce((mult, ifn, i) => {
    return mult * Math.pow((1 - ifn[0]), w_ifha_operator[i])
  }, 1)
  const vu = ordered_wifns.reduce((mult, ifn, i) => {
    return mult * Math.pow(ifn[1], w_ifha_operator[i])
  }, 1)
  return [mu, vu]
}

// console.log('result: ', getIFH(ORDERED_WIFNs, W_IFHA_OPERATOR))

function processMatrix(matrix, w_ifns, w_ifha_operator) {
  return matrix.map((row, i) => {
    const wifns = getWeightedIFNs(row, w_ifns)
    console.log('++++++ row: ', i + 1, ' ++++++')
    console.log(`wifns row=[${i + 1}]`, wifns)
    console.log('===========')
    const ordered_wifns = getScoreOfWeightedIFNs(wifns)
    console.log(`ordered_wifns row=[${i + 1}]`, ordered_wifns)
    console.log('===========')
    return getIFH(ordered_wifns.map(({ifn}) => ifn), w_ifha_operator)
  })
}

const IFHA_MATRIX = processMatrix(INTUITIONISTIC_FUZZY_DM_FINAL, W_IFNS, W_IFHA_OPERATOR)
console.log('IFHA: ', IFHA_MATRIX)

console.log('scored: ', getScoreOfWeightedIFNs(IFHA_MATRIX))
