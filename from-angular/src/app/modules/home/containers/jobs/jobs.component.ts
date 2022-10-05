import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { Job } from '../../types';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
    private jobs = this.store.store$.pipe(map((store) => store.jobs));
    private error = this.store.store$.pipe(map((store) => store.error));
    private selectedJobId$ = this.store.store$.pipe(
        map((store) => store.selectedJob?.id)
    );

    data = combineLatest({
        jobs: this.jobs,
        error: this.error,
        selectedJobId: this.selectedJobId$,
    });

    constructor(private store: StoreService, private router: Router) {}

    ngOnInit(): void {
        this.onFetchJobs();
    }

    onFetchJobs() {
        setTimeout(() => {
            this.store.onFetchJobs();
        }, 0);
    }

    onJobClick(job: Job) {
        this.router.navigate([`/home/${job.id}`]);
    }
}
