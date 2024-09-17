"use strict";
function max(a, b) {
    return Math.max(a, b);
}
function printMax(a, b) {
    console.log(max(a, b));
}
function isEven(x) {
    return x % 2 == 0 ? "Even" : "Odd";
}
function len(string) {
    return string.length;
}
function createArray(n) {
    return Array.from({ length: n }, (_, index) => index + 1);
}
function maxFromArray(array) {
    return array.reduce((acc, curr) => (acc > curr ? acc : curr));
}
function printPerson(person) {
    console.log(`name:${person.name}, age:${person.age}, isStudent:${person.isStudent}`);
}
function isMinor(person) {
    return person.age < 18;
}
let r = {
    favoriteBook: { Title: "slkdfj", Author: "lsdkjf", Year: 43 },
    name: "ldk",
    age: 3,
    isStudent: true,
};
function maxReader(readers) {
    return readers.reduce((acc, curr) => acc.age > curr.age ? acc : curr);
}
function oldestBook(readers) {
    return readers.reduce((acc, curr) => acc.favoriteBook.Year < curr.favoriteBook.Year ? acc : curr).favoriteBook;
}
function myFunc(val) {
    if (typeof val === "string")
        return val + 0;
    return +val + 0;
}
