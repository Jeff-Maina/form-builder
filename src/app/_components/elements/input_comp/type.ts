import { TValidation } from "@/app/types";

type TFieldFunctions = {
    setHideLabel: () => void;
    setHidePlaceholder: () => void;
    setHideDescription: () => void;
    setLabel: (value: string) => void;
    setDefaultValue: (value: string | number | undefined) => void;
    setDescription: (value: string) => void;
    setPlaceholder: (value: string) => void;
    setIsRequired: () => void;nip
    setIsDisabled: () => void;
    setValidations: (obj: TValidation) => void
}

export type { TFieldFunctions }