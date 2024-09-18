export enum SortOrder {
  Ascending,
  Descending,
}

export const toggleOrder = (currOrder: SortOrder) =>
  currOrder === SortOrder.Ascending
    ? SortOrder.Descending
    : SortOrder.Ascending;

export function sortTable(
  table: HTMLTableElement,
  columnIndex: number,
  order: SortOrder
): void {
  let rows: HTMLCollection;
  let switching: boolean;
  let i: number;
  let x: HTMLTableCellElement;
  let y: HTMLTableCellElement;
  let shouldSwitch: boolean = false;

  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];

      const xValue = x.innerText.toLowerCase();
      const yValue = y.innerText.toLowerCase();

      if (
        (order === SortOrder.Ascending && xValue > yValue) ||
        (order === SortOrder.Descending && xValue < yValue)
      ) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i]?.parentNode?.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

export function filterTable(
  table: HTMLTableElement,
  columnIndex: number,
  text: string
): void {
  const rows: HTMLCollectionOf<HTMLTableRowElement> = table.tBodies[0].rows;

  for (const row of rows) {
    const td: HTMLTableCellElement =
      row.getElementsByTagName("td")[columnIndex];
    console.log(td);

    if (td.innerText.includes(text)) {
      (row as HTMLElement).style.display = "table-row";
    } else {
      (row as HTMLElement).style.display = "none";
    }
  }
}
