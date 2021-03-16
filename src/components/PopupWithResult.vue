<template>
  <!-- Попап -->
  <div class="popup popup_opened">
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
      </div>
      <button @click="closePopup" type="button" class="popup__close-btn">
        Продолжить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupWithResult",
  methods: {
    closePopup() {
      this.$emit("close");
    }
  },
  props: {
    timerCount: Number,
    bestResult: Number,
    stepCount: Number
  }
};
</script>

<style scoped></style>
