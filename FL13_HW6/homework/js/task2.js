let text = prompt('Enter text:'),
    notFound = -1,
    two = 2;

if (text.search(/\w/gi) !== notFound) {

    let center = text.length / two;

    switch (Number.isInteger(center)) {
        case true:
            alert(text.substr(Math.ceil(center) - 1, two));
            break;
        case false:
            alert(text[Math.ceil(center) - 1]);
            break;
        default:
            alert('Invalid value');
    }
} else {
    alert('Invalid value');
}