class Card {
  constructor(color) {
    this.color = color;
    this.active = true;
  }
}

const form = document.forms.form;
const cardsCountEl = form.elements.count;
const cardsCount = Number(cardsCountEl.value) * 2;

const colorArr = ['red', 'green', 'blue', 'yellow', 'gray'];
const cardsArr = [];


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function makeCards(evt) {
  evt.preventDefault();
  let colorPosition = 0;

  for (let i = 0; i < cardsCount / 2; i++) {
    const color = colorArr[colorPosition];

    const card = new Card(color);
    cardsArr[i] = card;
    cardsArr[cardsCount / 2 + i] = card;

    if (colorPosition == colorArr.length - 1) {
      colorPosition = 0;
    } else {
      colorPosition++;
    }
  }

  shuffle(cardsArr);
  console.log(123);
}

form.addEventListener('submit', makeCards)


