//unordered list where the player’s guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
//button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//text input where the player will guess a letter.
const guessInput = document.querySelector(".letter");

//empty paragraph where the word in progress will appear.
const wordProgress = document.querySelector(".word-in-progress");

//paragraph where the remaining guesses will display.
const remainingGuess = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display.
const remainingGuessSpan = document.querySelector(".remaining.span");
//empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playButton = document.querySelector(".play-again");

//starting word to test out the game until you fetch words from a hosted file
const word = "magnolia";

// To display dots for each letter of placeholder word
const placeholder = function (word) { //regular ol' function with a parameter
  const placeholderLetters = []; //creating an empty array to put my dots in
  for (const letter of word) {// for...of loop!!! "letter" is just a name I gave for each item within the "word" parameter
    // console.log(letter);
    placeholderLetters.push("●"); //for every letter of my word, make a dot and put it into my empty array
  }
  wordProgress.innerText = placeholderLetters.join("");//now change the inner text of my word-in-progess <p> tag to the new array, but join that array so there's no commas between the letters
}

placeholder(word);//calling my function with an argument (global variable above)


//click event listener for guess button
guessButton.addEventListener("click", function (e){
  e.preventDefault(); //since this is a form, we want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page.
  const input = guessInput.value; //grab the gussed input value
  console.log(input);
  guessInput.value = " ";//clear the guessed input value to clear the form field
})