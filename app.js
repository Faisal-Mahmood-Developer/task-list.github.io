let serialNo = window.localStorage.getItem("serialNo") || 1;

window.onload = () => {
    if (serialNo != 1) {
        for (let i = 1; i < serialNo; i++) {
            let task = getItem(i);

            mytasks.innerHTML = mytasks.innerHTML + `<li class="list-group-item ">${task}
                <a href="#" class="delete-item secondary-content">
                    <i class="fa fa-remove " style="float:right;" onclick="removeMe(this.parentElement.parentElement, ${i})"></i>
                </a>
            </li>`;
        }
    }
}

document.querySelector('form').addEventListener('submit', function (f) {
    const task = document.getElementById('task').value;

    if (task.trim() !== "") {
        mytasks.innerHTML = mytasks.innerHTML + `<li class="list-group-item ">${task}
            <a href="#" class="delete-item secondary-content">
                <i class="fa fa-remove " style="float:right;" onclick="removeMe(this.parentElement.parentElement, ${serialNo})"></i>
            </a>
        </li>`;

        saveItem(serialNo++, task);
        window.localStorage.setItem("serialNo", serialNo);

        showAlert('Task added successfully!', 'success'); // Show Bootstrap success alert
        document.getElementById('task').value = ""; // Clear input field
    } else {
        showAlert('Please enter a valid task.', 'danger'); // Show Bootstrap danger alert
    }

    f.preventDefault();
});

function removeMe(e, taskId) {
    e.remove(); // Remove task from DOM
    removeItemFromStorage(taskId); // Remove task from localStorage
 
    showAlert('Task deleted successfully!', 'warning'); // Show Bootstrap warning alert
}

const deleteitem = document.getElementById('clear');
deleteitem.addEventListener('click', clearAll);

function clearAll() {
    mytasks.innerHTML = "All is cleared"; // Clear the task list in the DOM
    clearAllFromStorage(); // Clear all tasks from localStorage
    showAlert('All tasks cleared successfully!', 'info'); // Show Bootstrap info alert
}

function saveItem(taskId, taskDetails) {
    window.localStorage.setItem("todo" + taskId, taskDetails);
}

function getItem(taskId) {
    return window.localStorage.getItem("todo" + taskId);
}

function removeItemFromStorage(taskId) {
    window.localStorage.removeItem("todo" + taskId); // Remove task from localStorage
}

function clearAllFromStorage() {
    let serialNo = window.localStorage.getItem("serialNo") || 1;
    for (let i = 1; i < serialNo; i++) {
        window.localStorage.removeItem("todo" + i); // Remove each task from localStorage
    }
    window.localStorage.setItem("serialNo", 1); // Reset serialNo after clearing tasks
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');

    // Check if there is already an alert. If so, remove it first.
    if (alertContainer.children.length > 0) {
        alertContainer.innerHTML = ''; // Clear the previous alert(s)
    }

    const alertMessage = document.createElement('div');
    alertMessage.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
    alertMessage.role = 'alert';
    alertMessage.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    alertContainer.appendChild(alertMessage);

    // Remove the alert when the close button is clicked
    alertMessage.querySelector('.btn-close').addEventListener('click', function() {
        alertContainer.removeChild(alertMessage); // Remove the alert from the DOM
    });
}
