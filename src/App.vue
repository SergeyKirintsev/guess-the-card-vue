<template>
  <div class="page">
    <h1>"Найди одинаковые карточки"</h1>

    <section class="game">
      <div class="game__config">
        <form class="game__form">
          <input
            v-model="cardsCount"
            type="range"
            id="card-count"
            min="4"
            max="40"
            step="2"
          />
          <label for="card-count">Выберите количество карточек</label>
        </form>
        <button @click="startGame" type="button" class="game__start-btn">
          Начать игру (карточек - {{ cardsCount }})
        </button>
      </div>

      <div class="game__result">
        <h2>Ход игры</h2>
        <p>Таймер:</p>
        <p>Лучший результат:</p>
        <p>Кол-во ходов:</p>
      </div>

    </section>

    <section class="cards">
      <ul @click="selectCard" class="cards__list">
        <li v-for="(color, idx) in cards" :key="idx" :id="idx" class="cards__item"></li>
      </ul>
    </section>

  </div>
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
      cardsCount: "10",
      compareCardsArr: []
    };
  },

  methods: {
    startGame() {
      this.cards = [];
      setTimeout( ()=> {
        this.cards = [...makeCards(this.cardsCount)];
      }, 0)
    },

    compareCards(id, color, targetEl) {
      console.log(id, color);
      if (this.compareCardsArr.length === 0) {
        this.compareCardsArr = [id, color, targetEl];
        return;
      }
      const [compareId, compareColor, compareTargetEl] = this.compareCardsArr;
      if (id === compareId) {
        return;
      } else {
        if (color === compareColor) {
          console.log("Цвет совпал");
          targetEl.classList.add("cards__item_disabled");
          compareTargetEl.classList.add("cards__item_disabled");
          this.compareCardsArr = [];
        } else {
          targetEl.style.backgroundColor = "black";
          compareTargetEl.style.backgroundColor = "black";
          this.compareCardsArr = [];
        }
      }
    },

    selectCard(evt) {
      const targetEl = evt.target;
      if (!targetEl.classList.contains("cards__item")) {
        return;
      }
      const id = evt.target.id;
      const color = this.cards[id];
      targetEl.style.backgroundColor = color;
      setTimeout(() => {
        this.compareCards(id, color, targetEl);
      }, 1500);
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.page {
  max-width: 560px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  margin: 15px auto;
  text-align: center;
}

.game {
  display: flex;
  justify-content: space-between;
}

.game__form {
  margin-left: 20px;
}

.game__config {
  max-width: 250px;
}

.game__result {
  max-width: 250px;
}

input {
  /*margin: 20px;*/
  width: 200px;
}

.game__start-btn {
  border: 3px solid #006089;
  border-radius: 5px;
  font-size: 15px;
  padding: 15px 50px;
  margin: 20px;
}

.cards__item {
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: black;
  /*border-radius: 5px;*/
  transition: transform 0.4s, background-color 0.7s;
}

.cards__item:hover {
  transform: scale(1.05);
}

.cards__list {
  list-style-type: none;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 100px);
  gap: 15px;
  margin: 0;
  padding: 0;
}

.cards__item_disabled {
  pointer-events: none;
  opacity: 0.2;
}
</style>
