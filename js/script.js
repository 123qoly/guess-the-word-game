// unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
// button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// text input where the player will guess a letter.
const guessInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");
// span inside the paragraph where the remaining guesses will display.
const remainingSpan = document.querySelector(".remaining span");
// empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again hide");

// Magnolia is the word to test out the game until words are fetcehed from a hosted file in a later step.
const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];

    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

    placeholder(word);
    

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
        const wordUpper =word.toUpperCase();
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

        const checkIfWin = function(){
            if (word.toUpperCase() === wordInProgress.innerText){
                message.classList.add("win");
                message.innerHTML = `<p class = "highlight">You guessed the correct word! Congrats!</p>`;
            }
        }