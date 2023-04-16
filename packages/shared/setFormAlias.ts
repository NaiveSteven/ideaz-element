import { isUnDef } from '@ideaz/utils';

interface Props {
  alias?: {
    label?: string;
    value?: string;
    disabled?: string;
  };
  [key: string]: any;
}

export const setFormAlias = (props: Props) => {
  return {
    keys: {
      label: isUnDef(props.alias) ? 'label' : props.alias?.label || 'label',
      value: isUnDef(props.alias) ? 'value' : props.alias?.value || 'value',
      disabled: isUnDef(props.alias)
        ? 'disabled'
        : props.alias?.disabled || 'disabled',
    },
  };
};
