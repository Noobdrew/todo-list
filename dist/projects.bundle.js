(()=>{class e{constructor(e,t){this.item=t,this.name=e}}const t=[];let n=0;!function(){const c=document.querySelector(".add-project"),o=document.querySelector(".create-new-project"),r=document.querySelector(".new-project-buttons-add-project"),l=document.querySelector(".new-project-buttons-cancel"),i=document.getElementById("project-name");let d=document.querySelectorAll(".new-project"),s=document.querySelectorAll(".new-project-delete");function a(e){e.target.classList.contains("new-project-delete")&&e.srcElement.parentNode.classList.add("remove-project");for(const e of d)e.classList.contains("remove-project")&&(e.remove(),delete t[parseInt(e.dataset.index)])}c.addEventListener("click",(function(){o.style.visibility="visible"})),l.addEventListener("click",(function(){o.style.visibility="hidden"})),r.addEventListener("click",(function(r){i.value.length<3||(r.preventDefault(),t[n]=new e(i.value,{}),function(){const e=document.createElement("div");e.innerHTML=`  \n    <div class="new-project" data-index="${n}">\n        <div class="new-project-title">${i.value}</div>\n        <div class="new-project-delete">&nbspX</div>\n    </div>`,c.parentNode.insertBefore(e,c)}(),o.style.visibility="hidden",i.value="",d=document.querySelectorAll(".new-project"),s=document.querySelectorAll(".new-project-delete"),s.forEach((e=>{e.addEventListener("click",a)})),n++)}))}()})();