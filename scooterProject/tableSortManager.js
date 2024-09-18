export var SortOrder;
(function (SortOrder) {
    SortOrder[SortOrder["Ascending"] = 0] = "Ascending";
    SortOrder[SortOrder["Descending"] = 1] = "Descending";
})(SortOrder || (SortOrder = {}));
export const toggleOrder = (currOrder) => currOrder === SortOrder.Ascending
    ? SortOrder.Descending
    : SortOrder.Ascending;
export function sortTable(table, columnIndex, order) {
    var _a, _b;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch = false;
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
            if ((order === SortOrder.Ascending && xValue > yValue) ||
                (order === SortOrder.Descending && xValue < yValue)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            (_b = (_a = rows[i]) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
export function filterTable(table, columnIndex, text) {
    const rows = table.tBodies[0].rows;
    for (const row of rows) {
        const td = row.getElementsByTagName("td")[columnIndex];
        console.log(td);
        if (td.innerText.includes(text)) {
            row.style.display = "table-row";
        }
        else {
            row.style.display = "none";
        }
    }
}
