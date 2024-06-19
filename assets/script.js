const cards = document.querySelectorAll('.memory-card');

function flipCard() {
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));


const cards2 = document.querySelectorAll('.flip-card-inner');

function flipCards() {
    this.classList.toggle('flip');
}

cards2.forEach(c => c.addEventListener('click', flipCards));

const cards3 = document.querySelectorAll('.card');

function flipCards() {
    this.classList.toggle('flip');
}

cards3.forEach(c => c.addEventListener('click', flipCards));