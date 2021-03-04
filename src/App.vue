<template>
  <div class="page">
    <!-- Попап -->
    <div :class="{ popup_opened: isShowPopup }" class="popup">
      <div class="popup__content">
        <p class="popup__title">Неплохо!</p>
        <div class="game__result game__result_place_popup">
          <h2>Ваш результат</h2>
          <p>
            Таймер: <span class="timer">{{ timerCount }} сек.</span>
          </p>
          <p class="color-accent">
            Лучший результат: <span class="text-accent">{{ bestResult }}</span>
          </p>
          <p class="color-accent">
            Количество ходов: <span class="text-accent">{{ stepCount }}</span>
          </p>
          <p>Угадано: {{ guessCardsCount }}</p>
          <p>Осталось: {{ cardsCount - guessCardsCount }}</p>
        </div>
        <button @click="closePopup" type="button" class="popup__close-btn">
          Продолжить
        </button>
      </div>
    </div>

    <header class="header">
      <h1 class="header__title">Найди одинаковые карточки</h1>
    </header>
    <main class="main">
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
          <p>
            Таймер: <span class="timer">{{ timerCount }} сек.</span>
          </p>
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
    </main>
    <footer class="footer">
      <p class="footer__copyright">
        &copy; Сергей&nbsp;Киринцев &copy;&nbsp;Алексей&nbsp;Андреев
      </p>
    </footer>
  </div>
</template>

<script src="./app.js"></script>

<style src="./app.css"></style>
<style src="./adaptive.css"></style>
