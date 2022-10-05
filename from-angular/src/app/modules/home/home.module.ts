import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home/home.component';
import { JobsComponent } from './containers/jobs/jobs.component';
import { FiltersComponent } from './containers/filters/filters.component';
import { SharedModule } from '../shared/shared.module';
import { JobComponent } from './components/job/job.component';
import { DetailComponent } from './components/detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponent } from './containers/application/application.component';

@NgModule({
    declarations: [
        HomeComponent,
        JobsComponent,
        FiltersComponent,
        JobComponent,
        DetailComponent,
        ApplicationComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class HomeModule {}
