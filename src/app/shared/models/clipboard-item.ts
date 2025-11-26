import { Bolt11Details } from './lightning';
import { Wallet } from './wallet.model';

export enum ClipboardItemType {
    Default = 'Default',
    Address = 'Address',
    Payment = 'Payment',
    Bolt11 = 'Bolt11',
    PublicKey = 'Public Key',
    PrivateKey = 'Private Key'
}

export interface ClipboardItem {
    name: string | null;
    value: string | null;
    private: boolean;
    type: ClipboardItemType;
    date: Date;
}

export interface AddressClipboardItem extends ClipboardItem {
    address: string;
    wallet: Wallet | null;
    derivationPath: string | null;
}

export interface PaymentClipboardItem extends ClipboardItem {
    payment: string;
    merchant: string;
    description: string | null;
}

export interface Bolt11ClipboardItem extends ClipboardItem, Bolt11Details {}

export const createClipboardItem = (partial: Partial<ClipboardItem>): ClipboardItem => {
    return {
        type: ClipboardItemType.Default,
        private: false,
        ...partial,
        date: new Date()
    } as ClipboardItem;
};

export const createAddressClipboardItem = (partial: Partial<AddressClipboardItem>): AddressClipboardItem => {
    return {
        name: 'Bitcoin Address',
        ...partial,
        value: partial.address,
        type: ClipboardItemType.Address,
        private: false,
        date: new Date()
    } as AddressClipboardItem;
};

export const createBolt11ClipboardItem = (partial: Partial<Bolt11ClipboardItem>): Bolt11ClipboardItem => {
    return {
        ...partial,
        name: 'Lightning Address',
        type: ClipboardItemType.Bolt11,
        private: false,
        date: new Date()
    } as Bolt11ClipboardItem;
};
