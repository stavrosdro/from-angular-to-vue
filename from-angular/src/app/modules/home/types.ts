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

export enum ACTIONS {
    FETCH_JOBS = 'FETCH_JOBS',
    FETCH_JOB = 'FETCH_JOB',
}

export type ApiGetResponse<T> = {
    data: T;
    total: number;
};
