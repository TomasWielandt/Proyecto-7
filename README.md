![](https://github.com/UDDBootcamp/7M_FULLSTACK_M7_PROY/blob/master/images/banner.png)

# PROYECTO 7: Aplicación Fullstack de Comercio Electrónico

## Índice
1. [Intro](#1-intro)
2. [¿Qué construirás?](#2-qué-construirás)
3. [Objetivos](#3-objetivos)
4. [Requisitos](#4-requisitos)
5. [Instalación](#5-instalación)
6. [Despliegue](#6-despliegue)
7. [Contacto](#7-contacto)


------------



## 1. Intro

El comercio electrónico ha experimentado un crecimiento significativo en los últimos años. Cada vez más empresas necesitan incorporar una tienda en línea a sus procesos de comercialización para adaptarse a las nuevas demandas del mercado. En este contexto, llevar a cabo un proyecto de comercio electrónico (eCommerce) se convierte en uno de los ejercicios más completos y desafiantes en el ámbito de las aplicaciones Fullstack.


------------




## 2. ¿Qué construirás?

El objetivo de este proyecto es desarrollar una aplicación Fullstack de comercio electrónico que incluya todos los elementos esenciales para gestionar un negocio en línea. Algunos de los elementos clave que deberás tener en cuenta son:

- Un catálogo de productos que permita a los usuarios explorar los artículos disponibles.
- Un carrito de compras para que los usuarios puedan seleccionar y gestionar sus compras.
- Una pasarela de pago segura (específicamente Stripe, PayPal o MercadoPago, en versión de pruebas) que facilite las transacciones en línea.
- Autenticación de usuarios, incluido el registro de cuentas y el inicio de sesión, mediante JSON Web Tokens (JWT).
- Autorización, mediante la creación de áreas privadas en las que los usuarios puedan acceder y gestionar su perfil e información personal.

Para el desarrollo de este proyecto, te recomendamos emplear las siguientes tecnologías:

- Frontend

	- React (con vite)
	- Uso de manejo de estado con useContext y useReducer
	- Manejo de ruteo con react-router-dom. Puedes utilizar la v5 o v6
	- CSS (TailwindCSS, MUI, Bootstrap, CSS Modules o Styled Components)
	- Axios

- Backend

	- Node
	- Express.js
	- JWT
	- bcryptjs
	- cors
	- dotenv
	- mongoose
	- nodemon
	- openapi-backend
	- stripe u otra librería de comercio electrónico
	- swagger-jsdoc
	- swagger-ui-express

- Base de datos

	- MongoDB

Además, podrás utilizar bibliotecas externas que faciliten y complementen el desarrollo de las funcionalidades necesarias.


------------



## 3. Objetivos

A lo largo de este proyecto, tendrás la oportunidad de profundizar y aplicar tus conocimientos en diversas áreas clave, como:

- Manejo de rutas en el lado del cliente (Frontend) para garantizar una navegación fluida y eficiente.
- Manejo de estados locales y globales (Frontend) para gestionar la información de la aplicación y facilitar la comunicación entre componentes.
- Manejo de rutas en el servidor (Backend) para gestionar las solicitudes y respuestas entre el cliente y el servidor.
- Gestión y flujo de datos en MongoDB, lo que te permitirá almacenar, consultar y manipular información de manera eficiente y segura.
- Implementación de medidas de seguridad, como autenticación y autorización, para proteger la información y garantizar el acceso adecuado a las funciones y datos del usuario.


------------

## 4. Requisitos

A continuación, se presenta una lista de requisitos mínimos y entregables que deberás cumplir para garantizar el éxito del proyecto:

### GENERAL
- El proyecto debe realizarse de manera individual.

### FRONTEND
 - Desarrollar un prototipado simple que permita visualizar y planificar la estructura de la aplicación.
 - Utilizar ReactJS como librería principal para el desarrollo del frontend.
 - Emplear Context API para el manejo de estados en la aplicación.
 - Implementar las rutas necesarias, incluyendo Home, Sign Up, Log in, mi perfil, producto individual y listado de productos.
 - Implementar área de pasarela de pagos Checkout

### BACKEND
 - Utilizar ExpressJS como framework principal para el desarrollo del backend.
 - Crear y gestionar las rutas necesarias para el funcionamiento del frontend y la comunicación con la base de datos.
 
### DESPLIEGUE
 - Generar una URL para compartir el proyecto (puedes utilizar Netlify, Railway y Mongo Atlas).
 - Incluir una descripción detallada del proyecto en el repositorio. Es posible contar con dos repositorios o en uno solo, como sea más cómodo.


------------

## 5. Instalación

- Abrir dos terminales.
- En la primera terminal, levantaremos el frontend:
```
$ cd proyecto_7/frontend
$ npm install
$ npm run build
$ npm run dev
```
- En la segunda terminal, levantaremos el backend:
```
$ cd proyecto_7/backend
$ npm install
$ npm run dev
```


------------

## 6. Despliegue

El despliegue fue ejecutado directamente en render.com, tanto para el frontend como el backend.

- Frontend: https://proyecto-7-1.onrender.com/

- Backend: https://proyecto-7.onrender.com/

### Navbar
Lo primero que encontramos al ingresar a la pagina es la barra de navegación la cual se verá en todas las páginas. Donde a la izquierda tenemos un ícono de un control que al clickearlo nos llevara a la pagina inicial. Luego tenemos una barra de búsqueda donde se puede buscar los productos, sin diferenciar en mayúsculas y minúsculas, y sin necesidad de colocar el nombre completo, basta con colocar una letra y funciona; si se aprieta buscar sin colocar algo en la barra, muestra todos los productos. Luego tenemos los links Sign Up para registrarse, Log In para iniciar sesión, Productos para ver los productos, y un ícono de un carrito para ver el carrito de compras.

[![navbar.png](https://i.postimg.cc/W405C4SH/navbar.png)](https://postimg.cc/Y4qNmM56)

Si el usuario se registra o inicia sesión, se agregaran a al barra los links Mi Perfil para ver el perfil del usuario, y Cerrar Sesión para cerrar la sesión del usuario.

[![navbar2.png](https://i.postimg.cc/0N6zy6hV/navbar2.png)](https://postimg.cc/QB386M87)

### Footer
En la parte inferior tenemos el footer que también se verá en todas las páginas.

[![footer.png](https://i.postimg.cc/g2m5p8LP/footer.png)](https://postimg.cc/xcpgykPs)

### Home
La pagina principal muestra alguno de los productos separados en categoría como Oferta, Nuevos Productos y Productos Destacados (este se muestra en un componente carrusel). Cada producto tiene un botón para ver detalles.

[![producto-oferta.png](https://i.postimg.cc/K819xfcw/producto-oferta.png)](https://postimg.cc/pmtQBDFJ)

### Sign Up
En Sign Up el usuario puede registrarse ingresando los datos solicitados.

[![signup.png](https://i.postimg.cc/wT2vg54X/signup.png)](https://postimg.cc/Yh4kxFH0)

### Log In
El usuario podra iniciar sesión en la página de Log In con su email y contraseña.

[![login.png](https://i.postimg.cc/NMX6zC47/login.png)](https://postimg.cc/Fd9kfZw7)

### Productos
En esta página se muestran todo los productos que hay en la base de datos.

[![productos.png](https://i.postimg.cc/5NsCnMJW/productos.png)](https://postimg.cc/KRgj8w40)

### Buscar
En la barra de búsqueda uno puede colocar el nombre del producto que está buscando y mostrará todos los productos que coincidan con el nombre buscado.

[![busqueda.png](https://i.postimg.cc/L85h6yWt/busqueda.png)](https://postimg.cc/ts09BzpJ)

### Ver Detalles
Al presionar Ver Detalles en algún producto, mostrará el producto con toda su información y un botón para agregar al carrito. Si no se a registrado o inicado sesión, no se podrá agregar productos al carrito. Si el producto está sin stock, tampoco se podrá agregar al carrito.

[![detalle-producto.png](https://i.postimg.cc/pdjNsxg0/detalle-producto.png)](https://postimg.cc/hJK3jF4x)

### Mi Perfil
En Mi perfil se ve los datos del usuario registrado y hay un botón para editar el perfil.

[![perfil.png](https://i.postimg.cc/VvQ6kmCp/perfil.png)](https://postimg.cc/1nBPWxMr)

### Editar Perfil
Al editar el perfil se puede modificar los datos del usuario.

[![editar-perfil.png](https://i.postimg.cc/90yfR05Z/editar-perfil.png)](https://postimg.cc/ct4WPsJL)

### Cerra Sesión
Si se aprieta Cerrar Sesión, se cerrará inmediatamente la sesión del usuario.

[![cierre-sesion.png](https://i.postimg.cc/fys6TRwV/cierre-sesion.png)](https://postimg.cc/Q966fsKD)

### Carro
En el carro de compra se puede ver todos los productos que se agregaron. Se puede incrementar o decrementar la cantidad (solo se puede incrementar hasta la cantidad que haya en stock). Se puede eliminar el producto. Y finalmente la opción de pagar el total utilizando PayPal.

[![carrito.png](https://i.postimg.cc/sXWMCwXV/carrito.png)](https://postimg.cc/TLRdrjgS)


------------

## 7. Contacto

Tomás Wielandt<br>
twielandt16@gmail.com


