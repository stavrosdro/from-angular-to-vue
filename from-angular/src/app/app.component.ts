import { Component } from '@angular/core';
import { map } from 'rxjs';
import { StoreService } from './services/store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'from-angular';

    loading$ = this.store.store$.pipe(map((state) => state.loading));

    constructor(private store: StoreService) {}
}
