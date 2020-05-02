let getDifference = (...arg) => {
    arg = arg.map(el => el < 0 ? el * -1 : el);
    return arg[0] - arg[1] < 0 ? arg[0] - arg[1] * -1 : arg[0] - arg[1];
};
console.log(getDifference(5, 3));