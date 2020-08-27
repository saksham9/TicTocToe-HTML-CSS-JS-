let turn=0;
let players=[];
let board=[];
//let dimension=parseInt(document.getElementById("dimensions").value);
//let dimension=parseInt(dimension_el.value);

let gameOver = false;
const isEmpty=(value)=> !value || !value.trim();



const startgame=()=>{
    let input1=document.getElementById("p1");
    let input2=document.getElementById("p2");
    let dim=document.getElementById("dimensions");
    let player1=input1.value;
    let player2=input2.value;
    if(isEmpty(player1) || isEmpty(player2)){
        alert("Please Enter Player Name");
        return;
    }
    // input1.setAttribute("disabled",true);
    // input2.setAttribute("disabled",true);
    // dim.setAttribute("disabled",true);
    window.dimension=parseInt(dim.value);
    let div=document.getElementById("form");
    div.classList.add("hide");
    let side=document.getElementById("side-content");
    side.classList.add("hide");
    let section=document.getElementById("grid-holder");
    section.classList.remove("hide");
    let start=document.getElementById("start");
    start.classList.add("hide");
    let restart =document.getElementById("restart");
    restart.classList.remove("hide");
    //console.log(dimension);
    //console.log(dim.value);
    grid_create();
    //console.log(board);
    players.push(player1);
    players.push(player2);
    document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
}



const grid_create=()=>{
    const grid_container=document.getElementById("grid-container");
    for(let i=0;i<dimension;i++){
        const row=document.createElement("div");
        row.className="row";
        let array=[];
        for(let j=0;j<dimension;j++){
            array.push("");
            const cell=document.createElement("div");
            cell.className="cell";
            cell.id=String(i)+String(j);
            //cell.setAttribute("onclick",`cellpress(${event})`);
            cell.addEventListener("click",cellpress);
            row.appendChild(cell);
        }
        grid_container.appendChild(row);
        board.push(array);
    }
    //console.log(grid_container);
    
}


const cellpress=(event)=>{
    //console.log("ahcoics");
    let el=event.target;
    if(el.innerHTML !=="" || gameOver){
        //alert("Drawn");
        return;
    }
    
    let id=el.id;
    let i=parseInt(id[0]);
    let j=parseInt(id[1]);
    board[i][j]= turn%2===0 ? "X":"O";
    el.innerHTML=board[i][j];
    turn++;
    document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
    if (calculateWinner()) {
        gameOver = true;
        alert(players[turn % 2] + " Won");
        return;
    }
    if (turn === dimension*dimension) {
        alert("Game is drawn");
        return;
    }



}
const calculateWinner =() =>{
    //if moves is less than dimension return true
    if(turn < dimension+1){
        return false;
    }
    let count=0;

    /*check every row*/
    for(let i=0;i<dimension;i++){
        let first=board[i][0];
        if(first!=="")
        {
            count++;
            for(let j=1;j<dimension;j++){
                if(first===board[i][j])
                count++;
            }
            if(count===dimension){
                return true;
            }
            count=0;
        }
    }

    /*Check every column*/
    count=0;
    for(let i=0;i<dimension;i++){
        let first=board[0][i];
        if(first!=="")
        {
            count++;
            for(let j=1;j<dimension;j++){
                if(first===board[j][i])
                count++;
            }
            if(count===dimension){
                return true;
            }
            count=0;
        }
    }

    /*Check both Diagonal */
    //First diagonal
    count=1;
    if(board[0][0]!==""){
        for(let i=1;i<dimension;i++){
            if(board[i][i]===board[0][0]){
                count++;
            }
        }
        if(count===dimension)
        return true;
    }
    //Second diagonal
    count=1;
    if(board[dimension-1][0]!==""){
        for(let i=1;i<dimension;i++){
            if(board[dimension-1-i][i]===board[0][0]){
                count++;
            }
        }
        if(count===dimension)
        return true;
    }
    return false;

}

/*const calculateWinner = () => {
    if (turn < 4) {
      return false;
    }
  
    const winnerCombinations = [
      ["00", "01", "02"],
      ["10", "11", "12"],
      ["20", "21", "22"],
      ["00", "10", "20"],
      ["01", "11", "21"],
      ["02", "12", "22"],
      ["00", "11", "22"],
      ["20", "11", "02"]
    ];
  
    //a[0]  a['0']
    for (let i = 0; i < winnerCombinations.length; i++) {
      let val1 = winnerCombinations[i][0]; //00
      let val2 = winnerCombinations[i][1]; //10
      let val3 = winnerCombinations[i][2]; //20
  
      if (
        board[val1[0]][val1[1]] !== "" &&
        board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
        board[val1[0]][val1[1]] === board[val3[0]][val3[1]]
      ) {
        return true;
      }
    }
    return false;
};*/
