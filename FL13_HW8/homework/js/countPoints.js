let countPoints = (mass) => {
    let counter = 0,
        maxScore = 4;
    mass.forEach((el) => {
        el = el.split(":");
        if (+el[0] > +el[1] && +el[0] <= maxScore) {
            counter += 3;
        } else if (+el[0] === +el[1]) {
            counter += 1;
        }
    });
    return counter;
};

console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']));