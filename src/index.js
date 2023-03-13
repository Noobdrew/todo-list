
//only for dom interaction
const project = document.querySelector('.new-project')
console.log(project)

project.addEventListener('click', deleteProject)

function deleteProject(e){
   if(e.srcElement.classList.contains('new-project-delete')){
    console.log('delete this project')
   }
  
}