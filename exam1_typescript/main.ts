enum PlayerPosition {
  PG = "PG",
  SG = "SG",
  SF = "SF",
  PF = "PF",
  C = "C",
}

interface Player {
  _id?: string;
  position: string;
  playerName: string;
  twoPercent: number;
  threePercent: number;
  points: number;
}

const form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;
const tableTbody: HTMLElement = document.querySelector(
  "form tbody"
) as HTMLElement;

function submitForm(): void {
  const searchParams: Partial<Player> = extractDataFromForm();

  postSearch(searchParams);
}

function reloadTable(playersList: Player[]): void {
  playersList.forEach((player) => {
    addPlayerRow(player);
  });
}

function addPlayerRow(player: Player): void {
  const tr = document.createElement("tr") as HTMLTableRowElement;
}

async function postSearch(searchParams: Partial<Player>): Promise<void> {
  const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";

  const options: RequestInit = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(searchParams),
  };

  try {
    const response = await fetch(BASE_URL, options);

    if (!response.ok) {
      throw new Error(
        `error fetching data from server. status:${response.status}`
      );
    }

    const playersList = response.json() as unknown as Player[];

    reloadTable(playersList);
  } catch (err: any) {
    console.error(err);
  }
}

function extractDataFromForm(): Partial<Player> {
  const formValues: Partial<Player> = {};
  formValues.position = form["position"].value;
  formValues.twoPercent = +form["twoPercent"].value;
  formValues.threePercent = +form["threePercent"].value;
  formValues.points = +form["points"].value;
  return formValues;
}

window.onload = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });
};
