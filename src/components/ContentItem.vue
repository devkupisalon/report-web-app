<template>
  <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div v-if="contentType === 'Фото'" @click="openModal">
      <img :src="contentUrl" alt="Изображение" loading="lazy">
    </div>
    <div v-else-if="contentType === 'Видео'">
      <video width="400" height="400" controls>
        <source :src="contentUrl" type="video/mp4" loading="lazy">
        Your browser does not support the video tag.
      </video>
      <!-- <iframe max-width="400" min-width="350" height="400" :src="contentUrl" allow="autoplay"></iframe> -->
    </div>
    <!-- eslint-disable-next-line -->
    <ImageModal :visible="modalVisible" :imageUrl="contentUrl" @close-modal="modalVisible = false"></ImageModal>
  </div>
</template>

<script>
import ImageModal from './ImageModal.vue';

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
      return this.content.link;
    }
  },
  methods: {
    openModal() {
      if (this.contentType === 'Фото') {
        this.modalVisible = true;
      }
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },
    handleTouchEnd() {
      if (this.touchEndX - this.touchStartX > 50) {
        this.$emit('prev');
      } else if (this.touchStartX - this.touchEndX > 50) {
        this.$emit('next');
      }
    }
  },
  components: {
    ImageModal
  }
};
</script>