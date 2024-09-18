var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var Status;
(function (Status) {
    Status["available"] = "available";
    Status["inRepair"] = "inRepair";
    Status["unavailable"] = "unavailable";
})(Status || (Status = {}));
export class ScooterCrudManager {
    static create(scooter) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: "POST",
                body: JSON.stringify(scooter),
                headers: { "Content-type": "application/json" },
            };
            try {
                const response = yield fetch(ScooterCrudManager.BASE_URL, options);
                if (!response.ok)
                    throw new Error("Failed to create scooter!" + response.statusText);
                const newScooter = yield response.json();
                return newScooter;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(ScooterCrudManager.BASE_URL);
                if (!response.ok)
                    throw new Error("failed to get all scooters! " + response.statusText);
                const allScooters = yield response.json();
                return allScooters;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static update(scooter) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: "PUT",
                body: JSON.stringify(scooter),
                headers: { "Content-type": "application/json" },
            };
            try {
                const response = yield fetch(ScooterCrudManager.BASE_URL + `/${scooter.id}`, options);
                if (!response.ok)
                    throw new Error("failed to update scooter! " + response.statusText);
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: "DELETE",
            };
            try {
                const response = yield fetch(ScooterCrudManager.BASE_URL + `/${id}`, options);
                if (!response.ok)
                    throw new Error("failed to delete scooter! " + response.statusText);
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
ScooterCrudManager.BASE_URL = "https://66e9773e87e4176094498ad7.mockapi.io/scooter";
export function createScooterElement(scooter, tbody, editFunc, removeFunc) {
    const trElement = document.createElement("tr");
    trElement.id = scooter.id;
    trElement.append(createTdElement(scooter.serialNumber));
    trElement.append(createTdElement(scooter.model));
    trElement.append(createTdElement(scooter.batteryLevel + "%"));
    trElement.append(createTdElement(scooter.imageUrl));
    trElement.append(createTdElement(scooter.color));
    trElement.append(createTdElement(scooter.status));
    trElement.append(createActionButtons(scooter.id, editFunc, removeFunc));
    tbody.append(trElement);
}
function createActionButtons(scooterId, editFunc, removeFunc) {
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
    const buttonsWrapperDiv = document.createElement("div");
    buttonsWrapperDiv.classList.add("buttonsWrapper");
    buttonsWrapperDiv.append(editBtn, removeBtn);
    td.append(buttonsWrapperDiv);
    return td;
}
function createTdElement(textContent) {
    const td = document.createElement("td");
    td.textContent = textContent.toString();
    return td;
}
function removeElement(id) {
    var _a;
    const elem = document.getElementById(id);
    return (_a = elem === null || elem === void 0 ? void 0 : elem.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(elem);
}
