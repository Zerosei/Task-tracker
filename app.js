// Añadir, actualizar y eliminar tareas
// Marcar una tarea como en progreso o completada
// Listar todas las tareas
// Listar todas las tareas completadas
// Listar todas las tareas pendientes
// Listar todas las tareas en progreso

// Restricciones a tener en cuenta:

// Puedes usar cualquier lenguaje de programación.
// Usa argumentos posicionales en la línea de comandos para recibir la entrada del usuario.
// Usa un archivo JSON para almacenar las tareas en el directorio actual.
// El archivo JSON debe crearse si no existe.
// Usa el módulo nativo de sistema de archivos de tu lenguaje para interactuar con el JSON.
// No uses librerías o frameworks externos.
// Maneja los errores y casos extremos de forma adecuada.
import { addTask } from "./functions/addTask.js"
import { listTasks } from "./functions/listTasks.js";
import { deleteTask } from "./functions/deleteTask.js";
import { updateTask } from "./functions/updateTask.js";
import readline from 'readline/promises';
import fs from 'fs'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

while(true) {
    if (!fs.existsSync('tasks.json')) {
        fs.writeFileSync('tasks.json', JSON.stringify([], null, 2));
    }
    const entrada = await rl.question('Task Tracker: ')
    if (entrada.slice(0,3) === "add"){
        try {
            addTask(entrada.slice(3).trim())
        } catch {
            throw new Error("Nueva tarea requiere nombre")
        }
    }
    if (entrada.slice(0,4) === "list"){
        listTasks(entrada.slice(4).trim())
    }
    if (entrada.slice(0,6) === "update"){
        updateTask(entrada.slice(6).trim())
    }
    if (entrada.slice(0,6) === "delete"){
        deleteTask(entrada.slice(6).trim())
    }
    if (entrada === "exit"){
        rl.close();
        break
    }
}