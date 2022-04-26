import {
    DropdownWrapper,
    StyledSelect,
    StyledOption,
    StyledLabel,
    StyledButton,
  } from "./styles.js";
  
  export function Dropdown(props) {
    return (
      <DropdownWrapper onChange={props.onChange}>
        <StyledLabel htmlFor="functions">
          {props.formLabel}
        </StyledLabel>
        <StyledSelect id="functions" name="functions">
          {props.children}
        </StyledSelect>
      </DropdownWrapper>
    );
  }
  
  export function Option(props) {
    return (
      <StyledOption selected={props.selected}>
        {props.value.name}
      </StyledOption>
    );
  }