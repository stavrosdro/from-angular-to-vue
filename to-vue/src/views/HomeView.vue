<template>
  <section class="home-container">
    <div class="master-container">
      <FiltersContainer @on-submit="onFetchJobs" />
      <JobsContainer />
    </div>
    <div class="detail-container">
      <router-view />
    </div>
    <router-view name="modal"></router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FiltersContainer from "@/containers/FiltersContainer.vue";
import JobsContainer from "@/containers/JobsContainer.vue";
import { useCoreStore } from "@/core";
import { Job } from "@/types";
import router from "@/router";

export default defineComponent({
  name: "HomeView",
  components: {
    FiltersContainer,
    JobsContainer,
  },
  setup() {
    const store = useCoreStore();

    function onFetchJobs(job: Partial<Job>) {
      console.log(job);

      store.fetchJobs(job);
    }

    function navigate() {
      const id = +router.currentRoute.value.params["id"];
      router.push(`/home/${id}/apply`);
    }

    return { onFetchJobs, navigate };
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;

  .master-container {
    width: 33.33%;
  }

  .detail-container {
    width: 66.66%;
  }
}
</style>
