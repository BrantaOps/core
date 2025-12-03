import { SlicePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-expandable-text',
    imports: [SlicePipe],
    templateUrl: './expandable-text.component.html',
    styleUrl: './expandable-text.component.scss'
})
export class ExpandableTextComponent implements OnInit {
    @Input() text: string | null;
    @Input() isAddress: boolean;

    isLarge: boolean = false;
    isExpanded: boolean = true;

    LETTERS = 10;

    prefixes = {
        4: ['lnbc', 'lntb', 'bc1q', 'bc1p', 'bcrt', 'tb1q', 'tb1p', 'ark1'],
        1: ['1', '3']
    };

    ngOnInit(): void {
        if (this.text && this.text.length > 200) {
            this.isLarge = true;
            this.isExpanded = false;
        }
    }

    toggle() {
        if (!this.isLarge) return;

        this.isExpanded = !this.isExpanded;
    }

    getText(): string | null {
        if (!this.text) {
            return null;
        }

        if (!this.isExpanded) {
            return this.text?.substring(0, 4 + this.LETTERS) + '...' + this.text?.slice(-this.LETTERS);
        }

        return this.text;
    }

    getPrefixLength(): number {
        if (!this.text || this.text.trim() === '') {
            return 0;
        }

        const sortedPrefixes = Object.entries(this.prefixes)
            .map(([key, value]) => [parseInt(key), value] as [number, string[]])
            .filter(([length]) => length <= this.text!.length)
            .sort(([a], [b]) => a - b);

        for (const [length, prefixList] of sortedPrefixes) {
            if (prefixList.includes(this.text.substring(0, length))) {
                return length;
            }
        }

        return 0;
    }
}
