/*
Brayden Lappies
10/09/21

Michael Raffel
10/20/21

Battleship Prototype that utilizes simple html commans to
showcase the logic of the game before it is implemented
properly via css/html.
Supports local play. Maybe...
*/

// representation of the spaces on the board, columns labled A-J and rows
// labelled 1-10
function GameBoard() { 
    board = [
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    ];
}

// ship constructor
function ship(name, size, hp) {
    this.name = name;
    this.size = size;
    this.hp = hp;
}

// displays a given board, for debugging
function displayBoard(shipBoard){
    window.alert(shipBoard[0] + shipBoard[1] + shipBoard[2] + shipBoard[3] +
        shipBoard[4] + shipBoard[5] + shipBoard[6] + 
        shipBoard[7] + shipBoard[8] + shipBoard[9]);
}

//checks to see if either player has won, and ended, the game,
//signified by one player being reduced to 0 ships remaining
function gameOverCheck() {
    //checks if player 1 has lost
    if (p1Ships == 0) {
        showWinner(playerTurn);
        isGameOver = true;
    }
    else if (p2Ships == 0) {
        showWinner(playerTurn);
        isGameOver = true;
    }
    else {
        continue;
    }
}

// assigns a space on the board as part of a ship
function assignSpace(row, column, ship, shipBoard) {
    if (shipBoard[row][column] != " ")
    {
        shipBoard[row][column] = ship;
        return true;
    }
    else
    {
        window.alert("Space already occupied");
        return false;
    }
}

// potentially change name? kind of confusing between this and shipPlace
function placeShips() {
    /* Code goes here
    The idea is to allow the player to drag and drop a
    ship sprite onto their board and read that into the
    internal logic. After all 5 ships are placed by both
    players proceed to the main game loop */
    //temporarily using window prompts
    window.alert("Player 1: Place your ships");
    shipPlace(p1ShipsBoard);
    
    window.alert("Player 2: Place your ships");
    shipPlace(p2ShipsBoard);
}

// change name?
function shipPlace(shipBoard) {
    window.alert("Please pick two continous spots for " + 
        "your small ship");
    // This is where the GUI comes into play for selecting the board spots

    window.alert("Please pick three continuous spots for " +
        "your submarine");
    // Same as above

    //Repeat for the destroyer, battleship, and aircraft carrier.
}

function attack() {
    /* code goes here for selecting a spot on the grid to attack. 
    The selection methodology is to click a spot on the player's
    shots board.
    If the attack hits a red marker is placed in possition,
    otherwise a white marker is placed.
    */
}

//Game loop - main code
//Phase 1, Initialization
var p1ShipsBoard = new GameBoard();
var p1Shots = new GameBoard();
var p1Ships = 5;
var p2ShipsBoard = new GameBoard();
var p2Shots = new GameBoard();
var p2Ships = 5;

// stores which player's turn it is (alternates between 1 and 2)
var playerTurn = "1";
// ends the game loop when isGameOver = true
var isGameOver = false;
// the game is played again if isPlayingAgain = true
var isPlayingAgain;
var singleplayer = false;
var samePlayer = false;

//Place ships would go here when implemented

while (!isGameOver)
{
    //take player attack input
    
    //process

    //update state

    //draw world
}

//destroy game