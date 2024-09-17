// Step 1: נתון לכם אינאם - אתם רשאים להפוך אותו למשהו אחר
export enum ItemType {
  Book = "book",
  DVD = "dvd",
}

// Step 2:  ספר צריך להכיל שדות
interface Book {
  type: ItemType;
  title: string;
  author: string;
}

interface DVD {
  type: ItemType;
  title: string;
  duration: number;
}

// Step 3: פונקציה מקבלת מערך של פריטים, ופונקצית פילטור. ומחזירה מערך מפולטר של פריטים
function filterItems(
  items: (DVD | Book)[],
  filterFn: (item: DVD | Book) => boolean
): (DVD | Book)[] {
  return items.filter(filterFn);
}

// Step 4: הפונקציה מקבלת מערך של פריטים ומדפיסה את כל המידע הרלוונטי לגבי כל פריט
function printItemsData(items: (DVD | Book)[]) {
  items.forEach((item) => {
    console.log(`type: ${item.type}, title:${item.title}`);

    if (item.type === ItemType.Book)
      console.log(`author: ${(item as Book).author}`);
    if (item.type === ItemType.DVD)
      console.log(`duration: ${(item as DVD).duration}`);
  });
}

// Test data
const libraryItems: (Book | DVD)[] = [
  {
    type: ItemType.Book,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  { type: ItemType.DVD, title: "Inception", duration: 148 },
  { type: ItemType.Book, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { type: ItemType.DVD, title: "Avatar", duration: 162 },
  { type: ItemType.Book, title: "Go Set a Watchman", author: "Harper Lee" },
];

// Step 5:  הדפיסו את כל המידע הנתון
printItemsData(libraryItems);

// Step 6: ממשו את פונקצית הפילטור כך שתחזיר סרטים ארוכים משעתיים והדפיסו את המערך
function filterLongerThan2Hours(item: DVD): boolean {
  return item.duration > 120;
}

filterItems(libraryItems, filterLongerThan2Hours);

// Step 7:  Harper Lee ממשו את פונקצית הפילטור כך שתחזיר רק ספרים של
