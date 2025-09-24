# Evonauta - Desafío Técnico Evolucional

Este repositorio contiene mi solución para el desafío técnico de Evolucional, desarrollado con React y Vite. Aquí comparto las decisiones técnicas, estructura del proyecto, principales funcionalidades e instrucciones de ejecución.

## Índice

- [Sobre el Proyecto](#sobre-el-proyecto)
- [Principales Funcionalidades](#principales-funcionalidades)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Validación y Seguridad](#validación-y-seguridad)
- [Pruebas Automatizadas](#pruebas-automatizadas)
- [Cómo Ejecutar](#cómo-ejecutar)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Consideraciones Finales](#consideraciones-finales)

---

## Sobre el Proyecto

El objetivo de este proyecto fue crear una aplicación web para la gestión de alumnos, profesores, materias, cursos y clases, utilizando datos proporcionados en archivos JSON. Busqué entregar una solución funcional, clara y alineada con el alcance del desafío, priorizando organización, eficiencia y experiencia de usuario.

Desde el inicio analicé cuidadosamente el archivo de instrucciones y los datos, asegurándome de que cada funcionalidad implementada estuviera de acuerdo con lo solicitado. Opté por React con Vite para obtener rendimiento, modularidad y facilidad de mantenimiento.

## Principales Funcionalidades

- **Centralización del estado con Context API:**
	- Utilicé la Context API de React para compartir datos y funciones entre todas las páginas, facilitando el mantenimiento y evitando duplicación de lógica.
- **Filtros dinámicos y generación en masa:**
	- Implementé filtros por curso y clase, además de la generación en masa de alumnos, para agilizar la manipulación de datos y simular escenarios reales de uso.
- **Visualización de datos con gráficos:**
	- En la pantalla de alumnos se muestra un gráfico de distribución por curso, facilitando el análisis visual de los datos.
- **Relaciones entre profesores, materias y clases:**
	- Se pueden visualizar y editar vínculos entre profesores, materias, cursos y clases, con una interfaz clara y uso de modales para evitar navegación excesiva.
- **Interfaz moderna y responsiva:**
	- Toda la interfaz fue construida con UIKit, garantizando adaptabilidad, diseño limpio y alineación con el estándar institucional.

## Decisiones Técnicas

- **Stack:** React + Vite, UIKit para UI, Chart.js para gráficos, React Router para navegación.
- **Pruebas unitarias con Vitest:** Implementé pruebas unitarias automatizadas con Vitest y Testing Library, cubriendo el componente Navbar y las principales funcionalidades de las páginas del sistema. Las pruebas aseguran que cambios futuros no rompan funcionalidades esenciales y aumentan la confianza en el desarrollo.
- **Carga de datos:** Todos los datos se cargan mediante fetch desde los archivos JSON ubicados en `public/data/`, centralizados en el contexto global.
- **Componentización:** Separé el código en componentes reutilizables, páginas y utilidades, facilitando mantenimiento y evolución.
- **Validación y seguridad:** Implementé validación de campos obligatorios, sanitización de entradas (escape de HTML) y retroalimentación inmediata al usuario.
- **Responsividad:** Usé clases de UIKit y ajustes de layout para garantizar una buena visualización en diferentes tamaños de pantalla.

## Estructura del Proyecto

```
├── public/
│   └── data/           # Archivos JSON de datos (alumnos, profesores, etc.)
├── src/
│   ├── assets/         # Recursos estáticos (CSS, JS, imágenes)
│   ├── components/     # Componentes reutilizables (Navbar, Modal, etc.)
│   ├── context/        # Contexto global (AppContext)
│   ├── pages/          # Páginas principales (Home, Alumnos, Profesores)
│   ├── utils/          # Funciones utilitarias (fetchJson, etc.)
│   ├── App.jsx         # Componente raiz
│   └── main.jsx        # Punto de entrada de la aplicación
├── tests/
│   ├── components/     # Pruebas para componentes (Navbar, etc.)
│   └── pages/          # Pruebas para páginas (Alumnos, Profesores, etc.)
├── index.html          # HTML principal, incluye UIKit y fuentes
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

## Validación y Seguridad

- **Validación de campos obligatorios:**
	- Todos los formularios y campos editables evitan el envío de datos vacíos o inválidos.
- **Sanitización contra XSS:**
	- Todas las entradas del usuario se sanitizan con escape de HTML antes de guardarlas o mostrarlas.
- **Retroalimentación inmediata:**
	- Mensajes de alerta y bloqueo de acciones siempre que el usuario intente ingresar datos inválidos.
- **Validación en el flujo de actualización del estado:**
	- Las validaciones se aplican directamente en las funciones de manipulación de estado, evitando inconsistencias.

## Pruebas Automatizadas

El proyecto cuenta con pruebas unitarias implementadas con [Vitest](https://vitest.dev/) y [Testing Library](https://testing-library.com/), cubriendo componentes y funcionalidades esenciales:

**Cobertura de pruebas:**
  - Pruebas para el componente `Navbar` (ver en `tests/components/Navbar.test.jsx`).
  - Pruebas para las principales funcionalidades de las páginas de Alumnos y Profesores (ver en `tests/pages/Students.test.jsx` y `tests/pages/Teachers.test.jsx`).

**Ejecución de pruebas:**
  - Para ejecutar todas las pruebas, use:
    ```bash
    npx vitest run
    ```
  - Las pruebas se ejecutan automáticamente en el entorno de desarrollo para asegurar que las funcionalidades principales siempre estén validadas.

## Cómo Ejecutar

1. **Requisitos previos:**
	 - Node.js (versión 18+ recomendada)
	 - npm o yarn

2. **Instalación:**
	 ```bash
	 npm install
	 # o
	 yarn
	 ```

3. **Ejecución en modo desarrollo:**
	 ```bash
	 npm run dev
	 # o
	 yarn dev
	 ```
	 Acceda a [http://localhost:5173](http://localhost:5173) en el navegador.

4. **Build para producción:**
	 ```bash
	 npm run build
	 # o
	 yarn build
	 ```

5. **Preview del build:**
	 ```bash
	 npm run preview
	 # o
	 yarn preview
	 ```

## Capturas de Pantalla

> Agregue aquí capturas de pantalla del sistema, si lo desea.
![Imagen de la Página de Inicio](https://i.postimg.cc/ZYj7k1Ds/evolucional-homepage.png)  
![Imagen de la Página de Alumnos](https://i.postimg.cc/FsBTz0vj/evolucional-studentpage.png)  
![Imagen de la Página de Alumnos con Gráfico de Distribución](https://i.postimg.cc/htVZYfFT/evolucional-studentpage-graphics.png)  
![Imagen de la Página de Profesores](https://i.postimg.cc/fRSB9kW1/evolucional-teacherspage.png)  
![Imagen de la Página de Profesores mostrando Formulario de Nuevo Relacionamiento](https://i.postimg.cc/KYNqZw8Y/evolucional-teacherspage-new-relationships.png)

## Consideraciones Finales

Desarrollé este proyecto priorizando eficiencia, claridad y adherencia al alcance del desafío, sin exagerar en aspectos visuales, pero siempre buscando entregar un sistema funcional, limpio y fácil de usar. Mi enfoque fue asegurar que cada requisito estuviera cubierto y que el código estuviera bien organizado para facilitar mantenimientos y evoluciones futuras. No soy especialista en diseño, pero procuré ofrecer una interfaz agradable y responsiva, alineada con el estándar institucional.

---

**Autor:** João (Evonauta)  
**Blog Personal:** [Astral Thoughts](https://astralfracture.bearblog.dev/)

---
