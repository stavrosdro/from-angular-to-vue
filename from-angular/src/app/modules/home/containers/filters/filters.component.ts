import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Job } from '../../types';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnDestroy {
    job: Partial<Job> = { name: '' };
    debounce = new Subject();
    subscription: Subscription | undefined;
    @Output() formSubmit = new EventEmitter();

    constructor() {
        this.debounce
            .pipe(debounceTime(300))
            .subscribe((value) => this.formSubmit.emit(value));
    }

    onSubmit(form: FormGroup) {
        if (form.invalid) {
            form.markAsTouched();
            return;
        }

        this.debounce.next(form.value);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe;
        this.debounce.complete();
    }
}
