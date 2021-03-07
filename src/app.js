import Card from "./components/Card.vue";

const APPNAME = "darkweb";

class ColorCard {
  constructor(color) {
    this.color = color;
  }
  isActive = false;
  isDisabled = false;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function makeCards(cardsCount) {
  const colorArr = [
    "#74d2e7",
    "#84bd00",
    "#efdf00",
    "#fe5000",
    "#da1884",
    "#a51890",
    "#0077c8",
    "#008eaa",
    "#005670",
    "#009f4d",
    "#e4002b",
    "#5e412f"
  ];
  shuffle(colorArr);
  const cardsArr = new Array(cardsCount);

  let colorPosition = 0;

  for (let i = 0; i < cardsArr.length / 2; i++) {
    const color = colorArr[colorPosition];

    const firstCard = new ColorCard(color);
    const secondCard = Object.assign({}, firstCard);

    cardsArr[i] = firstCard;
    cardsArr[cardsArr.length - 1 - i] = secondCard;

    if (colorPosition === colorArr.length - 1) {
      colorPosition = 0;
    } else {
      colorPosition++;
    }
  }
  shuffle(cardsArr);
  return cardsArr;
}

export default {
  name: "App",
  components: {
    Card
  },

  data() {
    return {
      cards: [],
      cardsCount: 10,
      compareCardsArr: [],
      stepCount: 0,
      guessCardsCount: 0,
      bestResult: 0,
      timerCount: 0,
      isShowPopup: false,
      setIntervalId: null
    };
  },

  methods: {
    resetGame() {
      this.stepCount = 0;
      this.guessCardsCount = 0;
      clearInterval(this.setIntervalId);
      this.timerCount = 0;
    },

    startGame() {
      this.resetGame();
      this.loadBestResult();
      this.cards = [...makeCards(this.cardsCount)];
      this.startTimer();
    },

    selectCardTwo(id) {
      console.log("selectCardTwo");
      const card = this.cards[id];
      if (card.isActive) return;
      card.isActive = true;

      if (this.compareCardsArr.length === 0) {
        this.compareCardsArr = [id];
        return;
      }

      const [compareCardId] = this.compareCardsArr;
      const compareCard = this.cards[compareCardId];

      console.log(compareCardId, id);

      if (id === compareCardId) {
        return;
      } else {
        //TODO объект передается по ссылке, ДОРАБОТАТЬ!!!
        setTimeout(() => {
          console.log("setTimeout", compareCardId, id);

          if (card.color === compareCard.color) {
            card.isDisabled = true;
            compareCard.isDisabled = true;
            this.guessCardsCount += 2;
            this.checkStopGame();
          } else {
            card.isActive = false;
            compareCard.isActive = false;
          }
          this.compareCardsArr = [];
          this.stepCount++;
        }, 700);
      }
    },

    openPopup() {
      this.isShowPopup = true;
    },

    closePopup() {
      this.isShowPopup = false;
    },

    checkStopGame() {
      if (this.cardsCount === this.guessCardsCount) {
        setTimeout(() => this.saveBestResult(), 0);
        clearInterval(this.setIntervalId);
        setTimeout(() => this.openPopup(), 1000);
      }
    },

    saveBestResult() {
      const result = JSON.parse(localStorage.getItem(APPNAME)) || {};
      const bestResult = result[this.cardsCount] || 0;
      if (bestResult === 0 || this.stepCount < bestResult) {
        result[this.cardsCount] = this.stepCount;
        localStorage.setItem(APPNAME, JSON.stringify(result));
      }
    },

    loadBestResult() {
      const result = JSON.parse(localStorage.getItem(APPNAME)) || {};
      const bestResult = result[this.cardsCount];
      this.bestResult = bestResult || 0;
    },

    startTimer() {
      this.setIntervalId = setInterval(() => {
        this.timerCount++;
      }, 1000);
    }
  }
};
