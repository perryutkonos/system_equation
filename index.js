Number.prototype.toFixed = function (countDigits = 5) {
    return Math.round(this * Math.pow(10, countDigits)) / Math.pow(10, countDigits);
};

const data = require("./data");
const SystemEquation = require("./SystemEquation");

const systemEquation = new SystemEquation(data);

const resultYakobi = systemEquation.getResultByYakobi();
const resultZeydel = systemEquation.getResultByZeydel();

console.log("\nПогрешность Якоби");
systemEquation.checkResult(resultYakobi);

console.log("\nПогрешность Зейделя");
systemEquation.checkResult(resultZeydel);