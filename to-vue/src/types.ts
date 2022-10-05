export type Job = {
  id: number;
  name: string;
  company: string;
  date: {
    from: Date;
    to: Date;
  };
  requirements: string[];
  niceToHave: string[];
  salary: number;
};

export type State = {
  jobs: Job[];
  selectedJob: Job | undefined;
  loading: boolean;
  error: string | undefined;
};

export type ApiGetResponse<T> = {
  data: T;
  total: number;
};

export type RequestAbortError = {
  code: number;
  message: string;
  name: string;
};
