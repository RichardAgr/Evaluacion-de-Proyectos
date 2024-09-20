-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2024 a las 20:46:43
-- Versión del servidor: 8.4.0
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basededatos`
--
CREATE DATABASE IF NOT EXISTS `basededatos` DEFAULT CHARACTER SET utf8mb4;
USE `basededatos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivostarea`
--

CREATE TABLE `archivostarea` (
  `idArchivo` int NOT NULL,
  `idTarea` int NOT NULL,
  `archivo` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `idDocente` int NOT NULL,
  `nombreCuenta` varchar(15) DEFAULT NULL,
  `nombreDocente` varchar(10) DEFAULT NULL,
  `primerApellido` varchar(10) DEFAULT NULL,
  `segundoApellido` varchar(10) DEFAULT NULL,
  `contraseña` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`idDocente`, `nombreCuenta`, `nombreDocente`, `primerApellido`, `segundoApellido`, `contraseña`) VALUES
(1, 'letiGod', 'Leticia', 'Blanco', 'Coca', 'password1'),
(2, 'corina123', 'Carlos', 'Flores', 'Villaroel', 'password2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int NOT NULL,
  `nombreEmpresa` varchar(12) DEFAULT NULL,
  `nombreLargo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombreEmpresa`, `nombreLargo`) VALUES
(1, 'CreativeH', 'CreativeHabordSl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `idEstudiante` int NOT NULL,
  `nombreCuenta` varchar(15) DEFAULT NULL,
  `nombreEstudiante` varchar(12) DEFAULT NULL,
  `primerApellido` varchar(10) DEFAULT NULL,
  `segundoApellido` varchar(10) DEFAULT NULL,
  `contraseña` varchar(20) DEFAULT NULL,
  `rol` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`idEstudiante`, `nombreCuenta`, `nombreEstudiante`, `primerApellido`, `segundoApellido`, `contraseña`, `rol`) VALUES
(1, 'agarcia', 'Ana', 'García', 'Sanchez', 'passAna1', 'Estudiante'),
(2, 'lhernandez', 'Luis', 'Hernández', 'Torres', 'passLuis2', 'Estudiante'),
(3, 'jmendez', 'Juan', 'Méndez', 'Lopez', 'passJuan3', 'Estudiante'),
(4, 'srodriguez', 'Sofia', 'Rodríguez', 'Ramirez', 'passSofia4', 'Estudiante'),
(5, 'cdiaz', 'Carlos', 'Díaz', 'Fernández', 'passCarlos5', 'Estudiante'),
(6, 'lmorales', 'Lucía', 'Morales', 'González', 'passLucia6', 'Estudiante'),
(7, 'dcruz', 'David', 'Cruz', 'Muñoz', 'passDavid7', 'Estudiante'),
(8, 'emartinez', 'Elena', 'Martínez', 'Vargas', 'passElena8', 'Estudiante'),
(9, 'jlopez', 'Jorge', 'Lopez', 'Pacheco', 'passJorge9', 'Estudiante'),
(10, 'pperez', 'Paula', 'Pérez', 'Gómez', 'passPaula10', 'Estudiante'),
(11, 'acastro', 'Antonio', 'Castro', 'Silva', 'passAntonio11', 'Estudiante'),
(12, 'mfernandez', 'María', 'Fernández', 'Rojas', 'passMaria12', 'Estudiante'),
(13, 'rmolina', 'Raquel', 'Molina', 'Torres', 'passRaquel13', 'Estudiante'),
(14, 'fcarrasco', 'Felipe', 'Carrasco', 'Ramírez', 'passFelipe14', 'Estudiante'),
(15, 'scampos', 'Sara', 'Campos', 'López', 'passSara15', 'Estudiante'),
(16, 'malonso', 'Miguel', 'Alonso', 'Ortiz', 'passMiguel16', 'Estudiante'),
(17, 'cmoreno', 'Claudia', 'Moreno', 'Jiménez', 'passClaudia17', 'Estudiante'),
(18, 'areyes', 'Antonio', 'Reyes', 'Castillo', 'passAntonio18', 'Estudiante'),
(19, 'ivega', 'Isabel', 'Vega', 'Espinoza', 'passIsabel19', 'Estudiante'),
(20, 'aflores', 'Alberto', 'Flores', 'Salinas', 'passAlberto20', 'Estudiante'),
(21, 'rmontes', 'Rosa', 'Montes', 'Hernández', 'passRosa21', 'Estudiante'),
(22, 'tvillar', 'Tomás', 'Villar', 'García', 'passTomas22', 'Estudiante'),
(23, 'squintana', 'Sandra', 'Quintana', 'Ramos', 'passSandra23', 'Estudiante'),
(24, 'hpena', 'Hugo', 'Peña', 'Maldonado', 'passHugo24', 'Estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantesempresas`
--

CREATE TABLE `estudiantesempresas` (
  `idEmpresa` int NOT NULL,
  `idEstudiante` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

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
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantesgrupos`
--

CREATE TABLE `estudiantesgrupos` (
  `idEstudiante` int NOT NULL,
  `idGrupo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Volcado de datos para la tabla `estudiantesgrupos`
--

INSERT INTO `estudiantesgrupos` (`idEstudiante`, `idGrupo`) VALUES
(1, 1),
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
(1, 1),
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
(24, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotodocente`
--

CREATE TABLE `fotodocente` (
  `idFoto` int NOT NULL,
  `foto` longtext NOT NULL,
  `idDocente` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotoestudiante`
--

CREATE TABLE `fotoestudiante` (
  `idFoto` int NOT NULL,
  `foto` longtext,
  `idEstudiante` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int NOT NULL,
  `numGrupo` int DEFAULT NULL,
  `gestionGrupo` varchar(6) DEFAULT NULL,
  `idDocente` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `numGrupo`, `gestionGrupo`, `idDocente`) VALUES
(1, 1, '2024-2', 1),
(2, 2, '2024-2', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notassemana`
--

CREATE TABLE `notassemana` (
  `idNota` int NOT NULL,
  `idSemana` int NOT NULL,
  `nota` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notassemanaestudiantes`
--

CREATE TABLE `notassemanaestudiantes` (
  `idEstudiante` int NOT NULL,
  `idNota` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planificacion`
--

CREATE TABLE `planificacion` (
  `idPlanificacion` int NOT NULL,
  `idEmpresa` int NOT NULL,
  `aceptada` tinyint(1) DEFAULT NULL,
  `fechaEntrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Volcado de datos para la tabla `planificacion`
--

INSERT INTO `planificacion` (`idPlanificacion`, `idEmpresa`, `aceptada`, `fechaEntrega`) VALUES
(1, 1, 1, '2024-09-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revisionplani`
--

CREATE TABLE `revisionplani` (
  `idPlanificacion` int NOT NULL,
  `nota` int DEFAULT NULL,
  `comentario` longtext,
  `idDocente` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revisionsprint`
--

CREATE TABLE `revisionsprint` (
  `idDocente` int NOT NULL,
  `idSprint` int NOT NULL,
  `nota` int DEFAULT NULL,
  `comentario` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semana`
--

CREATE TABLE `semana` (
  `idSemana` int NOT NULL,
  `idSprint` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sprint`
--

CREATE TABLE `sprint` (
  `idSprint` int NOT NULL,
  `idPlanificacion` int NOT NULL,
  `fechaIni` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `cobro` int DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int NOT NULL,
  `idSemana` int NOT NULL,
  `comentario` longtext NOT NULL,
  `textoTarea` longtext NOT NULL,
  `fechaEntrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareaestudiante`
--

CREATE TABLE `tareaestudiante` (
  `idEstudiante` int NOT NULL,
  `idTarea` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivostarea`
--
ALTER TABLE `archivostarea`
  ADD PRIMARY KEY (`idArchivo`),
  ADD UNIQUE KEY `idArchivo` (`idArchivo`),
  ADD KEY `fk_ArchivosTarea_Tarea` (`idTarea`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`idDocente`),
  ADD UNIQUE KEY `idDocente` (`idDocente`),
  ADD UNIQUE KEY `nombreCuenta` (`nombreCuenta`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`),
  ADD UNIQUE KEY `idEmpresa` (`idEmpresa`),
  ADD UNIQUE KEY `nombreEmpresa` (`nombreEmpresa`),
  ADD UNIQUE KEY `nombreLargo` (`nombreLargo`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`idEstudiante`),
  ADD UNIQUE KEY `idEstudiante` (`idEstudiante`),
  ADD UNIQUE KEY `nombreCuenta` (`nombreCuenta`);

--
-- Indices de la tabla `estudiantesempresas`
--
ALTER TABLE `estudiantesempresas`
  ADD KEY `fk_EstudiantesEmpresas_Empresa` (`idEmpresa`),
  ADD KEY `fk_EstudiantesEmpresas_Estudiante` (`idEstudiante`);

--
-- Indices de la tabla `estudiantesgrupos`
--
ALTER TABLE `estudiantesgrupos`
  ADD KEY `fk_EstudiantesGrupos_Estudiante` (`idEstudiante`),
  ADD KEY `fk_EstudiantesGrupos_Grupo` (`idGrupo`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `fotodocente`
--
ALTER TABLE `fotodocente`
  ADD PRIMARY KEY (`idFoto`),
  ADD UNIQUE KEY `idFoto` (`idFoto`),
  ADD KEY `fk_FotoDocente_Docente` (`idDocente`);

--
-- Indices de la tabla `fotoestudiante`
--
ALTER TABLE `fotoestudiante`
  ADD PRIMARY KEY (`idFoto`),
  ADD UNIQUE KEY `idFoto` (`idFoto`),
  ADD KEY `fk_FotoEstudiante_Estudiante` (`idEstudiante`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`),
  ADD UNIQUE KEY `idGrupo` (`idGrupo`),
  ADD KEY `fk_Grupo_Docente` (`idDocente`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notassemana`
--
ALTER TABLE `notassemana`
  ADD PRIMARY KEY (`idNota`),
  ADD UNIQUE KEY `idNota` (`idNota`),
  ADD KEY `fk_NotasSemana_Semana` (`idSemana`);

--
-- Indices de la tabla `notassemanaestudiantes`
--
ALTER TABLE `notassemanaestudiantes`
  ADD KEY `fk_NotasSemanaEstudiantes_Estudiante` (`idEstudiante`),
  ADD KEY `fk_NotasSemanaEstudiantes_Nota` (`idNota`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `planificacion`
--
ALTER TABLE `planificacion`
  ADD PRIMARY KEY (`idPlanificacion`),
  ADD UNIQUE KEY `idPlanificacion` (`idPlanificacion`),
  ADD KEY `fk_Planificacion_Empresa` (`idEmpresa`);

--
-- Indices de la tabla `revisionplani`
--
ALTER TABLE `revisionplani`
  ADD KEY `fk_RevisionPlani_Planificacion` (`idPlanificacion`),
  ADD KEY `fk_RevisionPlani_Docente` (`idDocente`);

--
-- Indices de la tabla `revisionsprint`
--
ALTER TABLE `revisionsprint`
  ADD KEY `fk_RevisionSprint_Docente` (`idDocente`),
  ADD KEY `fk_RevisionSprint_Sprint` (`idSprint`);

--
-- Indices de la tabla `semana`
--
ALTER TABLE `semana`
  ADD PRIMARY KEY (`idSemana`),
  ADD UNIQUE KEY `idSemana` (`idSemana`),
  ADD KEY `fk_Semana_Sprint` (`idSprint`);

--
-- Indices de la tabla `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`idSprint`),
  ADD UNIQUE KEY `idSprint` (`idSprint`),
  ADD KEY `fk_Sprint_Planificacion` (`idPlanificacion`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`),
  ADD UNIQUE KEY `idTarea` (`idTarea`),
  ADD KEY `fk_Tarea_Semana` (`idSemana`);

--
-- Indices de la tabla `tareaestudiante`
--
ALTER TABLE `tareaestudiante`
  ADD KEY `fk_TareaEstudiante_Estudiante` (`idEstudiante`),
  ADD KEY `fk_TareaEstudiante_Tarea` (`idTarea`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivostarea`
--
ALTER TABLE `archivostarea`
  MODIFY `idArchivo` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `idDocente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `idEstudiante` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotodocente`
--
ALTER TABLE `fotodocente`
  MODIFY `idFoto` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotoestudiante`
--
ALTER TABLE `fotoestudiante`
  MODIFY `idFoto` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `idGrupo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `notassemana`
--
ALTER TABLE `notassemana`
  MODIFY `idNota` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planificacion`
--
ALTER TABLE `planificacion`
  MODIFY `idPlanificacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `semana`
--
ALTER TABLE `semana`
  MODIFY `idSemana` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sprint`
--
ALTER TABLE `sprint`
  MODIFY `idSprint` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivostarea`
--
ALTER TABLE `archivostarea`
  ADD CONSTRAINT `fk_ArchivosTarea_Tarea` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`);

--
-- Filtros para la tabla `estudiantesempresas`
--
ALTER TABLE `estudiantesempresas`
  ADD CONSTRAINT `fk_EstudiantesEmpresas_Empresa` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`),
  ADD CONSTRAINT `fk_EstudiantesEmpresas_Estudiante` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`);

--
-- Filtros para la tabla `estudiantesgrupos`
--
ALTER TABLE `estudiantesgrupos`
  ADD CONSTRAINT `fk_EstudiantesGrupos_Estudiante` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`),
  ADD CONSTRAINT `fk_EstudiantesGrupos_Grupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`);

--
-- Filtros para la tabla `fotodocente`
--
ALTER TABLE `fotodocente`
  ADD CONSTRAINT `fk_FotoDocente_Docente` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`);

--
-- Filtros para la tabla `fotoestudiante`
--
ALTER TABLE `fotoestudiante`
  ADD CONSTRAINT `fk_FotoEstudiante_Estudiante` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`);

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `fk_Grupo_Docente` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`);

--
-- Filtros para la tabla `notassemana`
--
ALTER TABLE `notassemana`
  ADD CONSTRAINT `fk_NotasSemana_Semana` FOREIGN KEY (`idSemana`) REFERENCES `semana` (`idSemana`);

--
-- Filtros para la tabla `notassemanaestudiantes`
--
ALTER TABLE `notassemanaestudiantes`
  ADD CONSTRAINT `fk_NotasSemanaEstudiantes_Estudiante` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`),
  ADD CONSTRAINT `fk_NotasSemanaEstudiantes_Nota` FOREIGN KEY (`idNota`) REFERENCES `notassemana` (`idNota`);

--
-- Filtros para la tabla `planificacion`
--
ALTER TABLE `planificacion`
  ADD CONSTRAINT `fk_Planificacion_Empresa` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

--
-- Filtros para la tabla `revisionplani`
--
ALTER TABLE `revisionplani`
  ADD CONSTRAINT `fk_RevisionPlani_Docente` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`),
  ADD CONSTRAINT `fk_RevisionPlani_Planificacion` FOREIGN KEY (`idPlanificacion`) REFERENCES `planificacion` (`idPlanificacion`);

--
-- Filtros para la tabla `revisionsprint`
--
ALTER TABLE `revisionsprint`
  ADD CONSTRAINT `fk_RevisionSprint_Docente` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`),
  ADD CONSTRAINT `fk_RevisionSprint_Sprint` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`);

--
-- Filtros para la tabla `semana`
--
ALTER TABLE `semana`
  ADD CONSTRAINT `fk_Semana_Sprint` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`);

--
-- Filtros para la tabla `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `fk_Sprint_Planificacion` FOREIGN KEY (`idPlanificacion`) REFERENCES `planificacion` (`idPlanificacion`);

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `fk_Tarea_Semana` FOREIGN KEY (`idSemana`) REFERENCES `semana` (`idSemana`);

--
-- Filtros para la tabla `tareaestudiante`
--
ALTER TABLE `tareaestudiante`
  ADD CONSTRAINT `fk_TareaEstudiante_Estudiante` FOREIGN KEY (`idEstudiante`) REFERENCES `estudiante` (`idEstudiante`),
  ADD CONSTRAINT `fk_TareaEstudiante_Tarea` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
