//handles everything about project creation, deleting and managing

const addProject = document.querySelector('.add-project')
const projectsArr = []
let projectCount = 0


console.log(addProject)

addProject.addEventListener('click', addProjectInput)


function addProjectInput(e) {

}

function addProjectDefault(){
    addProject.innerHTML = '+ Add project'
  
}

function createProject(e) {


}

class Project {
    constructor(name, toDoList) {
        this.name = name
        this.toDoList = toDoList
    }
}