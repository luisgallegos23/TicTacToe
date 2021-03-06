var player = 1;
var board = [ //arr used to represent the current board
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-'],
];

//Hides the board upon the window loading 
window.onload = function  hideItems (){
    document.getElementById('grid-container').style.display = "none";
    document.getElementById('reset-button').style.display = "none";
    setUpWindow();
}

//hides the instructions and shows the board 
function showBoard(){
    document.getElementById('insturctions').style.display = "none";
    document.getElementById('play-button').style.display = "none";
    document.getElementById('grid-container').style.display = "";
    document.getElementById('reset-button').style.display = "block";
}

//Makes the change to the inner text of the grid
function changeValue (id) {
    if(player == 1 && validClick(id) ){
        document.getElementById(id).innerHTML = "X";
        updateBoard(id,'X');
        findWinner();
        player = 2; //changes the current player
    }else if(player == 2 && validClick(id) ){
        document.getElementById(id).innerHTML = "O";
        updateBoard(id,'O');
        findWinner();
        player = 1; //changes player
    }
}

//Checks wheather the move is valid or not
//prevents the symbole from being changed after one click
function validClick(id){
    var valid = document.getElementById(id).innerHTML;
    if(valid != " - "){ //inner text 
        return false;
    }else{
        return true;
    }
}

//updates the array object
function updateBoard (id, gridsymbol) {
    switch (id) {
    case 'b1': 
        board[0][0] = gridsymbol;
        break;
    case 'b2': 
        board[0][1] = gridsymbol;
        break; 
    case 'b3': 
        board[0][2] = gridsymbol;
        break;
    case 'b4':
        board[1][0] = gridsymbol;
        break;
    case 'b5':
        board[1][1] = gridsymbol;
        break;
    case 'b6':
        board[1][2] = gridsymbol;
        break;
    case 'b7':
        board[2][0] = gridsymbol;
        break;
    case 'b8':
        board[2][1] = gridsymbol;
        break;
    case 'b9':
        board[2][2] = gridsymbol;
        break;       
               
}
}

//if there is a winner the game will end and states which player one
function findWinner () {
    var gameOver = isWinner();
    if(gameOver){
        document.getElementById("Winner").style.display = "";
        document.getElementById("playerwinner").innerHTML = `WINNER: Player ${player}`;
        document.getElementById("playerwinner").style.display = ""; 
        document.getElementById("play-again").style.display = "";      
    }else if(catWin()){
        document.getElementById("Winner").style.display = "";
        document.getElementById("playerwinner").innerHTML = `NO WINNER!`;
        document.getElementById("playerwinner").style.display = ""; 
        document.getElementById("play-again").style.display = "";  
    }
}

// Checks if a player has connected three in a row to win the game
function isWinner () {
    //checks if 3 connected in rows
    for(let i = 0; i < board.length; i++){
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] != '-'){
            return true;
        }
    }
    //checks if 3 connected in columns
    for(let i = 0; i < board.length; i++){
        if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] != '-'){
            return true;
        }
    }
    //checks if 3 connected diagonal right
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] != '-'){
        return true;
    }
    //checks if 3 connected diagonal left
    if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] != '-'){
        return true;
    }
    return false;
}

//resets both the game board and array board
function resetBoard () {
    for(var x = 0; x < board.length; x++){ //changes the board arr back to empty
        for(var y = 0; y < board.length; y++){
            board[x][y] = '-';
        }
    }

    var grids =  document.getElementsByClassName( 'grid' ); //changes all the grid coordinates back to ' - '
    [].slice.call( grids ).forEach(function ( div ) {
        div.innerHTML = ' - ';
    });
}

//method used to set up the front-end to play again
function setUpWindow () {
    document.getElementById('Winner').style.display = "none";
    document.getElementById("playerwinner").style.display = "none";
    document.getElementById("play-again").style.display = "none";
}

//Restores the board in order to play again
function playGameAgain () {
    resetBoard();
    setUpWindow();
    player = 1;
}

//Checks if board is full and no moves left
function catWin (){
    var count = 0;
    for(var x = 0; x < board.length; x++){ //changes the board arr back to empty
        for(var y = 0; y < board.length; y++){
            if(board[x][y] !== '-'){
                count ++;
            }else{
                break;
            }
        }
    }
    if (count === 9){
        return true;
    }
    return false;
}