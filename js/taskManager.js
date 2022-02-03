const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
    const html = `
    <li id="individual-card" class="card" data-task-id="${id}" style="min-width: 50vw">
        <div class="card-body">
            <h5 class="card-title">Name: ${name}</h5>
            <p class="card-text">
                Task Description: ${description}
            </p>
            <p class="card-text">${assignedTo} is on the job!</p>
            <p class="card-text">Finish by: ${dueDate}</p>
            <p class="card-text"><b>Task status: ${status}</b></p>
            <div class="card-footer row mt-4">
                <div class="col-6 justify-content-center">
                    <button id="done-invisible" class="${String(status).toLowerCase()===('completed') ? 'invisible' : ''} btn btn-outline-success done-button">
                        Done
                    </button>
                </div>
                <div class="col-6 justify-content-center">
                    <button class="btn btn-outline-danger delete-button">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </li>
    `;
    return html;
};

class TaskManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this.tasks = [];
    };
    addTask(name, description, assignedTo, dueDate, status) {
        const taskAdd = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
        };
        this.tasks.push(taskAdd);
    };
    
    render() {
        let tasksHtmlList = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const date = new Date(task.dueDate);
            let formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            let taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);
            tasksHtmlList.push(taskHtml);
        };
        // tasksList is tasksHtml in aaron's instructions, task 6, step 2, #4
        let tasksList = tasksHtmlList.join('\n');

        goToTasks.innerHTML = tasksList;
    }
    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id === taskId) {
                foundTask = task;
            };
        }
        return foundTask
    };
    save() {
        let tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        let currentId = JSON.stringify(this.currentId);
        localStorage.setItem('currentId', currentId);
    };
    delete(taskId) {
        const newTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];
            if (task.id !== taskId) {
                newTasks.push(task);
            };
        };
        this.tasks = newTasks;
    };
    load() {
        if (localStorage.getItem('tasks')) {
            let tasksJson = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);
        };
        if (localStorage.getItem('currentId')) {
            let currentId = localStorage.getItem('currentId');

            this.currentId  = Number(currentId);

            this.currentId = JSON.parse(currentId);
        };
    };
}



