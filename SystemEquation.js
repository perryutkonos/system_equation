Number.prototype.toFixed = function (countDigits = 10) {

    return Math.round(this * Math.pow(10, countDigits)) / Math.pow(10, countDigits);
};

class SystemEquation {

    constructor(data) {

        this.matrix = data.matrix;
        this.freeElems = data.freeElems;
        this.accuracy = data.accuracy;
        this.size = data.matrix.length;
        this.countDigits = data.countDigits;
    }

    getNormalOne() {

        let result = 0;

        for (let j = 0; j < this.size; j++) {

            let colSum = 0;
            for (let i = 0; i < this.size; i++) {
                colSum = (colSum + this.matrix[i][j]).toFixed();
            }

            if (j === 0 || colSum > result) {
                result = colSum
            }
        }

        return result;
    }

    getNormalTwo () {

        let result = 0;

        for (let i = 0; i < this.size; i++) {

            let rowSum = 0;
            for (let j = 0; j < this.size; j++) {
                rowSum = (rowSum + this.matrix[i][j]).toFixed();
            }

            if (i === 0 || rowSum > result) {
                result = rowSum
            }
        }

        return result;
    }

    getNormalThree ()  {

        let result = 0;

        for (let i = 0; i < this.size; i++) {

            for (let j = 0; j < this.size; j++) {
                result = (result + (this.matrix[i][j] * this.matrix[i][j]).toFixed()).toFixed();
            }

        }

        result = Math.sqrt(result).toFixed()
        return result;
    }

    checkNormals() {

        return this.getNormalOne() < 1 || this.getNormalTwo() < 1 || this.getNormalThree() < 1;
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

            let newDiff = Math.abs((newVector[i] - oldVector[i]).toFixed());

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

                result[i] = this.freeElems[i].toFixed();

                for (let j = 0; j < this.size; j++) {

                    result[i] = (result[i] + (this.matrix[i][j] * oldVector[j]).toFixed()).toFixed();
                }
            }

            return result;

        }

        if (this.checkNormals()) {

            let vector = this.getEmptyVector(this.size);
            let diff = this.accuracy;

            while (diff >= this.accuracy) {

                let newVector = getNewVector(vector);
                diff = this.getVectorDiff(vector, newVector);

                vector = newVector;
            }

            return vector;

        } else {

            return "Данную систему методом Якоби не решить";
        }

    };

    getResultByZeydel() {

        if (this.checkNormals()) {

            let vector = this.getEmptyVector(this.size);
            let diff = this.accuracy;

            while (diff >= this.accuracy) {

                for (let i = 0; i < this.size; i++) {

                    let newValue = this.freeElems[i].toFixed();

                    for (let j = 0; j < this.size; j++) {

                        newValue = (newValue + (this.matrix[i][j] * vector[j]).toFixed()).toFixed();
                    }

                    let newDiff = Math.abs((vector[i] - newValue).toFixed());

                    if (i === 0 || newDiff > diff) {
                        diff = newDiff;
                    }

                    vector[i] = newValue;
                }
            }

            return vector;

        } else {

            return "Данную систему методом Зейдля не решить";
        }

    };
}

module.exports = SystemEquation;