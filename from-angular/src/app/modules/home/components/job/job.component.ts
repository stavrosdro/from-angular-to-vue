import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Job } from '../../types';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobComponent {
    @Input() job!: Job;
    @Input() active = false;

    constructor() {}
}
