import type { BtnItem } from '~/types'

export const useIsShowButton = (button: BtnItem, row: any, index: number, column: any) => {
  const keys = Object.keys(button)
  if (keys.includes('hide') || keys.includes('whenShowCb')) {
    return typeof button.hide === 'boolean'
      ? !button.hide
      : typeof button.hide === 'function'
        ? !(button.hide as (row: any, index: number, column: any) => boolean)(row, index, column)
        : typeof button.whenShowCb === 'boolean'
          ? button.whenShowCb
          : typeof button.whenShowCb === 'function'
            ? (button.whenShowCb as (row: any, index: number, column: any) => boolean)(
                row,
                index,
                column,
              )
            : true
  }
  return true
}
