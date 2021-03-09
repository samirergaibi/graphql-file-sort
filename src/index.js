const getSchemaItems = require("./getSchemaItems");
const createSortedFile = require("./createSortedFile");

const INPUT_FILE_PATH = "products.graphql";
const OUTPUT_FILE_NAME = "sorted.graphql";

const schemaItems = getSchemaItems(INPUT_FILE_PATH);
createSortedFile(schemaItems, OUTPUT_FILE_NAME);
