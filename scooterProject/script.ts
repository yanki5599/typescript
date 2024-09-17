import {
  Scooter,
  ScooterCrudManager,
  createScooterElement,
} from "./ScooterCrud.js";

const addScooterForm: HTMLFormElement = document.querySelector(
  "#addScooterForm"
) as HTMLFormElement;

const tbody: HTMLElement = document.querySelector(
  "table  tbody"
) as HTMLElement;

const mainPage = document.querySelector("#MainPage") as HTMLElement;
const editPage = document.querySelector("#EditPage") as HTMLElement;

let scooters: Scooter[] = [];

async function refreshScooters(): Promise<void> {
  try {
    scooters = await ScooterCrudManager.getAll();
    localStorage.setItem("scooters", JSON.stringify(scooters));
  } catch (err: any) {
    scooters = JSON.parse(localStorage.getItem("scooters") || "") || [];
  }
}

async function addScooter(): Promise<void> {
  const newScooter = getScooterFromForm();
  //addToLocalList();
  addScooterToDB(newScooter);
  await refreshScooters();
  refreshTable();
  showHomePage();
}

async function refreshTable(): Promise<void> {
  tbody.replaceChildren();
  await refreshScooters();
  scooters.forEach((scooter) => {
    createScooterElement(scooter, tbody, editScooter, removeScooter);
  });
}

async function addScooterToDB(scooter: Scooter): Promise<void> {
  try {
    await ScooterCrudManager.create(scooter);
    await refreshTable();
  } catch (err: any) {
    showErrorMsg(err.message);
  }
}

function getScooterFromForm(): Scooter {
  const newScooter: Scooter = {
    serialNumber: addScooterForm["serialNumber"].value,
    model: addScooterForm["model"].value,
    batteryLevel: +addScooterForm["batteryLevel"].value,
    imageUrl: addScooterForm["imageUrl"].value,
    color: addScooterForm["color"].value,
    status: addScooterForm["status"].value,
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

function editScooter(scooterId: string): void {}

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
  addScooterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const errorsString = validateScooter(getScooterFromForm());
    if (errorsString === "") addScooter();
    else showErrorMsg(errorsString);
  });
}

window.onload = async () => {
  setFormEL();
  await refreshTable();
  showHomePage();
};
