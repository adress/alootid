const colorBeforeCopy = "black";
const colorAfterCopy = "green";


export function copyItemCodeFromSVG(event: Event) {
    const svgElement = event.target as HTMLElement;
    if (svgElement.nodeName !== 'svg') return;

    const texto = svgElement.parentElement?.textContent;
    const textoInterez = texto?.substring(texto.search('ID#') + 4);
    const id = textoInterez?.split(' ')[0];
    navigator.clipboard.writeText(`@alootid +${id}`);

    svgElement.style.fill = colorAfterCopy;
}

export function copyMonsterMapFromSVG(event: Event) {
    const svgElement = event.target as HTMLElement;
    if (svgElement.nodeName !== 'svg') return;

    const mapName = svgElement.parentElement?.childNodes[0].childNodes[0].textContent;
    navigator.clipboard.writeText(`@warp ${mapName}`);

    svgElement.style.fill = colorAfterCopy;
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
    navigator.clipboard.writeText(`@warp ${mapName}`);

    svgElement.style.fill = colorAfterCopy;
}
