import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, Subscription, take } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

enum LOCAL_STORAGE_KEY {
    PERSONAL_FIELDS_V1 = 'PERSONAL_FIELDS_V1',
}

type PersonalFields = {
    firstName: string;
    lastName: string;
    email: string;
};

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    subscription: Subscription | undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: StoreService
    ) {
        this.store.store$
            .pipe(
                filter((state) => !!state.selectedJob),
                take(1)
            )
            .subscribe((state) => {
                this.initForm(
                    `${state.selectedJob!.name} @ ${
                        state.selectedJob!.company
                    }`,
                    state.selectedJob!.id
                );
                this.postInitFormPatch();
            });
    }

    ngOnInit(): void {
        this.subscription = this.form.valueChanges
            .pipe(debounceTime(300))
            .subscribe((value) => {
                const { firstName, lastName, email } = value;
                localStorage.setItem(
                    LOCAL_STORAGE_KEY.PERSONAL_FIELDS_V1,
                    JSON.stringify({
                        firstName,
                        lastName,
                        email,
                    })
                );
            });
    }

    private initForm(jobTitle: string, jobId: number) {
        this.form = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            jobTitleAndCompany: new FormControl({
                value: jobTitle,
                disabled: true,
            }),
            jobId: new FormControl(jobId),
        });
    }

    private postInitFormPatch() {
        const personalFieldsString = localStorage.getItem(
            LOCAL_STORAGE_KEY.PERSONAL_FIELDS_V1
        );
        if (personalFieldsString) {
            const { firstName, lastName, email } = JSON.parse(
                personalFieldsString
            ) as PersonalFields;
            this.form.patchValue({ firstName });
            this.form.patchValue({ lastName });
            this.form.patchValue({ email });
            this.form.updateValueAndValidity();
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        console.log(this.form.value);
    }

    onCloseDialog() {
        this.router.navigate([{ outlets: { modal: null } }], {
            relativeTo: this.route.parent?.parent,
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
