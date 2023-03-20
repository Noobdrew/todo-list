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
    constructor(name, index, status, date, priority) {
        this.name = name
        this.status = status
        this.date = date
        this.priority = priority
        this.index = index
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
            <div class="new-project menu-button" data-index="${storageObjects.index}">
                <div class="new-project-title">${storageObjects.name}</div>
                <div class="new-project-delete">&nbspX</div>
            </div>`
            addProject.parentNode.insertBefore(newProject, addProject)
            projectCount = 1 + storageObjects.index

        }


    }
}

//create projects from local storage
createMissingProjects()


let menuButtons = document.querySelectorAll('.menu-button')
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
        projectsArr[projectCount] = new Project(projectName.value, [], projectCount)
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
        <div class="new-project menu-button" data-index="${projectCount}">
            <div class="new-project-title">${projectName.value}</div>
            <div class="new-project-delete">&nbspX</div>
        </div>`
        addProject.parentNode.insertBefore(newProject, addProject)

    }

    //select all newly created dom elements
    function getDomElements() {
        menuButtons = document.querySelectorAll('.menu-button')
        projects = document.querySelectorAll('.new-project')
        projectsDeleteButton = document.querySelectorAll('.new-project-delete')
        projects.forEach(element => {
            element.addEventListener('click', removeProject)
        });
        menuButtons.forEach(element => {
            element.addEventListener('click', renderContent)
        });
    }

    //render screen content


})()

//screen render stuff
const content = document.querySelector('.content')
function renderContent(e) {
    console.log(this)
    if (this.classList.contains('inbox')) {

        renderInbox()
        //render inbox func goes here
    }
    if (this.classList.contains('today')) {
        console.log('today')

    }
    if (this.classList.contains('week')) {
        console.log('week')
    }
    if (this.classList.contains('completed')) {
        console.log('completed')
    }

    //for project render
    if (this.dataset.index != undefined) {
        console.log(parseInt(this.dataset.index))
    }

}

function renderInbox() {

    const taskContainer = document.createElement('div')
    taskContainer.classList.add('task-conteiner')

    let i = 0
    inbox.item.forEach(element => {

        const task = document.createElement('div')
        task.classList.add('task')
        task.dataset.task = inbox.item[i].index
        console.log(inbox.item[i].index)
        task.innerHTML = `
        <div class="task-left">
            <input type="checkbox" name="status" id="status">
            <div class="priority" style="background-color: ${inbox.item[i].priority}";></div>
            <div class="task-name">${inbox.item[i].name}</div>
        </div>

        <div class="task-right">
            <div class="date-text">${inbox.item[i].date}</div>
            <button class="edit-task"><img src="./img/edit.png" alt="edit" width="20px"></button>
            <button class="delete-task"><img src="./img/delete.png" alt="delete" width="20px"></button>
        </div>
        `
        taskContainer.appendChild(task)
        console.log(task)
        i++
    });
    content.appendChild(taskContainer)


}

const inbox = new Project('Inbox', [{ status: true, index: 5, name: 'clean', priority: 'red', date: '10/02/21' },
{ status: false, index: 7, name: 'wash', priority: 'orange', date: '05/12/22' }, { status: false, index: 15, name: 'dog', priority: 'lightskyblue', date: '02/05/12' }], undefined)
const inboxScreenModule = (function () {


}())
