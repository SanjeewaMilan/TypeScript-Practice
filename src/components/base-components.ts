namespace App {
  //Component Base Class
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insetAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;

      this.hostElement = document.getElementById(hostElementId)! as T;

      const importNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }

      this.attach(insetAtStart);
    }

    private attach(insetAtBegining: boolean) {
      this.hostElement.insertAdjacentElement(
        insetAtBegining ? "beforeend" : "afterbegin",
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }
}
