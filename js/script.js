//unordered list where the player’s guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
//button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
//text input where the player will guess a letter.
const guessInput = document.querySelector(".letter");

//empty paragraph where the word in progress will appear.
const wordProgress = document.querySelector(".word-in-progress");

//paragraph where the remaining guesses will display.
const remainingGuess = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display.
const remainingGuessSpan = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playButton = document.querySelector(".play-again");

//starting word to test out the game until you fetch words from a hosted file
let word = "magnolia";
//array will contain all the letters the player guesses
let guessedLetters = [];

//number of guesses
let remainingGuesses = 8; //this is the maximum number of guesses a player can make

//function to get random words from text document
const getWord = async function () { //this is an async function so grab it while the page loads
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); //grab the doc and put it here
  const words = await response.text(); //put it in text
  const wordArray = words.split("\n"); //split it by words ("/" seperates words and "n" is the newlines (line breaks)) and put each word into an array
  const randomIndex = Math.floor(Math.random() * wordArray.length);//grab a random word from the array
  word = wordArray[randomIndex].trim(); //update the mystery word with the new random word and remove any extra whitespace with ".trim()"
  placeholder(word); //put the new word in the placeholder function
};



// To display dots for each letter of placeholder word
const placeholder = function (word) { //regular ol' function with a parameter
  const placeholderLetters = []; //creating an empty array to put my dots in
  for (const letter of word) {// for...of loop!!! "letter" is just a name I gave for each item within the "word" parameter
    // console.log(letter);
    placeholderLetters.push("●"); //for every letter of my word, make a dot and put it into my empty array
  }
  wordProgress.innerText = placeholderLetters.join("");//now change the inner text of my word-in-progess <p> tag to the new array, but join that array so there's no commas between the letters
};

//Let the game begin
getWord();

//click event listener for guess button
guessButton.addEventListener("click", function (e){
  e.preventDefault(); //since this is a form, we want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page.
  message.innerText = ""; //clear out the message paragraph
  const input = guessInput.value; //grab the gussed input value
  const goodGuess = checkPlayerInput(input); //calling validation function (below) and passing input value
  if (goodGuess) { //run this function only after the input is validated
    makeGuess(input);
  }
  guessInput.value = "";//clear the guessed input value to clear the form field
});

//check that the player used a letter
const checkPlayerInput = function(input){ 
  //this is a regular expression that finds text that matches a specific pattern
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0){ //check if anything has be guessed
    message.innerText = "Take a guess!";
  } else if (input.length > 1){ //check if there is more than 1 letter
    message.innerText = "One letter at a time please.";
  } else if (!input.match(acceptedLetter)){ //check if a letter was guessed or something else
    message.innerText = "Letters only please.";
  } else { //all systems go! we got a guess!
    return input;
  }
};

//function to capture input
const makeGuess = function (letter) {
  letter = letter.toUpperCase(); //JavaScript is case sensitive, so let's fix it
  if (guessedLetters.includes(letter)) { //if the user guesses the same letter in the array then output this message
    message.innerText = "You already guessed that one.";
  } else {
    guessedLetters.push(letter); // if this is a new letter, put it into my empty array
    // console.log(guessedLetters);
    displayGuessedLetter();
    wordProgressUpdate(guessedLetters);
    guessCount(letter);
  }
};

//function to update the letters that the player guesses
const displayGuessedLetter = function () {
  guessedLettersList.innerHTML = ""; // empty the ul for the guessed-letters
  for (const letter of guessedLetters) { // for of loop!! iterate through the new array with all my new items in it and...
    const li = document.createElement("li"); // create a new li element for each item
    li.innerText = letter; // put the item inside li
    guessedLettersList.append(li); //put all my new li elements into the ul element
  }
};

//function that updates word-in-progress 
const wordProgressUpdate = function (guessedLetters) {
  console.log(`I just guessed ${guessedLetters}`);
  const wordUpper = word.toUpperCase(); //change letters in word to uppercase
  const wordArray = wordUpper.split(""); //split letters of word into an array
  console.log(wordArray);
  //array will contain the guessed letters that match the hidden word
  const matchedLetters = []; // empty array for my matched letters to go in
  for (const letter of wordArray){ // for every letter guessed, check if it matches a letter inthe mystery word
    if(guessedLetters.includes(letter) ){
      matchedLetters.push(letter.toUpperCase()); // put all matches to uppercase and add to new array
    }else {
      matchedLetters.push("●"); //if not match then put a dot in as a placeholder
    }
    wordProgress.innerText = matchedLetters.join(""); // update my word in progress with the letters from my new array
    winner(); //check if player won
  }
};

//function to count guesses remaining
const guessCount = function (letter) {
  const upperWord = word.toUpperCase(); // change the mystery word to uppercase
  if (!upperWord.includes(letter)){ //if the mystery word doesn't include the guessed letter, then output a new message and subtract 1 from the remaining guesses
    message.innerText = `Sorry, the word has no ${letter}.`;
    remainingGuesses -= 1;
  } else if(upperWord.includes(letter) && word.toUpperCase() != wordProgress.innerText) {
    message.innerText = `Good guess! The word has the letter ${letter}.`; // if there's a match but the entire word doesn't match the mystery word then output a new message
  }

  if (remainingGuesses === 0){ //if the remaing guesses equals 0 then output a game over message
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if(remainingGuesses === 1) { //if there's only 1 guess left output this message
    remainingGuessSpan.innerText = `${remainingGuesses} guess`;
  } else { // otherwise output this message
    remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  }

};

//function to check if player won
const winner = function () {
  if(word.toUpperCase() === wordProgress.innerText){ // the word against the word-in-progress for a stict match
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`; //update the content of the message
    startOver();
  }
};

// function to hide element when game is over, win or lose
const startOver =  function () {
  guessButton.classList.add("hide");
  remainingGuess.classList.add("hide");
  guessedLettersList.classList.add("hide");
  playButton.classList.remove("hide");
}

//click event reset and active game
playButton.addEventListener("click", function (e) {
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersList.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  guessButton.classList.remove("hide");
  getWord();

    // show the right UI elements
    guessButton.classList.remove("hide");
    playButton.classList.add("hide");
    remainingGuess.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});

