"use client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

import { getMethodsForInput } from "@/utils/forms";
import { getTextInputClasses } from "./inputStyleClasses";

export type InputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "search"
  | "tel"
  | "date"
  | "time"
  | "url"
  | "color"
  | "file";

export type TextInputProps = any & {
  type?: InputType;
  placeholder?: string;
  min?: string;
  max?: string;
  onPlaceSuggetions?: {
    placesSuggetions: boolean;
    setIsPlaceSelected: any; //(value: boolean) => void
  };
  placesSuggetions?: any;
  onFocus?: any;
};

export const TextInput = ({
  id,
  name,
  label,

  type,
  placeholder,

  helpText,
  tooltip,

  value,
  rules,
  onChange,
  onBlur,

  loading = false,
  required = false,
  disabled = false,
  validationIcons = false,
  placesSuggetions,

  min,
  max,
  onPlaceSuggetions,
  onFocus,
}: TextInputProps) => {
  const [passwordType, setPasswordType] = useState<string | null>(type || null);
  const formContext = useFormContext();

  const inputFieldClasses = getTextInputClasses(
    formContext && formContext.getFieldState(name).error !== undefined,
    disabled
  );

  // const { ref: preferableLocationRef, ...rest } = formContext.register(name)

  const formRef = formContext && formContext.register(name);

  // useEffect(() => {
  //     formContext.setFocus(name)
  // }, [])

  return (
    <div className="w-full mb-2">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <div>
            <label htmlFor={id}>{label}</label>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="relative">
          <input
            className={inputFieldClasses}
            {...(id ? { id } : {})}
            type={passwordType || type}
            placeholder={placeholder || ""}
            disabled={disabled}
            name={name}
            min={min}
            max={max}
            {...getMethodsForInput(
              name,
              formContext,
              rules,
              onChange,
              onBlur
              // onFocus
            )}
            onFocus={(e) => {
              onFocus && onFocus(e);
            }}
            {...(value ? { value } : {})}
            // {...(onPlaceSuggetions?.placesSuggetions || placesSuggetions
            //   ? {
            //       ref: (e: any) => {
            //         formRef && formRef.ref(e);
            //         ref.current = e;
            //       },
            //     }
            //   : {})}
          />
        </div>
      </div>
    </div>
  );
};
