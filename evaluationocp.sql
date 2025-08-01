-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 01, 2025 at 08:49 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evaluationocp`
--
CREATE DATABASE IF NOT EXISTS `evaluationocp`;
USE `evaluationocp`;


-- --------------------------------------------------------

--
-- Table structure for table `administrateur`
--

DROP TABLE IF EXISTS `administrateur`;
CREATE TABLE IF NOT EXISTS `administrateur` (
  `id_administrateur` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','SUPERADMIN') DEFAULT NULL,
  `ville_centre_id_centre` bigint DEFAULT NULL,
  PRIMARY KEY (`id_administrateur`),
  KEY `FKnd1txg2p4otvhc6eigtnwij68` (`ville_centre_id_centre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `administrateur`
--

INSERT INTO `administrateur` (`id_administrateur`, `email`, `nom`, `password`, `prenom`, `role`, `ville_centre_id_centre`) VALUES
(1, 'walidmataich65@gmail.com', 'Admin', '$2a$10$8ZFDuhxU8huDrdHK60rdjuiyYuxth.QE/EELIXLO3LJ0FSTA7tZTC', 'Admin', 'ADMIN', 2),
(2, 'walidmt222@gmail.com', 'SuperAdmin', '$2a$10$9J9KrQnFvPnIftG0ZedQUub6VUZMic8pcRDykFKWrGKXVrx03AXmi', 'SuperAdmin', 'SUPERADMIN', NULL),
(4, 'test@gmail.com', 'test', '$2a$10$mmifRvhA4dk1wGwjmlE2huQv29LyJO08GbV4VDgkQNICL80MNbPBm', 'test', 'SUPERADMIN', 4),
(8, 'walidmataich1@gmail.com', 'mataich', '$2a$10$5kKNtWTBGOUlFCeTKdtjl.B5lbZQbYXxK4FpgAoCIFIzTFDVwepgi', 'walidd', 'ADMIN', 1),
(9, 'admin@gmail.com', 'b', '$2a$10$b9PlXP6qr5lDJEDthdsaK.yCL8YWm4Z1WMm.MAcQ0uGVBBfuyojo6', 'b', 'ADMIN', 7);

-- --------------------------------------------------------

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE IF NOT EXISTS `evaluation` (
  `id_evaluation` bigint NOT NULL AUTO_INCREMENT,
  `avis` varchar(255) DEFAULT NULL,
  `time` time(6) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `id_centre` bigint NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_evaluation`),
  KEY `FKa22s7gxbmxd2wsfdsg9pb9nwt` (`id_centre`)
) ENGINE=InnoDB AUTO_INCREMENT=299 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `evaluation`
--

INSERT INTO `evaluation` (`id_evaluation`, `avis`, `time`, `date`, `id_centre`, `type`, `comment`) VALUES
(1, 'tres satisfait', '09:22:28.583000', '2025-07-11', 3, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet maurisLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed '),
(2, 'tres satisfait', '09:22:39.052000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(3, 'tres satisfait', '09:22:59.033000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(4, 'satisfait', '09:23:09.046000', '2025-07-11', 3, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(6, 'tres satisfait', '10:12:14.321000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(7, 'tres satisfait', '10:15:45.109000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(8, 'satisfait', '10:17:12.004000', '2025-07-11', 3, 'comportement', NULL),
(9, 'tres satisfait', '10:18:59.567000', '2025-07-11', 3, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(10, 'tres satisfait', '10:20:33.912000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(11, 'peu satisfait', '10:21:11.876000', '2025-07-11', 3, 'comportement', NULL),
(12, 'satisfait', '10:22:47.215000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(13, 'tres satisfait', '10:23:55.099000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(14, 'tres satisfait', '10:24:30.333000', '2025-07-11', 3, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(15, 'satisfait', '10:25:41.777000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(16, 'tres satisfait', '10:30:01.523000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(17, 'peu satisfait', '10:31:12.102000', '2025-07-11', 3, 'comportement', NULL),
(18, 'satisfait', '10:32:25.880000', '2025-07-11', 3, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(19, 'tres satisfait', '10:33:41.213000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(20, 'tres satisfait', '10:34:07.311000', '2025-07-11', 3, 'comportement', NULL),
(21, 'tres satisfait', '10:35:16.444000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(22, 'peu satisfait', '10:36:29.501000', '2025-07-11', 3, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(23, 'satisfait', '10:37:45.937000', '2025-07-11', 3, 'comportement', NULL),
(24, 'tres satisfait', '10:38:57.214000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(25, 'tres satisfait', '10:39:03.605000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(26, 'peu satisfait', '10:40:19.726000', '2025-07-11', 3, 'comportement', NULL),
(27, 'satisfait', '10:41:30.852000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(28, 'tres satisfait', '10:42:48.901000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(29, 'peu satisfait', '10:43:59.409000', '2025-07-11', 3, 'comportement', NULL),
(30, 'pas du tout satisfait', '10:44:05.777000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(31, 'satisfait', '10:45:15.672000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(32, 'tres satisfait', '10:46:22.019000', '2025-07-11', 3, 'comportement', NULL),
(33, 'peu satisfait', '10:47:35.110000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(34, 'pas du tout satisfait', '10:48:47.934000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(35, 'satisfait', '10:49:52.399000', '2025-07-11', 3, 'comportement', NULL),
(36, 'tres satisfait', '10:50:08.672000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(37, 'peu satisfait', '10:51:23.887000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(38, 'satisfait', '10:52:39.159000', '2025-07-11', 3, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(39, 'pas du tout satisfait', '10:53:48.331000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(40, 'tres satisfait', '10:54:14.003000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(41, 'satisfait', '10:55:27.900000', '2025-07-11', 3, 'comportement', NULL),
(42, 'peu satisfait', '10:56:41.120000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(43, 'tres satisfait', '10:57:59.413000', '2025-07-11', 3, 'tempsDeReponse', NULL),
(44, 'tres satisfait', '10:58:16.820000', '2025-07-11', 3, 'comportement', NULL),
(45, 'satisfait', '10:59:30.607000', '2025-07-11', 3, 'qualiteDeLaSolution', NULL),
(46, 'tres satisfait', '11:00:05.234000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(47, 'peu satisfait', '11:01:12.678000', '2025-07-11', 1, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(48, 'satisfait', '11:02:25.321000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(49, 'tres satisfait', '11:03:33.589000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(50, 'tres satisfait', '11:04:45.122000', '2025-07-11', 1, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(51, 'satisfait', '11:05:58.304000', '2025-07-11', 1, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(52, 'peu satisfait', '11:06:17.990000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(53, 'tres satisfait', '11:07:26.403000', '2025-07-11', 1, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(54, 'tres satisfait', '11:08:31.112000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(55, 'satisfait', '11:09:44.803000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(56, 'peu satisfait', '11:10:59.201000', '2025-07-11', 1, 'comportement', NULL),
(57, 'tres satisfait', '11:11:23.771000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(58, 'pas du tout satisfait', '11:12:38.431000', '2025-07-11', 1, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(59, 'satisfait', '11:13:47.291000', '2025-07-11', 1, 'comportement', NULL),
(60, 'tres satisfait', '11:14:52.612000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(61, 'peu satisfait', '11:15:18.934000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(62, 'satisfait', '11:16:31.777000', '2025-07-11', 1, 'comportement', NULL),
(63, 'pas du tout satisfait', '11:17:45.009000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(64, 'tres satisfait', '11:18:54.306000', '2025-07-11', 1, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(65, 'peu satisfait', '11:19:12.189000', '2025-07-11', 1, 'comportement', NULL),
(66, 'satisfait', '11:20:23.501000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(67, 'tres satisfait', '11:21:38.002000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(68, 'pas du tout satisfait', '11:22:59.317000', '2025-07-11', 1, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(69, 'peu satisfait', '11:23:11.908000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(70, 'satisfait', '11:24:35.444000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(71, 'tres satisfait', '11:25:42.091000', '2025-07-11', 1, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(72, 'satisfait', '11:26:53.789000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(73, 'peu satisfait', '11:27:10.631000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(74, 'pas du tout satisfait', '11:28:26.209000', '2025-07-11', 1, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(75, 'tres satisfait', '11:29:31.773000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(76, 'satisfait', '11:30:48.125000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(77, 'satisfait', '11:31:03.511000', '2025-07-11', 2, 'comportement', NULL),
(78, 'peu satisfait', '11:32:17.294000', '2025-07-11', 2, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(79, 'tres satisfait', '11:33:22.480000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(80, 'tres satisfait', '11:34:36.801000', '2025-07-11', 2, 'comportement', NULL),
(81, 'peu satisfait', '11:35:49.653000', '2025-07-11', 2, 'qualiteDeLaSolution', NULL),
(82, 'satisfait', '11:36:57.200000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(83, 'tres satisfait', '11:37:19.889000', '2025-07-11', 2, 'comportement', NULL),
(84, 'tres satisfait', '11:38:28.713000', '2025-07-11', 2, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(85, 'pas du tout satisfait', '11:39:44.155000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(86, 'tres satisfait', '11:40:51.412000', '2025-07-11', 2, 'comportement', NULL),
(87, 'satisfait', '11:42:09.331000', '2025-07-11', 2, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(88, 'peu satisfait', '11:43:21.000000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(89, 'tres satisfait', '11:44:35.217000', '2025-07-11', 2, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(90, 'tres satisfait', '11:45:48.921000', '2025-07-11', 2, 'qualiteDeLaSolution', NULL),
(91, 'satisfait', '11:47:00.112000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(92, 'peu satisfait', '11:48:13.375000', '2025-07-11', 2, 'comportement', NULL),
(93, 'pas du tout satisfait', '11:49:29.080000', '2025-07-11', 2, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(94, 'tres satisfait', '11:50:45.992000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(95, 'satisfait', '11:51:59.364000', '2025-07-11', 2, 'comportement', NULL),
(96, 'peu satisfait', '11:52:16.801000', '2025-07-11', 2, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(97, 'pas du tout satisfait', '11:53:34.207000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(98, 'tres satisfait', '11:54:45.130000', '2025-07-11', 2, 'comportement', NULL),
(99, 'satisfait', '11:55:59.448000', '2025-07-11', 2, 'qualiteDeLaSolution', NULL),
(100, 'peu satisfait', '11:56:17.015000', '2025-07-11', 2, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(101, 'tres satisfait', '11:57:28.604000', '2025-07-11', 2, 'comportement', NULL),
(102, 'pas du tout satisfait', '11:58:41.776000', '2025-07-11', 2, 'qualiteDeLaSolution', NULL),
(103, 'peu satisfait', '11:59:56.100000', '2025-07-11', 2, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(104, 'satisfait', '12:00:12.398000', '2025-07-11', 2, 'comportement', NULL),
(105, 'tres satisfait', '12:01:29.211000', '2025-07-11', 2, 'qualiteDeLaSolution', NULL),
(106, 'pas du tout satisfait', '12:02:47.505000', '2025-07-11', 2, 'tempsDeReponse', NULL),
(107, 'tres satisfait', '12:03:13.784000', '2025-07-11', 4, 'comportement', NULL),
(108, 'satisfait', '12:04:22.615000', '2025-07-11', 4, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(109, 'peu satisfait', '12:05:39.910000', '2025-07-11', 4, 'tempsDeReponse', NULL),
(110, 'pas du tout satisfait', '12:06:51.222000', '2025-07-11', 4, 'comportement', NULL),
(111, 'pas du tout satisfait', '12:08:04.087000', '2025-07-11', 4, 'qualiteDeLaSolution', NULL),
(112, 'tres satisfait', '12:09:16.334000', '2025-07-11', 4, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(113, 'peu satisfait', '12:10:33.102000', '2025-07-11', 4, 'comportement', NULL),
(114, 'pas du tout satisfait', '12:11:40.889000', '2025-07-11', 4, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(115, 'pas du tout satisfait', '12:12:53.617000', '2025-07-11', 4, 'tempsDeReponse', NULL),
(116, 'pas du tout satisfait', '12:14:09.430000', '2025-07-11', 4, 'comportement', NULL),
(117, 'peu satisfait', '12:15:21.311000', '2025-07-11', 4, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(118, 'pas du tout satisfait', '12:16:39.751000', '2025-07-11', 4, 'tempsDeReponse', NULL),
(119, 'pas du tout satisfait', '12:17:52.404000', '2025-07-11', 4, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(120, 'pas du tout satisfait', '12:19:03.918000', '2025-07-11', 4, 'qualiteDeLaSolution', NULL),
(121, 'pas du tout satisfait', '12:20:10.187000', '2025-07-11', 4, 'tempsDeReponse', NULL),
(122, 'pas du tout satisfait', '12:21:26.940000', '2025-07-11', 4, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(123, 'pas du tout satisfait', '12:22:39.109000', '2025-07-11', 4, 'qualiteDeLaSolution', NULL),
(124, 'pas du tout satisfait', '12:23:53.300000', '2025-07-11', 4, 'tempsDeReponse', NULL),
(125, 'peu satisfait', '12:25:07.183000', '2025-07-11', 4, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(126, 'tres satisfait', '12:26:18.455000', '2025-07-11', 4, 'qualiteDeLaSolution', NULL),
(127, 'satisfait', '12:27:32.707000', '2025-07-11', 4, 'tempsDeReponse', NULL),
(128, 'pas du tout satisfait', '12:28:45.600000', '2025-07-11', 4, 'comportement', NULL),
(129, 'peu satisfait', '12:29:58.192000', '2025-07-11', 4, 'qualiteDeLaSolution', NULL),
(130, 'tres satisfait', '12:31:11.831000', '2025-05-14', 4, 'tempsDeReponse', NULL),
(131, 'satisfait', '12:32:25.002000', '2025-05-15', 4, 'comportement', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(132, 'tres satisfait', '12:33:40.876000', '2025-07-11', 4, 'qualiteDeLaSolution', NULL),
(133, 'peu satisfait', '12:34:54.199000', '2025-07-11', 4, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(134, 'tres satisfait', '12:36:08.502000', '2025-07-11', 4, 'comportement', NULL),
(135, 'satisfait', '12:37:20.718000', '2025-07-11', 4, 'qualiteDeLaSolution', NULL),
(136, 'tres satisfait', '12:38:33.911000', '2025-07-11', 4, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(137, 'peu satisfait', '12:39:41.102000', '2025-07-11', 1, 'comportement', NULL),
(138, 'tres satisfait', '12:40:55.318000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(139, 'satisfait', '12:42:08.670000', '2025-07-11', 1, 'tempsDeReponse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(140, 'pas du tout satisfait', '12:43:19.729000', '2025-05-06', 1, 'comportement', NULL),
(141, 'satisfait', '12:55:35.908000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(142, 'pas du tout satisfait', '12:56:48.317000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(143, 'tres satisfait', '12:58:01.019000', '2025-07-11', 1, 'comportement', NULL),
(144, 'tres satisfait', '12:59:15.786000', '2025-07-11', 1, 'qualiteDeLaSolution', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros augue. Sed porta, tellus ut eleifend feugiat, tellus mauris sagittis orci, non commodo erat ex sit amet mauris.'),
(145, 'tres satisfait', '13:00:27.334000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(146, 'tres satisfait', '13:01:42.511000', '2025-07-11', 1, 'comportement', NULL),
(147, 'tres satisfait', '13:02:55.620000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(148, 'satisfait', '13:04:08.417000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(149, 'tres satisfait', '13:05:24.701000', '2025-07-11', 1, 'comportement', NULL),
(150, 'tres satisfait', '13:06:36.505000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(151, 'tres satisfait', '13:07:48.320000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(152, 'satisfait', '13:09:01.904000', '2025-07-11', 1, 'comportement', NULL),
(153, 'tres satisfait', '13:10:14.217000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(154, 'tres satisfait', '13:11:25.774000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(155, 'satisfait', '13:12:39.004000', '2025-07-11', 1, 'comportement', NULL),
(156, 'peu satisfait', '13:13:50.889000', '2025-07-11', 1, 'qualiteDeLaSolution', NULL),
(157, 'tres satisfait', '13:15:04.332000', '2025-07-11', 1, 'tempsDeReponse', NULL),
(158, 'satisfait', '09:15:00.000000', '2025-01-05', 1, 'comportement', NULL),
(159, 'peu satisfait', '10:45:00.000000', '2025-01-10', 1, 'qualiteDeLaSolution', NULL),
(160, 'tres satisfait', '14:30:00.000000', '2025-01-15', 1, 'tempsDeReponse', NULL),
(161, 'satisfait', '11:20:00.000000', '2025-01-22', 1, 'comportement', NULL),
(162, 'pas du tout satisfait', '16:05:00.000000', '2025-01-27', 1, 'qualiteDeLaSolution', NULL),
(163, 'peu satisfait', '09:10:00.000000', '2025-02-03', 1, 'tempsDeReponse', NULL),
(164, 'satisfait', '10:30:00.000000', '2025-02-08', 1, 'comportement', NULL),
(165, 'satisfait', '13:45:00.000000', '2025-02-14', 1, 'qualiteDeLaSolution', NULL),
(166, 'tres satisfait', '15:20:00.000000', '2025-02-21', 1, 'tempsDeReponse', NULL),
(167, 'pas du tout satisfait', '12:15:00.000000', '2025-02-26', 1, 'comportement', NULL),
(168, 'tres satisfait', '08:50:00.000000', '2025-03-02', 1, 'qualiteDeLaSolution', NULL),
(169, 'peu satisfait', '11:00:00.000000', '2025-03-07', 1, 'tempsDeReponse', NULL),
(170, 'satisfait', '14:10:00.000000', '2025-03-13', 1, 'comportement', NULL),
(171, 'satisfait', '16:25:00.000000', '2025-03-19', 1, 'qualiteDeLaSolution', NULL),
(172, 'pas du tout satisfait', '09:40:00.000000', '2025-03-28', 1, 'tempsDeReponse', NULL),
(173, 'satisfait', '10:20:00.000000', '2025-04-04', 1, 'comportement', NULL),
(174, 'tres satisfait', '13:00:00.000000', '2025-04-11', 1, 'qualiteDeLaSolution', NULL),
(175, 'peu satisfait', '15:40:00.000000', '2025-04-17', 1, 'tempsDeReponse', NULL),
(176, 'satisfait', '11:30:00.000000', '2025-04-22', 1, 'comportement', NULL),
(177, 'pas du tout satisfait', '14:50:00.000000', '2025-04-29', 1, 'qualiteDeLaSolution', NULL),
(178, 'tres satisfait', '09:00:00.000000', '2025-05-03', 1, 'tempsDeReponse', NULL),
(179, 'satisfait', '12:15:00.000000', '2025-05-08', 1, 'comportement', NULL),
(180, 'peu satisfait', '13:45:00.000000', '2025-05-13', 1, 'qualiteDeLaSolution', NULL),
(181, 'pas du tout satisfait', '10:40:00.000000', '2025-05-21', 1, 'tempsDeReponse', NULL),
(182, 'satisfait', '14:10:00.000000', '2025-05-28', 1, 'comportement', NULL),
(183, 'tres satisfait', '08:45:00.000000', '2025-06-05', 1, 'qualiteDeLaSolution', NULL),
(184, 'satisfait', '10:30:00.000000', '2025-06-11', 1, 'tempsDeReponse', NULL),
(185, 'peu satisfait', '13:00:00.000000', '2025-06-16', 1, 'comportement', NULL),
(186, 'satisfait', '15:20:00.000000', '2025-06-24', 1, 'qualiteDeLaSolution', NULL),
(187, 'pas du tout satisfait', '09:35:00.000000', '2025-06-29', 1, 'tempsDeReponse', NULL),
(188, 'satisfait', '09:50:00.000000', '2025-07-03', 1, 'comportement', NULL),
(189, 'tres satisfait', '11:10:00.000000', '2025-07-09', 1, 'qualiteDeLaSolution', NULL),
(190, 'peu satisfait', '13:25:00.000000', '2025-07-14', 1, 'tempsDeReponse', NULL),
(191, 'satisfait', '16:00:00.000000', '2025-07-20', 1, 'comportement', NULL),
(192, 'pas du tout satisfait', '10:30:00.000000', '2025-07-26', 1, 'qualiteDeLaSolution', NULL),
(193, 'peu satisfait', '08:40:00.000000', '2025-08-02', 1, 'tempsDeReponse', NULL),
(194, 'satisfait', '11:30:00.000000', '2025-08-07', 1, 'comportement', NULL),
(195, 'tres satisfait', '13:15:00.000000', '2025-08-13', 1, 'qualiteDeLaSolution', NULL),
(196, 'satisfait', '14:45:00.000000', '2025-08-21', 1, 'tempsDeReponse', NULL),
(197, 'pas du tout satisfait', '16:30:00.000000', '2025-08-28', 1, 'comportement', NULL),
(198, 'satisfait', '09:15:00.000000', '2025-09-04', 1, 'qualiteDeLaSolution', NULL),
(199, 'peu satisfait', '10:50:00.000000', '2025-09-09', 1, 'tempsDeReponse', NULL),
(200, 'satisfait', '12:10:00.000000', '2025-09-15', 1, 'comportement', NULL),
(201, 'tres satisfait', '14:30:00.000000', '2025-09-22', 1, 'qualiteDeLaSolution', NULL),
(202, 'pas du tout satisfait', '16:00:00.000000', '2025-09-27', 1, 'tempsDeReponse', NULL),
(203, 'satisfait', '09:30:00.000000', '2025-10-03', 1, 'comportement', NULL),
(204, 'tres satisfait', '11:00:00.000000', '2025-10-08', 1, 'qualiteDeLaSolution', NULL),
(205, 'peu satisfait', '13:10:00.000000', '2025-10-14', 1, 'tempsDeReponse', NULL),
(206, 'satisfait', '15:25:00.000000', '2025-10-20', 1, 'comportement', NULL),
(207, 'pas du tout satisfait', '10:15:00.000000', '2025-10-29', 1, 'qualiteDeLaSolution', NULL),
(208, 'satisfait', '08:55:00.000000', '2025-11-06', 1, 'tempsDeReponse', NULL),
(209, 'tres satisfait', '10:20:00.000000', '2025-11-12', 1, 'comportement', NULL),
(210, 'peu satisfait', '13:30:00.000000', '2025-11-18', 1, 'qualiteDeLaSolution', NULL),
(211, 'satisfait', '15:45:00.000000', '2025-11-23', 1, 'tempsDeReponse', NULL),
(212, 'pas du tout satisfait', '11:05:00.000000', '2025-11-30', 1, 'comportement', NULL),
(213, 'tres satisfait', '09:05:00.000000', '2025-12-03', 1, 'qualiteDeLaSolution', NULL),
(214, 'peu satisfait', '11:15:00.000000', '2025-12-09', 1, 'tempsDeReponse', NULL),
(215, 'satisfait', '14:20:00.000000', '2025-12-15', 1, 'comportement', NULL),
(216, 'satisfait', '16:10:00.000000', '2025-12-22', 1, 'qualiteDeLaSolution', NULL),
(217, 'pas du tout satisfait', '10:40:00.000000', '2025-12-30', 1, 'tempsDeReponse', NULL),
(218, 'pas du tout satisfait', '09:15:00.000000', '2025-01-05', 1, 'comportement', NULL),
(219, 'pas du tout satisfait', '10:45:00.000000', '2025-01-10', 1, 'qualiteDeLaSolution', NULL),
(220, 'tres satisfait', '14:30:00.000000', '2025-01-15', 1, 'tempsDeReponse', NULL),
(221, 'pas du tout satisfait', '11:20:00.000000', '2025-01-22', 1, 'comportement', NULL),
(222, 'pas du tout satisfait', '16:05:00.000000', '2025-01-27', 1, 'qualiteDeLaSolution', NULL),
(223, 'peu satisfait', '09:10:00.000000', '2025-02-03', 1, 'tempsDeReponse', NULL),
(224, 'satisfait', '10:30:00.000000', '2025-02-08', 1, 'comportement', NULL),
(225, 'satisfait', '13:45:00.000000', '2025-02-14', 1, 'qualiteDeLaSolution', NULL),
(226, 'pas du tout satisfait', '15:20:00.000000', '2025-02-21', 1, 'tempsDeReponse', NULL),
(227, 'pas du tout satisfait', '12:15:00.000000', '2025-02-26', 1, 'comportement', NULL),
(228, 'tres satisfait', '08:50:00.000000', '2025-03-02', 1, 'qualiteDeLaSolution', NULL),
(229, 'satisfait', '11:00:00.000000', '2025-03-07', 1, 'tempsDeReponse', NULL),
(230, 'satisfait', '14:10:00.000000', '2025-03-13', 1, 'comportement', NULL),
(231, 'satisfait', '16:25:00.000000', '2025-03-19', 1, 'qualiteDeLaSolution', NULL),
(232, 'pas du tout satisfait', '09:40:00.000000', '2025-03-28', 1, 'tempsDeReponse', NULL),
(233, 'satisfait', '10:20:00.000000', '2025-04-04', 1, 'comportement', NULL),
(234, 'satisfait', '13:00:00.000000', '2025-04-11', 1, 'qualiteDeLaSolution', NULL),
(235, 'satisfait', '15:40:00.000000', '2025-04-17', 1, 'tempsDeReponse', NULL),
(236, 'satisfait', '11:30:00.000000', '2025-04-22', 1, 'comportement', NULL),
(237, 'pas du tout satisfait', '14:50:00.000000', '2025-04-29', 1, 'qualiteDeLaSolution', NULL),
(238, 'tres satisfait', '09:00:00.000000', '2025-05-03', 1, 'tempsDeReponse', NULL),
(239, 'tres satisfait', '12:15:00.000000', '2025-05-08', 1, 'comportement', NULL),
(240, 'peu satisfait', '13:45:00.000000', '2025-05-13', 1, 'qualiteDeLaSolution', NULL),
(241, 'pas du tout satisfait', '10:40:00.000000', '2025-05-21', 1, 'tempsDeReponse', NULL),
(242, 'satisfait', '14:10:00.000000', '2025-05-28', 1, 'comportement', NULL),
(243, 'tres satisfait', '08:45:00.000000', '2025-06-05', 1, 'qualiteDeLaSolution', NULL),
(244, 'satisfait', '10:30:00.000000', '2025-06-11', 1, 'tempsDeReponse', NULL),
(245, 'peu satisfait', '13:00:00.000000', '2025-06-16', 1, 'comportement', NULL),
(246, 'satisfait', '15:20:00.000000', '2025-06-24', 1, 'qualiteDeLaSolution', NULL),
(247, 'pas du tout satisfait', '09:35:00.000000', '2025-06-29', 1, 'tempsDeReponse', NULL),
(248, 'satisfait', '09:50:00.000000', '2025-07-03', 1, 'comportement', NULL),
(249, 'tres satisfait', '11:10:00.000000', '2025-07-09', 1, 'qualiteDeLaSolution', NULL),
(250, 'tres satisfait', '13:25:00.000000', '2025-07-14', 1, 'tempsDeReponse', NULL),
(251, 'tres satisfait', '16:00:00.000000', '2025-07-20', 1, 'comportement', NULL),
(252, 'pas du tout satisfait', '10:30:00.000000', '2025-07-26', 1, 'qualiteDeLaSolution', NULL),
(253, 'satisfait', '22:29:15.000000', '2023-06-07', 1, 'tempsDeReponse', NULL),
(254, 'satisfait', '20:29:15.000124', '2025-07-02', 3, 'comportement', NULL),
(255, 'satisfait', '22:29:15.000000', '2023-07-07', 1, 'qualiteDeLaSolution', NULL),
(256, 'satisfait', '20:29:15.000124', '2023-07-02', 3, 'tempsDeReponse', NULL),
(257, 'peu satisfait', '12:47:20.000000', '2025-05-16', 1, 'comportement', NULL),
(258, 'peu satisfait', '12:47:20.000000', '2025-05-06', 2, 'qualiteDeLaSolution', NULL),
(259, 'peu satisfait', '12:47:20.000000', '2025-05-06', 2, 'tempsDeReponse', NULL),
(260, 'peu satisfait', '12:47:20.000000', '2025-05-06', 2, 'comportement', NULL),
(261, 'tres satisfait', '11:26:54.009000', '2025-07-14', 1, 'qualiteDeLaSolution', NULL),
(262, 'satisfait', '11:54:19.362000', '2025-07-14', 1, 'tempsDeReponse', NULL),
(263, 'peu satisfait', '11:06:11.304000', '2025-07-15', 2, 'comportement', NULL),
(264, 'tres satisfait', '23:06:48.718000', '2025-07-15', 2, 'qualiteDeLaSolution', NULL),
(265, 'pas du tout satisfait', '23:06:49.045000', '2025-07-15', 2, 'tempsDeReponse', NULL),
(266, 'peu satisfait', '23:06:49.077000', '2025-07-15', 2, 'comportement', NULL),
(267, 'tres satisfait', '23:47:24.926000', '2025-07-15', 2, 'qualiteDeLaSolution', NULL),
(268, 'satisfait', '23:47:25.240000', '2025-07-15', 2, 'tempsDeReponse', NULL),
(269, 'pas du tout satisfait', '23:47:25.352000', '2025-07-15', 2, 'comportement', NULL),
(270, 'tres satisfait', '23:53:16.154000', '2025-07-15', 2, 'qualiteDeLaSolution', NULL),
(271, 'satisfait', '23:53:16.209000', '2025-07-15', 2, 'tempsDeReponse', NULL),
(272, 'pas du tout satisfait', '23:53:16.252000', '2025-07-15', 2, 'comportement', NULL),
(273, 'tres satisfait', '08:47:49.096000', '2025-07-16', 2, 'qualiteDeLaSolution', 'test comment 1'),
(274, 'satisfait', '08:47:49.230000', '2025-07-16', 2, 'tempsDeReponse', 'test comment2'),
(275, 'satisfait', '08:47:49.255000', '2025-07-16', 2, 'comportement', 'test comment 3'),
(276, 'tres satisfait', '10:12:17.424000', '2025-07-16', 2, 'qualiteDeLaSolution', 'ok1'),
(277, 'pas du tout satisfait', '10:12:17.578000', '2025-07-16', 2, 'tempsDeReponse', 'ok2'),
(278, 'peu satisfait', '10:12:17.605000', '2025-07-16', 2, 'comportement', 'ok3'),
(279, 'peu satisfait', '10:52:30.539000', '2025-07-17', 2, 'qualiteDeLaSolution', ''),
(280, 'pas du tout satisfait', '10:52:31.076000', '2025-07-17', 2, 'tempsDeReponse', ''),
(281, 'satisfait', '10:52:31.130000', '2025-07-17', 2, 'comportement', ''),
(282, 'peu satisfait', '10:52:32.242000', '2025-07-17', 2, 'qualiteDeLaSolution', ''),
(283, 'pas du tout satisfait', '10:52:32.291000', '2025-07-17', 2, 'tempsDeReponse', ''),
(284, 'satisfait', '10:52:32.340000', '2025-07-17', 2, 'comportement', ''),
(285, 'tres satisfait', '09:14:49.498000', '2025-07-22', 1, 'qualiteDeLaSolution', 'test final'),
(286, 'peu satisfait', '09:14:49.628000', '2025-07-22', 1, 'tempsDeReponse', 'test final'),
(287, 'satisfait', '09:14:49.650000', '2025-07-22', 1, 'comportement', 'test final'),
(288, 'tres satisfait', '15:38:17.501000', '2025-07-27', 2, 'qualiteDeLaSolution', ''),
(289, 'satisfait', '15:38:17.780000', '2025-07-27', 2, 'tempsDeReponse', ''),
(290, 'peu satisfait', '15:38:17.813000', '2025-07-27', 2, 'comportement', ''),
(291, 'tres satisfait', '15:47:18.463000', '2025-07-27', 2, 'qualiteDeLaSolution', ''),
(292, 'pas du tout satisfait', '15:47:18.497000', '2025-07-27', 2, 'tempsDeReponse', ''),
(293, 'tres satisfait', '15:47:18.526000', '2025-07-27', 2, 'comportement', ''),
(294, 'satisfait', '15:47:18.526000', '2025-08-27', 7, 'comportement', 'ttttt'),
(295, 'satisfait', '22:29:15.000000', '2023-08-07', 7, 'comportement', 'wwwwwww'),
(296, 'tres satisfait', '22:29:15.000000', '2023-08-07', 7, 'comportement', 'wwwwwww'),
(297, 'pas du tout satisfait', '22:29:15.000000', '2025-08-07', 7, 'comportement', 'wwwwwww'),
(298, 'tres satisfait', '22:29:15.000000', '2025-06-07', 7, 'comportement', 'wwwwwww');

-- --------------------------------------------------------

--
-- Table structure for table `forgot_password`
--

DROP TABLE IF EXISTS `forgot_password`;
CREATE TABLE IF NOT EXISTS `forgot_password` (
  `fpid` bigint NOT NULL AUTO_INCREMENT,
  `otp` int NOT NULL,
  `administrateur_id_administrateur` bigint DEFAULT NULL,
  `expiration_time` datetime(6) NOT NULL,
  PRIMARY KEY (`fpid`),
  UNIQUE KEY `UKctms4iyt9m3aprekmxm701gbg` (`administrateur_id_administrateur`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `forgot_password`
--

INSERT INTO `forgot_password` (`fpid`, `otp`, `administrateur_id_administrateur`, `expiration_time`) VALUES
(7, 866305, 1, '2025-08-01 17:15:59.681000'),
(9, 471177, 2, '2025-08-01 17:27:28.850000'),
(10, 270264, 8, '2025-08-01 21:48:43.686000');

-- --------------------------------------------------------

--
-- Table structure for table `ville_centre`
--

DROP TABLE IF EXISTS `ville_centre`;
CREATE TABLE IF NOT EXISTS `ville_centre` (
  `id_centre` bigint NOT NULL AUTO_INCREMENT,
  `code_centre` bigint DEFAULT NULL,
  `nom_centre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_centre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ville_centre`
--

INSERT INTO `ville_centre` (`id_centre`, `code_centre`, `nom_centre`) VALUES
(1, 1234, 'Benguerir Si'),
(2, 9999, 'Youssoufia si'),
(3, 4324, 'Casablanca - siege'),
(4, 222, 'El Jadida SI - Jorf'),
(7, 87668, 'Boukrae - Si');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administrateur`
--
ALTER TABLE `administrateur`
  ADD CONSTRAINT `FKnd1txg2p4otvhc6eigtnwij68` FOREIGN KEY (`ville_centre_id_centre`) REFERENCES `ville_centre` (`id_centre`);

--
-- Constraints for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `FKa22s7gxbmxd2wsfdsg9pb9nwt` FOREIGN KEY (`id_centre`) REFERENCES `ville_centre` (`id_centre`);

--
-- Constraints for table `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD CONSTRAINT `FK756ndrh6jnt4bdiqtokulitsq` FOREIGN KEY (`administrateur_id_administrateur`) REFERENCES `administrateur` (`id_administrateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
