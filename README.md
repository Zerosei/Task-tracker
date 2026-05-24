# Task Tracker

Aplicación de línea de comandos (CLI) para gestionar una lista de tareas. Permite crear, actualizar, eliminar y consultar tareas, así como marcar su progreso. Los datos se persisten en un archivo JSON local.

Proyecto basado en el reto [Task Tracker CLI](https://roadmap.sh/projects/task-tracker) de roadmap.sh.

## Características

- Añadir, actualizar y eliminar tareas
- Marcar una tarea como en progreso o completada
- Listar todas las tareas
- Listar tareas por estado: pendientes (`todo`), en progreso (`in progress`) o completadas (`done`)
- Almacenamiento persistente en `tasks.json`
- Sin dependencias externas (solo módulos nativos de Node.js)

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (se usa `readline/promises` y ES modules)

## Instalación

1. Clona o descarga el repositorio.
2. Entra en la carpeta del proyecto:

```bash
cd Task-tracker
```

No hace falta instalar dependencias: el proyecto no usa librerías de terceros.

## Uso

Inicia la aplicación con:

```bash
node app.js
```

Verás el prompt interactivo `Task Tracker: `. Escribe un comando y pulsa Enter. Para salir, escribe `exit`.

## Comandos

| Comando | Descripción |
|---------|-------------|
| `add <descripción>` | Crea una nueva tarea con estado `todo` |
| `list` | Muestra todas las tareas |
| `list <estado>` | Muestra solo las tareas con ese estado |
| `update <id> <descripción>` | Cambia la descripción de una tarea |
| `update <id> <estado>` | Cambia el estado (`todo`, `in progress` o `done`) |
| `delete <id>` | Elimina una tarea por su id |
| `mark-in-progress <id>` | Marca la tarea como en progreso |
| `mark-done <id>` | Marca la tarea como completada |
| `exit` | Cierra la aplicación |

### Estados válidos

Los estados deben escribirse exactamente así (respetando espacios y minúsculas):

| Estado | Valor en el comando `list` |
|--------|----------------------------|
| Pendiente | `todo` |
| En progreso | `in progress` |
| Completada | `done` |

### Ejemplos

```text
Task Tracker: add Comprar leche
Task Tracker: add Estudiar JavaScript
Task Tracker: list

Task Tracker: mark-in-progress 0
Task Tracker: list in progress

Task Tracker: update 1 Repasar async/await
Task Tracker: mark-done 0
Task Tracker: list done

Task Tracker: list todo
Task Tracker: delete 1
Task Tracker: exit
```

Salida típica al listar:

```text
----------Tasks----------
Task 0, Comprar leche, status: in progress
Task 1, Estudiar JavaScript, status: todo
-------------------------
```

## Modelo de datos

Cada tarea se guarda en `tasks.json` con esta estructura:

```json
[
  {
    "id": 0,
    "description": "Comprar leche",
    "status": "todo",
    "createdAt": "24/5/2026",
    "updatedAt": "24/5/2026"
  }
]
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | number | Identificador numérico (se asigna al crear la tarea) |
| `description` | string | Texto de la tarea |
| `status` | string | `todo`, `in progress` o `done` |
| `createdAt` | string | Fecha de creación (formato local) |
| `updatedAt` | string | Fecha de última modificación (formato local) |

El archivo `tasks.json` se crea automáticamente en el directorio actual la primera vez que ejecutas la app, si no existe. Está incluido en `.gitignore` para no versionar datos personales.

**Nota sobre los ids:** el id de una tarea nueva es la longitud del array en el momento de crearla. Si eliminas tareas, los ids existentes no se reasignan.

## Estructura del proyecto

```text
Task-tracker/
├── app.js                 # Punto de entrada: bucle interactivo y enrutado de comandos
├── functions/
│   ├── addTask.js         # Crear tareas
│   ├── listTasks.js       # Listar todas o filtrar por estado
│   ├── updateTask.js      # Actualizar descripción o estado
│   ├── deleteTask.js      # Eliminar tareas
│   └── markTask.js        # Marcar en progreso o completada
├── tasks.json             # Datos (generado en runtime, no versionado)
├── package.json
└── README.md
```

## Mensajes y errores

La aplicación muestra mensajes en consola según el resultado de cada operación:

| Situación | Mensaje |
|-----------|---------|
| Tarea actualizada o marcada | `Tarea actualizada con exito` |
| Tarea eliminada | `Tarea borrada con exito` |
| Id inexistente | `The id provided doesn't exists in the task list` |
| `update` sin id o valor | `Update requires id and description or status` |
| `mark-*` sin id | `Mark requires task id` |
| No se puede leer `tasks.json` | `Could not read tasks.json` |
| `add` sin descripción | Error: `Nueva tarea requiere nombre` |

Si usas `list` con un filtro de estado no válido, no se muestra ninguna salida.

## Decisiones técnicas

- **ES modules** (`"type": "module"` en `package.json`) y `import`/`export`.
- **Solo APIs nativas:** `fs` para el JSON y `readline/promises` para la entrada interactiva.
- **Un módulo por operación** en `functions/`, integrados desde `app.js`.
- **Comparación flexible de ids** (`==`) para aceptar id como string desde la línea de comandos.

## Licencia

ISC
