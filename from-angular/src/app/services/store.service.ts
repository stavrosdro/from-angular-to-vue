import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    combineLatest,
    filter,
    of,
    ReplaySubject,
    retry,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs';
import { ACTIONS, ApiGetResponse, Job, State } from '../modules/home/types';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    private store = new BehaviorSubject<State>({
        jobs: [],
        selectedJob: undefined,
        loading: false,
        error: undefined,
    });

    store$ = this.store.asObservable();

    private actions = new ReplaySubject<{ action: ACTIONS; payload?: any }>(1);
    private actions$ = this.actions.asObservable();

    fetchJobs$ = this.actions$.pipe(
        filter((event) => event.action === ACTIONS.FETCH_JOBS),
        switchMap((event) => this.fetchJobs(event.payload as Partial<Job>)),
        shareReplay(1)
    );

    fetchJob$ = this.actions$.pipe(
        filter((event) => event.action === ACTIONS.FETCH_JOB),
        switchMap((event) => this.fetchJob(event.payload as number)),
        shareReplay(1)
    );
    private httpRequests$ = combineLatest([this.fetchJobs$, this.fetchJob$]);

    constructor(private api: ApiService) {
        this.httpRequests$.subscribe();
    }

    onFetchJobs(job?: Partial<Job>) {
        this.actions.next({ action: ACTIONS.FETCH_JOBS, payload: job });
    }

    onFetchJob(id: number) {
        this.actions.next({ action: ACTIONS.FETCH_JOB, payload: id });
    }

    onResetSelectedJob() {
        const oldState = this.store.getValue();
        this.store.next({
            ...oldState,
            selectedJob: undefined,
        });
    }

    private fetchJobs(job?: Partial<Job>) {
        this.startHttpRequest();
        return this.api.fetchJobs(job).pipe(
            retry(2),
            tap({
                next: (jobs) => {
                    const oldState = this.store.getValue();
                    this.store.next({
                        ...oldState,
                        jobs: jobs.data,
                        loading: false,
                    });
                },
                error: (err) => this.handleError(err),
            }),
            catchError(() => of<ApiGetResponse<Job[]>>({ data: [], total: 0 }))
        );
    }

    private fetchJob(id: number) {
        this.startHttpRequest();
        return this.api.fetchJob(id).pipe(
            retry(2),
            tap({
                next: (res) => {
                    const oldState = this.store.getValue();
                    this.store.next({
                        ...oldState,
                        selectedJob: res,
                        loading: false,
                    });
                },
                error: (err) => this.handleError(err),
            }),
            catchError(() => of<Job | undefined>(undefined))
        );
    }

    private startHttpRequest() {
        const oldState = this.store.getValue();
        this.store.next({
            ...oldState,
            loading: true,
            error: undefined,
        });
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);

        let errorMessage = 'An error occurred. Try again later.';
        if (error.error?.message) {
            errorMessage = error.error.message;
        } else if (error.message) {
            errorMessage = error.message as string;
        }

        const oldState = this.store.getValue();
        this.store.next({
            ...oldState,
            loading: false,
            error: errorMessage,
        });
    }
}
