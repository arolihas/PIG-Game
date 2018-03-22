/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

-Two 6s in a row sets score to 0 and switches player
-input field for winning score
-two die, at least one 1 to lose current score
*/

var scores, roundScore, activePlayer, dice, winScore, gamePlaying;
var dice2;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//don't let them change score once game starts
		submitted = true;
		//random dice roll
		dice = Math.floor(Math.random()*6) + 1;
		dice2 = Math.floor(Math.random()*6) + 1;
		//display result
		var diceDOM = document.querySelector('.dice');
		var diceDOM2 = document.getElementById('dice2');
		diceDOM.style.display = 'block';
		diceDOM2.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		diceDOM2.src = 'dice-' + dice2 + '.png';
		//update round score
		if (dice !== 1 && dice2 !== 1) {
			roundScore += (dice + dice2);
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else { //if 1, change player, reset round score to 0
			switchPlayer();
		}
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//add current score to global score
		scores[activePlayer] += roundScore;
		//update UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.inputScore').value;
		//undefined,0,null,"", are coerced to false
		if (input) {
			winScore = input;
		}
		
		//check if player won
		if (scores[activePlayer] >= winScore) {
			document.querySelector('#name-' + activePlayer).textContent = "Winner!";
			document.querySelector('.dice').style.display = 'none';
			document.getElementById('dice2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			switchPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	winScore = 100;
	gamePlaying = true;
	dice = undefined;
	dice2 = undefined;
	prevDice = undefined; 
	prevDice2 = undefined;
	
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('dice2').style.display = 'none';

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	
	document.querySelector('#name-0').textContent = "Player 1";
	document.querySelector('#name-1').textContent = "Player 2";
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
function switchPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
		
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
		
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('dice2').style.display = 'none';
}