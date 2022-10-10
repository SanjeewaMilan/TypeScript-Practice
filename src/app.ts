//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validateInput: Validatable) {
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

//auto bind decorator
function Autobind(
  _target: any,
  _propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    this.hostElement = <HTMLDivElement>document.getElementById("app")!;

    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;

    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | undefined {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const enteredTitleValidation: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const enteredDescriptionValidation: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const enteredPeopleValidation: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
    };

    if (
      !validate(enteredTitleValidation) ||
      !validate(enteredDescriptionValidation) ||
      !validate(enteredPeopleValidation)
    ) {
      alert("Invalid Input! Please try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

new ProjectInput();
