import fs from 'fs'

export function deleteTask(id){
    let tasks;
    try {
        tasks = JSON.parse(fs.readFileSync("tasks.json", 'utf8'));
    } catch {
        console.error("Could not read tasks.json");
        return;
    }
    let i = 0;
    let taskDeleted = false;
    tasks.forEach(element => {
        if(element.id == id){
            tasks.splice(i,1)
            taskDeleted = true;
            fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2))
            console.log("Tarea borrada con exito")
        }
        i++;
    });
    if(!taskDeleted){
        console.log("The id provided doesn't exists in the task list")
    }
}