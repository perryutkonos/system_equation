class SystemEquation {

    constructor(data) {

        this.matrix = data.matrix;
        this.freeElems = data.freeElems;
        this.eps = data.eps;
        this.size = data.matrix.length;
        this.countDigits = data.countDigits;
    }

    getNormalOne() {

        let result = 0;

        for (let j = 0; j < this.size; j++) {

            let colSum = 0;
            for (let i = 0; i < this.size; i++) {
                colSum += this.matrix[i][j];
            }

            if (j === 0 || colSum > result) {
                result = colSum
            }
        }

        return result;
    }

    getNormalTwo() {

        let result = 0;

        for (let i = 0; i < this.size; i++) {

            let rowSum = 0;
            for (let j = 0; j < this.size; j++) {
                rowSum += this.matrix[i][j];
            }

            if (i === 0 || rowSum > result) {
                result = rowSum
            }
        }

        return result;
    }

    getNormalThree() {

        let result = 0;

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {

                result += this.matrix[i][j] * this.matrix[i][j];
            }

        }
        result = Math.sqrt(result);
        return result;
    }

    checkNormals() {

        return this.getNormalOne() < 1 || this.getNormalTwo() < 1 || this.getNormalThree() < 1;
    }

    checkResult(vector) {

        for (let i = 0; i < this.size; i++) {

            let result = 0;
            for (let j = 0; j < this.size; j++) {

                result += this.matrix[i][j] * vector[j];
            }

            result -= vector[i];
            let error = Math.abs(result + this.freeElems[i]).toFixed();

            console.log(`Результат: ${result} | Ожидание: ${-1 * this.freeElems[i]} | Разница: ${error}`)
        }
    }

    getEmptyVector() {

        let result = [];
        for (let i = 0; i < this.size; i++) {
            result.push(0);
        }
        return result;
    }

    getVectorDiff(oldVector, newVector) {

        let result = 0;
        for (let i = 0; i < this.size; i++) {

            let newDiff = Math.abs(newVector[i] - oldVector[i]);

            if (i === 0 || newDiff > result) {
                result = newDiff;
            }
        }

        return result;
    }

    getResultByYakobi() {

        const getNewVector = (oldVector) => {

            let result = [];

            for (let i = 0; i < this.size; i++) {

                result[i] = this.freeElems[i];

                for (let j = 0; j < this.size; j++) {

                    result[i] += this.matrix[i][j] * oldVector[j];
                    result[i] = result[i].toFixed();
                }
            }

            return result;

        }

        if (this.checkNormals()) {

            console.log(`\nРешение системы методом Якоби:`);

            let vector = this.getEmptyVector(this.size);
            let diff = 1;

            let step = 1;

            for (; diff > this.eps; step++) {

                let newVector = getNewVector(vector);
                diff = this.getVectorDiff(vector, newVector);

                vector = newVector;
                console.log(`Шаг ${step}`, vector);
            }

            console.log(`Результат получен на шаге ${step - 1}:`, vector);
            return vector;

        } else {

            return "Данную систему методом Якоби не решить";
        }

    };

    getResultByZeydel() {

        if (this.checkNormals()) {

            console.log(`\nРешение системы методом Зейделя:`);

            let vector = this.getEmptyVector(this.size);
            let diff = 1;

            let step = 1;
            for (; diff > this.eps; step++) {

                for (let i = 0; i < this.size; i++) {

                    let newValue = this.freeElems[i];

                    for (let j = 0; j < this.size; j++) {
                        newValue += this.matrix[i][j] * vector[j];
                    }

                    let newDiff = Math.abs(vector[i] - newValue);

                    if (i === 0 || newDiff > diff) {
                        diff = newDiff;
                    }

                    vector[i] = newValue.toFixed();
                }

                console.log(`Шаг ${step}`, vector);
            }
            console.log(`Результат получен на шаге ${step -1}:`, vector);

            return vector;

        } else {

            return "Данную систему методом Зейдля не решить";
        }

    };
}

module.exports = SystemEquation;