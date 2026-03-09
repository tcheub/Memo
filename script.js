// Liste des phrases bilingues
const phrases = [
  {en: "I'll be back", fr: "Je reviendrai"},
  {en: "Just keep swimming", fr: "Continue de nager"},
  {en: "I see dead people", fr: "Je vois des gens morts"},
  {en: "Nothing lasts forever", fr: "Rien ne dure éternellement"},
  {en: "Chaos reveals truth", fr: "Le chaos révèle la vérité"},
  {en: "Dream big, start small", fr: "Rêve grand, commence petit"},
  {en: "Be the change", fr: "Sois le changement"},
  {en: "To infinity and beyond!", fr: "Vers l'infini et au-delà !"}
];

// Créer un tableau de cartes (chaque phrase en 2 cartes : anglais + français)
let cards = [];
phrases.forEach((p, index) => {
  cards.push({text: p.en, pairId: index});
  cards.push({text: p.fr, pairId: index});
});

// Mélanger les cartes
cards = cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const game = document.getElementById("game");

// Créer visuellement les cartes
cards.forEach(c => {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.pairId = c.pairId;
  card.dataset.text = c.text;
  card.addEventListener("click", flipCard);
  game.appendChild(card);
});

function flipCard(){
  if(lockBoard) return;
  if(this.classList.contains("flipped")) return;

  this.textContent = this.dataset.text;
  this.classList.add("flipped");

  if(!firstCard){
    firstCard = this;
    return;
  }

  secondCard = this;

  if(firstCard.dataset.pairId === secondCard.dataset.pairId){
    // paire correcte
    firstCard = null;
    secondCard = null;
  } else {
    // paire incorrecte → retour après 1s
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}