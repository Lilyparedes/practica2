
# Sistema de Gestión y Seguimiento de Órdenes
## Descripción del Proyecto
Este proyecto es un sistema web desarrollado en **Angular** para la creación, seguimiento y actualización de órdenes de entrega.  
Permite a los usuarios:
- Crear órdenes con nombre del remitente, dirección, correo electrónico y descripción de entrega.
- Realizar el seguimiento de órdenes usando un código de rastreo único.
- Actualizar el estado de las órdenes y registrar comentarios con responsable de la actualización.

El historial de actualizaciones se mantiene en memoria, mostrando el flujo de estados de manera secuencial desde **Creado** hasta **Entregado** o **No entregado**.

### Características principales

1. **Creación de órdenes**  
   - Se genera automáticamente un **número de paquete** único.  
   - Se genera un **código de rastreo** aleatorio de 12 caracteres.  
   - El estado inicial de la orden es **Creado**.

2. **Seguimiento de órdenes**  
   - Ingresando el código de rastreo se puede visualizar el historial de actualizaciones.  
   - Aunque la orden solo tenga el estado inicial, siempre se muestra en la tabla.

3. **Actualización de órdenes**  
   - Solo se permiten cambios válidos de estado según el flujo:  
     - `Creado` → `En preparación` o `No entregado`  
     - `En preparación` → `En tránsito` o `No entregado`  
     - `En tránsito` → `Entregado` o `No entregado`  
   - Comentarios deben tener entre 20 y 40 caracteres.  
   - El responsable solo puede ingresar nombres válidos (letras y espacios).

4. **Restricciones**  
   - No se puede modificar una orden que ya esté en **Entregado** o **No entregado**.  
   - Todos los datos se guardan en memoria y se pierden al recargar la página.

---

## Estructura del Proyecto

- **create-order/**  
  Componente para crear órdenes.  
  Archivos: `create-order.ts`, `create-order.html`, `create-order.css`.

- **track-order/**  
  Componente para seguimiento de órdenes.  
  Archivos: `track-order.ts`, `track-order.html`, `track-order.css`.

- **update-order/**  
  Componente para actualizar órdenes.  
  Archivos: `update-order.ts`, `update-order.html`, `update-order.css`.

- **data/orders-data.ts**  
  Servicio que maneja la información de las órdenes en memoria.

---

## Cómo utilizar el sitio

1. **Crear una orden**  
   - Ir a la sección **Crear Orden**.  
   - Llenar todos los campos obligatorios: nombre, dirección, correo y descripción.  
   - Hacer clic en **Crear Orden**.  
   - Se mostrará un mensaje con el número de paquete y código de rastreo.

2. **Seguir una orden**  
   - Ir a la sección **Seguimiento de Orden**.  
   - Ingresar el **código de rastreo**.  
   - Se mostrará la tabla con el historial de la orden.  
   - Si la orden solo tiene el estado inicial, igualmente se mostrará.

3. **Actualizar una orden**  
   - Ir a la sección **Actualizar Orden**.  
   - Ingresar el **número de paquete**.  
   - Elegir el **nuevo estado** permitido.  
   - Ingresar el **nombre del responsable** y un **comentario válido**.  
   - Hacer clic en **Actualizar Orden**.  
   - La tabla se actualizará mostrando el nuevo estado y comentario.

---

## Requisitos

- Node.js y npm
- Angular CLI

---

## Comandos principales

- Instalar dependencias:
  npm install
-	Ejecutar el proyecto:
	ng serve
•	Abrir en el navegador: http://localhost:4200
________________________________________
Notas
•	Actualmente, los datos se almacenan solo en memoria; al recargar la página, se pierden todas las órdenes.
•	Se usan únicamente ngModel para enlazar datos en los formularios; no se utilizan otras directivas
