const fs = require("fs");

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

const keywords = ["enum", "type", "scalar", "input"];
const isKeyword = input => keywords.some(keyword => keyword === input);

const getSchemaItems = filePath => {
  const schemaItems = [];
  let currentKeyword = "";
  let currentSchemaItem = "";
  let isCopyingSchemaItem = false;

  const fileContentArr = fs.readFileSync(filePath, "utf8").split("");

  fileContentArr.forEach(letter => {
    if (isCopyingSchemaItem) {
      currentSchemaItem = `${currentSchemaItem}${letter}`;
      if (letter === "}") {
        schemaItems.push(`${currentSchemaItem.trim()}\n\n`);
        isCopyingSchemaItem = false;
        currentSchemaItem = "";
      }
      return;
    }

    if (isKeywordLetter(letter)) {
      currentKeyword = `${currentKeyword}${letter}`;
      return;
    }

    if (isKeyword(currentKeyword)) {
      // Check for a space after keyword - else it could be a type/input field
      if (letter === " ") {
        isCopyingSchemaItem = true;
        currentSchemaItem = `${currentKeyword} `;
        currentKeyword = "";
      }

      currentKeyword = "";
      return;
    }

    currentKeyword = "";
    return;
  });

  return schemaItems;
};

const createSortedFile = (schemaItems, file) => {
  const formattedContent = schemaItems.sort().join("");

  fs.writeFile(file, formattedContent, err => {
    if (err) {
      throw new Error(err);
    }

    console.log(`Succefully created file ${file}!`);
  });
};

const filePath = process.argv[2];
if (!filePath) {
  console.log("No filepath provided to the script.");
  process.exit(9);
}

const DEFAULT_OUTPUT_FILE_NAME = "sorted.graphql";

const schemaItems = getSchemaItems(filePath);
createSortedFile(schemaItems, DEFAULT_OUTPUT_FILE_NAME);
