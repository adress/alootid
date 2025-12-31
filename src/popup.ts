import { clearCopyHistory, getCopyHistory, removeCopyHistory } from "./utils/history";

const listElement = document.querySelector<HTMLUListElement>(".js-history-list");
const emptyElement = document.querySelector<HTMLParagraphElement>(".js-empty-state");
const clearButton = document.querySelector<HTMLButtonElement>(".js-clear-history");
const prevPageButton = document.querySelector<HTMLButtonElement>(".js-prev-page");
const nextPageButton = document.querySelector<HTMLButtonElement>(".js-next-page");
const pageInfo = document.querySelector<HTMLSpanElement>(".js-page-info");

const PAGE_SIZE = 5;
let currentPage = 1;
let cachedHistory = [] as Awaited<ReturnType<typeof getCopyHistory>>;

function iconSvg(name: "copy" | "trash"): string {
    if (name === "copy") {
        return `
            <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
                <path
                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </svg>
        `;
    }

    return `
        <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M3 6h18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M8 6V4h8v2M6 6l1 14h10l1-14"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M10 11v6M14 11v6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    `;
}

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
        copyButton.innerHTML = `${iconSvg("copy")}Copy`;
        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(item.text);
            listItem.classList.remove("is-copied");
            copyButton.classList.remove("is-copied");
            const originalLabel = "Copy";
            const copiedLabel = "Copied";
            copyButton.innerHTML = `${iconSvg("copy")}${copiedLabel}`;
            listItem.classList.add("is-copied");
            copyButton.classList.add("is-copied");
            window.setTimeout(() => {
                copyButton.innerHTML = `${iconSvg("copy")}${originalLabel}`;
                listItem.classList.remove("is-copied");
                copyButton.classList.remove("is-copied");
            }, 1500);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "action-button action-delete";
        deleteButton.innerHTML = `${iconSvg("trash")}Delete`;
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
