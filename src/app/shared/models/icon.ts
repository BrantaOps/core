export enum Icon {
    Default = 0,
    Purple = 5,
    Teal = 6,
    Rust = 7
}

export interface IconOption {
    label: string;
    value: number;
    icon: string;
}

export var iconOptions: IconOption[] = [
    {
        label: 'Default',
        icon: 'default.svg',
        value: Icon.Default,
    },
    {
        label: 'Purple',
        icon: 'purple.svg',
        value: Icon.Purple
    },
    {
        label: 'Teal',
        icon: 'teal.svg',
        value: Icon.Teal
    },
    {
        label: 'Rust',
        icon: 'rust.svg',
        value: Icon.Rust
    },
];
