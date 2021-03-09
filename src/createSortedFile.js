const fs = require("fs");

const createSortedFile = (schemaItems, file) => {
  const formattedContent = schemaItems.sort().join("");

  fs.writeFile(file, formattedContent, err => {
    if (err) {
      throw new Error(err);
    }

    console.log(`Succefully created file ${file}!`);
  });
};

module.exports = createSortedFile;
