//handles everything about project creation, deleting and managing

class Project {
    constructor(name, item, index) {
        this.item = item
        this.name = name
        this.index = index
    }
    deleteProject(index) {
        const projectElement = document.querySelector(`[data-index='${index}']`)
        projectElement.remove()
        delete projectsArr[index]
        localStorage.removeItem(`project ${index}`)
    }


} class ToDoList extends Project {
    constructor(name, status, date, priority) {
        this.name = name
        this.status = status
        this.date = date
        this.priority = priority
    }
}


const projectsArr = []
const addProject = document.querySelector('.add-project')

let projectCount = 0
// projectsArr[0] = new Project('project 1', {}, 0)
// projectsArr[1] = new Project('project 2', {}, 1)


function storeProjects() {
    projectsArr.forEach(element => {
        let elementJson = JSON.stringify(element)
        localStorage.setItem(`project ${element.index}`, elementJson)
    });
}




//to insert dom elements better
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function createMissingProjects() {
    for (let i = 0; i < 1000; i++) {

        if (JSON.parse(localStorage.getItem(`project ${i}`)) != null) {

            let storageObjects = JSON.parse(localStorage.getItem(`project ${i}`))

            projectsArr[i] = new Project(storageObjects.name, storageObjects.item, storageObjects.index)

            const newProject = document.createElement('div')
            newProject.innerHTML = `  
            <div class="new-project" data-index="${storageObjects.index}">
                <div class="new-project-title">${storageObjects.name}</div>
                <div class="new-project-delete">&nbspX</div>
            </div>`
            addProject.parentNode.insertBefore(newProject, addProject)
            projectCount = 1+storageObjects.index

        }


    }
}

//create projects from local storage
createMissingProjects()



//create new projects module
const createNewProjectsModule = (function () {

    const createNewProjectElement = document.querySelector('.create-new-project')
    const addProjectButton = document.querySelector('.new-project-buttons-add-project')
    const addProjectCancel = document.querySelector('.new-project-buttons-cancel')
    const projectName = document.getElementById('project-name')
    let projects = document.querySelectorAll('.new-project')
    let projectsDeleteButton = document.querySelectorAll('.new-project-delete')

    //display and hide input form for creating new projects
    addProject.addEventListener('click', addProjectInput)
    addProjectCancel.addEventListener('click', hideInput)
    function hideInput() {
        createNewProjectElement.style.visibility = 'hidden'
    }
    function addProjectInput() {
        createNewProjectElement.style.visibility = 'visible'
    }

    //create new projects
    addProjectButton.addEventListener('click', createNewProject)
    getDomElements()
    function createNewProject(e) {
        if (projectName.value.length < 3) {
            return
        }
        e.preventDefault();
        projectsArr[projectCount] = new Project(projectName.value, {}, projectCount)
        createDomProject()
        createNewProjectElement.style.visibility = 'hidden'
        projectName.value = ''
        getDomElements()
        storeProjects()
        projectCount++

    }

    //remove projects 
    function removeProject(e) {
        if (e.target.classList.contains('new-project-delete')) {
            let removeIndex = parseInt(e.srcElement.parentElement.dataset.index)

            projectsArr[removeIndex].deleteProject(removeIndex)
        }

    }

    //create the dom element for the projects object
    function createDomProject() {
        const newProject = document.createElement('div')
        newProject.innerHTML = `  
        <div class="new-project" data-index="${projectCount}">
            <div class="new-project-title">${projectName.value}</div>
            <div class="new-project-delete">&nbspX</div>
        </div>`
        addProject.parentNode.insertBefore(newProject, addProject)

    }

    //select all newly created dom elements
    function getDomElements() {
        projects = document.querySelectorAll('.new-project')
        projectsDeleteButton = document.querySelectorAll('.new-project-delete')
        projects.forEach(element => {
            element.addEventListener('click', removeProject)
        });
    }

})()
