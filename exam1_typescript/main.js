"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("form");
const tableTbody = document.querySelector("tbody");
const addTeamBtn = document.getElementById("addTeam");
const sliders = form.getElementsByTagName("input");
const currentTeam = {
    PG: { el: document.getElementById("PG") },
    SG: { el: document.getElementById("SG") },
    SF: { el: document.getElementById("SF") },
    PF: { el: document.getElementById("PF") },
    C: { el: document.getElementById("C") },
};
let timer;
// search for matching players
function submitForm() {
    const searchParams = extractDataFromForm();
    postSearch(searchParams);
}
// gets a new list of players and refills the table with them
function reloadTable(playersList) {
    clearTable();
    playersList.forEach((player) => {
        addPlayerRow(player);
    });
}
// clears tbody trs of table
function clearTable() {
    tableTbody.replaceChildren();
}
// adds a tr in body with player info
function addPlayerRow(player) {
    const tr = document.createElement("tr");
    const playerNameTd = document.createElement("td");
    const positionTd = document.createElement("td");
    const twoPercentTd = document.createElement("td");
    const threePercentTd = document.createElement("td");
    const pointsTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    playerNameTd.textContent = player.playerName;
    positionTd.textContent = player.position;
    twoPercentTd.textContent = player.twoPercent.toString() + "%";
    threePercentTd.textContent = player.threePercent.toString() + "%";
    pointsTd.textContent = player.points.toString();
    const button = document.createElement("button");
    button.textContent = `add ${player.playerName.split(" ")[0]} to current team`;
    actionsTd.appendChild(button);
    setAddButtonEL(button, player);
    tr.append(playerNameTd, positionTd, twoPercentTd, threePercentTd, pointsTd, actionsTd);
    tableTbody.appendChild(tr);
}
// sets the event listener for individual button of player row
function setAddButtonEL(button, player) {
    button.addEventListener("click", () => {
        const teamMemberElement = currentTeam[player.position].el; //document.getElementById(`${player.position}`) as HTMLDivElement;
        clearPChildren(teamMemberElement);
        teamMemberElement.append(...createPlayerPElements(player));
        currentTeam[player.position].player = player;
    });
}
// creates the paragraph elements for the current team view
function createPlayerPElements(player) {
    const playerNameP = document.createElement("p");
    const threePercentsP = document.createElement("p");
    const twoPercentsP = document.createElement("p");
    const pointsP = document.createElement("p");
    playerNameP.textContent = player.playerName;
    threePercentsP.textContent = "Three Percents:" + player.threePercent + " %";
    twoPercentsP.textContent = "Two Percents:" + player.twoPercent + " %";
    pointsP.textContent = "Points:" + player.points;
    return [playerNameP, threePercentsP, twoPercentsP, pointsP];
}
// a general function that remove all paragraph elements from a parent element
function clearPChildren(parent) {
    const title = parent.firstElementChild;
    parent.replaceChildren(title);
}
// fetches players data with post request
function postSearch(searchParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";
        const options = {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(searchParams),
        };
        try {
            const response = yield fetch(BASE_URL, options);
            if (!response.ok) {
                throw new Error(`error fetching data from server. status:${response.status}`);
            }
            const playersList = (yield response.json());
            if (playersList.length === 0)
                showErrorMsg("No players that match the parameters were found.");
            reloadTable(playersList);
        }
        catch (err) {
            console.error(err);
            showErrorMsg(err);
        }
    });
}
// creates a player object with form input values
function extractDataFromForm() {
    const formValues = {};
    formValues.position = form["position"].value;
    formValues.twoPercent = +form["twoPercent"].value;
    formValues.threePercent = +form["threePercent"].value;
    formValues.points = +form["points"].value;
    return formValues;
}
// modal for showing errors with timer
function showErrorMsg(msg) {
    const msgDivElement = document.createElement("div");
    msgDivElement.textContent = msg;
    msgDivElement.classList.add("errorDiv");
    document.body.append(msgDivElement);
    timer = setTimeout(() => {
        msgDivElement.remove();
    }, 3000);
}
// modal for showing success messages with timer
function showSuccessMsg(msg) {
    const msgDivElement = document.createElement("div");
    msgDivElement.textContent = msg;
    msgDivElement.classList.add("successDiv");
    document.body.append(msgDivElement);
    timer = setTimeout(() => {
        msgDivElement.remove();
    }, 3000);
}
// adding team with post request
function addTeam() {
    return __awaiter(this, void 0, void 0, function* () {
        const BASE_URL = "https://nbaserver-q21u.onrender.com/api/AddTeam";
        const players = getMyTeam();
        const options = {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(players),
        };
        try {
            if (players.some((p) => p == null)) {
                throw new Error("Team is not full.");
            }
            const response = yield fetch(BASE_URL, options);
            if (!response.ok) {
                throw new Error(`error posting team from server. status:${response.status}`);
            }
            else
                showSuccessMsg("team added successfully");
        }
        catch (err) {
            showErrorMsg(err);
        }
    });
}
// returns a list of players in the current team
function getMyTeam() {
    const res = [];
    Object.keys(currentTeam).forEach((key) => {
        res.push(currentTeam[key].player);
    });
    return res;
}
// setting things up when page reloads
window.onload = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        submitForm();
    });
    for (const slider of sliders) {
        slider.addEventListener("input", () => {
            var _a;
            const theBlackLabel = (_a = slider.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".sliderLabel");
            theBlackLabel.textContent = slider.value.toString();
            slider.title = slider.value.toString();
        });
    }
    addTeamBtn.addEventListener("click", addTeam);
};
