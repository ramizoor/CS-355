// Our arguments
const args = process.argv.slice(2);
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

// Displays error if two values aren't provided
if (args.length !== 2) {
  console.log("Error: Please provide two numbers seperated by a space.");
  process.exit(1);
}

// Displays error if not numbers
if (isNaN(num1) || isNaN(num2)) {
  console.log("Error: Please provide two numbers seperated by a space.");
  process.exit(1);
}

// Adds both numbers
const sum = num1 + num2;

// Output
console.log(`The sum of ${num1} and ${num2} is ${sum}`);
