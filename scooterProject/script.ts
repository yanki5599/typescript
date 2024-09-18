import {
  Scooter,
  ScooterCrudManager,
  createScooterElement,
} from "./ScooterCrud.js";

import {
  SortOrder,
  sortTable,
  toggleOrder,
  filterTable,
} from "./tableSortManager.js";

//=================[ CONSTANTS ]================

const addScooterForm: HTMLFormElement = document.querySelector(
  "#addScooterForm"
) as HTMLFormElement;

const editScooterForm = () =>
  document.querySelector("#editScooterForm") as HTMLFormElement;

const tbody: HTMLElement = document.querySelector(
  "table  tbody"
) as HTMLElement;

const table: HTMLTableElement = document.getElementById(
  "scootersTable"
) as HTMLTableElement;

const mainPage = document.querySelector("#MainPage") as HTMLElement;
const editPage = document.querySelector("#EditPage") as HTMLElement;

let currOrder: SortOrder = SortOrder.Ascending;

const cancelEditBtn = () =>
  document.querySelector("#cancelEditBtn") as HTMLButtonElement;
const saveChangesBtn = document.querySelector(
  "#cancelEditBtn"
) as HTMLButtonElement;

const tableTheadRow = table.querySelector("thead tr") as HTMLTableRowElement;
const thList = tableTheadRow.getElementsByTagName(
  "th"
) as HTMLCollectionOf<HTMLTableCellElement>;

let scooters: Scooter[] = [];

//=================[ FUNCTIONS ]================
async function refreshScooters(): Promise<void> {
  try {
    scooters = await ScooterCrudManager.getAll();
    localStorage.setItem("scooters", JSON.stringify(scooters));
  } catch (err: any) {
    showErrorMsg(err + "error fetching from api, fetching from local");
    scooters = JSON.parse(localStorage.getItem("scooters") || "") || [];
  }
}

async function addScooter(): Promise<void> {
  const newScooter = getScooterFromForm(addScooterForm);
  //addToLocalList();
  await addScooterToDB(newScooter);
  await refreshTable();
}

async function refreshTable(
  shouldRefreshScooters: boolean = true
): Promise<void> {
  shouldRefreshScooters && (await refreshScooters());

  tbody.replaceChildren();
  scooters.forEach((scooter) => {
    createScooterElement(scooter, tbody, editScooter, removeScooter);
  });
}

async function addScooterToDB(scooter: Scooter): Promise<void> {
  try {
    await ScooterCrudManager.create(scooter);
  } catch (err: any) {
    showErrorMsg(err.message);
  }
}

function getScooterFromForm(form: HTMLFormElement): Scooter {
  const newScooter: Scooter = {
    serialNumber: form["serialNumber"].value,
    model: form["model"].value,
    batteryLevel: +form["batteryLevel"].value,
    imageUrl: form["imageUrl"].value,
    color: form["color"].value,
    status: form["status"].value,
  };

  return newScooter;
}

function showErrorMsg(msg: string) {
  console.error(msg);
}

function validateScooter(scooter: Scooter): string {
  let errors: string = "";
  if (!(scooter.batteryLevel <= 100 && scooter.batteryLevel >= 0))
    errors += "battery lvl not in range 0-100";
  //add more validation if necessary in the future

  return errors;
}

function setEditFormEL(scooter: Scooter): void {
  editScooterForm().addEventListener("submit", async (e) => {
    e.preventDefault();
    await saveEditChanges(scooter);
  });
}

async function saveEditChanges(scooter: Scooter) {
  const updatedScooter: Scooter = getScooterFromForm(editScooterForm());
  updatedScooter.id = scooter.id;
  await ScooterCrudManager.update(updatedScooter);
  await refreshTable();
  showHomePage();
}

function editScooter(scooterId: string): void {
  try {
    const scooter: Scooter = getScooterById(scooterId);
    recreateEditForm();
    setEditFormEL(scooter);
    loadEditForm(scooter);
    showEditPage();
  } catch (err: any) {
    showErrorMsg(err);
  }
}

function loadEditForm(scooter: Scooter) {
  editScooterForm()["serialNumber"].value = scooter.serialNumber;
  editScooterForm()["model"].value = scooter.model;
  editScooterForm()["batteryLevel"].value = scooter.batteryLevel;
  editScooterForm()["imageUrl"].value = scooter.imageUrl;
  editScooterForm()["color"].value = scooter.color;
  editScooterForm()["status"].value = scooter.status;
}

async function removeScooter(scooterId: string): Promise<void> {
  try {
    await ScooterCrudManager.delete(scooterId);
    await refreshTable();
  } catch (err: any) {
    showErrorMsg("error deleting scooter");
  }
}

function showHomePage() {
  mainPage.style.display = "block";
  editPage.style.display = "none";
}

function showEditPage() {
  mainPage.style.display = "none";
  editPage.style.display = "block";
}

function setFormEL(): void {
  addScooterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorsString = validateScooter(getScooterFromForm(addScooterForm));
    if (errorsString === "") await addScooter();
    else showErrorMsg(errorsString);
  });
}
function getScooterById(id: string): Scooter {
  const foundScooter = scooters.find((s) => s.id === id);
  if (foundScooter === undefined) throw new Error("scooter not found");

  return foundScooter;
}

function recreateEditForm() {
  const form: HTMLFormElement = editPage.querySelector(
    "form"
  ) as HTMLFormElement;
  const section: HTMLElement = form.parentElement as HTMLElement;

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

function setTableColumnsEL(): void {
  for (let i: number = 0; i < thList.length - 1; i++) {
    thList[i].addEventListener("click", () =>
      sortTable(table, i, (currOrder = toggleOrder(currOrder)))
    );
  }
}

function setTableSearchesEL(): void {
  for (let i: number = 0; i < thList.length - 1; i++) {
    (
      thList[i].querySelector('input[type="search"]') as HTMLInputElement
    ).addEventListener("input", (e: Event) => {
      e.stopPropagation();
      filterTable(table, i, (e.target as HTMLInputElement).value);
      console.log();
    });
  }
}

// ================== [ON WINDOW LOAD] ================
window.onload = async () => {
  setFormEL();
  setCancelEditBtnEL();
  setTableColumnsEL();
  setTableSearchesEL();
  showHomePage();
  await refreshTable();
};
