import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    @Output() closeDialog = new EventEmitter();

    constructor() {}

    onCloseDialog() {
        this.closeDialog.emit();
    }
}
