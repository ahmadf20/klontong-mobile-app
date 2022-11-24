import React, {ReactNode} from 'react';
import {FormControl as NbFormControl, IFormControlProps} from 'native-base';

type FormControlProps = IFormControlProps & {
  error?: string;
  label?: string;
  children?: ReactNode;
};

export const FormControl: React.FC<FormControlProps> = props => {
  return (
    <NbFormControl isInvalid={Boolean(props.error)} {...props}>
      {Boolean(props.label) && (
        <NbFormControl.Label>{props.label}</NbFormControl.Label>
      )}
      {props.children}
      <NbFormControl.ErrorMessage>{props.error}</NbFormControl.ErrorMessage>
    </NbFormControl>
  );
};
