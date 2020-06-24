let maxNumAftCom = 2,
    maxPer = 100,
    num = +(+prompt('Enter a check number:')).toFixed(maxNumAftCom),
    per = +(+prompt('Enter a tip percentage:')).toFixed(maxNumAftCom);

if (num !== 0 && (!isNaN(num) && !isNaN(per)) && (num >= 0 && per >= 0 && per <= maxPer)) {

    let tipAm = num * (per / maxPer);

    alert(
`Check number: ${num} 
Tip: ${per}%
Tip amount: ${tipAm.toFixed(maxNumAftCom)} 
Total sum to pay: ${(num + tipAm).toFixed(maxNumAftCom)}`
    );
} else {
    alert('Invalid input data')
}