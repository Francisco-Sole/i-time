# ⏱️ i-time

Aplicación web para el **control de horas y gestión de producción**.  
Este fue mi **primer proyecto en PHP/MySQL**, sencillo pero funcional, que me permitió aprender a estructurar una base de datos, manejar formularios y registrar tiempos de trabajo.

> 🔗 Este proyecto comparte la **misma base de datos** con [i-timeGraph](https://github.com/Francisco-Sole/i-timeGraph), un segundo repositorio que desarrollé para **visualizar estadísticas y gráficos** de los datos insertados aquí.

---

## ✨ Características

- 👤 Gestión de empleados (login con usuario y contraseña)  
- 🗂️ Clasificación jerárquica: **categorías → asuntos de producción → familias → subfamilias → subcategorías**  
- 🕒 Registro de horas y minutos trabajados por empleado en cada tarea  
- 📊 Integración con **i-timeGraph** para generar reportes y gráficos visuales  

---

## ⚙️ Requisitos

- 🐘 PHP 5.4 o superior  
- 🌍 Servidor web local (Apache/Nginx)  
- 🗄️ MySQL/MariaDB  
- 📱 Navegador moderno  

---

## 📂 Estructura del proyecto

- 📁 **php/** → lógica de servidor y consultas SQL  
- 📁 **css/** → estilos de la aplicación  
- 📁 **js/** → scripts JavaScript  
- 📄 **index.php** → página principal de acceso  

---

## 🗄️ Base de datos

La aplicación utiliza la base de datos **`controlHoras`**.  
El esquema se encuentra en [`BD/schema.sql`](./BD/schema.sql).

### 🚀 Importación rápida

```bash
mysql -u usuario -p < BD/schema.sql
```

# 🚀 Puesta en marcha
 📥 Clona el repositorio:

```bash
git clone https://github.com/Francisco-Sole/controlHoras.git
```
 🗄️ Importa BD/schema.sql.

 🔑 Configura las credenciales de conexión en php/config.php.

 🌐 Abre index.php en tu navegador local.

# 📊 Integración con i-timeGraph
El repositorio i-timeGraph se conecta a la misma base de datos y permite:

 📈 Visualizar estadísticas de horas trabajadas

 🧮 Generar gráficos por empleado, familia o categoría

 🎨 Presentar los datos de forma más clara y visual

De esta forma, controlHoras se centra en la captura de datos, mientras que i-timeGraph se encarga de la analítica y visualización.

# 🚧 Estado del proyecto
Este proyecto fue mi primera aplicación:

 🔄 La estructura es sencilla y puede mejorarse.

 🛠️ Sirvió como base para aprender PHP, MySQL y organización de proyectos.

 🧪 Actualmente se mantiene como prototipo y referencia de aprendizaje.

# 👤 Créditos
✍️ Autor: Francisco Solé

📍 Proyecto desarrollado en Barcelona, España

💡 Primer proyecto personal en PHP/MySQL, con el objetivo de aprender y experimentar

# 📜 Licencia
Uso personal y educativo.
