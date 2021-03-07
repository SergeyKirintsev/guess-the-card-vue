<template>
  <div
    @click="activeCard"
    :class="{ box_disabled: isDisabled }"
    class="flip-box"
  >
    <div ref="boxInner" :class="{ active: isActive }" class="flip-box-inner">
      <div class="flip-box-front">
        <img src="../img/rubashka_1989.jpg" alt="Передняя сторона карточки" />
      </div>
      <div class="flip-box-back" :style="{ backgroundColor: bgColor }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    bgColor: String,
    isActive: Boolean,
    isDisabled: Boolean
  },
  methods: {
    activeCard() {
      this.$emit("select", this.$attrs.id);
    }
  }
};
</script>

<style scoped>
.box_disabled {
  pointer-events: none;
  opacity: 0.15;
  transform: scale(0.8);
  transition: 0.4s ease;
}

/* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-box {
  background-color: transparent;
  /*width: 130px;*/
  height: 130px;
  /* border: 1px solid #f1f1f1; */
  perspective: 500px;
  cursor: pointer;
}

/* This container is needed to position the front and back side */
.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.9s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
/* .flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
} */

.active {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-box-front,
.flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side */
.flip-box-front {
  background-color: rgb(200, 214, 229);
  color: black;
}

.flip-box-front img {
  object-fit: cover;
  width: 100%;
}

/* Style the back side */
.flip-box-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>
