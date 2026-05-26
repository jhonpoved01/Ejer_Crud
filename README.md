¿Qué método HTTP usarían para:

• Crear una tarea - POST
• Listar tareas - GET
• Actualizar una tarea - PUT
• Eliminar una tarea - DELETE


¿Qué información necesitarían enviar al servidor para actualizar o eliminar una
tarea?

Para borrar y actualizar mandqaria el ID de la tarea como informacion exacta para hacer el prpcedimiento


¿En qué momento debe actualizarse el DOM?

El DOM debe actualizarse únicamente cuando los datos de la aplicación cambian y la interfaz visual necesita reflejar ese cambio.


¿En qué momento se transforman los datos JSON en elementos HTML?
Dentro la funcion renderTasks(tasks), Primero se obtiene la respuesta del servidor usando fetch(), luego se convierte la respuesta a JSON con await response.json(), Después, la función renderTasks() recorre las tareas usando forEach() y crea dinámicamente elementos <li> que se agregan al DOM mediante taskList.appendChild(li)


¿Qué ocurre primero: se actualiza el DOM o se envía la solicitud al servidor?
Primero se envía la solicitud al servidor.
El flujo correcto es:

El usuario realiza una acción.
JavaScript captura el evento.
Se envía la petición HTTP (GET, POST, PATCH, DELETE).
El servidor responde.
Finalmente se actualiza el DOM.


¿Por qué es importante el id en esta operación?
permite identificar cada tarea de manera única.


¿Qué diferencia existe entre modificar un dato en el DOM y modificarlo en el servidor?
Modificar un dato en el DOM solo cambia lo que el usuario ve en la página temporalmente.

Modificar un dato en el servidor cambia la información almacenada permanentemente en la API o base de datos.

Si solo se modifica el DOM:

al recargar la página se pierde el cambio.
Si se modifica el servidor:
la información permanece guardada incluso después de actualizar la página.


¿Qué operación resultó más sencilla?
La operación más sencilla fue el (GET), porque solo consistía en obtener los datos del servidor y mostrarlos en pantalla utilizando fetch() y renderTasks().


¿Cuál fue la más compleja y por qué?
La operación más compleja fue (PATCH), porque requería:

capturar el id
pedir el nuevo valor
enviar la petición correctamente
actualizar nuevamente el DOM


¿En qué parte del ciclo hubo mayor dificultad?
La mayor dificultad estuvo en la comunicación con la API



Esquema del funcionamiento del CRUD
┌─────────────────────┐
│ 1. Usuario realiza  │
│    una acción       │
│ (crear, editar,     │
│ eliminar tarea)     │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 2. JavaScript       │
│ captura el evento   │
│ con addEventListener│
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 3. Se envía una     │
│ solicitud HTTP      │
│ GET / POST / PATCH  │
│ / DELETE            │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 4. json-server      │
│ procesa la petición │
│ y responde con JSON │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 5. JavaScript       │
│ recibe los datos    │
│ y actualiza el DOM  │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ 6. El usuario ve    │
│ los cambios en la   │
│ interfaz            │
└─────────────────────┘