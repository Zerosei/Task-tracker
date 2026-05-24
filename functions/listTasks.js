import fs from 'fs'

export function listTasks(filter) {
    // Accedemos al JSON de tareas
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8')); 
    // Comprobamos si se ha solicitado con filtro y mostramos tareas según estos
    if(!filter){
        console.log("----------Tasks----------")
        tasks.forEach(element => {
            console.log(`Task ${element.id}, ${element.description}, status: ${element.status}`)
        });
        console.log("-------------------------")
    } else {
        if(["todo", "in progress", "done"].includes(filter) !== false){
            console.log("----------Tasks----------")
            tasks.forEach(element => {
                if (element.status === filter){
                    console.log(`Task ${element.id}, ${element.description}, status: ${element.status}`)
                }
            });
            console.log("-------------------------")
        }
    }
}

