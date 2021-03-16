<template>
  <div class="page">
    <PopupWithResult
      v-show="isGameOver"
      @close="closePopup"
      :timerCount="this.timerCount"
      :bestResult="this.bestResult"
      :stepCount="this.stepCount"
    />

    <header class="header">
      <h1 class="header__title">Найди одинаковые карточки</h1>
    </header>

    <main class="main">
      <section class="game">
        <div class="game__config">
          <p class="game__cards-count">{{ cardsCount }}</p>
          <form class="game__form">
            <input
              v-model.number="cardsCount"
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

        <GameResult
          :timerCount="this.timerCount"
          :bestResult="this.bestResult"
          :stepCount="this.stepCount"
          :guessCardsCount="this.guessCardsCount"
          :cardsCount="this.cardsCount"
        />
      </section>

      <section class="cards">
        <ul class="cards__list">
          <li v-for="(item, idx) in cards" :key="idx">
            <Card
              :bgColor="item.color"
              :isActive="item.isActive"
              :isDisabled="item.isDisabled"
              :id="idx"
              @select="selectCardTwo"
            />
          </li>
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
