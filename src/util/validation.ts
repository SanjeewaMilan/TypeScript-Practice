namespace App {
  //Validation
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validateInput: Validatable) {
    let isValid = true;
    //validate required
    if (validateInput.required) {
      isValid = isValid && validateInput.value.toString().trim().length !== 0;
    }

    //min Length
    if (
      validateInput.minLength != null &&
      typeof validateInput.value === "string"
    ) {
      isValid =
        isValid &&
        validateInput.value.toString().trim().length > validateInput.minLength;
    }

    //max Length
    if (
      validateInput.maxLength != null &&
      typeof validateInput.value === "string"
    ) {
      isValid =
        isValid &&
        validateInput.value.toString().trim().length < validateInput.maxLength;
    }

    //min value
    if (validateInput.min != null && typeof validateInput.value === "number") {
      isValid = isValid && validateInput.value > validateInput.min;
    }

    //max value
    if (validateInput.max != null && typeof validateInput.value === "number") {
      isValid = isValid && validateInput.value < validateInput.max;
    }

    return isValid;
  }
}
