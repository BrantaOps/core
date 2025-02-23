import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpandableTextComponent } from '../../../shared/components/expandable-text/expandable-text.component';
import { AddressClipboardItem, ClipboardItem, PaymentClipboardItem } from '../../../shared/models/clipboard-item';
import { BaseClipboardComponent } from '../base-clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateAgoComponent } from '../../../shared/components/date-ago/date-ago.component';

@Component({
    selector: 'app-clipboard-history',
    imports: [CommonModule, MatButtonModule, MatIconModule, ExpandableTextComponent, DatePipe, DateAgoComponent, MatTooltipModule],
    templateUrl: './clipboard-history.component.html',
    styleUrl: './clipboard-history.component.scss'
})
export class ClipboardHistoryComponent extends BaseClipboardComponent {
    @Input() history: (ClipboardItem | AddressClipboardItem | PaymentClipboardItem)[];
    @Input() clipboardContent: string | null | undefined;

    onCopyClipboard(text: string | null) {
        (window as any).electron.clipboard.writeText(text);
    }
}
