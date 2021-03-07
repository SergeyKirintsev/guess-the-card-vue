const BACKGROUNDCOLOR = "#c8d6e5";
const APPNAME = "darkweb";

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

    cardsArr[i] = color;
    cardsArr[cardsArr.length - 1 - i] = color;

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
      this.cards = [];
      this.stepCount = 0;
      this.guessCardsCount = 0;
      clearInterval(this.setIntervalId);
      this.timerCount = 0;
    },

    startGame() {
      this.resetGame();
      this.loadBestResult();
      setTimeout(() => {
        this.cards = [...makeCards(this.cardsCount)];
      }, 0);
      this.startTimer();
    },

    compareCards(id, color, targetEl) {
      if (this.compareCardsArr.length === 0) {
        this.compareCardsArr = [id, color, targetEl];
        return;
      }
      const [compareId, compareColor, compareTargetEl] = this.compareCardsArr;
      if (id === compareId) {
        return;
      } else {
        if (color === compareColor) {
          targetEl.classList.add("cards__item_disabled");
          compareTargetEl.classList.add("cards__item_disabled");
          this.guessCardsCount += 2;
          this.checkStopGame();
        } else {
          targetEl.style.backgroundColor = BACKGROUNDCOLOR;
          compareTargetEl.style.backgroundColor = BACKGROUNDCOLOR;
          targetEl.classList.remove("cards__item_active");
          compareTargetEl.classList.remove("cards__item_active");
          targetEl.classList.add("cards__item_picture");
          compareTargetEl.classList.add("cards__item_picture");
        }
        this.compareCardsArr = [];
        this.stepCount++;
      }
    },

    selectCard(evt) {
      const targetEl = evt.target;
      if (!targetEl.classList.contains("cards__item")) {
        return;
      }
      targetEl.classList.add("cards__item_active");
      targetEl.classList.remove("cards__item_picture");
      const id = evt.target.id;
      const color = this.cards[id];
      targetEl.style.backgroundColor = color;
      setTimeout(() => {
        this.compareCards(id, color, targetEl);
      }, 1100);
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
