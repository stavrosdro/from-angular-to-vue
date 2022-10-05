import { Express, Request, Response } from 'express';
import { Job } from './types';
const express = require('express');
const cors = require('cors');

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;

const timeout = 800;
const timeoutSmall = 100;

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Hello There!' });
});

const getJobsResponse: Job[] = require('./db/jobs');
app.get('/jobs', (req: Request, res: Response) => {
    let filteredResponse: Job[] = getJobsResponse;
    const jobName = req.query['name'];

    if (typeof jobName === 'string' && jobName.trim()) {
        filteredResponse = getJobsResponse.filter((job) =>
            job.name.toLowerCase().includes(jobName.toLowerCase())
        );
    }

    setTimeout(() => {
        Math.random() < 0.7
            ? res.json({
                  data: filteredResponse,
                  total: getJobsResponse.length,
              })
            : res.status(500).send({
                  message: 'An unexpected error occurred. Try again later.',
              });
    }, timeout);
});

app.get('/jobs/:id', (req: Request, res: Response) => {
    const selectedJob = getJobsResponse.find(
        (job) => job.id == +req.params['id']
    );
    setTimeout(() => {
        Math.random() < 0.7
            ? res.json(selectedJob)
            : res.status(500).send({
                  message: 'An unexpected error occurred. Try again later.',
              });
    }, timeoutSmall);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
