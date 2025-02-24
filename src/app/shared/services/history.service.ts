import { effect, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ClipboardItem } from '../models/clipboard-item';
import { ClipboardService } from './clipboard.service';
import { SettingsService } from './settings.service';
import { ClipboardHistoryRolloffType } from '../models/settings';

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

        switch (this.settingsService.settings().clipboardHistory.rolloffType) {
            case ClipboardHistoryRolloffType.SixtyDays:
                const today = new Date();
                const sixtyDaysAgo = new Date(today);
                sixtyDaysAgo.setDate(today.getDate() - 60);
                history = history.filter((h) => {
                    return new Date(h.date) >= sixtyDaysAgo;
                });
                break;
            case ClipboardHistoryRolloffType.Never:
            default:
                break;
        }

        this._history = history;

        this.save();
    }

    private async save() {
        await window.electron.storeData('history', this._history);

        this.update();
    }

    private update() {
        this.history.next(this._history);
    }
}
