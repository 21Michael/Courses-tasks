let login = prompt('Enter a login:'),
	notFound = -1,
	minLength = 4,
	middleOfDay = 20;

let checkOnEmptyStr = function(str) {
    if (str && str.search(/\w/gi) !== notFound) { 
    return str.replace(/\s/g, '').toLowerCase(); 
    }else { 
    alert('Canceled'); 
    }
};

let checkLogin = function(login) {

    login = checkOnEmptyStr(login);

    if (login.length < minLength){ 
        alert('I don’t know any users having name length less than 4 symbols');
    }else if (login !== 'user' && login !== 'admin') {
        alert('I don’t know you');
    } else {
        checkPassword(login);
    }
};

let checkPassword = function(str) {
    let password = prompt('Enter a password:');
    let objectPassword = {
        'user': 'userpass',
        'admin': 'rootpass'
    };

    password = checkOnEmptyStr(password);

    if (objectPassword[str] === password) {
        greetFun(str);
    } else if (objectPassword[str] !== password) {
        alert('Wrong password');
    }
};

let greetFun = function(str) {

    str = str[0].toUpperCase() + str.substr(1);
    let time = new Date().getHours();

    if (time < middleOfDay) {
        alert('Good day, dear ' + str + '!');
    } else {
        alert('Good evening, dear ' + str + '!');
    }
};

checkLogin(login);