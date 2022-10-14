namespace App {
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listerners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      console.log("State.addListener");
      this.listerners.push(listenerFn);
    }
  }

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }

      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );

      this.projects.push(newProject);
      this.updateListerners();
    }

    moveProject(projectID: string, newStatus: ProjectStatus) {
      console.log(projectID, newStatus);
      const movedProject = this.projects.find((prj) => prj.id === projectID);
      if (movedProject && movedProject.status !== newStatus) {
        movedProject.status = newStatus;
        this.updateListerners();
      }
    }

    private updateListerners() {
      for (const listerFn of this.listerners) {
        listerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
