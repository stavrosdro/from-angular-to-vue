import { defineStore } from "pinia";
import { ApiGetResponse, Job, RequestAbortError, State } from "./types";
import * as http from "@/http";

const url: string = process.env.VUE_APP_API_URL;

export const useCoreStore = defineStore("core", {
  state: (): State => ({
    jobs: [],
    selectedJob: undefined,
    loading: false,
    error: undefined,
  }),
  actions: {
    startLoading() {
      this.error = undefined;
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    },
    async fetchJobs(job?: Partial<Job>) {
      this.startLoading();

      let params = "";
      if (job && job.name?.trim()) {
        params = `?name=${job.name.trim()}`;
      }
      try {
        const jobs = await http.get<ApiGetResponse<Job[]>>(
          `${url}/jobs${params}`
        );
        this.jobs = jobs.data;
      } catch (error) {
        if (isRequestAbortError(error)) {
          return;
        }
        this.error = getErrorMessage(error);
      }

      this.stopLoading();
    },
    async fetchSelectedJob(id: number) {
      this.startLoading();

      try {
        const selectedJob = await http.get<Job>(`${url}/jobs/${id}`);
        this.selectedJob = selectedJob;
      } catch (error) {
        if (isRequestAbortError(error)) {
          return;
        }
        this.error = getErrorMessage(error);
      }

      this.stopLoading();
    },
    resetSelectedJob() {
      this.selectedJob = undefined;
    },
  },
});

function getErrorMessage(error: any): string {
  let errorMessage = "An error occurred. Try again later.";
  if (error.error?.message) {
    errorMessage = error.error.message;
  } else if (error.message) {
    errorMessage = error.message as string;
  }

  return errorMessage;
}

function isRequestAbortError(error: unknown): error is RequestAbortError {
  const verifyProps = (err: unknown): err is RequestAbortError => {
    return (
      typeof err === "object" &&
      err != null &&
      "code" in err &&
      "message" in err &&
      "name" in err
    );
  };
  const verifyValues = (err: RequestAbortError) => {
    return (
      err.code === 20 &&
      err.message === "The user aborted a request." &&
      err.name === "AbortError"
    );
  };

  return verifyProps(error) && verifyValues(error);
}
