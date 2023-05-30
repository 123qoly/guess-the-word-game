// unordered list where the player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
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

const placeholder = function(word){
    const placeholderLetters = [];

    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

console.log(placeholder(word));

guessButton.addEventListener("click", function(e){
    e.preventDefault();
})