<template>
    <div>
        <button @click="toggleChecked" class="button-checked">{{ check[isChecked] }} {{ currentIndex + 1 }}/{{
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
        toggleChecked() {
            this.isChecked = this.marked;
        }
    }
};
</script>