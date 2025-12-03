import { effect, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ClipboardItem } from '../models/clipboard-item';
import { ClipboardService } from './clipboard.service';
import { SettingsService } from './settings.service';
import { ClipboardHistoryRolloffType } from '../models/settings';
import { sub, subMonths, subWeeks } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    private _history: ClipboardItem[] = [];
    public history = new ReplaySubject<ClipboardItem[]>();

    constructor(
        public clipboardService: ClipboardService,
        private settingsService: SettingsService
    ) {
        if (!this.settingsService.isLoading()) {
            this.load();
        } else {
            effect(() => {
                if (!this.settingsService.isLoading()) {
                    this.load();
                }
            });
        }

        this.clipboardService.clipboardItem.subscribe((item: ClipboardItem | null) => {
            if (item && item.value && !item.private && item.value !== this._history[0]?.value) {
                this._history.unshift(item);
                this.save();
            }
        });
    }

    clearHistory(): void {
        this._history = [];

        this.save();
    }

    private async load(): Promise<void> {
        var history = (await window.electron.retrieveData('history')) as ClipboardItem[];

        var isMissingDate = history.some((h) => h.date === undefined);

        if (isMissingDate) {
            history.forEach((h) => (h.date ??= new Date()));
        }

        var filterDate = this.getDateFilter();

        if (filterDate) {
            history = history.filter((h) => {
                return new Date(h.date) >= filterDate!;
            });
        }

        this._history = history;

        this.save();
    }

    private getDateFilter(): Date | null {
        const today = new Date();

        switch (this.settingsService.settings().clipboardHistory.rolloffType) {
            case ClipboardHistoryRolloffType.OneWeek:
                return subWeeks(today, 1);
            case ClipboardHistoryRolloffType.FourWeek:
                return subWeeks(today, 4);
            case ClipboardHistoryRolloffType.ThreeMonths:
                return subMonths(today, 3);
            case ClipboardHistoryRolloffType.Never:
            default:
                return null;
        }
    }

    private async save() {
        await window.electron.storeData('history', this._history);

        this.update();
    }

    private update() {
        this.history.next(this._history);
    }
}
