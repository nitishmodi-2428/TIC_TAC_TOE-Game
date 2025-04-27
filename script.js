let boxes = document.querySelectorAll('.box');
let reset_button = document.querySelector('#reset_button');
let new_button = document.querySelector('#new_button');
let message_container = document.querySelector('.message_container');
let message = document.querySelector('#message');



let turn0 = true ;
const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

const resetGame = () => {
    turn0 = true;
    let allFilled = false;
    if(message_container.style.display !== "block" || allFilled){
        enableBox();
        message_container.style.display = "none";
    }
    
}
const newGame = () => {
    let allFilled = true;
    if(message_container.style.display === "block" || allFilled){
        enableBox();
        message_container.style.display = "none";
    }
}

let disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
let enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText = "0";
            turn0 = false;
            box.style.color = "rgb(0,0,250)"
        }
        else {
            box.innerText = "X";
            turn0 = true;
            box.style.color = "rgb(0,0,0)"
        }
        box.disabled = true;
        checkWinner();
    });
});
const checkWinner = () => {
    let allFilled = true; 
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return; 
            }
            
        }
    }
    for (let box of boxes) {
        if (box.innerText.trim() === "") {
            allFilled = false; 
            break;
        }
    }
    if (allFilled) { 
        showDraw();
    }
}

const showWinner = (winner) =>{
    message_container.style.display = 'block';
    message.innerText = `Congratulations, Winner is ${winner}`;
disabledBoxes();
}
const showDraw = () => { 
    message_container.style.display = 'block';
    message.innerText = "Match Drawn!";  
    disabledBoxes();  
}

reset_button.addEventListener("click" , resetGame);
new_button.addEventListener("click" , newGame); 
