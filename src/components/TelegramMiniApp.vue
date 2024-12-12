<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      this.tg = window.Telegram.WebApp;
      if (this.tg.ready()) {
        this.tg.enableClosingConfirmation();
        this.tg.requestFullscreen();
      }

      if (this.contentChecked === this.total) {
        this.tg.MainButton.setParams({ has_shine_effect: true, text: 'Отправить отчет' });
        this.tg.MainButton.show();
        return true;
      } else {
        return false;
      }
    };
    document.body.appendChild(script);
  }
};
</script>