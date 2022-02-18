function calcTip(total, tipPercent = .2) {
	const tip = total * tipPercent;
	return total + tip;
}

function fahrenheitToCelsius(temp) {
    return (temp - 32) / 1.8;
}

function celsiusToFahrenheit(temp) {
    return (temp * 1.8) + 32;
}

function add (a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
			if (a < 0 || b < 0) {
				return reject("Numbers must be non negative.");
			}
            resolve(a + b);
        }, 2000);
    });
}

module.exports = {
	calcTip,
	fahrenheitToCelsius,
	celsiusToFahrenheit,
	add,
}