import {
    Component,
    ContentChild,
    Input,
    OnInit,
    TemplateRef,
} from '@angular/core';

@Component({
    selector: 'app-fancy-list',
    templateUrl: './fancy-list.component.html',
    styleUrls: ['./fancy-list.component.scss'],
})
export class FancyListComponent implements OnInit {
    @Input() list!: any[];
    @Input() horizontal = false;
    @ContentChild('outlet') outlet!: TemplateRef<any>;

    constructor() {}

    ngOnInit(): void {}
}
