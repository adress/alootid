export const findIdNameItem = (itemText: string): string => {
    let palabraEnParentesis = "";
    const resultado = itemText.match(/\((.*?)\)/);
    if (resultado && resultado[1]) {
        palabraEnParentesis = resultado[1];
    }
    return palabraEnParentesis;
}

export const findIdItem = (itemText: string): string => {
    const textoInterez = itemText?.substring(itemText.search('ID#') + 4);
    const id = textoInterez?.split(' ')[0];
    return id;
}
