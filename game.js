var player1name="";
var player2name="";
var currentplayer="";
var player1wintimes = 0;
var player2wintimes = 0;    
var drawtimes = 0;
var markers=["X", "O"];
var scores=[0,0];
var winValues= [7,56,73,84,146,273,292,448];
var clickedArray=[];
var clickCount=0;
var whoseTurn = 0;
var winner = "";


//prompt playernames and start game
function start(){
	player1name = prompt('Player1, enter your name:');
	player2name = prompt('Player2, enter your name:');
	currentplayer = player1name;
	document.getElementById("player1scoretitle").innerHTML = player1name + " 's score:";
	document.getElementById("player2scoretitle").innerHTML = player2name + " 's score:";
	document.getElementById("currentplayer").innerHTML = currentplayer + " is turn!!!!";
}

//draw board
function play(clickedDiv, points){
	//clickedDiv is DOM object  
	//clickedDiv.attributes["0"] = "";

	if (clickedDiv.innerHTML === '&nbsp;'){
		//fill square with X or O and tracking every step
		trackChangeBoard(clickedDiv);

		//calculate score for each players
		pointCount(points);

		//check who win?
		winCheck(scores[whoseTurn]);

		//analyze result
		if (winner !== ""){
			alert("Winner: " + winner);
			document.getElementById("winner").innerHTML = currentplayer + " WIN!!!!"; 

			if (currentplayer === player1name){
				player1wintimes++;
				document.getElementById("player1score").innerText = player1wintimes;
				currentplayer = player2name;
			}
			else{
				player2wintimes++;
				document.getElementById("player2score").innerText = player2wintimes;
				currentplayer = player1name;
			}
			startNewGame();
		}
		else if (clickCount > 8){
			document.getElementById("winner").innerText = "It is a tie!";
			drawtimes++;
			document.getElementById("drawscore").innerText = drawtimes;
			startNewGame();
		}
		else{
			togglePlayer();
		}

	}
}

//track and change board's elements
function trackChangeBoard(clickedDiv){
	if (clickedDiv.innerHTML === "&nbsp;"){
		clickedArray[clickCount] = clickedDiv;
		clickCount = clickCount + 1;

		//fill square
		if (whoseTurn === 0){
			clickedDiv.innerHTML= "<span>" + markers[0] + "</span>";  //X
		}
		else{
			clickedDiv.innerHTML= "<span>" + markers[1] + "</span>";  //O
		}
	}
}


//turn next player
function togglePlayer(){
	if (whoseTurn === 0) 
		whoseTurn = 1;
	else 
		whoseTurn = 0;

	if (currentplayer === player1name){
		currentplayer = player2name;
	}
	else{
		currentplayer = player1name;
	}

	document.getElementById("currentplayer").innerText = currentplayer + "'s Turn";
}


//count points
function pointCount(userPoints){
	scores[whoseTurn] += userPoints;
}

//win tester
function winCheck(score){
	for (var i = 0; i < winValues.length; i++){
		if ((winValues[i] & score) === winValues[i]){
			//binary bit &operation, only both true is true
			winner = currentplayer;
			break;
		}
	}

}

//reset game
function startNewGame(){
	winner="";
	scores=[0,0];
	clickCount = 0;
	whoseTurn = 0;
	for (var i = 0; i < clickedArray.length; i++){
		clickedArray[i].innerHTML = "&nbsp;";    //clear all elements in board
	}

	document.getElementById("currentplayer").innerHTML = currentplayer + " 's turn!!";

}

