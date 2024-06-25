// These should not be global variables. 
let cardFlipped = false;
let lockFlip = false;
let firstCard, secondCard;

function flipCards() {
    // Pre checks before progressing. Return if not passed. 
    if (lockFlip) return;
    if (this === firstCard) return;

    // If ok, add the flip class to the card that was chosen. 
    this.classList.toggle('flip');

    // On first flip this should be false. Do evertyhing inside if then escape.
    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }

    // After first card is flipped this should be reached and we can check for 
    // a match
    secondCard = this;
    lockFlip = true;
    checkforMatch();
}

function checkforMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    if (isMatch) {
        setTimeout(() => {
            alert("Its a match");
        }, 1000);
        disableCards();

    } else {
        setTimeout(() => {
            alert("Oops, not a match!");
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            reset();
        }, 800);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);
    reset();
}

function reset() {
    firstCard = null;
    secondCard = null;
    cardFlipped = false;
    lockFlip = false;
}


function startGame(gameMode) {

    console.log(gameMode);

    const cardFace = "assets/images/BoC.jpeg";

    // Should be constant as it never changes. But it is edited? Hmm..
    let cardContent = {
        king: "assets/images/KoH.jpeg",
        queen: "assets/images/QoH.jpeg",
        jack: "assets/images/JoH.png",
        ten: "assets/images/ToH.png"
    };
    // Additional cards if they choose hard mode
    let hardMode = {
        nine: "assets/images/NoH.png",
        eight: "assets/images/EoH.png"
    }

    // Re-assign cardContent object to be both cardContent & hardMode
    if (gameMode === "hard") {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        cardContent = Object.assign(cardContent, hardMode);
    }

    // Get the game-area class that the card div is going to be contained in
    let gameArea = document.getElementsByClassName("game-area");

    // Specify a new card div to be created
    let newCardDiv = document.createElement("div");
    // // Add the card class
    newCardDiv.classList.add("card");
    // Set the data attribute 
    // newCardDiv.dataset.card = Object.keys(cardContent)[1];

    // Create new img element to be placed inside the card div
    let newCardContent = document.createElement("img");
    // Add the Front Face class to the card
    newCardContent.classList.add("front-face");
    // add the source to the img 
    //newCardContent.src = cardContent.jack;

    let newCardBack = document.createElement("img");
    newCardBack.classList.add("back-face");
    newCardBack.src = cardFace;

    // See if there is a better solution to "duplicate" cards in gameArea
    for (let i = 0; i < 2; i++) {
        addMultipleCards(cardContent, newCardDiv, newCardContent, gameArea, newCardBack);
    }
}

function addMultipleCards(cards, newCardDiv, newCardContent, gameArea, newCardBack) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    for (const [key, value] of Object.entries(cards)) {

        // Set the card div to have a data-card attribute and the source of the
        // img element 
        newCardDiv.dataset.card = key;
        newCardContent.src = value;

        // Generate random number between 1 and the length of the object. Ideally. 
        // Currently its set to 12 and needs to be refactored. 
        let ramdomPos = Math.floor(Math.random() * 12);
        // Give the card div a flex order style with that random number
        newCardDiv.style.order = ramdomPos;

        // cloneNode() is use because we want to add a new element to the DOM
        // each time. If we dont we just append the same element multiple times,
        // moving it in the DOM.

        // This was very much trial and error. 
        // If I didnt assign the game area to a variable it would never allow me
        // to append img elements inside it.
        // 
        // appendChild() on the gameArea appends the card div to the DOM
        // appendChild() returns that new element to the append varibale. 
        // using that varibale we then assing both img elements to it 

        let append = gameArea[0].appendChild(newCardDiv.cloneNode());
        append.appendChild(newCardContent.cloneNode());
        append.appendChild(newCardBack.cloneNode());

        // Element is created but doesnt have any eventListener. give it eventListener.
        append.addEventListener('click', flipCards);

        // console.log(newCardDiv);
        // console.log(newCardDiv);
        // console.log(`${key}: ${value}`);
    }
}