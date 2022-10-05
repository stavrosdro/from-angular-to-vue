<template>
  <div class="badge" :class="{ warn }">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    warn: {
      type: Boolean,
    },
  },
});
</script>
<style lang="scss" scoped>
.badge {
  padding: 8px 16px;
  margin: 4px;
  color: #fff;
  font-weight: 700;
  border-radius: 8px;
  background-color: #42b983;
  text-align: center;
  width: fit-content;

  &.warn {
    background-color: #1e90ff;
  }
}
</style>
