import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentClipboardItem } from '../models/clipboard-item';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    constructor(
        private settingsService: SettingsService,
        private httpClient: HttpClient
    ) {}

    getPayment(value: string): Observable<PaymentClipboardItem[]> {
        return this.httpClient.get<PaymentClipboardItem[]>(`${this.baseUrl}/payments/${encodeURIComponent(value)}`);
    }

    private get baseUrl(): string {
        const subdomain = this.settingsService.settings().developerMode ? 'staging' : 'guardrail';

        return `https://${subdomain}.branta.pro/v2`;
    }
}
