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
const remainingGuessSpan = document.querySelector(".remaining.span");
//empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//hidden button that will appear prompting the player to play again.
const playButton = document.querySelector(".play-again");

//starting word to test out the game until you fetch words from a hosted file
const word = "magnolia";
//array will contain all the letters the player guesses
const guessedLetters = [];

// To display dots for each letter of placeholder word
const placeholder = function (word) { //regular ol' function with a parameter
  const placeholderLetters = []; //creating an empty array to put my dots in
  for (const letter of word) {// for...of loop!!! "letter" is just a name I gave for each item within the "word" parameter
    // console.log(letter);
    placeholderLetters.push("●"); //for every letter of my word, make a dot and put it into my empty array
  }
  wordProgress.innerText = placeholderLetters.join("");//now change the inner text of my word-in-progess <p> tag to the new array, but join that array so there's no commas between the letters
};

placeholder(word);//calling my function with an argument (global variable above)


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
  const letterUp = letter.toUpperCase(); //JavaScript is case sensitive, so let's fix it
  if (guessedLetters.includes(letterUp)) { //if the user guesses the same letter in the array then output this message
    message.innerText = "You already guessed that one.";
  } else {
    guessedLetters.push(letterUp); // if this is a new letter, put it into my empty array
    // console.log(guessedLetters);
    displayGuessedLetter();
    wordProgressUpdate(guessedLetters);
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

//function that updates word in progress 
const wordProgressUpdate = function (guessedLetters) {
  console.log(`I just guessed ${guessedLetters}`);
  const wordUpper = word.toUpperCase(); //change letters in word to uppercase
  const wordArray = wordUpper.split(""); //split letters of word into an array
  console.log(wordArray);
  //array will contain the guessed letters that match the hidden word
  const matchedLetters = [];
  for (const letter of wordArray){
    if(guessedLetters.includes(letter) ){
      matchedLetters.push(letter.toUpperCase());
    }else {
      matchedLetters.push("●");
    }
    wordProgress.innerText = matchedLetters.join("");
  }
}


