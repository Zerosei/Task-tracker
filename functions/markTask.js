import fs from 'fs'

function markTaskStatus(id, status) {
    let tasks;
    try {
        tasks = JSON.parse(fs.readFileSync("tasks.json", 'utf8'));
    } catch {
        console.error("Could not read tasks.json");
        return;
    }
    if (!id) {
        console.log("Mark requires task id");
        return;
    }
    let taskMarked = false;
    tasks.forEach(element => {
        if (element.id == id) {
            element.status = status;
            element.updatedAt = new Date().toLocaleDateString();
            taskMarked = true;
            fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2))
            console.log("Tarea actualizada con exito")
        }
    });
    if (!taskMarked) {
        console.log("The id provided doesn't exists in the task list")
    }
}

export function markInProgress(id) {
    markTaskStatus(id, "in progress");
}

export function markDone(id) {
    markTaskStatus(id, "done");
}
