// jest looks for ".test" in the file name
const {
	calcTip,
	fahrenheitToCelsius,
	celsiusToFahrenheit,
	add,
} = require("../src/math");

/* test(
	"Hello world", // case name
	() => { // testing fn

	}
) */

test("Calculates total value including tip", () => {
	const total = calcTip(10, 0.3);
	expect(total).toBe(13); // jest assertion library
});

test("Calculates total with default tip", () => {
	const total = calcTip(10);
	expect(total).toBe(12);
});

test(
	"Should convert 32 F to 0 C",
	() => {
		expect(fahrenheitToCelsius(32)).toBe(0);
	}
);

test(
	"Should convert 0 C to 32 F",
	() => {
		expect(celsiusToFahrenheit(0)).toBe(32);
	}
);

/* test(
	"Async test example - should fail",
	(onResolve) => {
		setTimeout(() => {
			expect(1).toBe(2);
			onResolve();
		}, 2000);
	}
); */

test(
	"Should add two numbers",
	(onResolve) => {
		add(2, 3).then((sum) => {
			expect(sum).toBe(5);
			onResolve();
		});
	}
);

test(
	"Should add two numbers async/await",
	async () => { // jest knows to wait for the promise returned
		const sum = await add(10, 22);
		expect(sum).toBe(32);
	}
);