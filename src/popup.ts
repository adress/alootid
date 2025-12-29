import { clearCopyHistory, getCopyHistory, removeCopyHistory } from "./utils/history";

const listElement = document.querySelector<HTMLUListElement>(".js-history-list");
const emptyElement = document.querySelector<HTMLParagraphElement>(".js-empty-state");
const clearButton = document.querySelector<HTMLButtonElement>(".js-clear-history");
const prevPageButton = document.querySelector<HTMLButtonElement>(".js-prev-page");
const nextPageButton = document.querySelector<HTMLButtonElement>(".js-next-page");
const pageInfo = document.querySelector<HTMLSpanElement>(".js-page-info");

const PAGE_SIZE = 6;
let currentPage = 1;
let cachedHistory = [] as Awaited<ReturnType<typeof getCopyHistory>>;

function setEmptyState(isEmpty: boolean): void {
    if (!emptyElement || !listElement) return;
    emptyElement.hidden = !isEmpty;
    listElement.hidden = isEmpty;
}

function updatePagination(totalItems: number): void {
    if (!prevPageButton || !nextPageButton || !pageInfo) return;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = currentPage >= totalPages;
    const shouldHide = totalItems === 0 || totalPages === 1;
    prevPageButton.parentElement?.toggleAttribute("hidden", shouldHide);
}

function renderHistoryPage(items: Awaited<ReturnType<typeof getCopyHistory>>): void {
    if (!listElement) return;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = items.slice(startIndex, startIndex + PAGE_SIZE);
    listElement.innerHTML = "";
    pageItems.forEach((item) => {
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
        copyButton.textContent = "Copy";
        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(item.text);
            listItem.classList.remove("is-copied");
            copyButton.classList.remove("is-copied");
            const originalLabel = "Copy";
            const copiedLabel = "Copied";
            copyButton.textContent = copiedLabel;
            listItem.classList.add("is-copied");
            copyButton.classList.add("is-copied");
            window.setTimeout(() => {
                copyButton.textContent = originalLabel;
                listItem.classList.remove("is-copied");
                copyButton.classList.remove("is-copied");
            }, 1500);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "action-button action-delete";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            listItem.classList.add("is-removing");
            window.setTimeout(() => {
                void removeCopyHistory(item.id).then(renderHistory);
            }, 220);
        });

        actions.append(copyButton, deleteButton);
        listItem.append(textSpan, actions);
        listElement.append(listItem);
    });
}

function renderHistory(): void {
    if (!listElement) return;
    getCopyHistory().then((items) => {
        cachedHistory = items;
        listElement.innerHTML = "";
        if (items.length === 0) {
            setEmptyState(true);
            if (clearButton) clearButton.disabled = true;
            updatePagination(0);
            return;
        }
        setEmptyState(false);
        if (clearButton) clearButton.disabled = false;
        updatePagination(items.length);
        renderHistoryPage(items);
    });
}

function updatePage(delta: number): void {
    const totalPages = Math.max(1, Math.ceil(cachedHistory.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(currentPage + delta, 1), totalPages);
    updatePagination(cachedHistory.length);
    renderHistoryPage(cachedHistory);
}

document.addEventListener("DOMContentLoaded", () => {
    clearButton?.addEventListener("click", () => {
        currentPage = 1;
        void clearCopyHistory().then(renderHistory);
    });
    prevPageButton?.addEventListener("click", () => updatePage(-1));
    nextPageButton?.addEventListener("click", () => updatePage(1));
    renderHistory();
});
