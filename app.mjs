import { clear } from "node:console";
import fs from "node:fs"

let data = fs.readFileSync("./data.txt", "utf-8");

const cells = data.match(/.{1,6}/g);

console.log("Length:", data.length);
console.log("Divisible by 6:", data.length % 6 === 0);

console.log("Total cells:", cells.length);

// Braille map
const BRAILLE_MAP = {
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

  // Space
  "000000": " ",

  // Punctuation
  "010011": ",",
  "011001": ";",
  "010001": ":",
  "011011": ".",
  "011010": "!",
  "001011": "?",
  "001001": "-",
  "000010": "'",

  // Special indicators
  "000001": "CAPITAL",   // capital follows
  "001111": "NUMBER",    // number follows
  "000011": "DECIMAL"    // decimal follows
};