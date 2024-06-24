let cardFlipped = false;
let lockFlip = false;
let firstCard, secondCard;

function flipCards() {
    if (lockFlip) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');

    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }

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



    let cardContent = {
        king: "assets/images/KoH.jpeg",
        queen: "assets/images/QoH.jpeg",
        jack: "assets/images/JoH.png",
        ten: "assets/images/ToH.png"
    };

    let hardMode = {
        nine: "assets/images/NoH.png",
        eight: "assets/images/EoH.png"
    }

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


    for (let i = 0; i < 2; i++) {
        addMultipleCards(cardContent, newCardDiv, newCardContent, gameArea, newCardBack);
    }




    // // Old Loop
    // // Loop through the number of cards to be created and append to game-area
    // for (let i = 0; i < 8; i++) {

    //     // cloneNode() is use because we want to add a new element to the DOM
    //     // each time. If we dont we just append the same element multiple times,
    //     // moving it in the DOM.

    //     // No Idea how I got the below to work. Trial and Error. Surely a better way?

    //     // I think its this, It still executes the appendChild() and adds it to 
    //     // the DOM. Then appendChild() returns the newly appended node. 
    //     // In this case its the 'div class="card"' then using that append 
    //     // variable we can append both images to that div. 

    //     let append = gameArea[0].appendChild(newCardDiv.cloneNode());
    //     append.appendChild(newCardContent.cloneNode());
    //     append.appendChild(newCardBack.cloneNode());

    //     // Element is created but doesnt have any eventListener. give it eventListener.
    //     append.addEventListener('click', flipCards);


    // }
}

function addMultipleCards(cards, newCardDiv, newCardContent, gameArea, newCardBack) {

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    for (const [key, value] of Object.entries(cards)) {

        newCardDiv.dataset.card = key;
        newCardContent.src = value;

        let ramdomPos = Math.floor(Math.random() * 12);
        newCardDiv.style.order = ramdomPos;

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