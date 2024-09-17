import { Scooter, Status, ScooterCrudManager } from "./ScooterCrud.ts";

const addScooterForm: HTMLElement = document.querySelector(
  "#addScooterForm"
) as HTMLElement;

function addScooter(): void {
  const newScooter = getScooterFromForm();
  //addToLocalList();
  addScooterToDB(newScooter);
  refreshTable();
}

function addScooterToDB(scooter: Scooter): void {}

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

window.onload = () => {
  addScooterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const errorsString = validateScooter(getScooterFromForm());
    if (errorsString === "") addScooter();
    else showErrorMsg(errorsString);
  });
};
