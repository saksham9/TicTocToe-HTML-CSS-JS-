const grid_container=document.getElementById("grid-container");
for(let i=0;i<3;i++){
    const row=document.createElement("div");
    row.className="row";
    for(let j=0;j<3;j++){
        const cell=document.createElement("div");
        cell.className="cell";
        cell.id=String(i)+String(j);
        cell.setAttribute("onclick",`cellpress(${this})`);
        row.appendChild(cell);
    }
    grid_container.appendChild(row);
}
console.log(grid_container);