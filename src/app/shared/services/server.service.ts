import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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
        return this.httpClient.get<PaymentClipboardItem[]>(`${this.baseUrl}/v2/payments/${encodeURIComponent(value)}`);
    }

    private get baseUrl(): string {
        if (environment.production == false) {
            return 'http://localhost:3000';
        }

        const subdomain = this.settingsService.settings().developerMode ? 'staging' : 'guardrail';

        return `https://${subdomain}.branta.pro/v2`;
    }
}
