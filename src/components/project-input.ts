/// <reference path="base-components.ts" />

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", false, "user-input");

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
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
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
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }

    renderContent(): void {}
  }
}
