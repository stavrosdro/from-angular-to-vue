<template>
  <div class="detail">
    <div class="easy-apply">
      <button @click="navigate" class="button float breathing scale-on-hover">
        Apply Now!
      </button>
    </div>
    <div class="top">
      <h4>Job Details</h4>
      <div class="position">
        Position: <span>{{ job.name }}</span>
      </div>
      <div class="company">
        Company: <span>{{ job.company }}</span>
      </div>
    </div>

    <div class="main">
      <h5>Abstract</h5>
      <div class="abstract">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <h5>Requirements</h5>
      <div class="requirements">
        <FancyList :items="requirements" horizontal>
          <template #item="{ name }">
            <BaseBadge warn>
              <span>{{ name }}</span>
            </BaseBadge>
          </template>
        </FancyList>
      </div>
      <h5>Nice to have</h5>
      <div class="nice-to-have">
        <FancyList :items="niceToHave" horizontal>
          <template #item="{ name }">
            <BaseBadge>
              <span>{{ name }}</span>
            </BaseBadge>
          </template>
        </FancyList>
      </div>
    </div>

    <div class="bottom">
      <h5>Other</h5>
      <div class="salary">
        Salary: <span>{{ salaryWithCurrency }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Job } from "@/types";
import { useCoreStore } from "@/core";
import BaseBadge from "@/base/BaseBadge.vue";
import router from "@/router";
import { getCurrency } from "@/utils";

export default defineComponent({
  components: { BaseBadge },
  async beforeRouteEnter(to, __, next) {
    const store = useCoreStore();
    const id = +to.params.id;
    await store.fetchSelectedJob(id);
    if (store.selectedJob && store.selectedJob?.id === id) {
      next(true);
    } else {
      next(false);
    }
  },
  async beforeRouteUpdate(to, __, next) {
    const store = useCoreStore();
    const id = +to.params.id;
    await store.fetchSelectedJob(id);
    if (store.selectedJob && store.selectedJob?.id === id) {
      next(true);
    } else {
      next(false);
    }
  },
  beforeUnmount() {
    const store = useCoreStore();
    store.resetSelectedJob();
  },
  setup() {
    const store = useCoreStore();
    const job = computed(() => store.selectedJob as Job);

    const requirements = computed(() =>
      job.value.requirements.map((req) => ({ name: req }))
    );

    const niceToHave = computed(() =>
      job.value.niceToHave.map((nth) => ({ name: nth }))
    );

    const salaryWithCurrency = computed(() => getCurrency(job.value.salary));

    function navigate() {
      const id = router.currentRoute.value.params["id"];
      router.push(`/home/${id}/apply`);
    }

    return { job, requirements, niceToHave, salaryWithCurrency, navigate };
  },
});
</script>

<style lang="scss" scoped>
.detail {
  position: relative;

  .easy-apply {
    position: absolute;
    top: 0;
    right: 16px;
  }

  .top {
    margin: 24px 16px;
    .position,
    .company {
      font-style: italic;
      span {
        font-weight: 700;
        font-style: normal;
        color: #1e90ff;
      }
    }
  }

  .main {
    margin: 24px 16px;
    .abstract {
      font-style: italic;
    }
  }

  .bottom {
    margin: 24px 16px;
    .salary {
      font-style: italic;
      span {
        font-weight: 700;
        font-style: normal;
        color: brown;
      }
    }
  }
}
</style>
