-- Crear base de datos
CREATE DATABASE IF NOT EXISTS controlHoras
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE controlHoras;

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
);

-- Tabla de asuntos de producción
CREATE TABLE IF NOT EXISTS asuntoproduccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    idCategoria INT NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES categoria(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabla de familias
CREATE TABLE IF NOT EXISTS familia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
);

-- Tabla de subfamilias
CREATE TABLE IF NOT EXISTS subfamilia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    id_familia INT NOT NULL,
    FOREIGN KEY (id_familia) REFERENCES familia(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabla de subcategoría 1
CREATE TABLE IF NOT EXISTS subcategoria1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    id_subfamilia INT NOT NULL,
    FOREIGN KEY (id_subfamilia) REFERENCES subfamilia(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabla de subcategoría 2
CREATE TABLE IF NOT EXISTS subcategoria2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    id_subcategoria1 INT NOT NULL,
    FOREIGN KEY (id_subcategoria1) REFERENCES subcategoria1(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreCompleto VARCHAR(200) NOT NULL,
    user VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Relación empleado ↔ asunto producción con tiempos
CREATE TABLE IF NOT EXISTS empleado_asuntoproduccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idEmpleado INT NOT NULL,
    horas INT DEFAULT 0,
    minutos INT DEFAULT 0,
    id_departamento INT NULL,
    id_familia INT NULL,
    id_subfamilia INT NULL,
    id_subfamilia1 INT NULL,
    id_subfamilia2 INT NULL,
    FOREIGN KEY (idEmpleado) REFERENCES empleados(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_familia) REFERENCES familia(id),
    FOREIGN KEY (id_subfamilia) REFERENCES subfamilia(id),
    FOREIGN KEY (id_subfamilia1) REFERENCES subcategoria1(id),
    FOREIGN KEY (id_subfamilia2) REFERENCES subcategoria2(id)
);


-- Categorías
INSERT INTO categoria (nombre) VALUES
('Producción'),
('Mantenimiento'),
('Administración'),
('Logística'),
('Calidad');

-- Asuntos de producción
INSERT INTO asuntoproduccion (nombre, idCategoria) VALUES
('Montaje de piezas', 1),
('Soldadura', 1),
('Control de calidad', 5),
('Revisión de maquinaria', 2),
('Gestión de inventario', 4),
('Documentación administrativa', 3);

-- Familias
INSERT INTO familia (nombre) VALUES
('Electrónica'),
('Mecánica'),
('Software'),
('Logística');

-- Subfamilias
INSERT INTO subfamilia (nombre, id_familia) VALUES
('Placas base', 1),
('Sensores', 1),
('Motores', 2),
('Engranajes', 2),
('Aplicaciones web', 3),
('Sistemas embebidos', 3),
('Almacén', 4),
('Transporte', 4);

-- Subcategoría 1
INSERT INTO subcategoria1 (nombre, id_subfamilia) VALUES
('Placas industriales', 1),
('Sensores de temperatura', 2),
('Motores eléctricos', 3),
('Engranajes de precisión', 4),
('Frontend', 5),
('Backend', 5),
('Microcontroladores', 6),
('Picking', 7),
('Distribución', 8);

-- Subcategoría 2
INSERT INTO subcategoria2 (nombre, id_subcategoria1) VALUES
('Placas de control', 1),
('Sensores NTC', 2),
('Motores trifásicos', 3),
('Engranajes helicoidales', 4),
('ReactJS', 5),
('APIs REST', 6),
('Arduino', 7),
('Picking manual', 8),
('Transporte por carretera', 9);

-- Empleados
INSERT INTO empleados (nombreCompleto, user, password) VALUES
('Francisco Solé', 'francisco', '1234'),
('María López', 'maria', 'abcd'),
('Carlos Pérez', 'carlos', 'pass1'),
('Laura Gómez', 'laura', 'pass2'),
('Ana Torres', 'ana', 'pass3');

-- Relación empleado ↔ asunto producción con tiempos
INSERT INTO empleado_asuntoproduccion 
(idEmpleado, horas, minutos, id_departamento, id_familia, id_subfamilia, id_subfamilia1, id_subfamilia2) VALUES
(1, 2, 30, NULL, 1, 1, 1, 1), -- Francisco en placas de control
(1, 1, 15, NULL, 3, 5, 5, 5), -- Francisco en frontend
(2, 1, 45, NULL, 2, 3, 3, 3), -- María en motores trifásicos
(2, 3, 00, NULL, 4, 7, 8, 8), -- María en picking manual
(3, 4, 20, NULL, 1, 2, 2, 2), -- Carlos en sensores NTC
(3, 2, 10, NULL, 3, 6, 6, 6), -- Carlos en APIs REST
(4, 5, 00, NULL, 2, 4, 4, 4), -- Laura en engranajes helicoidales
(5, 2, 50, NULL, 3, 6, 7, 7), -- Ana en Arduino
(5, 1, 30, NULL, 4, 8, 9, 9); -- Ana en transporte por carretera
