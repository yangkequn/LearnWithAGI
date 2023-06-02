
//calculate mean squre root error
export const MSRE = (data: number[]| Int16Array) => {
    var sum = 0
    for (var i = 0; i < data.length; i++) {
        sum += data[i]
    }
    var mean = sum / data.length
    var sumOfSquare = 0
    for (var i = 0; i < data.length; i++) {
        sumOfSquare += (data[i] - mean) * (data[i] - mean)
    }
    return Math.sqrt(sumOfSquare / data.length)
  }
  