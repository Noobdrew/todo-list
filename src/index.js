import { hideInput, addProjectInput } from './projects'
//only for dom interaction

const projectInputForm = document.querySelector('.create-new-project')
projectInputForm.addEventListener('click', hideInput(projectInputForm))
projectInputForm.addEventListener('click', addProjectInput(projectInputForm))