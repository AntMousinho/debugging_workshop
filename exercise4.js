const fs = require('fs')
const util = require('util')
let charSet;

const encode = (string, key) => {
  return string.split('').map(char => {
    console.log(`charSet[char] = ${charSet[char]}`);    //  The third charSet[char] = undefined. In the input is a comma
    let number = (parseInt(charSet[char]) + key) % 99
    console.log(`number is: ${number}`);  //  returns an integer, TypeError .padStart is not a function. padStart is a String method
    return number.toString().padStart(2, '0')    //  Need to turn number to a string before .padStart
  }).join('')
}

//  After this, output is: 3914NaN051824106893920294680658
//  Nearly the expected output apart from the 3rd character returning NaN

const parseCharacterSet = (data) => {
  let result = {}
  data.split('\n').map(pair => {
    console.log(`pair = ${pair}`);    // log each pair to see what is being worked upon
    return pair.split(', ');   //  We are splitting by a comma, maybe this is causing the problem
                        //  Identify that we want to split by ', '. Otherwise we are splitting one pair three times, causing the NaN with the comma
  }).forEach(splitPair => result[splitPair[0]] = splitPair[1])
  return result
}

fs.readFile('char-set.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  charSet = parseCharacterSet(data)
  console.log(`charset = ${charSet}`)    //  print to console to see if the character set is working as expected
  console.log(util.inspect(encode('Hi, mse-2103-a!', 4)))
})

// Expected console output => '391482051824106893920294680658'