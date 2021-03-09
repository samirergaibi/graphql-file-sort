const keywords = ["enum", "type", "scalar", "input"];

const isKeyword = input => keywords.some(keyword => keyword === input);

module.exports = isKeyword;
