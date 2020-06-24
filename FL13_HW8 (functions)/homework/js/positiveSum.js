let positiveSum = (mass) => {
    return mass.filter((el) => el >= 0).reduce((prev, curr) => prev + curr);
};
console.log(positiveSum([0, -3, 5, 7]));