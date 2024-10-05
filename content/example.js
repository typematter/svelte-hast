// This is a single-line comment

/* This is a
   multi-line comment */

// Variables and data types
let number = 42;
const PI = 3.14159;
var text = "Hello, world!";
const isTrue = true;
let nullable = null;
let undefined;

// Template literals
const name = "Alice";
console.log(`Hello, ${name}!`);

// Arrays and objects
const fruits = ['apple', 'banana', 'cherry'];
const person = {
	name: 'John Doe',
	age: 30,
	isStudent: false
};

// Functions
function greet(name) {
	return `Hello, ${name}!`;
}

const arrowFunc = (x, y) => x + y;

// Conditional statements
if (isTrue) {
	console.log("It's true!");
} else if (number > 50) {
	console.log("Number is greater than 50");
} else {
	console.log("Neither condition was met");
}

// Switch statement
switch (fruits[0]) {
	case 'apple':
		console.log("It's an apple");
		break;
	case 'banana':
		console.log("It's a banana");
		break;
	default:
		console.log("Unknown fruit");
}

// Loops
for (let i = 0; i < 5; i++) {
	console.log(`Iteration ${i}`);
}

while (number > 0) {
	number--;
	if (number === 30) continue;
	if (number === 25) break;
	console.log(number);
}

// Try-catch
try {
	throw new Error("This is an error");
} catch (error) {
	console.error(error.message);
} finally {
	console.log("This always runs");
}

// Class
class Animal {
	constructor(name) {
		this.name = name;
	}

	speak() {
		console.log(`${this.name} makes a sound.`);
	}
}

const dog = new Animal("Dog");
dog.speak();

// Async function and Promise
async function fetchData() {
	return new Promise((resolve) => {
		setTimeout(() => resolve("Data fetched"), 1000);
	});
}

fetchData().then(data => console.log(data));

// Regular expression
const regex = /^[A-Z][a-z]{2,}$/;
console.log(regex.test("Hello")); // true

// Export (if using modules)
export { Animal, greet };
