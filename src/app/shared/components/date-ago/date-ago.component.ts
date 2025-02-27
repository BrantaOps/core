import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';

@Component({
    selector: 'app-date-ago',
    imports: [DateAgoPipe],
    template: `{{ value | dateAgo: currentTime }}`
})
export class DateAgoComponent implements OnInit, OnDestroy {
    @Input() value: Date;
    currentTime: Date = new Date();

    private intervalId: any;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.intervalId = setInterval(() => {
            this.cdr.detectChanges();
            this.currentTime = new Date();
        }, 5000);
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
