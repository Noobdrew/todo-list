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
    }
} class ToDoList extends Project {
    constructor(name, status, date, description, priority) {
        this.name = name
        this.status = status
        this.date = date
        this.priority = priority
    }
}



const testProject = new Project('test1', {})
const projectsArr = []
let projectCount = 0

//to insert dom elements better
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
//create new projects module
const createNewProjectsModule = (function () {

    const addProject = document.querySelector('.add-project')
    const createNewProjectElement = document.querySelector('.create-new-project')
    const addProjectButton = document.querySelector('.new-project-buttons-add-project')
    const addProjectCancel = document.querySelector('.new-project-buttons-cancel')
    const projectName = document.getElementById('project-name')
    let projects = document.querySelectorAll('.new-project')
    let projectsDeleteButton = document.querySelectorAll('.new-project-delete')

    console.log(projects)





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
        projectCount++

        //new tests
        console.log(projects)
        projects.forEach(element => {
            element.addEventListener('click', removeProject)
        });

    }
    function removeProject(e) {
        if (e.target.classList.contains('new-project-delete')){
            let removeIndex = parseInt(e.srcElement.parentElement.dataset.index)
            console.log(removeIndex)
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
        // projectsDeleteButton.forEach(element => {
        //     element.addEventListener('click', removeProject)
        // });
    }

    //remove project from page and from projectsArr
    // function removeProject(e) {
    //     if (e.target.classList.contains('new-project-delete')) {
    //         e.srcElement.parentNode.classList.add('remove-project')
    //     }
    //     for (const project of projects) {
    //         if (project.classList.contains('remove-project')) {
    //             project.remove()
    //             delete projectsArr[parseInt(project.dataset.index)]

    //         }
    //     }
    // }

})()
