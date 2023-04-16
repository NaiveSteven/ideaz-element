export interface RowLayout {
  type?: string
  justify?: string
  items?: string
  content?: string
  direction?: string
  wrap?: string
}
export interface ColLayout {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}
export interface Layout {
  rowLayout?: RowLayout
  colLayout?: ColLayout
}
