<template>
    <div>
        <!-- <input type="checkbox" v-model="isChecked" /> -->
        <!-- <label> Отметить контент</label>&nbsp; -->
        <!-- <span>{{ currentIndex + 1 }}/{{ totalContent }}</span> -->
        <button @click="isChecked" class="button-checked">{{ isChecked === true ? this.ok : this.no }} {{ currentIndex
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
            ok: '✅',
            no: '❌'
        };
    },
    watch: {
        marked: function (newValue) {
            this.isChecked = newValue;
        }
    }
};
</script>