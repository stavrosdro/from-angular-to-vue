import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FancyListComponent } from './fancy-list/fancy-list.component';
import { LoaderComponent } from './loader/loader.component';
import { BadgeComponent } from './badge/badge.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [
        FancyListComponent,
        LoaderComponent,
        BadgeComponent,
        DialogComponent,
    ],
    imports: [CommonModule],
    exports: [
        FancyListComponent,
        LoaderComponent,
        BadgeComponent,
        DialogComponent,
    ],
})
export class SharedModule {}
