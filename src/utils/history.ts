const HISTORY_KEY = 'copyHistory';
const MAX_HISTORY_ITEMS = 50;

export type CopyHistoryItem = {
    id: string;
    text: string;
    createdAt: number;
};

function readHistory(): Promise<CopyHistoryItem[]> {
    return new Promise((resolve) => {
        chrome.storage.local.get([HISTORY_KEY], (result) => {
            resolve((result[HISTORY_KEY] as CopyHistoryItem[]) ?? []);
        });
    });
}

function writeHistory(items: CopyHistoryItem[]): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [HISTORY_KEY]: items }, () => resolve());
    });
}

export async function addCopyHistory(text: string): Promise<void> {
    const history = await readHistory();
    const filtered = history.filter((item) => item.text !== text);
    const newItem: CopyHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text,
        createdAt: Date.now()
    };
    const nextHistory = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    await writeHistory(nextHistory);
}

export async function removeCopyHistory(id: string): Promise<void> {
    const history = await readHistory();
    const nextHistory = history.filter((item) => item.id !== id);
    await writeHistory(nextHistory);
}

export async function getCopyHistory(): Promise<CopyHistoryItem[]> {
    return await readHistory();
}
