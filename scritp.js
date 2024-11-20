 // Lista para almacenar las tareas
 var tareas = [];

 // Función para agregar tarea
 function agregarTarea() {
     var descripcion = document.getElementById("descripcion").value;
     var plazo = document.getElementById("plazo").value;

     if (descripcion && plazo) {
         // Crear una nueva tarea
         var tarea = {
             descripcion: descripcion,
             plazo: new Date(plazo), // Convertir la fecha al formato Date
             estado: "Pendiente"
         };

         // Agregar la tarea al arreglo
         tareas.push(tarea);

         // Mostrar las tareas actualizadas
         mostrarTareas();

         // Limpiar los campos del formulario
         document.getElementById("descripcion").value = "";
         document.getElementById("plazo").value = "";
     } else {
         alert("Por favor, ingresa todos los datos.");
     }
 }

 // Función para mostrar las tareas
 function mostrarTareas() {
     var lista = document.getElementById("tareasLista");
     lista.innerHTML = ""; // Limpiar la lista antes de mostrar las tareas

     // Usamos un ciclo for para mostrar todas las tareas
     for (var i = 0; i < tareas.length; i++) {
         var tarea = tareas[i];

         // Condicional para manejar los estados de las tareas
         switch (true) {
             case tarea.plazo < new Date():
                 tarea.estado = "Atrasada"; // Si el plazo ha pasado, marcar como Atrasada
                 break;
             case tarea.estado === "Pendiente" && tarea.plazo > new Date():
                 tarea.estado = "En progreso"; // Si la tarea está pendiente y no ha pasado el plazo
                 break;
             case tarea.estado === "En progreso":
                 tarea.estado = "Completada"; // Si ya está en progreso, luego se marca como completada
                 break;
         }

         // Mostrar las tareas en la interfaz
         var tareaElemento = document.createElement("div");
         tareaElemento.className = "task";
         tareaElemento.innerHTML = `
             <p><strong>Tarea:</strong> ${tarea.descripcion}</p>
             <p><strong>Plazo:</strong> ${tarea.plazo.toLocaleString()}</p>
             <p><strong>Estado:</strong> <span class="estado">${tarea.estado}</span></p>
         `;
         lista.appendChild(tareaElemento);
     }
 }

 // Función para verificar las tareas y priorizarlas, usando un ciclo while
 function verificarTareas() {
     var i = 0;
     while (i < tareas.length) {
         var tarea = tareas[i];

         // Si el plazo está cerca, hacer un cambio de prioridad
         if (tarea.plazo < new Date() && tarea.estado === "Pendiente") {
             tarea.estado = "Urgente";
         }

         i++;
     }
     mostrarTareas(); // Mostrar las tareas actualizadas después de la verificación
 }

 // Ejecutar la verificación cada 5 segundos (esto es solo un ejemplo)
 setInterval(verificarTareas, 5000);
