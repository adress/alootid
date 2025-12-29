const currentVersion = chrome.runtime.getManifest().version;

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== "update") return;

    const previousVersion = details.previousVersion ?? "";
    const changelogUrl = chrome.runtime.getURL(
        `changelog.html?from=${encodeURIComponent(previousVersion)}&to=${encodeURIComponent(currentVersion)}`
    );
    chrome.tabs.create({ url: changelogUrl });
});
