-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-10-2024 a las 06:49:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivostarea`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--
create database if not exists tis;
use tis;
CREATE TABLE `docente` (
  `idDocente` int(11) NOT NULL,
  `nombreCuenta` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombreDocente` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primerApellido` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `segundoApellido` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contrasena` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`idDocente`, `nombreCuenta`, `nombreDocente`, `primerApellido`, `segundoApellido`, `contrasena`) VALUES
(1, 'letiGod', 'Leticia', 'Blanco', 'Coca', 'password1'),
(2, 'corina123', 'Carlos', 'Flores', 'Villaroel', 'password2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(11) NOT NULL,
  `nombreEmpresa` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombreLargo` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numerodefaltasempresa` tinyint(4) DEFAULT NULL,
  `notaproductofinal` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombreEmpresa`, `nombreLargo`, `numerodefaltasempresa`, `notaproductofinal`) VALUES
(1, 'Creative', 'Creative S.R.L', 0, NULL),
(2, 'Harbor', 'Harbor S.R.L.', 0, 0),
(3, 'SOFT', 'SOFT S.R.L.', 0, 0),
(4, 'PruebaSoft', 'PruebaTisSoft Ltda.', 0, 0),
(5, 'Tecnología Inova', 'Tecnología Innovadora S.A.', NULL, NULL),
(6, 'front', 'desde front', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `idEstudiante` int(11) NOT NULL,
  `nombreCuenta` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombreEstudiante` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primerApellido` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `segundoApellido` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contrasena` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numerodefaltasest` tinyint(4) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`idEstudiante`, `nombreCuenta`, `nombreEstudiante`, `primerApellido`, `segundoApellido`, `contrasena`, `numerodefaltasest`, `disponible`) VALUES
(1, 'agarcia', 'Ana', 'García', 'Sanchez', 'passAna1', NULL, 0),
(2, 'lhernandez', 'Luis', 'Hernández', 'Torres', 'passLuis2', NULL, 0),
(3, 'jmendez', 'Juan', 'Méndez', 'Lopez', 'passJuan3', NULL, 0),
(4, 'srodriguez', 'Sofia', 'Rodríguez', 'Ramirez', 'passSofia4', NULL, 0),
(5, 'cdiaz', 'Carlos', 'Díaz', 'Fernández', 'passCarlos5', NULL, 0),
(6, 'lmorales', 'Lucía', 'Morales', 'González', 'passLucia6', NULL, 0),
(7, 'dcruz', 'David', 'Cruz', 'Muñoz', 'passDavid7', NULL, 0),
(8, 'emartinez', 'Elena', 'Martínez', 'Vargas', 'passElena8', NULL, 0),
(9, 'jlopez', 'Jorge', 'Lopez', 'Pacheco', 'passJorge9', NULL, 0),
(10, 'pperez', 'Paula', 'Pérez', 'Gómez', 'passPaula10', NULL, 0),
(11, 'acastro', 'Antonio', 'Castro', 'Silva', 'passAntonio11', NULL, 0),
(12, 'mfernandez', 'María', 'Fernández', 'Rojas', 'passMaria12', NULL, 0),
(13, 'rmolina', 'Raquel', 'Molina', 'Torres', 'passRaquel13', NULL, 0),
(14, 'fcarrasco', 'Felipe', 'Carrasco', 'Ramírez', 'passFelipe14', NULL, 0),
(15, 'scampos', 'Sara', 'Campos', 'López', 'passSara15', NULL, 0),
(16, 'malonso', 'Miguel', 'Alonso', 'Ortiz', 'passMiguel16', NULL, 0),
(17, 'cmoreno', 'Claudia', 'Moreno', 'Jiménez', 'passClaudia17', NULL, 1),
(18, 'areyes', 'Antonio', 'Reyes', 'Castillo', 'passAntonio18', NULL, 1),
(19, 'ivega', 'Isabel', 'Vega', 'Espinoza', 'passIsabel19', NULL, 1),
(20, 'aflores', 'Alberto', 'Flores', 'Salinas', 'passAlberto20', NULL, 1),
(21, 'rmontes', 'Rosa', 'Montes', 'Hernández', 'passRosa21', NULL, 0),
(22, 'tvillar', 'Tomás', 'Villar', 'García', 'passTomas22', NULL, 1),
(23, 'squintana', 'Sandra', 'Quintana', 'Ramos', 'passSandra23', NULL, 1),
(24, 'hpena', 'Hugo', 'Peña', 'Maldonado', 'passHugo24', NULL, 0),
(25, 'pTest', 'PruebaEs', 'Pes', 'Mes', 'pes', NULL, 1),
(26, 'pt', 'pt', 'pt', 'pt', 'pt', NULL, 1),
(27, 'p', 'p', 'p', 'p', 'p', NULL, 1),
(28, 'qq', 'qq', 'qq', 'qq', 'qq', NULL, 0),
(29, 'ww', 'ww', 'ww', 'ww', 'ww', NULL, 0),
(30, 'leti', 'loredo', 'salazar', 'let', 'let', NULL, 0),
(31, 'p1', 'p1', 'p1', 'p1', 'p1', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantesempresas`
--

CREATE TABLE `estudiantesempresas` (
  `idEmpresa` int(11) NOT NULL,
  `idEstudiante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `estudiantesempresas`
--

INSERT INTO `estudiantesempresas` (`idEmpresa`, `idEstudiante`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 7),
(2, 8),
(2, 24),
(3, 10),
(3, 11),
(3, 12),
(4, 25),
(5, 1),
(5, 2),
(5, 3),
(6, 1),
(6, 2),
(6, 3),
(6, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantesgrupos`
--

CREATE TABLE `estudiantesgrupos` (
  `idEstudiante` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `estudiantesgrupos`
--

INSERT INTO `estudiantesgrupos` (`idEstudiante`, `idGrupo`) VALUES
(1, 1),
(1, 3),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 3),
(26, 1),
(27, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotodocente`
--

CREATE TABLE `fotodocente` (
  `idFoto` int(11) NOT NULL,
  `foto` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `idDocente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotoestudiante`
--

CREATE TABLE `fotoestudiante` (
  `idFoto` int(11) NOT NULL,
  `foto` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idEstudiante` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `fotoestudiante`
--

INSERT INTO `fotoestudiante` (`idFoto`, `foto`, `idEstudiante`) VALUES
(1, 'foto', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `numGrupo` int(11) DEFAULT NULL,
  `gestionGrupo` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idDocente` int(11) NOT NULL,
  `codigoAcceso` varchar(20) DEFAULT NULL,
  `descripcion` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `numGrupo`, `gestionGrupo`, `idDocente`, `codigoAcceso`, `descripcion`) VALUES
(1, 1, '2024-2', 1, 'hamilton', 'descripcion de leticia desde la base'),
(2, 2, '2024-2', 2, 'hamilton2', 'descripcion de grupo2'),
(3, 2, '2023-2', 2, 'hamilton2', NULL);

-- --------------------------------------------------------


--
-- Estructura de tabla para la tabla `notasprint`
--

CREATE TABLE `notasprint` (
  `idSprint` int(11) NOT NULL,
  `nota` int(3) NOT NULL,
  `comentarioDocente` text DEFAULT NULL,
  `idEmpresa` int(11) NOT NULL,
  `idEstudiante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planificacion`
--

CREATE TABLE `planificacion` (
  `idPlanificacion` int(11) NOT NULL,
  `idEmpresa` int(11) NOT NULL,
  `aceptada` tinyint(1) DEFAULT NULL,
  `fechaEntrega` datetime NOT NULL,
  `comentariodocente` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comentarioPrivado` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `planificacion`
--

INSERT INTO `planificacion` (`idPlanificacion`, `idEmpresa`, `aceptada`, `fechaEntrega`, `comentariodocente`, `comentarioPrivado`) VALUES
(1, 1, 1, '2024-09-04 00:00:00', 'Los entregables de los sprint 4, 5,6 y 7 estan mal, también su fecha de entrega, tiene que caer las fechas de entrega los martes o los miercoles ', NULL),
(11, 2, 0, '2024-09-25 20:56:58', NULL, NULL),
(12, 2, 0, '2024-09-25 20:56:58', NULL, NULL),
(13, 2, 0, '2024-09-25 21:27:10', NULL, NULL),
(14, 2, 0, '2024-09-25 21:27:10', NULL, NULL),
(15, 2, 0, '2024-09-26 14:33:56', NULL, NULL),
(16, 2, 0, '2024-09-26 14:33:56', NULL, NULL),
(17, 2, 0, '2024-09-26 14:37:52', NULL, NULL),
(18, 2, 0, '2024-09-26 14:37:52', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semana`
--

CREATE TABLE `semana` (
  `idSemana` int(11) NOT NULL,
  `idSprint` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `semana`
--

INSERT INTO `semana` (`idSemana`, `idSprint`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sprint`
--

CREATE TABLE `sprint` (
  `idSprint` int(11) NOT NULL,
  `idPlanificacion` int(11) NOT NULL,
  `fechaIni` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `cobro` int(11) DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `entregables` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comentariodocente` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numSprint` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `sprint`
--

INSERT INTO `sprint` (`idSprint`, `idPlanificacion`, `fechaIni`, `fechaFin`, `cobro`, `fechaEntrega`, `entregables`, `comentariodocente`, `numSprint`) VALUES
(1, 1, '2024-09-02', '2024-09-20', 10, '2024-09-23', '-MODELO ER\r\n-PRODUCT BACKLOG\r\n-MOCKUPS', 'modificado exitosamente', NULL),
(2, 1, '2024-09-21', '2024-10-01', 15, '2024-09-24', '-Codigo Funcional', NULL, NULL),
(3, 1, '2024-10-03', '2024-10-18', 15, '2024-10-22', '-Codigo Funcional', NULL, NULL),
(4, 1, '2024-10-19', '2024-11-02', 15, '2024-11-05', '-Codigo Funcional', NULL, NULL),
(5, 1, '2024-11-03', '2024-11-11', 15, '2024-11-11', '-Codigo Funcional', NULL, NULL),
(6, 1, '2024-11-12', '2024-11-23', 15, '2024-11-26', '-Codigo Funcional', NULL, NULL),
(7, 1, '2024-11-24', '2024-12-02', 15, '2024-12-02', '-Producto Terminado', 'Revisión final.', NULL),
(36, 11, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemplo', 'Comentario Docente', NULL),
(37, 11, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemplo', 'Comentario Docente', NULL),
(38, 11, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemplo', 'Comentario Docente', NULL),
(39, 12, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemplo', 'Comentario Docente', NULL),
(40, 12, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemplo', 'Comentario Docente', NULL),
(41, 12, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemplo', 'Comentario Docente', NULL),
(42, 13, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemploQ', 'Falta que comente el docente', NULL),
(43, 13, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemploQ', 'Falta que comente el docente', NULL),
(44, 13, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemploQ', 'Falta que comente el docente', NULL),
(45, 14, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemploQ', 'Falta que comente el docente', NULL),
(46, 14, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemploQ', 'Falta que comente el docente', NULL),
(47, 14, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un ejemploQ', 'Falta que comente el docente', NULL),
(48, 15, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'es12121to es un ejemploQ', 'Falta que comente el docente', NULL),
(49, 15, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un1212121 ejemploQ', 'Falta que comente el docente', NULL),
(50, 15, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto212121 es un ejemplo12Q', 'Falta que comente el docente', NULL),
(51, 16, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'es12121to es un ejemploQ', 'Falta que comente el docente', NULL),
(52, 16, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es un1212121 ejemploQ', 'Falta que comente el docente', NULL),
(53, 16, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto212121 es un ejemplo12Q', 'Falta que comente el docente', NULL),
(54, 17, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esqweqewqewq12121to eqweqeqs un ejemploQ', 'Falta que comente el docente', NULL),
(55, 17, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es unqweeqw1212121 ejemploQ', 'Falta que comente el docente', NULL),
(56, 17, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto21qweqewq2121 es un ejemplo12Q', 'Falta que comente el docente', NULL),
(57, 18, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esqweqewqewq12121to eqweqeqs un ejemploQ', 'Falta que comente el docente', NULL),
(58, 18, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto es unqweeqw1212121 ejemploQ', 'Falta que comente el docente', NULL),
(59, 18, '2024-09-06', '2024-09-06', 12, '2024-09-06', 'esto21qweqewq2121 es un ejemplo12Q', 'Falta que comente el docente', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(11) NOT NULL,
  `idSemana` int(11) NOT NULL,
  `comentario` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `textoTarea` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaEntrega` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `idSemana`, `comentario`, `textoTarea`, `fechaEntrega`) VALUES
(1, 1, 'comentarioGenerico', 'textoGenerico', '2024-09-02 14:30:00'),
(2, 1, '', 'Descripción de la tarea', '2024-09-30 12:00:00'),
(3, 1, '', 'Descripción de la tarea', '2024-09-30 12:00:00'),
(4, 1, '', 'Descripción de la tarea', '2024-09-30 12:00:00'),
(5, 1, '', 'Descripción de la tarea', '2024-09-30 12:00:00'),
(6, 1, '', 'Descripción de la tarea', '2024-09-30 00:00:00'),
(7, 1, '', 'Descripción de la tarea', '2024-09-30 14:30:00'),
(8, 1, '', 'Descripción de la tarea', '2024-09-30 00:00:00'),
(9, 1, '', 'Descripción de la tarea', '2024-09-30 12:30:30'),
(10, 1, '', 'Descripción de la tarea', '2024-09-30 12:30:30'),
(11, 1, '', 'Descripción de la tarea', '2024-09-02 12:30:30'),
(12, 1, '', 'Descripción de la tarea', '2024-09-02 12:30:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareasestudiantes`
--

CREATE TABLE `tareasestudiantes` (
  `idEstudiante` int(11) NOT NULL,
  `idTarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------
CREATE TABLE `archivostarea` (
  `idArchivo` int(11) NOT NULL,
  `idTarea` int(11) NOT NULL,
  `archivo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaEntrega` datetime NOT NULL,
  `nombreArchivo` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;


-- -----------------------------------------------------
-- Table `tis`.`criterio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis`.`criterio` (
  `idCriterio` INT NOT NULL AUTO_INCREMENT,
  `criterio` VARCHAR(45) NULL,
  PRIMARY KEY (`idCriterio`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `tis`.`evaluacionPar`
-- -----------------------------------------------------



--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivostarea`
--
ALTER TABLE `archivostarea`
  ADD PRIMARY KEY (`idArchivo`) USING BTREE,
  ADD UNIQUE KEY `idArchivo` (`idArchivo`) USING BTREE,
  ADD KEY `FK_fk_ArchivosTarea_Tarea` (`idTarea`) USING BTREE;

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`idDocente`) USING BTREE,
  ADD UNIQUE KEY `idDocente` (`idDocente`) USING BTREE,
  ADD UNIQUE KEY `nombreCuenta` (`nombreCuenta`) USING BTREE;

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`) USING BTREE,
  ADD UNIQUE KEY `idEmpresa` (`idEmpresa`) USING BTREE,
  ADD UNIQUE KEY `nombreEmpresa` (`nombreEmpresa`) USING BTREE,
  ADD UNIQUE KEY `nombreLargo` (`nombreLargo`) USING BTREE;

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`idEstudiante`) USING BTREE,
  ADD UNIQUE KEY `idEstudiante` (`idEstudiante`) USING BTREE,
  ADD UNIQUE KEY `nombreCuenta` (`nombreCuenta`) USING BTREE;

--
-- Indices de la tabla `estudiantesempresas`
--
ALTER TABLE `estudiantesempresas`
  ADD PRIMARY KEY (`idEmpresa`,`idEstudiante`) USING BTREE,
  ADD KEY `FK_Relationship_14` (`idEstudiante`) USING BTREE;

--
-- Indices de la tabla `estudiantesgrupos`
--
ALTER TABLE `estudiantesgrupos`
  ADD PRIMARY KEY (`idEstudiante`,`idGrupo`) USING BTREE,
  ADD KEY `FK_Relationship_12` (`idGrupo`) USING BTREE;

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`) USING BTREE;

--
-- Indices de la tabla `fotodocente`
--
ALTER TABLE `fotodocente`
  ADD PRIMARY KEY (`idFoto`) USING BTREE,
  ADD UNIQUE KEY `idFoto` (`idFoto`) USING BTREE,
  ADD KEY `FK_fk_FotoDocente_Docente` (`idDocente`) USING BTREE;

--
-- Indices de la tabla `fotoestudiante`
--
ALTER TABLE `fotoestudiante`
  ADD PRIMARY KEY (`idFoto`) USING BTREE,
  ADD UNIQUE KEY `idFoto` (`idFoto`) USING BTREE,
  ADD KEY `FK_fk_FotoEstudiante_Estudiante` (`idEstudiante`) USING BTREE;

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`) USING BTREE,
  ADD UNIQUE KEY `idGrupo` (`idGrupo`) USING BTREE,
  ADD KEY `FK_fk_Grupo_Docente` (`idDocente`) USING BTREE;


--
-- Indices de la tabla `notasprint`
--
ALTER TABLE `notasprint`
  ADD PRIMARY KEY (`idSprint`,`idEmpresa`,`idEstudiante`),
  ADD KEY `fk_estudiantesempresas_has_sprint_sprint1_idx` (`idSprint`),
  ADD KEY `fk_notasprint_estudiantesempresas1_idx` (`idEmpresa`,`idEstudiante`);

--

--
-- Indices de la tabla `planificacion`
--
ALTER TABLE `planificacion`
  ADD PRIMARY KEY (`idPlanificacion`) USING BTREE,
  ADD UNIQUE KEY `idPlanificacion` (`idPlanificacion`) USING BTREE,
  ADD KEY `FK_fk_Planificacion_Empresa` (`idEmpresa`) USING BTREE;

--
-- Indices de la tabla `semana`
--
ALTER TABLE `semana`
  ADD PRIMARY KEY (`idSemana`) USING BTREE,
  ADD UNIQUE KEY `idSemana` (`idSemana`) USING BTREE,
  ADD KEY `FK_fk_Semana_Sprint` (`idSprint`) USING BTREE;

--
-- Indices de la tabla `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`idSprint`) USING BTREE,
  ADD UNIQUE KEY `idSprint` (`idSprint`) USING BTREE,
  ADD KEY `FK_fk_Sprint_Planificacion` (`idPlanificacion`) USING BTREE;

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`) USING BTREE,
  ADD UNIQUE KEY `idTarea` (`idTarea`) USING BTREE,
  ADD KEY `FK_fk_Tarea_Semana` (`idSemana`) USING BTREE;

--
-- Indices de la tabla `tareasestudiantes`
--
ALTER TABLE `tareasestudiantes`
  ADD PRIMARY KEY (`idEstudiante`,`idTarea`) USING BTREE,
  ADD KEY `FK_Relationship_17` (`idTarea`) USING BTREE;


--

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivostarea`
--
ALTER TABLE `archivostarea`
  MODIFY `idArchivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `idDocente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `idEstudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotodocente`
--
ALTER TABLE `fotodocente`
  MODIFY `idFoto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotoestudiante`
--
ALTER TABLE `fotoestudiante`
  MODIFY `idFoto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


--
-- AUTO_INCREMENT de la tabla `planificacion`
--
ALTER TABLE `planificacion`
  MODIFY `idPlanificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `semana`
--
ALTER TABLE `semana`
  MODIFY `idSemana` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sprint`
--
ALTER TABLE `sprint`
  MODIFY `idSprint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivostarea`
--
ALTER TABLE `archivostarea`
  ADD CONSTRAINT `FK_fk_ArchivosTarea_Tarea` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`);

--
-- Filtros para la tabla `estudiantesempresas`
--
ALTER TABLE `estudiantesempresas`
  ADD CONSTRAINT `FK_Relationship_14` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`),
  ADD CONSTRAINT `FK_Relationship_15` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

--
-- Filtros para la tabla `estudiantesgrupos`
--
ALTER TABLE `estudiantesgrupos`
  ADD CONSTRAINT `FK_Relationship_11` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`),
  ADD CONSTRAINT `FK_Relationship_12` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`);

--
-- Filtros para la tabla `fotodocente`
--
ALTER TABLE `fotodocente`
  ADD CONSTRAINT `FK_fk_FotoDocente_Docente` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`);

--
-- Filtros para la tabla `fotoestudiante`
--
ALTER TABLE `fotoestudiante`
  ADD CONSTRAINT `FK_fk_FotoEstudiante_Estudiante` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`);

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `FK_fk_Grupo_Docente` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`);

--
-- Filtros para la tabla `notasprint`
--
ALTER TABLE `notasprint`
  ADD CONSTRAINT `fk_estudiantesempresas_has_sprint_sprint1` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_notasprint_estudiantesempresas1` FOREIGN KEY (`idEmpresa`,`idEstudiante`) REFERENCES `estudiantesempresas` (`idEmpresa`, `idEstudiante`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `planificacion`
--
ALTER TABLE `planificacion`
  ADD CONSTRAINT `FK_fk_Planificacion_Empresa` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

--
-- Filtros para la tabla `semana`
--
ALTER TABLE `semana`
  ADD CONSTRAINT `FK_fk_Semana_Sprint` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`);

--
-- Filtros para la tabla `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `FK_fk_Sprint_Planificacion` FOREIGN KEY (`idPlanificacion`) REFERENCES `planificacion` (`idPlanificacion`);

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `FK_fk_Tarea_Semana` FOREIGN KEY (`idSemana`) REFERENCES `semana` (`idSemana`);

--
-- Filtros para la tabla `tareasestudiantes`
--
ALTER TABLE `tareasestudiantes`
  ADD CONSTRAINT `FK_Relationship_17` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`),
  ADD CONSTRAINT `FK_Relationship_18` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`);
COMMIT;
-- -----------------------------------------------------
-- Table `tis`.`evaluacionPar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tis`.`evaluacionPar` (
  `idevaluacionPar` INT NOT NULL AUTO_INCREMENT,
  `idEmpresa` INT(11) NOT NULL,
  `idEstudianteEvaluado` INT(11) NOT NULL,
  `idEstudianteEvaluador` INT(11) NOT NULL,
  `idCriterio` INT(11) NOT NULL,
  `nota` INT(3) NULL,
  PRIMARY KEY (`idevaluacionPar`),
  INDEX `fk_evaluacionPar_estudiantesempresas_idx` (`idEmpresa`, `idEstudianteEvaluado`, `idEstudianteEvaluador`),
  INDEX `fk_evaluacionPar_criterio1_idx` (`idCriterio`),
  CONSTRAINT `fk_evaluacionPar_estudiantesempresas`
    FOREIGN KEY (`idEmpresa`, `idEstudianteEvaluado`) 
    REFERENCES `tis`.`estudiantesempresas` (`idEmpresa`, `idEstudiante`) -- Referenciar el evaluado
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkidDocente_evaluacionPar_estudiantesempresas_evaluador`
    FOREIGN KEY (`idEmpresa`, `idEstudianteEvaluador`) 
    REFERENCES `tis`.`estudiantesempresas` (`idEmpresa`, `idEstudiante`) -- Referenciar el evaluador
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_evaluacionPar_criterio1`
    FOREIGN KEY (`idCriterio`)
    REFERENCES `tis`.`criterio` (`idCriterio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS entregables (
    idEntregables int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idSprint int(11) NOT NULL,
    descripcionEntregable TEXT NOT NULL,
    FOREIGN KEY (idSprint) REFERENCES sprint(idSprint) ON DELETE CASCADE
);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
