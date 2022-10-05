import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Job } from '../../types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private store: StoreService) {}

    onFormSubmit(event: Partial<Job>) {
        this.store.onFetchJobs(event);
    }
}
