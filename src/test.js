const map = (array, callback) => {
  let newArr = [];
  for (i = 0; i < array.length; i++) {
    newArr.push(callback(i));
    i++;
  }
  return newArr;
}


const items = [1, 2, 3, 4];

const coolItems = [...items];
