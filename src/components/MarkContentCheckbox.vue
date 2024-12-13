<template>
    <div>
        <button @click="toggleContentMark" class="button-checked">{{ check[isChecked] }} &nbsp;&nbsp; {{ currentIndex + 1 }}/{{
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
        toggleContentMark() {
            this.isChecked = !this.isChecked;
            this.$emit('click', { target: { _modelValue: this.isChecked } });
        }
    }
};
</script>