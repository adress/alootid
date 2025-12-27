import { addCopyHistory, getCopyHistory, removeCopyHistory } from "./utils/history";

const listElement = document.querySelector<HTMLUListElement>(".js-history-list");
const emptyElement = document.querySelector<HTMLParagraphElement>(".js-empty-state");

function setEmptyState(isEmpty: boolean): void {
    if (!emptyElement || !listElement) return;
    emptyElement.hidden = !isEmpty;
    listElement.hidden = isEmpty;
}

function renderHistory(): void {
    if (!listElement) return;
    getCopyHistory().then((items) => {
        listElement.innerHTML = "";
        if (items.length === 0) {
            setEmptyState(true);
            return;
        }
        setEmptyState(false);
        items.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.className = "history-item";

            const textSpan = document.createElement("span");
            textSpan.className = "history-text";
            textSpan.textContent = item.text;

            const actions = document.createElement("div");
            actions.className = "history-actions";

            const copyButton = document.createElement("button");
            copyButton.type = "button";
            copyButton.className = "action-button action-copy";
            copyButton.textContent = "Copiar";
            copyButton.addEventListener("click", () => {
                navigator.clipboard.writeText(item.text);
                void addCopyHistory(item.text).then(renderHistory);
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "action-button action-delete";
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => {
                void removeCopyHistory(item.id).then(renderHistory);
            });

            actions.append(copyButton, deleteButton);
            listItem.append(textSpan, actions);
            listElement.append(listItem);
        });
    });
}

document.addEventListener("DOMContentLoaded", renderHistory);
