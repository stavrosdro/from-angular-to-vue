<template>
  <div class="job" :class="{ active }">
    <div class="title">{{ job.name }}</div>
    <div class="salary">
      <span>{{ salaryWithCurrency }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Job } from "@/types";
import { getCurrency } from "@/utils";

export default defineComponent({
  props: {
    job: {
      type: Object as PropType<Job>,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    salaryWithCurrency() {
      return getCurrency(this.job.salary);
    },
  },
});
</script>

<style lang="scss" scoped>
@mixin active {
  transform: scale(1.02);
  background-color: #42b983;
  .title,
  .salary {
    color: #fff;
  }
}

.job {
  padding: 16px;
  margin: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active {
    @include active();
  }

  &.active {
    @include active();
  }

  .title {
    color: #1e90ff;
  }

  .salary {
    color: brown;
  }
}
</style>
