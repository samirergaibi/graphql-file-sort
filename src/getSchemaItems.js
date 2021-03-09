const fs = require("fs");
const { isKeyword, isKeywordLetter } = require("./utils");

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

module.exports = getSchemaItems;
