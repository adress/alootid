
/**
 * find the td of table where the name and code of the item is
 * @param itemtype string param posible values: 'renwal', 'pre-renewal'
 * @returns return the headers of the table of the items
 */
export const tdItemsHeaders = (itemtype: string): NodeList[] => {
    if (itemtype !== 'renewal' && itemtype !== 'pre-renewal')
        throw new Error('itemtype must be renewal or pre-renewal');

    //invert the itemtype to find the correct table
    itemtype = itemtype === 'renewal' ? 'pre-renewal' : 'renewal';

    let headers: NodeList[] = [];
    const nameRows = document.querySelectorAll(`[title="search item in ${itemtype}"]`);
    nameRows.forEach((row: any) => {
        const nodo: NodeList = row.
            parentElement.
            parentElement.
            childNodes[3];
        headers.push(nodo);
    });
    return headers;
}

export const mapsChildNodeList = (): NodeListOf<ChildNode>[] => {
    const tablesTr = document.querySelectorAll('.filled_header_mob');
    const mapas: NodeListOf<ChildNode>[] = [];
    tablesTr.forEach(tableTr => {
        const tableBody = tableTr?.parentElement;
        const mapContainer = tableBody
            ?.childNodes[1]
            ?.childNodes[2]
            ?.childNodes[0];
        if (mapContainer) {
            mapas.push(mapContainer.childNodes);
        }
    });
    return mapas;
}

export function vendorTrElementNodeList(): NodeListOf<Element> {
    return document.querySelectorAll('#npc_search table tbody tr');
}

