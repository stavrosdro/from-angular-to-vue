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
