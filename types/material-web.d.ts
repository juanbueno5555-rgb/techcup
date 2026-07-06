/**
 * JSX typings for the @material/web custom elements used across TechCup.
 * Attributes are kebab-case strings/numbers/booleans; event handlers use the
 * lowercase native names (oninput / onchange) so React 19 attaches them as
 * native listeners.
 *
 * With React 19 + react-jsx, IntrinsicElements lives in React's JSX namespace,
 * not the global one — so we augment `react` instead.
 */
type MdBase = {
  slot?: string
  class?: string
  disabled?: boolean
  value?: string | number
  children?: React.ReactNode
  key?: React.Key
  ref?: React.Ref<any>
  style?: React.CSSProperties
  oninput?: (e: Event) => void
  onchange?: (e: Event) => void
  onclick?: (e: Event) => void
}

type MdButton = MdBase & {
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
  trailingIcon?: boolean
  'trailing-icon'?: boolean
}

type MdTextField = MdBase & {
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  rows?: number
  error?: boolean
  'error-text'?: string
  'supporting-text'?: string
  'prefix-text'?: string
  'suffix-text'?: string
  name?: string
}

type MdSelect = MdBase & {
  label?: string
  required?: boolean
  name?: string
}

type MdSelectOption = MdBase & {
  selected?: boolean
  value?: string
}

type MdCheckbox = MdBase & {
  checked?: boolean
  indeterminate?: boolean
  name?: string
}

type MdSwitch = MdBase & {
  selected?: boolean
  name?: string
}

type MdIcon = MdBase & { filled?: boolean }

type MdTabs = MdBase & { 'active-tab-index'?: number }

type MdChip = MdBase & {
  label?: string
  selected?: boolean
  href?: string
}

import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': MdButton
      'md-outlined-button': MdButton
      'md-text-button': MdButton
      'md-elevated-button': MdButton
      'md-filled-tonal-button': MdButton
      'md-icon-button': MdButton
      'md-filled-icon-button': MdButton
      'md-filled-tonal-icon-button': MdButton
      'md-outlined-icon-button': MdButton
      'md-fab': MdButton & { label?: string; size?: string; variant?: string }
      'md-branded-fab': MdButton & { label?: string }
      'md-filled-text-field': MdTextField
      'md-outlined-text-field': MdTextField
      'md-filled-select': MdSelect
      'md-outlined-select': MdSelect
      'md-select-option': MdSelectOption
      'md-checkbox': MdCheckbox
      'md-radio': MdBase & { name?: string; checked?: boolean; value?: string }
      'md-switch': MdSwitch
      'md-slider': MdBase & {
        min?: number
        max?: number
        step?: number
        ticks?: boolean
        labeled?: boolean
        range?: boolean
      }
      'md-icon': MdIcon
      'md-divider': MdBase & { inset?: boolean }
      'md-elevation': MdBase
      'md-ripple': MdBase
      'md-list': MdBase
      'md-list-item': MdBase & { type?: string; href?: string }
      'md-chip-set': MdBase
      'md-assist-chip': MdChip
      'md-filter-chip': MdChip
      'md-input-chip': MdChip
      'md-suggestion-chip': MdChip
      'md-dialog': MdBase & { open?: boolean }
      'md-linear-progress': MdBase & { value?: number; indeterminate?: boolean }
      'md-circular-progress': MdBase & { value?: number; indeterminate?: boolean }
      'md-tabs': MdTabs
      'md-primary-tab': MdBase
      'md-secondary-tab': MdBase
      'md-menu': MdBase & { open?: boolean; anchor?: string }
      'md-menu-item': MdBase
      'md-elevated-card': MdBase
      'md-filled-card': MdBase
      'md-outlined-card': MdBase
      'md-badge': MdBase & { value?: string }
    }
  }
}

export {}
