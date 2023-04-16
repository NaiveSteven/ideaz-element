import type { OptionsItem } from './common';

export interface BtnItem {
  label?: string;
  type?: string;
  isDisabled?: (row: any, index: number, column: any) => boolean;
  disabled?: ((row: any, index: number) => boolean) | boolean;
  whenShowCb?: (row: any, index: number, column: any) => boolean;
  hide?: ((row: any, index: number) => boolean) | boolean;
  click?: (row: any, index: number, column: any) => void;
  [propName: string]: any;
}

export interface TableCol {
  // slot?: string;
  // headerSlot?: string;
  type?: string;
  btnList?: BtnItem[];
  buttons?: BtnItem[];
  attrs?: {
    [propName: string]: any;
  };
  on?: {
    [propName: string]: any;
  };
  isDisabled?: any;
  disabled?: ((row: any, index: number) => boolean) | boolean;
  options?: OptionsItem[];
  dropdown?:
    | number
    | number[]
    | {
        maxlength?: number;
        exclude?: number[];
        dropdownItem?: IndexType;
        reference?: string | any;
        [propName: string]: any;
      }
    | any;
  [propName: string]: any;
}
