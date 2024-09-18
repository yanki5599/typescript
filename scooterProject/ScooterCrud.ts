export enum Status {
  available = "available",
  inRepair = "inRepair",
  unavailable = "unavailable",
}

export interface Scooter {
  id?: string;
  serialNumber: string;
  model: string;
  batteryLevel: number;
  imageUrl: string;
  color: string;
  status: Status;
}

export class ScooterCrudManager {
  static BASE_URL: string =
    "https://66e9773e87e4176094498ad7.mockapi.io/scooter";

  public static async create(scooter: Scooter): Promise<Scooter> {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(scooter),
      headers: { "Content-type": "application/json" },
    };

    try {
      const response = await fetch(ScooterCrudManager.BASE_URL, options);

      if (!response.ok)
        throw new Error("Failed to create scooter!" + response.statusText);

      const newScooter: Scooter = await response.json();
      return newScooter;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async getAll(): Promise<Scooter[]> {
    try {
      const response = await fetch(ScooterCrudManager.BASE_URL);

      if (!response.ok)
        throw new Error("failed to get all scooters! " + response.statusText);

      const allScooters: Scooter[] = await response.json();

      return allScooters;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async update(scooter: Scooter): Promise<void> {
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(scooter),
      headers: { "Content-type": "application/json" },
    };

    try {
      const response = await fetch(
        ScooterCrudManager.BASE_URL + `/${scooter.id}`,
        options
      );

      if (!response.ok)
        throw new Error("failed to update scooter! " + response.statusText);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public static async delete(id: string): Promise<void> {
    const options: RequestInit = {
      method: "DELETE",
    };

    try {
      const response = await fetch(
        ScooterCrudManager.BASE_URL + `/${id}`,
        options
      );

      if (!response.ok)
        throw new Error("failed to delete scooter! " + response.statusText);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export function createScooterElement(
  scooter: Scooter,
  tbody: HTMLElement,
  editFunc: (id: string) => void,
  removeFunc: (id: string) => void
) {
  const trElement: HTMLElement = document.createElement("tr");
  trElement.id = scooter.id!;
  trElement.append(createTdElement(scooter.serialNumber));
  trElement.append(createTdElement(scooter.model));
  trElement.append(createTdElement(scooter.batteryLevel + "%"));
  trElement.append(createTdElement(scooter.imageUrl));
  trElement.append(createTdElement(scooter.color));
  trElement.append(createTdElement(scooter.status));
  trElement.append(createActionButtons(scooter.id!, editFunc, removeFunc));
  tbody.append(trElement);
}

function createActionButtons(
  scooterId: string,
  editFunc: (id: string) => void,
  removeFunc: (id: string) => void
): HTMLElement {
  const td = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.textContent = "EDIT";
  editBtn.classList.add("editScooterBtn");
  editBtn.addEventListener("click", () => {
    editFunc(scooterId);
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "REMOVE";
  removeBtn.classList.add("removeScooterBtn");
  removeBtn.addEventListener("click", () => {
    removeElement(scooterId);
    removeFunc(scooterId);
  });

  const buttonsWrapperDiv = document.createElement("div") as HTMLElement;
  buttonsWrapperDiv.classList.add("buttonsWrapper");
  buttonsWrapperDiv.append(editBtn, removeBtn);
  td.append(buttonsWrapperDiv);
  return td;
}

function createTdElement(textContent: string | number): HTMLElement {
  const td = document.createElement("td");
  td.textContent = textContent.toString();
  return td;
}

function removeElement(id: string): HTMLElement {
  const elem: HTMLElement = document.getElementById(id) as HTMLElement;
  return elem?.parentNode?.removeChild(elem)!;
}
