interface Player {
  position: string;
  playerName: string;
  twoPercent: number;
  threePercent: number;
  points: number;
}

interface Team {
  PG: { el: HTMLDivElement; player?: Player };
  SG: { el: HTMLDivElement; player?: Player };
  SF: { el: HTMLDivElement; player?: Player };
  PF: { el: HTMLDivElement; player?: Player };
  C: { el: HTMLDivElement; player?: Player };
}

const form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;
const tableTbody: HTMLElement = document.querySelector("tbody") as HTMLElement;
const addTeamBtn: HTMLButtonElement = document.getElementById(
  "addTeam"
) as HTMLButtonElement;

const sliders = form.getElementsByTagName(
  "input"
) as HTMLCollectionOf<HTMLInputElement>;

const currentTeam: Team = {
  PG: { el: document.getElementById("PG") as HTMLDivElement },
  SG: { el: document.getElementById("SG") as HTMLDivElement },
  SF: { el: document.getElementById("SF") as HTMLDivElement },
  PF: { el: document.getElementById("PF") as HTMLDivElement },
  C: { el: document.getElementById("C") as HTMLDivElement },
};

let timer: number | null;

function submitForm(): void {
  const searchParams: Partial<Player> = extractDataFromForm();

  postSearch(searchParams);
}
function reloadTable(playersList: Player[]): void {
  clearTable();
  playersList.forEach((player) => {
    addPlayerRow(player);
  });
}
function clearTable(): void {
  tableTbody.replaceChildren();
}
function addPlayerRow(player: Player): void {
  const tr = document.createElement("tr") as HTMLTableRowElement;

  const playerNameTd = document.createElement("td") as HTMLTableCellElement;
  const positionTd = document.createElement("td") as HTMLTableCellElement;
  const twoPercentTd = document.createElement("td") as HTMLTableCellElement;
  const threePercentTd = document.createElement("td") as HTMLTableCellElement;
  const pointsTd = document.createElement("td") as HTMLTableCellElement;
  const actionsTd = document.createElement("td") as HTMLTableCellElement;

  playerNameTd.textContent = player.playerName;
  positionTd.textContent = player.position;
  twoPercentTd.textContent = player.twoPercent.toString() + "%";
  threePercentTd.textContent = player.threePercent.toString() + "%";
  pointsTd.textContent = player.points.toString();

  const button: HTMLButtonElement = document.createElement("button");
  button.textContent = `add ${player.playerName.split(" ")[0]} to current team`;
  actionsTd.appendChild(button);
  setAddButtonEL(button, player);

  tr.append(
    playerNameTd,
    positionTd,
    twoPercentTd,
    threePercentTd,
    pointsTd,
    actionsTd
  );
  tableTbody.appendChild(tr);
}
function setAddButtonEL(button: HTMLButtonElement, player: Player): void {
  button.addEventListener("click", () => {
    const teamMemberElement = document.getElementById(
      `${player.position}`
    ) as HTMLDivElement;
    clearPChildren(teamMemberElement);
    teamMemberElement.append(...createPlayerPElements(player));
    (currentTeam as any)[player.position].player = player;
  });
}
function createPlayerPElements(player: Player): HTMLParagraphElement[] {
  const playerNameP = document.createElement("p") as HTMLParagraphElement;
  const threePercentsP = document.createElement("p") as HTMLParagraphElement;
  const twoPercentsP = document.createElement("p") as HTMLParagraphElement;
  const pointsP = document.createElement("p") as HTMLParagraphElement;

  playerNameP.textContent = player.playerName;
  threePercentsP.textContent = "Three Percents:" + player.threePercent;
  twoPercentsP.textContent = "Two Percents:" + player.twoPercent;
  pointsP.textContent = "Points:" + player.points;

  return [playerNameP, threePercentsP, twoPercentsP, pointsP];
}
function clearPChildren(parent: HTMLDivElement): void {
  const title: HTMLHeadingElement =
    parent.firstElementChild as HTMLHeadingElement;
  parent.replaceChildren(title);
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

    const playersList = (await response.json()) as unknown as Player[];

    if (playersList.length === 0)
      showErrorMsg("No players that match the parameters were found.");
    reloadTable(playersList);
  } catch (err: any) {
    console.error(err);
    showErrorMsg(err);
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

function showErrorMsg(msg: string): void {
  const msgDivElement = document.createElement("div") as HTMLDivElement;
  msgDivElement.textContent = msg;
  msgDivElement.classList.add("errorDiv");

  document.body.append(msgDivElement);
  timer = setTimeout(() => {
    msgDivElement.remove();
  }, 3000);
}

function showSuccessMsg(msg: string): void {
  const msgDivElement = document.createElement("div") as HTMLDivElement;
  msgDivElement.textContent = msg;
  msgDivElement.classList.add("successDiv");

  document.body.append(msgDivElement);
  timer = setTimeout(() => {
    msgDivElement.remove();
  }, 3000);
}
async function addTeam(): Promise<void> {
  const BASE_URL: string = "https://nbaserver-q21u.onrender.com/api/AddTeam";

  const players: Player[] = getMyTeam();

  const options: RequestInit = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(players),
  };

  try {
    if (players.some((p) => p == null)) {
      throw new Error("Team is not full.");
    }
    const response = await fetch(BASE_URL, options);

    if (!response.ok) {
      throw new Error(
        `error posting team from server. status:${response.status}`
      );
    } else showSuccessMsg("team added successfully");
  } catch (err: any) {
    showErrorMsg(err);
  }
}

window.onload = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });

  for (const slider of sliders) {
    slider.addEventListener("input", () => {
      const theBlackLabel: HTMLSpanElement =
        slider.parentElement?.querySelector(".sliderLabel") as HTMLSpanElement;
      theBlackLabel.textContent = slider.value.toString();
      slider.title = slider.value.toString();
    });
  }

  addTeamBtn.addEventListener("click", addTeam);
};

function getMyTeam(): Player[] {
  const res: Player[] = [];
  Object.keys(currentTeam).forEach((key: string) => {
    res.push((currentTeam as any)[key].player);
  });
  return res;
}
