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
    };
    document.body.appendChild(script);
    this.tg.enableClosingConfirmation();
    this.tg.requestFullscreen();
  }
};
</script>