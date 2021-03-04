<template>
  <div class="page">
    <!-- Попап -->
    <div class="popup">
      <div class="popup__content">
        <p class="popup__title">Неплохо!</p>
        <p class="popup__text"></p>
        <button type="button" class="popup__close-btn">Продолжить</button>
      </div>
    </div>

    <h1 class="title">Найди одинаковые карточки</h1>
    <p class="copyright">&copy; Made by Sergey Kirintsev & Aleksei Andreev</p>

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
          Количество ходов: <span class="text-accent">{{ stepCount }}</span>
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
          class="cards__item cards__item_picture"
        ></li>
      </ul>
    </section>
  </div>
</template>

<script src="./app.js"></script>

<style src="./app.css"></style>
