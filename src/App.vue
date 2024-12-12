<template>
  <div>
    <TelegramMiniApp />
    <div v-if="reportSent">
      <SuccessPage />
    </div>
    <div v-else>
      <div id="operator-name">Оператор {{ operatorName }}</div>
      <ContentItem v-if="currentContent" :content="currentContent" />
      <NavigationButtons @next="nextContent" @prev="prevContent" />
      <input type="text" placeholder="Введите комментарий" v-model="comment" class="comment-input" />
      <MarkContentCheckbox :marked="contentMarked" @change="toggleContentMark" :currentIndex="currentIndex"
        :totalContent="total" />
    </div>
  </div>
</template>

<script>

import ContentItem from './components/ContentItem.vue';
import NavigationButtons from './components/NavigationButtons.vue';
import MarkContentCheckbox from './components/MarkContentCheckbox.vue';
import TelegramMiniApp from './components/TelegramMiniApp.vue';
import SuccessPage from './components/SuccessPage.vue';

export default {
  data() {
    return {
      currentIndex: 0,
      comment: '',
      contentData: {},
      contentChecked: 0,
      tg: null,
      reportSent: false
    };
  },
  async created() {
    try {
      const response = await fetch('/get-all-data');
      const { data } = await response.json();
      this.contentData = data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  },
  computed: {
    enableConfirm() {
      this.tg.enableClosingConfirmation();
      return true;
    },
    fullscreen() {
      console.log(this.tg);
      this.tg.requestFullscreen();
      return true;
    },
    currentContent() {
      return this.contentData[this.currentIndex];
    },
    contentMarked() {
      if (this.currentContent) {
        return this.currentContent.accept === "TRUE";
      } else {
        return null
      }
    },
    operatorName() {
      if (Object.keys(this.contentData) > 0) {
        return this.currentContent.name;
      } else {
        return null;
      }
    },
    total() {
      return Object.keys(this.contentData).length;
    },
    showTgMainButton() {
      if (this.contentChecked === this.total) {
        this.tg.MainButton.setParams({ has_shine_effect: true, text: 'Отправить отчет' });
        this.tg.MainButton.show();
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tg.onEvent('mainButtonClicked', async () => {
        this.saveReport();
      });
    });
  },
  methods: {
    nextContent() {
      if (!this.contentMarked && this.comment === "") {
       /*  this.tg.showPopup({ message:  */alert("Пожалуйста, заполните комментарий или отметьте контент.");
      } else {
        this.currentContent.comment = this.comment;
        this.comment = "";
        this.contentMarked = false;
        this.currentIndex = Math.min(this.currentIndex + 1, Object.keys(this.contentData).length - 1);
        if (this.currentIndex < this.contentData.length) {
          this.comment = this.currentContent.comment ? this.currentContent.comment : '';
        }
        this.contentChecked++
      }
      console.log(this.contentData);
    },
    prevContent() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
      this.comment = this.currentContent.comment ? this.currentContent.comment : '';
    },
    toggleContentMark(event) {
      if (event.target._modelValue) {
        this.currentContent.accept = "TRUE";
        this.contentChecked++
      } else {
        this.currentContent.accept = "FALSE";
        this.contentChecked--;
      }
    },
    async saveReport() {
      if (this.contentChecked === Object.keys(this.contentData).length) {
        try {
          const response = await fetch('http://31.129.109.210:8000/savedata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: this.contentData }),
          });
          const { success } = await response.json();
          if (success) {
            console.log(`Report successfully saved`);
            this.reportSent = true;
            setTimeout(() => {
              this.reportSent = false;
              setTimeout(() => {
                this.tg.close();
              }, 0);
            }, 2000);
          }
        } catch (error) {
          console.error(`Error while save report: ${error}`);
        }
      }
    }
  },
  components: {
    ContentItem,
    NavigationButtons,
    MarkContentCheckbox,
    TelegramMiniApp,
    SuccessPage
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
  color: var(--tg-theme-text-color);
  background: var(--tg-theme-bg-color);
  height: 300px;
  margin-top: 10px;
  padding: 5px;
  max-width: fit-content;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button {
  width: 49%;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
}

.comment-input {
  margin-top: 5px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  color: var(--tg-theme-text-color);
  background-color: var(--tg-theme-bg-color);
}

img {
  width: 100%;
  height: 70vh;
  border-radius: 10px;
}

#operator-name {
  position: sticky;
  top: 0;
  padding: 10px;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  z-index: 1000;
}

.content {
  font-family: 'Helvetica Neue';
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

.title {
  font-weight: bold;
  color: #e7e7e7;
}

.symbol {
  -webkit-text-stroke: 13px #212121;
  font-size: 150px;
  color: green;
}
</style>
