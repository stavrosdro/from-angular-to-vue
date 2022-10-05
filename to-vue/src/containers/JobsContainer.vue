<template>
  <div class="error" v-if="error">{{ error }}</div>
  <FancyList :items="jobs">
    <template #item="job">
      <JobComponent
        :job="job"
        :active="selectedJobId === job.id"
        @click="onJobClick(job)"
      />
    </template>
  </FancyList>
  <button class="button" type="button" @click="onFetchJobs">Refresh</button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Job } from "@/types";
import JobComponent from "@/components/JobComponent.vue";
import router from "@/router";
import { useCoreStore } from "@/core";

export default defineComponent({
  components: { JobComponent },
  setup() {
    const store = useCoreStore();

    const selectedJobId = computed(() => store.selectedJob?.id);
    const jobs = computed(() => store.jobs);
    const error = computed(() => store.error);

    function onFetchJobs() {
      store.fetchJobs();
    }
    function onJobClick(job: Job) {
      router.push(`/home/${job.id}`);
    }
    return { error, jobs, selectedJobId, onFetchJobs, onJobClick };
  },
  created() {
    this.onFetchJobs();
  },
});
</script>
