//handles everything about project creation, deleting and managing

export function hideInput(e) {
    e.style.visibility = 'hidden'
}

export function addProjectInput(e) {
    e.style.visibility = 'visible'
}

function createNewProject(e) {

    if (projectName.value.length < 3) {
        return
    }
    e.preventDefault();
    projectsArr[projectCount] = new Project(projectName.value, {})

    createDomProject()
    createNewProjectElement.style.visibility = 'hidden'
    projectName.value = ''
    projectCount++
}

function createDomProject() {
    const newProject = document.createElement('div')
    newProject.innerHTML = `  
    <div class="new-project" data-project="${projectCount}">
        <div class="new-project-title">${projectName.value}</div>
        <div class="new-project-delete">&nbspX</div>
    </div>`
    addProject.parentNode.insertBefore(newProject, addProject)

}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


class Project {
    constructor(name, item) {
        this.item = item
        this.name = name
    }



} class ToDoList extends Project {
    constructor(name, status, date, description, priority) {
        this.name = name
        this.status = status
        this.date = date
        this.description = description
        this.priority = priority
    }
}