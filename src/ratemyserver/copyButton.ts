import { findIdNameItem } from "../utils/idFinder";
import { addCopyHistory } from "../utils/history";

const colorBeforeCopy = "black";
const colorAfterCopy = "green";
const timeToReturnColor = 3000;


export function copyItemCodeFromSVG(event: Event) {
    const svgElement = event.target as HTMLElement;
    if (svgElement.nodeName !== 'svg') return;

    const texto = svgElement.parentElement?.textContent ?? "";
    const id = findIdNameItem(texto);
    const copyText = `@alootid +${id}`;
    navigator.clipboard.writeText(copyText);
    void addCopyHistory(copyText);
    svgElement.style.fill = colorAfterCopy;

    setTimeout(() => {
        svgElement.style.fill = colorBeforeCopy;
    }, timeToReturnColor);
}

export function copyMonsterMapFromSVG(event: Event) {
    const svgElement = event.target as HTMLElement;
    if (svgElement.nodeName !== 'svg') return;

    const mapName = svgElement.parentElement?.childNodes[0].childNodes[0].textContent;
    const copyText = `@warp ${mapName}`;
    navigator.clipboard.writeText(copyText);
    void addCopyHistory(copyText);

    svgElement.style.fill = colorAfterCopy;

    setTimeout(() => {
        svgElement.style.fill = colorBeforeCopy;
    }, timeToReturnColor);
}


export function copyVendorMapFromSVG(event: Event) {
    const svgElement = event.target as HTMLElement;
    if (svgElement.nodeName !== 'svg') return;

    const mapName = svgElement
        .parentElement
        ?.childNodes[0]
        .textContent
        ?.replace('(', '')
        ?.replace(')', '')
        ?.replace(',', '');
    const copyText = `@warp ${mapName}`;
    navigator.clipboard.writeText(copyText);
    void addCopyHistory(copyText);

    svgElement.style.fill = colorAfterCopy;

    setTimeout(() => {
        svgElement.style.fill = colorBeforeCopy;
    }, timeToReturnColor);
}
