import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { Job } from '../../types';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
    job!: Job;
    subscription!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: StoreService
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.data.subscribe(
            (data) => (this.job = data['job'])
        );
    }

    navigate() {
        this.router.navigate([{ outlets: { modal: 'apply' } }], {
            relativeTo: this.route.parent?.parent,
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.store.onResetSelectedJob();
    }
}
