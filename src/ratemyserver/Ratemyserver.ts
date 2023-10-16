import { createSvgIconCopy } from "../utils/utils";

import {
    copyItemCodeFromSVG,
    copyMonsterMapFromSVG,
    copyVendorMapFromSVG
} from "./copyButton";

import {
    mapsChildNodeList,
    tdItemsHeaders,
    vendorTrElementNodeList
} from "./domFinder";


class RateMyServer {

    copyItems(): void {
        const tdItemsHeadersList = tdItemsHeaders();
        tdItemsHeadersList.forEach((td) => {
            const svgElement = createSvgIconCopy();
            svgElement.addEventListener('click', copyItemCodeFromSVG);
            (td as any).childNodes[1].childNodes[3].appendChild(svgElement);
        });
    }

    copyMonsterMap(): void {
        const mapas = mapsChildNodeList();
        mapas.forEach((maps: NodeListOf<ChildNode>) => {
            maps.forEach(map => {
                if (map.nodeName == 'B') { return; }
                const svgElement = createSvgIconCopy();
                svgElement.addEventListener('click', copyMonsterMapFromSVG);
                map.insertBefore(svgElement, map.childNodes[1]);
            });
        });
    }

    copyItemsVendor() {
        const trs = vendorTrElementNodeList();
        trs.forEach((tr: any) => {
            const numberRow = tr.childNodes[1]?.textContent?.trim();
            if (numberRow) {
                const svgElement = createSvgIconCopy();
                svgElement.addEventListener('click', copyVendorMapFromSVG);
                tr.childNodes[5].append(svgElement);
            }
        });
    }
}

export default RateMyServer;