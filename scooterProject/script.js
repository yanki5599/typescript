var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ScooterCrudManager, createScooterElement, } from "./ScooterCrud.js";
import { SortOrder, sortTable, toggleOrder, filterTable, } from "./tableSortAndFilter.js";
//=================[ CONSTANTS ]================
const addScooterForm = document.querySelector("#addScooterForm");
const editScooterForm = () => document.querySelector("#editScooterForm");
const tbody = document.querySelector("table  tbody");
const table = document.getElementById("scootersTable");
const headerTitle = document.querySelector("#headerTitle");
const mainPage = document.querySelector("#MainPage");
const editPage = document.querySelector("#EditPage");
let currOrder = SortOrder.Ascending;
const cancelEditBtn = () => document.querySelector("#cancelEditBtn");
const saveChangesBtn = document.querySelector("#cancelEditBtn");
const tableTheadRow = table.querySelector("thead tr");
const thList = tableTheadRow.getElementsByTagName("th");
let scooters = [];
//=================[ FUNCTIONS ]================
function refreshScooters() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            scooters = yield ScooterCrudManager.getAll();
            localStorage.setItem("scooters", JSON.stringify(scooters));
        }
        catch (err) {
            showErrorMsg(err + "error fetching from api, fetching from local");
            scooters = JSON.parse(localStorage.getItem("scooters") || "") || [];
        }
    });
}
function addScooter() {
    return __awaiter(this, void 0, void 0, function* () {
        const newScooter = getScooterFromForm(addScooterForm);
        addScooterForm.reset();
        yield addScooterToDB(newScooter);
        yield refreshTable();
    });
}
function refreshTable() {
    return __awaiter(this, arguments, void 0, function* (shouldRefreshScooters = true) {
        shouldRefreshScooters && (yield refreshScooters());
        tbody.replaceChildren();
        scooters.forEach((scooter) => {
            createScooterElement(scooter, tbody, editScooter, removeScooter);
        });
    });
}
function addScooterToDB(scooter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ScooterCrudManager.create(scooter);
        }
        catch (err) {
            showErrorMsg(err.message);
        }
    });
}
function getScooterFromForm(form) {
    const newScooter = {
        serialNumber: form["serialNumber"].value,
        model: form["model"].value,
        batteryLevel: +form["batteryLevel"].value,
        imageUrl: form["imageUrl"].value,
        color: form["color"].value,
        status: form["status"].value,
    };
    return newScooter;
}
function showErrorMsg(msg) {
    console.error(msg);
}
function validateScooter(scooter) {
    let errors = "";
    if (!(scooter.batteryLevel <= 100 && scooter.batteryLevel >= 0))
        errors += "battery lvl not in range 0-100";
    //add more validation if necessary in the future
    return errors;
}
function setEditFormEL(scooter) {
    editScooterForm().addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        yield saveEditChanges(scooter);
    }));
}
function saveEditChanges(scooter) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedScooter = getScooterFromForm(editScooterForm());
        updatedScooter.id = scooter.id;
        yield ScooterCrudManager.update(updatedScooter);
        yield refreshTable();
        showHomePage();
    });
}
function editScooter(scooterId) {
    try {
        const scooter = getScooterById(scooterId);
        recreateEditForm();
        setEditFormEL(scooter);
        loadEditForm(scooter);
        showEditPage();
    }
    catch (err) {
        showErrorMsg(err);
    }
}
function loadEditForm(scooter) {
    editScooterForm()["serialNumber"].value = scooter.serialNumber;
    editScooterForm()["model"].value = scooter.model;
    editScooterForm()["batteryLevel"].value = scooter.batteryLevel;
    editScooterForm()["imageUrl"].value = scooter.imageUrl;
    editScooterForm()["color"].value = scooter.color;
    editScooterForm()["status"].value = scooter.status;
}
function removeScooter(scooterId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ScooterCrudManager.delete(scooterId);
            yield refreshTable();
        }
        catch (err) {
            showErrorMsg("error deleting scooter");
        }
    });
}
function showHomePage() {
    mainPage.style.display = "block";
    editPage.style.display = "none";
    headerTitle.textContent = "SCOOTER MANAGER";
}
function showEditPage() {
    mainPage.style.display = "none";
    editPage.style.display = "block";
    headerTitle.textContent = "EDIT SCOOTER";
}
function setFormEL() {
    addScooterForm.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const errorsString = validateScooter(getScooterFromForm(addScooterForm));
        if (errorsString === "")
            yield addScooter();
        else
            showErrorMsg(errorsString);
    }));
}
function getScooterById(id) {
    const foundScooter = scooters.find((s) => s.id === id);
    if (foundScooter === undefined)
        throw new Error("scooter not found");
    return foundScooter;
}
function recreateEditForm() {
    const form = editPage.querySelector("form");
    const section = form.parentElement;
    const newForm = form.cloneNode(true);
    section.replaceChild(newForm, form);
    setCancelEditBtnEL();
}
function setCancelEditBtnEL() {
    cancelEditBtn().addEventListener("click", (e) => {
        e.preventDefault();
        editScooterForm().reset();
        showHomePage();
    });
}
function setTableColumnsEL() {
    for (let i = 0; i < thList.length - 1; i++) {
        thList[i].addEventListener("click", () => sortTable(table, i, (currOrder = toggleOrder(currOrder))));
    }
}
function setTableSearchesEL() {
    for (let i = 0; i < thList.length - 1; i++) {
        thList[i].querySelector('input[type="search"]').addEventListener("input", (e) => {
            e.stopPropagation();
            filterTable(table, i, e.target.value);
            console.log();
        });
    }
}
// ================== [ON WINDOW LOAD] ================
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    setFormEL();
    setCancelEditBtnEL();
    setTableColumnsEL();
    setTableSearchesEL();
    showHomePage();
    yield refreshTable();
});
