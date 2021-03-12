const fs = require('fs')
const util = require('util')
let charSet;

const decode = (string, key) => {
  let invertedCharSet = invert(charSet)
  console.log(`invertedCharSet = ${invertedCharSet}`);    //  returns object where keys and values are the same

  return chunk(string.split(''), 2).map(pair => {
    let cipherPair = parseInt(pair.join(''))
    let number = (99 + (cipherPair - key)) % 99
    return invertedCharSet[number.toString()]
  }).join('')
}

const chunk = (array, chunk_size) => {
  let chunks = [];

  while (array.length) {
      chunks.push(array.splice(0, chunk_size));
  }

  return chunks
}

const invert = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {   //  Expected outcome for the key to become the new value, and the value to become the new key
    // newObj[key] = key   //  Can see that this is creating an object with the same key as the value
    newObj[obj[key]] = key;
  })
  return newObj;
}

const parseCharacterSet = (data) => {
  let result = {}
  data.split('\r\n').map(pair => pair.split(', ')).forEach(splitPair => result[splitPair[0]] = splitPair[1])
  console.log(`charSet = ${result}`);  // Can see that it is returning \r at the end of each valuepair, need to split by \r\n
  return result
}

fs.readFile('char-set.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  charSet = parseCharacterSet(data)
  console.log(util.inspect(decode('391482051824106893920294680658', 4)))

  // Expected console output => 'Hi, mse-2103-a!'
  // Initial output is '162' 
      //  the script calls decode() the first thing that calls is invert that takes the charSet
      //  First thing to do is check the charSet to see if it is working properly
  //  Fixed \r\n error, still returning 162, check the invert method, what is returned after that is called
      //  Returns object where keys and values are the same. Something is not working as expected with the invert method
      //  Change the invert method from setting the newObject key value pairs to be the same as each other
      //  Get the correct output
})
