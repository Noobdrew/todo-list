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

} class ToDoList {

    constructor(name, index, status, date, priority) {

        this.name = name
        this.status = status
        this.date = date
        this.priority = priority
        this.index = index
        this.formatedDay = this.formatDate()
        this.HTMLdate = this.HTMLdate()
    } formatDate() {

        const dateObj = this.date
        const dateDay = dateObj.getDate()
        const dateMonth = dateObj.getMonth() + 1
        const fullYear = dateObj.getFullYear()
        const formatYear = String(fullYear).substring(2, 4)

        if (dateObj == 'Invalid Date') {
            return '--/--/--'
        }
        const formatedDay = dateDay.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const formatedMonth = dateMonth.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        const formatDate = (`${formatedDay}/${formatedMonth}/${formatYear}`)
        console.log(dateObj)
        return formatDate
    }
    HTMLdate() {
        const dateObj = this.date
        const dateDay = dateObj.getDate()
        const dateMonth = dateObj.getMonth() + 1
        const fullYear = dateObj.getFullYear()
        const formatYear = String(fullYear).substring(2, 4)

        if (dateObj == 'Invalid Date') {
            return '--/--/--'
        }
        const formatedDay = dateDay.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const formatedMonth = dateMonth.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        const formatDate = (`${fullYear}-${formatedMonth}-${formatedDay}`)
        console.log(dateObj)
        return formatDate
    }

}

let inbox = new Project('Inbox', [], undefined)
const projectsArr = []

const addProject = document.querySelector('.add-project')
let allCheckboxes = document.querySelectorAll('#status')
let taskEdit = document.querySelectorAll('.etit-task')
let taskDelete = document.querySelectorAll('.delete-task')

let projectCount = 1

function storeInbox() {
    let elementJson = JSON.stringify(inbox)
    localStorage.setItem(`project ${inbox.index}`, elementJson)

}

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

//create missing projects from local storage
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
function getInboxData() {
    if (JSON.parse(localStorage.getItem(`project undefined`)) != null) {

        let storageObjects = JSON.parse(localStorage.getItem(`project undefined`))
        inbox = new Project(storageObjects.name,
            storageObjects.item,
            storageObjects.index)
    }
}

//create projects from local storage
createMissingProjects()
getInboxData()

let menuButtons = document.querySelectorAll('.menu-button')
let projects = document.querySelectorAll('.new-project')
//create new projects module
const createNewProjectsModule = (function () {

    const createNewProjectElement = document.querySelector('.create-new-project')
    const addProjectButton = document.querySelector('.new-project-buttons-add-project')
    const addProjectCancel = document.querySelector('.new-project-buttons-cancel')
    const projectName = document.getElementById('project-name')
    projects = document.querySelectorAll('.new-project')
    let projectsDeleteButton = document.querySelectorAll('.new-project-delete')


    //display and hide input form for creating new projects
    addProject.addEventListener('click', addProjectInput)
    addProjectCancel.addEventListener('click', hideInput)
    function hideInput() {
        createNewProjectElement.style.visibility = 'hidden'
        projectName.value = ''
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
})()

const inboxElement = document.querySelector('.inbox')
const todayElement = document.querySelector('.today')
const weekElement = document.querySelector('.week')
const completedElement = document.querySelector('.completed')




//screen render stuff
const content = document.querySelector('.content')

renderInbox(inbox, inboxElement)
function renderContent(e) {
    menuButtons.forEach(element => {
        element.classList.remove('selected')
    });

    if (this.classList.contains('inbox')) {

        if (!this.classList.contains('selected')) {
            renderInbox(inbox, this)
            this.classList.add('selected')
        }

    }
    if (this.classList.contains('today')) {
        console.log('today')
        this.classList.add('selected')

    }
    if (this.classList.contains('week')) {
        console.log('week')
        this.classList.add('selected')
    }
    if (this.classList.contains('completed')) {
        console.log('completed')
        this.classList.add('selected')
    }

    //for project render
    if (this.dataset.index != undefined) {
        if (!this.classList.contains('selected')) {
            let projectDom = parseInt(this.dataset.index)
            console.log(projectDom)
            //render project func goes here
            renderInbox(projectsArr[projectDom], this)
            this.classList.add('selected')
        }

    }

}

function renderInbox(element, DomElement) {

    const taskContainer = document.querySelector('.task-conteiner')
    //reset the screen
    taskContainer.innerHTML = `
    <div class="form-conteiner">
        <form action="#" class="create-new-task-form">
            <div class="task-form-top">
                <input type="text" placeholder="What is your task?" required id="task-name">
                <input type="date" name="date" id="task-date">
                <select name="priority" id="task-priority">
                
                    <option  value="red">High</option>
                    <option value="orange">Medium</option>
                    <option value="#66a9f5">Low</option>
                </select>
            </div>
     
            <div class="task-form-bottom">
                <input type="submit" value="Add task" class="add-task"></input>
                <input type="button" value="Cancel" class="task-cancel"></input>
            </div>
        </form>
    </div>
    `

    const newTaskButton = document.createElement('button')
    newTaskButton.classList.add('create-task')
    newTaskButton.textContent = '+ Add new task'

    //render all tasks
    let i = 0
    element.item.forEach(e => {

        const task = document.createElement('div')
        task.classList.add('task')
        task.dataset.task = element.item[i].index

        task.innerHTML = `
        <div class="task-left">
            <input type="checkbox" name="status" id="status" value='true' data-checkbox='${i}'>
            <div class="priority" style="background-color: ${element.item[i].priority}";></div>
            <div class="task-name">${element.item[i].name}</div>
        </div>

        <div class="task-right">
            <div class="date-text">${element.item[i].formatedDay}</div>
            <img src="./img/edit.png" alt="edit" width="20px" class="edit-task" data-edit='${i}'>
            <img src="./img/delete.png" alt="delete" width="20px" class="delete-task" data-delete='${i}'>
        </div>
        `
        taskContainer.appendChild(task)

        if (element.item[i].status == true) {
            task.innerHTML = `
            <div class="task-left">
            <input type="checkbox" name="status" id="status" value='true' data-checkbox='${i}' checked>
            <div class="priority" style="background-color: ${element.item[i].priority}";></div>
            <div class="task-name">${element.item[i].name}</div>
        </div>

        <div class="task-right">
            <div class="date-text">${element.item[i].formatedDay}</div>
            <img src="./img/edit.png" alt="edit" width="20px" class="edit-task" data-edit='${i}'>
            <img src="./img/delete.png" alt="delete" width="20px" class="delete-task" data-delete='${i}'>
        </div>
            `
        }
        console.log(element.item[i].status)

        i++
    });
    taskContainer.appendChild(newTaskButton)
    content.appendChild(taskContainer)



    //create new tasks
    const addNewTaskButton = document.querySelector('.create-task')
    const newTaskForm = document.querySelector('.create-new-task-form')
    const taskCancel = document.querySelector('.task-cancel')
    const addTask = document.querySelector('.add-task')
    const taskName = document.querySelector('#task-name')
    const taskDate = document.querySelector('#task-date')
    const taskPriority = document.querySelector('#task-priority')

    //show task form


    addNewTaskButton.addEventListener('click', showTaskForm)
    function showTaskForm() {
        addTask.value = 'Add task'
        newTaskForm.style.visibility = 'visible'
        taskName.value = ''
        taskDate.value = ''
        taskPriority.value = 'High'
    }


    //hide task form

    taskCancel.addEventListener('click', hideTaskForm)
    function hideTaskForm() {
        newTaskForm.style.visibility = 'hidden'

    }



    // class ToDoList {
    //     constructor(name, index, status, date, priority)

    addTask.addEventListener('click', createNewTask)
     function createNewTask(e) {
        e.preventDefault()
        
        if(addTask.value=='Edit task'){
            return 
        }

        let taskCount = element.item.length


        console.log(taskDate.value)

        let day = parseInt((taskDate.value).substring(8, 10))
        let month = parseInt((taskDate.value).substring(5, 7))
        let year = parseInt((taskDate.value).substring(0, 4))

        const jsDate = new Date(`${year}-${month}-${day}`)
        console.log(jsDate.getDate()) //for day
        console.log(jsDate.getMonth()) //for month
        console.log(jsDate.getFullYear()) //for year


        element.item[taskCount] = new ToDoList(taskName.value, taskCount, false, jsDate, taskPriority.value)
        console.log(element.item)

        renderInbox(element)
        allCheckboxes = document.querySelectorAll('#status')
        hideTaskForm()
        storeProjects()
        storeInbox()

    }
//------------------------- create new task ------------------------


    taskDelete = document.querySelectorAll('.delete-task')

    allCheckboxes = document.querySelectorAll('#status')
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            console.log(e.target.checked)
            let checkboxNum = parseInt(e.target.dataset.checkbox)
            console.log(checkboxNum)
            element.item[checkboxNum].status = e.target.checked
            storeProjects()
            storeInbox()
        })
    })

    taskEdit = document.querySelectorAll('.edit-task')
    taskEdit.forEach(edit => {
        edit.addEventListener('click', (e) => {
            console.log(e.target)
            let editNum = parseInt(e.target.dataset.edit)
            console.log(editNum)

            newTaskForm.style.visibility = 'visible'
            taskName.value = element.item[editNum].name
            taskDate.value = element.item[editNum].HTMLdate
            taskPriority.value = element.item[editNum].priority
            addTask.value = 'Edit task'
            addTask.addEventListener('click', () => {
                element.item[editNum].name = taskName.value
                element.item[editNum].date = taskDate.value
                element.item[editNum].priority = taskPriority.value
                renderInbox(element) 
                storeProjects()
                storeInbox()
            })
            
        })
    })
  
}

