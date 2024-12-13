<template>
    <div>
        <button @click="toggleCheck" class="button-checked">{{ check[isChecked] }} &nbsp;&nbsp; {{ currentIndex + 1 }}/{{
            totalContent }}</button>
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
            isChecked: this.marked,
            check: {
                true: '✅',
                false: '❌'
            }
        };
    },
    watch: {
        marked: function (newValue) {
            this.isChecked = newValue;
        }
    },
    methods: {
        toggleCheck() {
            this.isChecked = this.marked;
            this.$emit('click', this.isChecked);
        }
    }
};
</script>