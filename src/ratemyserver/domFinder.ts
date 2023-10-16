
/**
 * find the td of table where the name and code of the item is
 * @param itemtype string param posible values: 'renwal', 'pre-renewal'
 * @returns return the headers of the table of the items
 */
export const tdItemsHeaders = (): NodeListOf<Element> => {
    return document.querySelectorAll('td[colspan="2"].bborder');
}

export const mapsChildNodeList = (): NodeListOf<ChildNode>[] => {
    const mapas: NodeListOf<ChildNode>[] = [];
    const mapContainer = document.querySelectorAll('div.mob_spawn.gen_m')[0];
    if (!mapContainer) { return mapas; }
    mapas.push(mapContainer.childNodes);
    return mapas;
}

export function vendorTrElementNodeList(): NodeListOf<Element> {
    return document.querySelectorAll('#npc_search table tbody tr');
}

