<template>
  <div class="button-container">
    <button @click="$emit('prev')" class="button">Назад</button>
    <button @click="$emit('next')" class="button">Вперед</button>
  </div>
</template>