import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

function NumericInput({ onChange, ...props }) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onChange(nextUserInput);
    }
  };

  return (
    <TextField
      onChange={e => {
        enforcer(e.target.value.replace(/,/g, '.'));
      }}
      fullWidth
      //minLength={1}
      //maxLength={79}
      type="text"
      InputProps={
        {
          //pattern: '^[0-9]*[.,]?[0-9]*$',
        }
      }
      {...props}
    />
  );
}

export default NumericInput;
