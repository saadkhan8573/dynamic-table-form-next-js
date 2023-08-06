import { ChangeEvent, FocusEvent } from "react";

export const getMethodsForInput = (
  name: string,
  formContext: any,
  rules: any,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
) => {
  let methods: any = {};
  if (formContext) {
    return {
      ...formContext.register(name, {
        ...(rules ? { rules } : {}),
        ...(onChange
          ? {
              onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e),
            }
          : {}),
        ...(onBlur
          ? { onBlur: (e: FocusEvent<HTMLInputElement>) => onBlur(e) }
          : {}),
      }),
    };
  } else {
    if (onChange) {
      methods.onChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e);
      };
    }

    if (onBlur) {
      methods.onBlur = (e: FocusEvent<HTMLInputElement>) => {
        onBlur(e);
      };
    }
  }

  return methods;
};
