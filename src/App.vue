<template>
  <div>
    <div v-if="reportSent">
      <SuccessPage />
    </div>
    <div v-else>
      <div v-if="loading">Загрузка...</div>
      <ContentItem v-if="currentContent" :content="currentContent" />
      <NavigationButtons @next="nextContent" @prev="prevContent" />
      <input type="text" placeholder="Введите комментарий" v-model="comment" class="comment-input" />
      <MarkContentCheckbox @check="toggleContentMark" :marked="contentMarked" :currentIndex="currentIndex"
        :totalContent="total" />
      <MainButton v-if="allContentChecked" :has_shine_effect="true" :showMainButton="true" :is_progress_visible="true"
        :text="text" />
      <ClosingConfirmation />
    </div>
  </div>
</template>

<script>

import ContentItem from './components/ContentItem.vue';
import NavigationButtons from './components/NavigationButtons.vue';
import MarkContentCheckbox from './components/MarkContentCheckbox.vue';
import SuccessPage from './components/SuccessPage.vue';
import { ClosingConfirmation, MainButton, useWebAppMainButton } from 'vue-tg';

const { onMainButtonClicked } = useWebAppMainButton();

onMainButtonClicked(() =>
  this.saveReport()
);

export default {
  data() {
    return {
      currentIndex: 0,
      comment: '',
      contentData: {},
      contentChecked: 0,
      reportSent: false,
      text: 'Отправить отчет',
      loading: true,
      check: {
        true: '✅',
        false: '❌',
        checkedOrCommented: {}
      },
      isChecked: false
    };
  },
  async created() {
    try {
      this.loading = true;
      const response = await fetch('/get-all-data');
      const { data } = await response.json();
      this.contentData = data;
      this.loading = false;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  },
  computed: {
    currentContent() {
      return this.contentData[this.currentIndex];
    },
    contentMarked() {
      return this.currentContent.accept === "TRUE";
    },
    total() {
      return Object.keys(this.contentData).length;
    },
    allContentChecked() {
      return this.contentChecked === this.total;
    }
  },
  mounted() {
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
        if (!this.checkedOrCommented[this.currentIndex]) this.contentChecked++;
        this.checkedOrCommented[this.currentIndex] = true;
        console.log(this.contentChecked);
        console.log(this.total);
      }
    },
    prevContent() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
      this.comment = this.currentContent.comment ? this.currentContent.comment : '';
    },
    toggleContentMark() {
      if (!this.contentMarked) {
        this.currentContent.accept = "TRUE";
        this.isChecked = true;
      } else {
        this.currentContent.accept = "FALSE";
        this.isChecked = false;
        this.contentChecked--;
      }
    },
    async saveReport() {
      try {
        const response = await fetch('/savedata', {
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

            }, 0);
          }, 2000);
        }
      } catch (error) {
        console.error(`Error while save report: ${error}`);
      }
    }
  },
  components: {
    ContentItem,
    NavigationButtons,
    MarkContentCheckbox,
    SuccessPage,
    MainButton,
    ClosingConfirmation
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
  height: 100vh;
  margin-top: 10px;
  padding: 5px;
  width: fit-content;
  max-width: 400px;
  overflow: hidden;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

#operator-name,
.button-checked {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
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

.content {
  font-family: 'Helvetica Neue';
  display: none;
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
