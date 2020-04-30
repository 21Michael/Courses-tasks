let countPoints = (mass) => {
    let counter = 0;
    mass.forEach((el) => {
        el = el.split(":");
        if (+el[0] > +el[1]) {
            counter += 3;
        } else if (+el[0] === +el[1]) {
            counter += 1;
        }
    });
    return counter;
};

console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']));