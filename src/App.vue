<!-- ContentViewer.vue -->

<template>
  <div>
    <TelegramMiniApp />
    <!-- <MetaTag /> -->
    <div id="operator-name">Оператор {{ operatorName }}</div>
    <ContentItem v-if="currentContent" :content="currentContent" />
    <NavigationButtons @next="nextContent" @prev="prevContent" />
    <input type="text" placeholder="Введите комментарий" v-model="comment" class="comment-input" />
    <MarkContentCheckbox :marked="contentMarked" @change="toggleContentMark" :currentIndex="currentIndex"
      :totalContent="Object.keys(contentData).length" />
    <SaveButton @save="saveReport" />
  </div>
</template>

<script>

import ContentItem from './components/ContentItem.vue';
import NavigationButtons from './components/NavigationButtons.vue';
import SaveButton from './components/SaveButton.vue';
import MarkContentCheckbox from './components/MarkContentCheckbox.vue';
import TelegramMiniApp from './components/TelegramMiniApp.vue';

export default {
  data() {
    return {
      currentIndex: 0,
      comment: '',
      contentData: {}
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8000/get-all-data');
      const { data } = await response.json();
      this.contentData = data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  },
  computed: {
    currentContent() {
      return this.contentData[this.currentIndex];
    },
    contentMarked() {
      return this.currentContent.yes === "TRUE";
    },
    operatorName() {
      return this.currentContent.name;
    }
  },
  methods: {
    nextContent() {
      if (!this.contentMarked && this.comment === "") {
        alert("Пожалуйста, заполните комментарий или отметьте контент.");
      } else {
        this.currentContent.comment = this.comment;
        this.comment = "";
        this.contentMarked = false;
        this.currentIndex = Math.min(this.currentIndex + 1, Object.keys(this.contentData).length - 1);
        if (this.currentIndex < this.contentData.length) {
          this.comment = this.currentContent.comment ? this.currentContent.comment : '';
        }
      }
      console.log(this.contentData);
    },
    prevContent() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
      this.comment = this.currentContent.comment ? this.currentContent.comment : '';
    },
    toggleContentMark(event) {
      this.currentContent.yes = event.target._modelValue ? "TRUE" : "FALSE";
    },
    async saveReport() {
      try {
        const response = await fetch('http://localhost:8000/savedata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: this.contentData }),
        });
        const { success } = await response.json();
        if (success) {
          console.log(`Report successfully saved`);
        }
      } catch (error) {
        console.error(`Error while save report: ${error}`);
      }
    },
  },
  components: {
    ContentItem,
    NavigationButtons,
    SaveButton,
    MarkContentCheckbox,
    TelegramMiniApp
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  justify-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  color: #2c3e50;
  height: fit-content;
  margin-top: 10px;
  padding: 5px;
  max-width: 400px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button {
  width: 49%;
  padding: 10px;
  border-radius: 10px;
}

.comment-input {
  margin-top: 5px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

#operator-name {
  padding: 10px;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid black;
}
</style>
