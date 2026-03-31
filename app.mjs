import { clear } from "node:console";
import fs from "node:fs"

let data = fs.readFileSync("./data.txt", "utf-8");

const cells = data.match(/.{1,6}/g);

console.log("Length:", data.length);
console.log("Divisible by 6:", data.length % 6 === 0);

console.log("Total cells:", cells.length);

// Braille map
const brailleMap = {
  // Letters
  "100000": "a",
  "110000": "b",
  "100100": "c",
  "100110": "d",
  "100010": "e",
  "110100": "f",
  "110110": "g",
  "110010": "h",
  "010100": "i",
  "010110": "j",
  "101000": "k",
  "111000": "l",
  "101100": "m",
  "101110": "n",
  "101010": "o",
  "111100": "p",
  "111110": "q",
  "111010": "r",
  "011100": "s",
  "011110": "t",
  "101001": "u",
  "111001": "v",
  "010111": "w",
  "101101": "x",
  "101111": "y",
  "101011": "z",
  "100011": "\"",
 
  // Space
  "000000": " ",

  // Punctuation
  "010011": ".",
  "010000": ",",
  "011001": "?",
  "011010": "+",
  "010010": ":",
  "011000": ";",
  "001001": "-",
  "000010": "'",
  "001010": "/",
  "001000": "`",
  "111111": "=",
  "000111": "=",
  "011011": "=",
  

  // Special indicators
  "000001": "CAPITAL",   // capital follows
  "001111": "NUMBER",    // number follows
  "000101": "DECIMAL"    // decimal follows
};

//const numberMap = {
//  a:"1",b:"2",c:"3",d:"4",e:"5",
//  f:"6",g:"7",h:"8",i:"9",j:"0"
//};
const numberMap = {
  "100000": "1",
  "110000": "2",
  "100100": "3",
  "100110": "4",
  "100010": "5",
  "110100": "6",
  "110110": "7",
  "110010": "8",
  "010100": "9",
  "010110": "0",
};

let isCapital = false;
let isNumber = false;

const result = [];

let i = 0;
for (let cell of cells) {
  const value = brailleMap[cell];

  if (value === "CAPITAL") {
    isCapital = true;
    //console.log("CAPITAL at index " + i + ", next cell: " + cells[i + 1]);
    i++;
    continue;
  }

//   if (value === "NUMBER") {
//     isNumber = true;
//     continue;
//   }
  
  if (value === "NUMBER") {
  continue; 
  }

  let char = value || "?";

//   if (isNumber && numberMap[char]) {
//     char = numberMap[char];
//   } else {
//     isNumber = false;
//   }

  if (isCapital) {
    char = char.toUpperCase();
    isCapital = false;
  }
  i++;
  result.push(char);
}

// result.forEach(function(char, i) {
//   if (!/[A-Za-z0-9]/.test(char)) {
//     console.log("Index " + i + ": [" + char + "] — cell was: " + cells[i]);
//   }
// }); 

// result.forEach(function(char, i) {
//   if (i < 15) {
//     console.log("Result " + i + ": [" + char + "]");
//   }
// });

// console.log("Cell 11: " + cells[11]);
// console.log("Cell 12: " + cells[12]);
// console.log("Cell 13: " + cells[13]);

// debug stuff

const base64String = result.join("");

//console.log(result.join("").slice(0, 950));

//console.log("Base64 preview:", base64String.slice(0, 950));

const decodedText = Buffer.from(base64String, "base64").toString("utf-8");

//console.log(decodedText);

function rot(str, shift) {
  return str.replace(/[a-z]/gi, char => {
    const base = char === char.toUpperCase() ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift) % 26) + base
    );
  });
}

// for (let i = 0; i < 26; i++) {
//   console.log("\n====================");
//   console.log("ROT " + i);
//   console.log("====================\n");
//   console.log(rot(decodedText, i));
// }     // ROT 10 found with this

const finalMessage = rot(decodedText, 10);
//console.log(finalMessage);
const cleaned = finalMessage.replace(/[^\x20-\x7E\n]/g, "");
console.log(cleaned);

fs.writeFileSync("output.md", cleaned);

console.log("Solved to output.md");

/*
Manual Cleanup:

the bug
I wrote a line of code today,
to make the little button start
but when i ran it, what a fright,
the screen went dark, it wasn't right!

where is the error? I cannot see,
it seems the code is mocking me.
I check the if and the else
and all thJ commas in between.

I searched the internet for aid,
and drank more coffee I had made.
a missing semicolon, oh the pain!
I added it, and now it runs... again?
(no, wait, now it's' broken in a new way)
*/