// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    ZForm: typeof import('@ideaz/element')['ZForm']
    ZSelect: typeof import('@ideaz/element')['ZSelect'];
    ZCheckbox: typeof import('@ideaz/element')['ZCheckbox'];
    ZRadio: typeof import('@ideaz/element')['ZRadio'];
    ZTable: typeof import('@ideaz/element')['ZTable'];
    ZCrud: typeof import('@ideaz/element')['ZCrud'];
    ZInput: typeof import('@ideaz/element')['ZInput'];
    ZTagSelect: typeof import('@ideaz/element')['ZTagSelect'];
    ZTagSelectItem: typeof import('@ideaz/element')['ZTagSelectItem'];
    ZText: typeof import('@ideaz/element')['ZText'];
    ZWatermark: typeof import('@ideaz/element')['ZWatermark'];
    ZCheckCard: typeof import('@ideaz/element')['ZCheckCard'];
    ZCheckCardItem: typeof import('@ideaz/element')['ZCheckCardItem'];
    ZDescription: typeof import('@ideaz/element')['ZDescription'];
    ZFullScreen: typeof import('@ideaz/element')['ZFullScreen'];
    ZDialogTip: typeof import('@ideaz/element')['ZDialogTip'];
    ZTableCustomColumnContainer: typeof import('@ideaz/element')['ZTableCustomColumnContainer'];
  }
}

export {};
