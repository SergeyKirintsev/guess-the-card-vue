<template>
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
</template>

<script>
export default {
  name: "GameResult",
  props: {
    timerCount: Number,
    bestResult: Number,
    stepCount: Number,
    guessCardsCount: Number,
    cardsCount: Number
  }
};
</script>

<style scoped></style>
