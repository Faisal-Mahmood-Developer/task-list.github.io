

let serialNo = window.localStorage.getItem("serialNo") || 1;

window.onload = () => {

    if(serialNo != 1){
        for (let i = 1; i < serialNo; i++) {
        
            let task = getItem(i);
    
            mytasks.innerHTML = mytasks.innerHTML +  `<li class="list-group-item ">${task}
                <a href="#" class="delete-item secondary-content">
                    <i class="fa fa-remove " style="float:right;" onclick="removeMe(this.parentElement.parentElement)"></i>
                </a>
            </li>`;
    
          }
    }
    
    
}

document.querySelector('form').addEventListener('submit', function(f){
    const task = document.getElementById('task').value;
    mytasks.innerHTML = mytasks.innerHTML +  `<li class="list-group-item ">${task}
    <a href="#" class="delete-item secondary-content">
        <i class="fa fa-remove " style="float:right;" onclick="removeMe(this.parentElement.parentElement)"></i>
    </a>
</li>`;

saveItem(serialNo++, task);
window.localStorage.setItem("serialNo", serialNo)

f.preventDefault();
});

function removeMe(e){
    e.remove();
}
const deleteitem = document.getElementById('clear');
deleteitem.addEventListener('click', clearAll)
function clearAll(){
    mytasks.innerHTML = "All is cleared";
}

// get storage item

function saveItem(taskId,taskDetails){
    window.localStorage.setItem("todo"+taskId,taskDetails)
}

function getItem(taskId){
    let x = window.localStorage.getItem("todo"+taskId);

    return x;
}
