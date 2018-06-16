const data = require("./data");
const SystemEquation = require("./SystemEquation");

const systemEquation = new SystemEquation(data);

systemEquation.checkNormals();
const resultYakobi = systemEquation.getResultByYakobi();
const resultZeudel = systemEquation.getResultByZeydel();

console.log(resultYakobi);
console.log(resultZeudel);