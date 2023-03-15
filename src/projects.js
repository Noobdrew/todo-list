//handles everything about project creation, deleting and managing

const projectsDom = document.querySelector('.projects')
const addProject = document.querySelector('.add-project')
const createNewProjectElement = document.querySelector('.create-new-project')
const addProjectButton = document.querySelector('.new-project-buttons-add-project')
const addProjectCancel = document.querySelector('.new-project-buttons-cancel')
const projectName = document.getElementById('project-name')
let projectDelete = document.querySelectorAll('.new-project-delete')
 

const projectsArr = []
let projectCount = 0


addProject.addEventListener('click', addProjectInput)
addProjectButton.addEventListener('click', createNewProject)
addProjectCancel.addEventListener('click', hideInput)



function hideInput() {
    createNewProjectElement.style.visibility = 'hidden'
}

function addProjectInput() {
    createNewProjectElement.style.visibility = 'visible'
}

function createNewProject(e) {
  
    if (projectName.value.length < 3) {
        return
    }
    e.preventDefault();
    projectsArr[projectCount] = new Project(projectName.value, {})
    projectCount++
    createDomProject()
    createNewProjectElement.style.visibility = 'hidden'
    projectName.value =''
    projectDelete = document.querySelectorAll('.new-project-delete')
   
}

function createDomProject(){
    const newProject = document.createElement('div')
    newProject.innerHTML=`  
    <div class="new-project" data-project="${projectCount-1}">
        <div class="new-project-title">${projectName.value}</div>
        <div class="new-project-delete">&nbspX</div>
    </div>`
   addProject.parentNode.insertBefore(newProject, addProject)
  
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

projectDelete.forEach(element => {
    element.addEventListener('click', removeProject)
});
function removeProject(e){
    console.log('deleted')
}

class Project {
    constructor(name, item) {
        this.item = item
        this.name = name
    }

    deleteProject() {
        return console.log('this project is removed')
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