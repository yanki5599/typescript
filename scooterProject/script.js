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
const addScooterForm = document.querySelector("#addScooterForm");
const tbody = document.querySelector("table  tbody");
const mainPage = document.querySelector("#MainPage");
const editPage = document.querySelector("#EditPage");
let scooters = [];
function refreshScooters() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            scooters = yield ScooterCrudManager.getAll();
            localStorage.setItem("scooters", JSON.stringify(scooters));
        }
        catch (err) {
            scooters = JSON.parse(localStorage.getItem("scooters") || "") || [];
        }
    });
}
function addScooter() {
    return __awaiter(this, void 0, void 0, function* () {
        const newScooter = getScooterFromForm();
        //addToLocalList();
        addScooterToDB(newScooter);
        yield refreshScooters();
        refreshTable();
        showHomePage();
    });
}
function refreshTable() {
    return __awaiter(this, void 0, void 0, function* () {
        tbody.replaceChildren();
        yield refreshScooters();
        scooters.forEach((scooter) => {
            createScooterElement(scooter, tbody, editScooter, removeScooter);
        });
    });
}
function addScooterToDB(scooter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ScooterCrudManager.create(scooter);
            yield refreshTable();
        }
        catch (err) {
            showErrorMsg(err.message);
        }
    });
}
function getScooterFromForm() {
    const newScooter = {
        serialNumber: addScooterForm["serialNumber"].value,
        model: addScooterForm["model"].value,
        batteryLevel: +addScooterForm["batteryLevel"].value,
        imageUrl: addScooterForm["imageUrl"].value,
        color: addScooterForm["color"].value,
        status: addScooterForm["status"].value,
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
function editScooter(scooterId) { }
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
}
function showEditPage() {
    mainPage.style.display = "none";
    editPage.style.display = "block";
}
function setFormEL() {
    addScooterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const errorsString = validateScooter(getScooterFromForm());
        if (errorsString === "")
            addScooter();
        else
            showErrorMsg(errorsString);
    });
}
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    setFormEL();
    yield refreshTable();
    showHomePage();
});
