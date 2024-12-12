<template>
  <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div v-if="contentType === 'Фото'">
      <img :src="contentUrl" alt="Изображение" loading="lazy">
    </div>
    <div v-else>
      <iframe max-width="400" min-width="400" height="600" :src="contentUrl" allow="autoplay"></iframe>
    </div>
    <!-- eslint-disable-next-line -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      modalVisible: false,
      touchStartX: 0,
      touchEndX: 0
    };
  },
  props: {
    content: Object
  },
  computed: {
    contentType() {
      return this.content.type;
    },
    contentUrl() {
      return this.content.google_url;
    }
  },
  methods: {
    openModal() {
      if (this.contentType === 'Фото') {
        this.modalVisible = true;
      }
    },
    handleTouchEnd() {
      if (this.touchEndX - this.touchStartX > 50) {
        this.$emit('prev');
      } else if (this.touchStartX - this.touchEndX > 50) {
        this.$emit('next');
      }
    }
  }
};
</script>