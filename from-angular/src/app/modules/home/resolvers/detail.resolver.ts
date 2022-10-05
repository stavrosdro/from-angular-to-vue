import { Injectable, OnDestroy } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, map, Observable, Subject } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { Job } from '../types';

@Injectable({
    providedIn: 'root',
})
export class DetailResolver implements Resolve<Job>, OnDestroy {
    unsubscribe = new Subject<boolean>();
    unsubscribe$ = this.unsubscribe.asObservable();

    constructor(private store: StoreService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Job> {
        const id = +route.params['id'];

        this.store.onFetchJob(id);

        return this.store.store$.pipe(
            map((state) => state.selectedJob),
            filter((selectedJob) => selectedJob != undefined),
            filter((selectedJob) => selectedJob!.id == id)
        ) as Observable<Job>;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next(true);
    }
}
