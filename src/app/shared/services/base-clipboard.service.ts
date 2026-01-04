import { lastValueFrom } from 'rxjs';
import {
    ClipboardItem,
    ClipboardItemType,
    PaymentClipboardItem,
    createAddressClipboardItem,
    createBolt11ClipboardItem,
    createClipboardItem
} from '../models/clipboard-item';
import { Settings } from '../models/settings';
import { Vault } from '../models/vault.model';
import { Wallet } from '../models/wallet.model';
import { ExtendedKeyRegExp, LightningAddressRegExp, NostrPrivateKeyRegExp, NostrPubKeyRegExp, isBitcoinAddress } from './regex';
import { ServerService } from './server.service';

export class BaseClipboardService {
    public static async getClipboardItem(
        text: string,
        notify: boolean,
        vaults: Vault[],
        wallets: Wallet[],
        settings: Settings,
        serverService: ServerService
    ): Promise<ClipboardItem | null> {
        if (text == '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa') {
            if (settings?.generalNotifications.bitcoinAddress && notify) {
                await window.electron.showNotification('Clipboard: Bitcoin genesis block address', 'We are all Satoshi');
            }

            return createAddressClipboardItem({
                name: 'Bitcoin Address: Genesis Block',
                address: text
            });
        }

        if (isBitcoinAddress(text)) {
            const vault = await window.electron.verifyAddress(vaults, text);

            if (vault) {
                if (settings?.generalNotifications.bitcoinAddress && notify) {
                    await window.electron.showNotification(`Clipboard: Valut Match - ${vault.wallet?.name}`, ` ${BaseClipboardService.getAddressText(text)} (Derivation ${vault.derivationPath})`);
                }

                return vault;
            }

            const wallet = await window.electron.verifyAddress(wallets, text);

            // Found the users wallet
            if (wallet) {
                if (settings?.generalNotifications.bitcoinAddress && notify) {
                    await window.electron.showNotification(`Clipboard: Wallet Match - ${wallet.wallet?.name}`, ` ${BaseClipboardService.getAddressText(text)} (Derivation ${wallet.derivationPath})`);
                }

                return wallet;
            }
            // Didn't find the users wallet
            else {
                if (settings?.generalNotifications.bitcoinAddress && notify) {
                    await window.electron.showNotification('Clipboard: Unknown Bitcoin Address', BaseClipboardService.getAddressText(text));
                }

                return createAddressClipboardItem({
                    address: text
                });
            }
        }

        if (ExtendedKeyRegExp.test(text)) {
            if (settings?.generalNotifications.bitcoinPublicKey && notify) {
                await window.electron.showNotification('Clipboard: Bitcoin Extended Public Key', 'Sharing can lead to loss of privacy.');
            }

            return createClipboardItem({
                name: 'Extended Public Key',
                value: text,
                type: ClipboardItemType.PublicKey
            });
        }

        if (NostrPubKeyRegExp.test(text)) {
            if (settings?.generalNotifications.nostrPublicKey && notify) {
                await window.electron.showNotification('Clipboard: Nostr Public Key', text);
            }

            return createClipboardItem({
                name: 'Nostr Public Key',
                value: text,
                type: ClipboardItemType.PublicKey
            });
        }

        if (NostrPrivateKeyRegExp.test(text)) {
            if (settings?.generalNotifications.nostrPrivateKey && notify) {
                await window.electron.showNotification('Clipboard: Nostr Private Key', 'Never share this.');
            }

            return createClipboardItem({
                name: 'Nostr Private Key',
                value: text,
                type: ClipboardItemType.PrivateKey
            });
        }

        if (LightningAddressRegExp.test(text)) {
            const result = await window.electron.decodeLightning(text);

            if (!result) {
                return null;
            }

            if (settings?.generalNotifications.lightningAddress && notify) {
                await window.electron.showNotification('Clipboard: Lightning Address', 'Lightning Address Detected.');
            }

            return createBolt11ClipboardItem({
                value: text,
                ...result
            });
        }

        return null;
    }

    private static getAddressText(text: string) : string {
        return `${text.substring(0, 6)}...${text.substring(text.length - 5)}`
    }
}
