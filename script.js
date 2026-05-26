// URL de tu json-server activo
const API_URL = 'http://localhost:3000/tareas';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// 2. Listar tareas (READ) - Adaptado a json-server v1.0.0-beta
async function fetchTasks() {
    try {

        const response = await fetch(API_URL);

        const tasks = await response.json();

        console.log("Respuesta GET:", tasks);

        renderTasks(tasks);

    } catch (error) {

        console.error("Error:", error);

    }
}

// Función auxiliar para dibujar las tareas en el DOM
function renderTasks(tasks) {
    taskList.innerHTML = ''; // Limpiar lista antes de reescribir
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        
        // Convertimos el id a string en los parámetros por compatibilidad
        li.innerHTML = `
            <span>${task.title}</span>
            <div class="buttons">
                <button class="btn-edit" onclick="updateTask('${task.id}', '${task.title}')">Editar</button>
                <button class="btn-delete" onclick="deleteTask('${task.id}')">Eliminar</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}

// 3. Crear tarea (CREATE)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const taskTitle = taskInput.value.trim();
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: taskTitle
                // El id lo autogenera json-server como un texto único automáticamente
            })
        });
        
        const newTask = await response.json();
        console.log("Respuesta POST recibida (Creado en servidor):", newTask);
        
        taskInput.value = ''; // Limpiar input
        fetchTasks(); // Volver a listar
    } catch (error) {
        console.error("Error al crear tarea:", error);
    }
});

// 4. Eliminar tarea (DELETE)
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        console.log(`Respuesta DELETE recibida para ID ${id}. Estado:`, response.status);
        
        fetchTasks(); // Actualizar lista
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
    }
}

// 5. Actualizar tarea (UPDATE)
async function updateTask(id, currentTitle) {
    const newTitle = prompt("Edita el nombre de la tarea:", currentTitle);
    if (!newTitle || newTitle.trim() === "") return; 

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH', // Modificación parcial
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newTitle.trim()
            })
        });
        
        const updatedTask = await response.json();
        console.log("Respuesta PATCH recibida (Actualizado en servidor):", updatedTask);
        
        fetchTasks(); // Refrescar DOM
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
    }
}

// Cargar las tareas automáticamente al abrir la página
window.addEventListener('DOMContentLoaded', fetchTasks);
