<template>
    <div>
        <button @click="toggleMark" class="button-checked">{{ check[isChecked] }} &nbsp;&nbsp; {{ currentIndex + 1 }}/{{
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
        toggleMark() {
            this.isChecked = this.marked;
            this.$emit('click', this.isChecked);
        }
    }
};
</script>