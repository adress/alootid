function copyItemId(event: Event) {
  const svgElement = event.target as HTMLElement;
  if (svgElement.nodeName !== 'svg') return;

  const texto = svgElement.parentElement?.textContent;
  const textoInterez = texto?.substring(texto.search('ID#') + 4);
  const id = textoInterez?.split(' ')[0];
  navigator.clipboard.writeText(`@alootid +${id}`);

  svgElement.style.fill = "green";
}

function copyMonsterMap(event: Event) {
  const svgElement = event.target as HTMLElement;
  if (svgElement.nodeName !== 'svg') return;

  const mapName = svgElement.parentElement?.childNodes[0].childNodes[0].textContent;
  navigator.clipboard.writeText(`@warp ${mapName}`);

  svgElement.style.fill = "green";
}

function createSvg() {
  //create svg copy icon
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('viewBox', '0 0 448 512');
  svgElement.setAttribute('width', '15px');

  svgElement.style.cursor = "pointer";
  svgElement.style.marginLeft = "5px";
  svgElement.style.marginRight = "5px";

  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathElement.setAttribute('d', 'M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z');
  svgElement.appendChild(pathElement);
  return svgElement;
}



const nameRows = document.querySelectorAll('[title="search item in renewal"]');
nameRows.forEach((row: any) => {
  const nodo: NodeListOf<ChildNode> = row.parentElement.parentElement.childNodes[3].childNodes;
  const svgElement = createSvg();
  svgElement.addEventListener('click', copyItemId);
  nodo[0].parentElement?.append(svgElement);
});


const tableTr = document.querySelectorAll('.filled_header_mob')[0];
const tableBody = tableTr.parentElement;
const mapContainer = tableBody?.childNodes[1].childNodes[2].childNodes[0]!;
const mapas = mapContainer.childNodes;
mapas.forEach((map: ChildNode) => {
  const svgElement = createSvg();
  svgElement.addEventListener('click', copyMonsterMap);
  map.insertBefore(svgElement, map.childNodes[1]);
});