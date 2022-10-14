/// <reference path="base-components.ts" />

namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    get personsText() {
      if (this.project.people === 1) {
        return "1 person";
      } else {
        return `${this.project.people} persons`;
      }
    }
    constructor(hostElementId: string, project: Project) {
      super("single-project", hostElementId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }
    dragEndHandler(_event: DragEvent) {
      console.log("Drag End");
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
      this.element.childNodes[1]!.textContent = this.project.title;
      this.element.childNodes[3]!.textContent = this.personsText + " assigned";
      this.element.childNodes[5]!.textContent = this.project.description;

      //this.element.getElementsByTagName("h1")!.innerHTML = this.project.title;
      //this.element.querySelector("h2")!.textContent = this.project.people.toString();
      //this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
