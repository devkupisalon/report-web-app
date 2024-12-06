<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    document.body.appendChild(script);
  }
};
</script>