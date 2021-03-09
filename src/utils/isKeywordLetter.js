const keywordLetters = [
  "e",
  "n",
  "u",
  "m",
  "t",
  "y",
  "p",
  "s",
  "c",
  "a",
  "l",
  "r",
  "i",
];

const isKeywordLetter = letter =>
  keywordLetters.some(value => value === letter);

module.exports = isKeywordLetter;
