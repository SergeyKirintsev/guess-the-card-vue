<template>
  <div class="page">
    <h1>Найди одинаковые карточки</h1>

    <section class="game">
      <div class="game__config">
        <p class="game__cards-count">{{ cardsCount }}</p>
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
          Начать игру
        </button>
      </div>

      <div class="game__result">
        <h2>Ваш результат</h2>
        <p>Таймер: <span class="timer">0</span></p>
        <p class="color-accent">
          Лучший результат: <span class="text-accent">{{ bestResult }}</span>
        </p>
        <p class="color-accent">
          Кол-во ходов: <span class="text-accent">{{ stepCount }}</span>
        </p>
        <p>Угадано: {{ guessCardsCount }}</p>
        <p>Осталось: {{ cardsCount - guessCardsCount }}</p>
      </div>
    </section>

    <section class="cards">
      <ul @click="selectCard" class="cards__list">
        <li
          v-for="(color, idx) in cards"
          :key="idx"
          :id="idx"
          class="cards__item"
        ></li>
      </ul>
    </section>
  </div>
</template>

<script src="./app.js"></script>

<style src="./app.css"></style>
