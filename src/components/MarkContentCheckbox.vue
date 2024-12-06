<!-- MarkContentCheckbox.vue -->

<template>
    <div>
        <input type="checkbox" v-model="isChecked" />
        <label> Отметить контент</label>&nbsp;
        <span>{{ currentIndex + 1 }}/{{ totalContent }}</span>
    </div>
</template>

<script>
export default {
    props: {
        marked: Boolean,
        currentIndex: Number,
        totalContent: Number
    },
    data() {
        return {
            isChecked: this.marked
        };
    },
    watch: {
        marked: function(newValue) {
            this.isChecked = newValue;
        }
    }
};
</script>