import HashMap from "./hashMap.js";

const test = HashMap();

console.log("Inserting initial values into list...");

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(`Values inserted: ${JSON.stringify(test.entries())}`);
console.log(`Length: ${test.length()}`);

console.log('\nReplacing ["apple", "red"] with ["apple", "green"]...');
test.set("apple", "green");
console.log('Replacing ["hat", "black"] with ["hat", "white"]...');
test.set("hat", "white");

console.log(`\nNew values: ${JSON.stringify(test.entries())}`);
console.log(`Length: ${test.length()}`);
console.log(`Keys: ${JSON.stringify(test.keys())}`);
console.log(`Values: ${JSON.stringify(test.values())}`);

console.log(`\nHas apple? ${test.has("apple") ? "yes" : "no"}`);
console.log(`Has cat? ${test.has("cat") ? "yes" : "no"}`);

console.log("\nRemoving dog...");
console.log(`${test.remove("dog") ? "Removed" : "Failed to remove"}`);
console.log("Adding cat...");
test.set("cat", "brown");

console.log(`\nNew values: ${JSON.stringify(test.entries())}`);
console.log(`Length: ${test.length()}`);

console.log("\nAdding moon...");
test.set("moon", "silver");
console.log(`Length: ${test.length()}`);

console.log(`The moon is ${test.get("moon")}`);
console.log(`The banana is ${test.get("banana")}`);

console.log(`\nEntries: ${test.entries()}`);

console.log("\nClearing...");
test.clear();
console.log(`Length: ${test.length()}`);
console.log(`\nEntries: ${test.entries()}`);
