<template>
  <HeaderView />
  <BaseLoader v-if="loading" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderView from "@/views/HeaderView.vue";
import BaseLoader from "./base/BaseLoader.vue";
import { useCoreStore } from "./core";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "App",
  components: {
    HeaderView,
    BaseLoader,
  },
  setup() {
    const store = useCoreStore();
    const { loading } = storeToRefs(store);

    return { loading };
  },
});
</script>

<style lang="scss">
a {
  color: #1e90ff;
  &.router-link-active {
    color: #42b983;
  }
}

.button {
  color: white;
  background-color: #1e90ff;
  padding: 8px 16px;
  margin: 8px;
  border: 1px solid #1e90ff;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &.float {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  &.scale-on-hover {
    &:hover {
      transform: scale(1.04);
    }
  }

  &.breathing {
    animation: breathing 2s infinite;

    @keyframes breathing {
      0% {
        transform: scale(1);
      }
      40% {
        transform: scale(1.04);
      }
      100% {
        transform: scale(1);
      }
    }
  }
}

.error {
  background-color: #ffbaba;
  color: tomato;
  margin: 8px;
  padding: 8px 16px;
  border-left: 4px solid tomato;
  border-radius: 4px;
  width: fit-content;
}
</style>
