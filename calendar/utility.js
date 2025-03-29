export const chunk = (array, chunkSize) => {
  const chunkArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkArray.push(array.slice(i, i + chunkSize));
  }
  return chunkArray;
};

export const center = (str, length) => {
  const numOfLeftBlanks = Math.trunc((length - str.length) / 2);
  const numOfRightBlanks = length - str.length - numOfLeftBlanks;
  return " ".repeat(numOfLeftBlanks) + str + " ".repeat(numOfRightBlanks);
};

export const transpose = (matrix) => {
  const result = [];
  for (let colIdx = 0; colIdx < matrix[0].length; colIdx++) {
    const newRow = [];
    for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
      newRow.push(matrix[rowIdx][colIdx]);
    }
    result.push(newRow);
  }
  return result;
};
