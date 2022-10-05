import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyListComponent } from './fancy-list.component';

describe('FancyListComponent', () => {
    let component: FancyListComponent;
    let fixture: ComponentFixture<FancyListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FancyListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FancyListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
