import fs from 'fs'

export function addTask(description){
    // Accedemos al JSON de tareas
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
    // Para el id de nueva tarea medimos la longitud
    const id = tasks.length;
    // Creamos un objeto de nueva tarea que pushearemos al json 
    const newTask = {id: id, description: description, status: "todo", createdAt: Date.now().toLocaleDateString, updatedAt: Date.now().toLocaleDateString};
    tasks.push(newTask)
    // Guardamos en el json
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2))
}