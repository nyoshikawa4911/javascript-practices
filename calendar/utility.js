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
