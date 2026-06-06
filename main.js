const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-button');
const taskCountSpan = document.getElementById('task-count');

let tasks = [];

function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function saveTasksToStorage() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function updateTaskCount() {
    const incompleteCount = tasks.filter(task => !task.completed).length;
    taskCountSpan.textContent = incompleteCount;
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `todo-item flex gap-4 justify-between items-start bg-white/5 border border-white/10 p-3 rounded-lg transition-all duration-200 ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'flex gap-2 items-start flex-1';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'input-checkbox border border-white/10 shrink-0 mt-0.5';
    checkbox.checked = task.completed;

    const textContainer = document.createElement('div');
    textContainer.className = 'flex-1';

    const textP = document.createElement('p');
    textP.className = 'text-white text-sm break-words';
    textP.textContent = task.text;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input hidden';
    editInput.value = task.text;

    textContainer.appendChild(textP);
    textContainer.appendChild(editInput);
    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(textContainer);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'flex gap-2 shrink-0';

    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn text-blue-400 cursor-pointer hover:text-blue-300 transition-all duration-200';
    editBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3l4 4-7 7H10v-4l7-7z"/>
                <path d="M4 20h16"/>
            </svg>
        `;

    const saveBtn = document.createElement('button');
    saveBtn.className = 'action-btn text-green-400 cursor-pointer hover:text-green-300 transition-all duration-200 hidden';
    saveBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'action-btn text-gray-400 cursor-pointer hover:text-gray-300 transition-all duration-200 hidden';
    cancelBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn text-red-400 cursor-pointer hover:text-red-500 transition-all duration-200';
    deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M8 6V4h8v2"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
        `;

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(saveBtn);
    actionsDiv.appendChild(cancelBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(contentDiv);
    li.appendChild(actionsDiv);

    function enterEditMode() {
        if (task.completed) return;

        textP.classList.add('hidden');
        editInput.classList.remove('hidden');
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        editInput.focus();
        editInput.select();
        li.classList.add('editing');
    }

    function exitEditMode() {
        textP.classList.remove('hidden');
        editInput.classList.add('hidden');
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        li.classList.remove('editing');
        editInput.value = task.text;
    }

    function saveEdit() {
        const newText = editInput.value.trim();
        if (newText === '') {
            editInput.classList.add('border-red-500');
            editInput.style.borderBottomColor = '#ef4444';
            setTimeout(() => {
                editInput.classList.remove('border-red-500');
                editInput.style.borderBottomColor = '';
            }, 1000);
            return;
        }

        if (newText !== task.text) {
            task.text = newText;
            textP.textContent = newText;
            saveTasksToStorage();
        }
        exitEditMode();
    }

    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        enterEditMode();
    });

    saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        saveEdit();
    });

    cancelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        exitEditMode();
    });

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit();
        }
    });
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            exitEditMode();
        }
    });
    textP.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        if (!task.completed) {
            enterEditMode();
        }
    });

    checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        task.completed = checkbox.checked;
        if (task.completed) {
            li.classList.add('completed');
            if (!textP.classList.contains('hidden')) {
            } else {
                exitEditMode();
            }
        } else {
            li.classList.remove('completed');
        }
        saveTasksToStorage();
        updateEmptyState();
        updateTaskCount();
    });

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.style.animation = 'fadeInUp 0.15s reverse';
        setTimeout(() => {
            deleteTaskById(task.id);
        }, 150);
    });

    return li;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function deleteTaskById(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToStorage();
    renderTodoList();
    updateEmptyState();
    updateTaskCount();
}

function addNewTask() {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        todoInput.classList.add('border-red-500');
        todoInput.style.borderColor = '#ef4444';
        setTimeout(() => {
            todoInput.classList.remove('border-red-500');
            todoInput.style.borderColor = '';
        }, 1000);
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasksToStorage();
    renderTodoList();

    todoInput.value = '';
    todoInput.focus();
    updateTaskCount();

    setTimeout(() => {
        const newTaskElement = document.querySelector(`.todo-item[data-id="${newTask.id}"]`);
        if (newTaskElement) {
            newTaskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

function renderTodoList() {
    todoList.innerHTML = '';

    if (tasks.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'flex flex-col justify-center items-center text-white/50 mt-30';
        emptyLi.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M40 22v44l-26-8V33.867M40 22v44l26-8V33.867" />
                        <path d="m14 18l26 4l-7.864 16L8 32.5zm52 0l-26 4l7.864 16L72 32.5zm-52 0l26-4l26 4" />
                    </g>
                </svg>
                <p class="mt-2">Your todo list is empty</p>
                <p class="text-xs mt-1">Add a new task using the + button</p>
            `;
        todoList.appendChild(emptyLi);
    } else {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });

        sortedTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            todoList.appendChild(taskElement);
        });
    }
    updateTaskCount();
}

function updateEmptyState() {
    if (tasks.length === 0) {
        renderTodoList();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addNewTask();
    }
}

todoInput.addEventListener('keypress', handleKeyPress);

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addNewTask();
});

function init() {
    loadTasksFromStorage();
    renderTodoList();
    todoInput.focus();
    updateTaskCount();
}

init();