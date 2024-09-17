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

  public async create(scooter: Scooter): Promise<Scooter> {
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

  public async getAll(): Promise<Scooter[]> {
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

  public async update(scooter: Scooter): Promise<void> {
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(scooter),
      headers: { "Content-type": "application/json" },
    };

    try {
      const response = await fetch(
        ScooterCrudManager.BASE_URL + `${scooter.id}`,
        options
      );

      if (!response.ok)
        throw new Error("failed to update scooter! " + response.statusText);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async delete(id: number): Promise<void> {
    const options: RequestInit = {
      method: "DELETE",
    };

    try {
      const response = await fetch(
        ScooterCrudManager.BASE_URL + `${id}`,
        options
      );

      if (!response.ok)
        throw new Error("failed to delete scooter! " + response.statusText);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
