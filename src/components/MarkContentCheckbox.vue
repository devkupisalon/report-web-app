<template>
    <div>
        <button @click="isChecked" class="button-checked">{{ check[isChecked] }} {{ currentIndex
            + 1
            }}/{{ totalContent }}</button>
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
    click: {
        marked: function (newValue) {
            this.isChecked = newValue;
        }
    }
};
</script>