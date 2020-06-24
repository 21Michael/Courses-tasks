const assign = function() {
    const object = new Object(arguments[0]);
    for (let i = 1; i < arguments.length; i++) {
        for (let key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                object[key] = arguments[i][key];
            }
        }
    }
    return object;
};
