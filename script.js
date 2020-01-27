const startButton = document.getElementById("start");
let playerScore = 0;
let computerScore = 0;
let result;
const buttons = document.querySelectorAll('button');

$(document).ready(function () {
    // TODO: add restart button in here
    // Keep track of score. First to win five rounds wins the game.
    buttons.forEach((button) => {
        //button.className = "choice-button";
        button.addEventListener('click', () => {
            if(button.id.toUpperCase() == 'RESTART') {
                    // Reset score counters and results logs and clear images
                    playerScore = 0;
                    computerScore = 0;
                    document.getElementById("playerScore").textContent = playerScore;
                    document.getElementById("computerScore").textContent = computerScore;
                    document.getElementById("round-result").textContent = "";
                    document.getElementById("game-result").textContent = "";
                    document.getElementById("user-image").src = "";
                    document.getElementById("computer-image").src = "";
            }
            else {
                //document.getElementById(button.id).className = "choice-button-selected";
                displayChoice("user", button.id);
                result = playRound(button.id, computerPlay())
                switch(result) {
                    case 'draw':
                        break;
                    case 'player':
                        playerScore += 1;
                        document.getElementById("playerScore").textContent = playerScore;
                        break;
                    case 'computer':
                        computerScore += 1;
                        document.getElementById("computerScore").textContent = computerScore;
                        break;
                }

                // Compare player score to computer score to determine winner of the game
                if (playerScore === 5) {
                    document.getElementById("game-result").textContent = `Congrats! You won by a score of ${playerScore} to ${computerScore}`;
                    document.getElementById("game-result").style.color = "rgb(29, 100, 11)";
                    return;
                }
                else if (computerScore === 5) {
                    document.getElementById("game-result").textContent = `Rough. You lost by a score of ${computerScore} to ${playerScore}. Better luck next time!`;
                    document.getElementById("game-result").style.color = "rgb(212, 43, 14)";
                    return;
                }
            }
        })
    })
})

// Randomly select a hand for the computer to play
function computerPlay() {
    let choices = ['Rock', 'Paper', 'Scissors'];
    let computerChoice = Math.floor(Math.random()*choices.length);
    displayChoice("computer", choices[computerChoice]);
    return choices[computerChoice];
}

// Compare user selection to computer selection and determine a result
function playRound(playerSelection, computerSelection) {
    // Filter out invalid input
    if(playerSelection.toUpperCase() == "ROCK" || playerSelection.toUpperCase() == "PAPER" || playerSelection.toUpperCase() == "SCISSORS") {
        // If player selection is equal to computer selection => draw
        if(playerSelection.toUpperCase() == computerSelection.toUpperCase()) {
            appendText("You both played " + computerSelection + ". It's a draw!");
            return 'draw';
        }
        // Otherwise compare the two unique selections to determine a winner
        else {
            switch (playerSelection.toUpperCase()) {
                case 'ROCK':
                    if (computerSelection.toUpperCase() == 'SCISSORS') {
                        appendText('Rock smashes Scissors - you win!');
                        return 'player';
                    }
                    else {
                        appendText('Paper covers Rock - computer wins.');
                        return 'computer';
                    }
                    break;
                case 'PAPER':
                    if (computerSelection.toUpperCase() == 'ROCK') {
                        appendText('Paper covers Rock - you win!');
                        return 'player';
                    }
                    else {
                        appendText('Scissors cuts Paper - computer wins.');
                        return 'computer';
                    }
                    break;
                case 'SCISSORS':
                    if (computerSelection.toUpperCase() == 'PAPER') {
                        appendText('Scissors cuts Paper - you win!');
                        return 'player';
                    }
                    else {
                        appendText('Rock smashes Scissors - computer wins.');
                        return 'computer';
                    }
                    break;
            }
        }
    }
    else {
        appendText('Invalid option. Please enter Rock, Paper, or Scissors.');
        return 'invalid';
    }
}

// Add result of the most recently played round to the round results log
function appendText(text) {
    let resultsLog = document.getElementById("round-result");
    resultsLog.innerHTML += "<br></br>" + text;
}

// Display image of selected choice
function displayChoice(player, choice) {
    let imageID = player + "-image"
    let image = document.getElementById(imageID);

    switch(choice.toUpperCase()){
        case 'ROCK':
            image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjwPm8uN4l4V5EfT4LH71KxEAfeTGzFifxQw7FYXhB4oTYpU5&s";
        break;
        case 'PAPER':
            image.src = "data:image/jpeg;base64,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";
        break;
        case 'SCISSORS':
            image.src = "data:image/jpeg;base64,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";
        break;
    }
}
    