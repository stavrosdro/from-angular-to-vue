<template>
  <ul :class="{ horizontal: horizontal }">
    <li v-for="(item, index) in items" :key="index">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    items: Object as PropType<unknown[]>,
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0;

  &.horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
