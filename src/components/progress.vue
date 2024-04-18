<template>
  <div class="progress">
    <ul class="progress__content">
      <li
        v-for="(item, i) in progressData"
        :key="i"
        class="progress__content__item"
        :class="{
          'progress__content__item--nowDo': item.status == 'Now',
          'progress__content__item--notNow': item.status == 'notNow',
        }"
      >
        <div class="step font-bold text-xl">{{ item.step }}</div>
        <div class="progress__content__item__text font-semibold">{{ item.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, toRefs } from "vue";

export default {
  props: {
    arrStatus: {
      type: Array,
      default: ['',''],
    },
  },
  setup(props) {
    const progressData = computed(() => {
      return [
        {
          text: "確認訂單",
          status: props.arrStatus[0],
          step:'1'
        },
        {
          text: "完成訂單",
          status: props.arrStatus[1],
          step:'2'
        },
      ];
    });
    return {props,progressData};
}, 

};
</script>