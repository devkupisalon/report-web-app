<template>
  <div class="image-modal" v-if="visible">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <!-- Содержимое модального окна -->
      <img :src="imageUrl" alt="Изображение в модальном окне">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    imageUrl: String
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  }
};
</script>

<style>
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  border-radius: 10px;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}
</style>