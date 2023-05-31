// unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
// button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// text input where the player will guess a letter.
const guessInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
// span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
// empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

// Magnolia is the word to test out the game until words are fetcehed from a hosted file in a later step.
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
    const response = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];

    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
   

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    const guess = guessInput.value;
    // let it be a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess){
        makeGuess(guess);
    }

    guessInput.value = "";
});

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter.";
    } else if(input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
        
    }
};

    const showGuessedLetters = function(){
        guessedLettersElement.innerHTML = "";
        for (const letter of guessedLetters){
            const li = document.createElement("li");
            li.innerText = letter;
            guessedLettersElement.append(li);
        }
    };

    const updateWordInProgress = function(guessedLetters){
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split("");
        const revealWord = [];
        for (const letter of wordArray){
            if (guessedLetters.includes(letter)){
                revealWord.push(letter.toUpperCase());
            } else {
                revealWord.push("●");
                console.log(revealWord);
            }
        }
        wordInProgress.innerText = revealWord.join("");
        checkIfWin();
    };

    const updateGuessesRemaining = function(guess){
        const upperWord = word.toUpperCase();
        if (!upperWord.includes(guess)){
            message.innerText =  `Sorry, the word has no ${guess}.`;
            remainingGuesses -= 1;
        } else{
            message.innerText = `Good guess! The word has the letter ${guess}.`;
        }
        
        if (remainingGuesses === 0){
            message.innerHTML = `Game over! The word was <span class = "highlight">${word}</span>.`;
            startOver();
        } else if (remainingGuesses === 1){
            remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
        } else {
            remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        }
    };

        const checkIfWin = function(){
            if (word.toUpperCase() === wordInProgress.innerText){
                message.classList.add("win");
                message.innerHTML = `<p class = "highlight">You guessed the correct word! Congrats!</p>`;
            
                startOver();
            }
        };

        const startOver = function(){
            guessButton.classList.add("hide");
            remainingGuessesElement.classList.add("hide");
            guessedLettersElement.classList.add("hide");
            playAgainButton.classList.remove("hide");
        };

        playAgainButton.addEventListener("click", function () {
            // reset all original values - grab new word
            message.classList.remove("win");
            guessedLetters = [];
            remainingGuesses = 8;
            remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
            guessedLettersElement.innerHTML = "";
            message.innerText = "";
            // Grab a new word
            getWord();

            // show the right UI elements
            guessButton.classList.remove("hide");
            playAgainButton.classList.add("hide");
            remainingGuessesElement.classList.remove("hide");
            guessedLettersElement.classList.remove("hide");
          });
          