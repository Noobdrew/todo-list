function createNewProject() {
    const addProject = document.querySelector('.add-project')
    addProject.addEventListener('click', createProject)

    function createProject(e) {

        e.target.innerHTML = `  
        <div class="create-new-project">
        <form action="#">
        <input type="text" placeholder="Project Name">
        <div class="new-project-buttons">
            <input type="button" value="Add project" class="new-project-buttons-add-project">
            <input type="button" value="Cancel" class="new-project-buttons-cancel">
        </div>
        `
        if (e.target.value == 'Add project') {
            console.log('make new project')
            
        }
        if (e.target.value == 'Cancel') {
            console.log('go back to def')
            addProjectDefault()
        }
    }

    function addProjectDefault() {
        console.log(addProject)
        addProject.innerHTML = '+ Add project'
    }

}

createNewProject()