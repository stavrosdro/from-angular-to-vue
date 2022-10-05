import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ApiGetResponse, Job } from '../modules/home/types';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private url = environment.url;

    constructor(private http: HttpClient) {}

    fetchJobs(job?: Partial<Job>) {
        let params;
        if (job && 'name' in job && job.name?.trim()) {
            params = new HttpParams().append('name', job.name);
        }

        return this.http.get<ApiGetResponse<Job[]>>(`${this.url}/jobs`, {
            params,
        });
    }

    fetchJob(id: number) {
        return this.http.get<Job>(`${this.url}/jobs/${id}`);
    }
}
