let convert = (...mass) => {
    let versedMass = [];
    for (let value of mass) {
        typeof value === 'string' ? versedMass.push(+value) : versedMass.push(value + '');
    }
    return versedMass;
};


let executeforEach = (mass, callback) => {
    for (let value of mass) {
        callback(value);
    }
};


let mapArray = (mass, callback) => {
    let newmass = [];
    executeforEach(mass, callback(newmass));
    return newmass;
};


let filterArray = (mass, callback) => {
    let newmass = [];
    executeforEach(mass, callback(newmass));
    return newmass;
};


let containsValue = (mass, val) => {
    let contain = false;
    executeforEach(mass, (el) => {
        el === val ? contain = true : contain;
    });
    return contain;
};


let flipOver = (str) => {
    let newStr = '';
    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str[i];
    }
    return newStr;
};


let makeListFromRange = (mass) => {
    let newmass = [],
        beginNum, lastNum;
    mass[0] > mass[1] ? (beginNum = mass[1], lastNum = mass[0]) : (beginNum = mass[0], lastNum = mass[1]);
    for (; beginNum <= lastNum; beginNum++) {
        newmass.push(beginNum);
    }
    return newmass;
};


let getArrayOfKeys = (mass, key) => {
    let newmass = [];
    executeforEach(mass, (el) => {
        newmass.push(el[key]);
    });
    return newmass;
};


let substitute = (mass) => {
    let newmass = [],
        max = 20,
        min = 10;

    executeforEach(mass, (el) => {
        min < el && el < max ? newmass.push('*') : newmass.push(el);
    });

    return newmass;
};


let getPastDay = (date, passedDays) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() - passedDays);
    return newDate.getDate();
};


let formatDate = (date) => {
    let year = date.getFullYear(),
        month = date.toLocaleString('ua', { month: '2-digit' }),
        day = date.getDate(),
        time = date.toLocaleString('ua', { hour: 'numeric', minute: 'numeric' });
    return `${year}/${month}/${day} ${time}`;
};