function max(a: number, b: number): number {
  return Math.max(a, b);
}

function printMax(a: number, b: number): void {
  console.log(max(a, b));
}

function isEven(x: number): string {
  return x % 2 == 0 ? "Even" : "Odd";
}

function len(string: string): number {
  return string.length;
}

function createArray(n: number): number[] {
  return Array.from({ length: n }, (_, index) => index + 1);
}

function maxFromArray(array: number[]): number {
  return array.reduce((acc: number, curr: number) => (acc > curr ? acc : curr));
}

type Person = {
  name: string;
  age: number;
  isStudent: boolean;
};

function printPerson(person: Person): void {
  console.log(
    `name:${person.name}, age:${person.age}, isStudent:${person.isStudent}`
  );
}

function isMinor(person: Person): boolean {
  return person.age < 18;
}

interface Book {
  Title: string;
  Author: string;
  Year: number;
}

type Reader = {
  favoriteBook: Book;
} & Person;

let r: Reader = {
  favoriteBook: { Title: "slkdfj", Author: "lsdkjf", Year: 43 },
  name: "ldk",
  age: 3,
  isStudent: true,
};

function maxReader(readers: Reader[]): Reader {
  return readers.reduce((acc: Reader, curr: Reader) =>
    acc.age > curr.age ? acc : curr
  );
}

function oldestBook(readers: Reader[]): Book {
  return readers.reduce((acc: Reader, curr: Reader) =>
    acc.favoriteBook.Year < curr.favoriteBook.Year ? acc : curr
  ).favoriteBook;
}

function myFunc(val: string | number) {
  if (typeof val === "string") return (val as string) + 0;

  return +val + 0;
}
