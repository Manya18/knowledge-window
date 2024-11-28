export interface HeaderCustomizationType {
    bgColor: string;
    textColor: string;
    fontFamily: string;
    fontSize: number;
    logo: string | null;
    logoSize: string | null
}

export interface DialogCustomizationType {
    bgColor: string;
    textColor: string;
    messageBg: string;
    borderColor: string;
    fontFamily: string;
    fontSize: number;
}

export interface CustomizationType {
    header: HeaderCustomizationType,
    dialog: DialogCustomizationType
}