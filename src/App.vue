<template>
  <h1>Игра "Угадай карточку"</h1>

  <div>
    <input
      v-model="cardsCount"
      type="range"
      id="card-count"
      min="4"
      max="40"
      step="2"
    />
    <label for="card-count">Выберите количество карточек</label>
  </div>

  <button @click="startGame" type="button">
    Начать игру (карточек - {{ cardsCount }})
  </button>

  <ul @click="selectCard">
    <li v-for="(color, idx) in cards" :key="idx" :id="idx" class="card__item"></li>
  </ul>
</template>

<script>
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function makeCards(cardsCount) {
  const colorArr = ["red", "green", "blue", "gold", "gray"];
  const cardsArr = [];

  let colorPosition = 0;

  for (let i = 0; i < cardsCount / 2; i++) {
    const color = colorArr[colorPosition];

    cardsArr[i] = color;
    cardsArr[cardsCount / 2 + i] = color;

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
      cardsCount: "4",
      compareCardsArr: []
    };
  },

  methods: {
    startGame() {
      this.cards = [...makeCards(this.cardsCount)];
    },

    compareCards(id, color, targetEl) {
      console.log(id, color);
      if (this.compareCardsArr.length === 0) {
        this.compareCardsArr = [id, color, targetEl];
        return;
      }
      const [compareId, compareColor, compareTargetEl] = this.compareCardsArr;
      if (id === compareId) {
        return
      } else {
        if (color === compareColor) {
          console.log('Цвет совпал');
          targetEl.classList.add("disabled");
          compareTargetEl.classList.add("disabled");
          this.compareCardsArr = [];
        } else {
          targetEl.style.backgroundColor = 'black';
          compareTargetEl.style.backgroundColor = 'black';
          this.compareCardsArr = [];
        }
      }
    },

    selectCard(evt) {
      const targetEl = evt.target;
      if (!targetEl.classList.contains("card__item")) {
        return;
      }
      const id = evt.target.id;
      const color = this.cards[id];
      targetEl.style.backgroundColor = color;
      setTimeout(() => {
        this.compareCards(id, color, targetEl);
      },1500);

    }
  }
};
</script>

<style>
p,
label {
  font: 1rem "Fira Sans", sans-serif;
}

input {
  margin: 0.4rem;
}

button {
  border: 3px solid #006089;
  border-radius: 5px;
  font-size: 16px;
  padding: 15px 50px;
  margin: 20px;
}

.card__item {
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: black;
  border-radius: 5px;
  transition: transform 0.4s, background-color 0.7s;
}

.card__item:hover {
  transform: scale(1.05);
}

ul {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 15px;
  margin: 0;
  padding: 0;
}

.disabled {
  pointer-events: none;
  /*border-radius: 50%;*/
  opacity: 0.2;
}
</style>
