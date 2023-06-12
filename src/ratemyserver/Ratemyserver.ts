import { createSvgIconCopy } from "../utils/utils";
import { tdItemsHeaders } from './domFinder';

import {
    copyItemCodeFromSVG,
    copyMonsterMapFromSVG,
    copyVendorMapFromSVG
} from "./copyButton";

import {
    mapsChildNodeList,
    vendorTrElementNodeList
} from "./domFinder";


class RateMyServer {

    copyItems(): void {
        this.copyItemsUtil('pre-renewal');
    }

    copyItemsRenewal(): void {
        this.copyItemsUtil('renewal');
    }

    protected copyItemsUtil(itemtype: string): void {
        const tdItemsHeadersList = tdItemsHeaders(itemtype);
        tdItemsHeadersList.forEach((td: NodeList) => {
            const svgElement = createSvgIconCopy();
            svgElement.addEventListener('click', copyItemCodeFromSVG);
            (td as any).appendChild(svgElement);
        });
    }

    copyMonsterMap(): void {
        const mapas = mapsChildNodeList();
        mapas.forEach((map: ChildNode) => {
            const svgElement = createSvgIconCopy();
            svgElement.addEventListener('click', copyMonsterMapFromSVG);
            map.insertBefore(svgElement, map.childNodes[1]);
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