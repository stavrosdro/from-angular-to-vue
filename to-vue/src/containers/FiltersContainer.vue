<template>
  <form @submit.prevent="debounceSubmit">
    <div class="form-group">
      <input
        type="text"
        class=""
        v-model.trim="job.name"
        name="name"
        minlength="3"
        placeholder="Search jobs here..."
        @input="debounceSubmit"
      />
      <div class="error__wrapper">
        <span class="error__message" v-if="!jobValid">
          Use at least 3 characters
        </span>
      </div>
    </div>
    <button type="submit" :disabled="!jobValid" v-show="false"></button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["onSubmit"],
  data() {
    return {
      job: { name: "" },
      debounce: undefined,
    } as { job: { name: string }; debounce: number | undefined };
  },
  computed: {
    jobValid() {
      if (this.job.name.length === 0 || this.job.name.length > 2) {
        return true;
      }
      return false;
    },
  },
  methods: {
    onSubmit() {
      if (!this.jobValid) {
        return;
      }
      this.$emit("onSubmit", this.job);
    },
    debounceSubmit() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.onSubmit();
      }, 300);
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  .form-group {
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 24px;

    input {
      box-sizing: border-box;
      width: 100%;
      padding: 8px 16px;
      border-radius: 8px;
      border-color: #1e90ff;
      outline: none;
    }

    .error__wrapper {
      position: absolute;
      .error__message {
        margin-left: 8px;
        color: red;
      }
    }
  }
}
</style>
