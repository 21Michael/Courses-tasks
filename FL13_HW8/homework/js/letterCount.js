let letterCount = (str,letter) => {
	letter = new RegExp('\\'+letter,'gi');
    return (str.search(letter) !== -1)?str.match(letter).length:0;
};
console.log(letterCount("Maggy", "g"));