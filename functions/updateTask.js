import fs from 'fs'

export function updateTask(input){
    let tasks;
    try {
        tasks = JSON.parse(fs.readFileSync("tasks.json", 'utf8'));
    } catch {
        console.error("Could not read tasks.json");
        return;
    }
    const spaceIndex = input.indexOf(' ');
    if (spaceIndex === -1) {
        console.log("Update requires id and description or status");
        return;
    }
    const id = input.slice(0, spaceIndex).trim();
    const rest = input.slice(spaceIndex + 1).trim();
    if (!rest) {
        console.log("Update requires id and description or status");
        return;
    }
    let taskUpdated = false;
    tasks.forEach(element => {
        if(element.id == id){
            if(["todo", "in progress", "done"].includes(rest)){
                element.status = rest;
            } else {
                element.description = rest;
            }
            element.updatedAt = new Date().toLocaleDateString();
            taskUpdated = true;
            fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2))
            console.log("Tarea actualizada con exito")
        }
    });
    if(!taskUpdated){
        console.log("The id provided doesn't exists in the task list")
    }
}
