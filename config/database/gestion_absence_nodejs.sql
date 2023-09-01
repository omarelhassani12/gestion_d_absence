-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 01 sep. 2023 à 15:37
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_absence_nodejs`
--

-- --------------------------------------------------------

--
-- Structure de la table `absence`
--

CREATE TABLE `absence` (
  `id` int(11) NOT NULL,
  `stagiaire_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `period` varchar(10) NOT NULL,
  `first_session_attendance` tinyint(1) DEFAULT NULL,
  `second_session_attendance` tinyint(1) DEFAULT NULL,
  `is_justified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `absence`
--

INSERT INTO `absence` (`id`, `stagiaire_id`, `date`, `period`, `first_session_attendance`, `second_session_attendance`, `is_justified`) VALUES
(612, 10, '2023-08-01', 'PM', 1, 1, 0),
(627, 21, '2023-08-01', 'AM', 1, 0, 0),
(634, 10, '2023-08-02', 'PM', 1, 1, 0),
(678, 10, '2023-08-04', 'PM', 1, 1, 0),
(682, 21, '2023-08-04', 'PM', 1, 1, 1),
(699, 10, '2023-08-05', 'AM', 1, 1, 0),
(700, 10, '2023-08-05', 'PM', 1, 1, 0),
(703, 21, '2023-08-05', 'AM', 1, 1, 0),
(704, 21, '2023-08-05', 'PM', 1, 1, 0),
(705, 21, '2023-08-05', 'AM', 1, 1, 1),
(707, 21, '2023-08-05', 'AM', 1, 1, 0),
(716, 21, '2023-08-06', 'PM', 1, 0, 0),
(717, 10, '2023-08-06', 'AM', 0, 1, 0),
(718, 22, '2023-08-06', 'PM', 1, 1, 0),
(719, 8, '2023-08-08', 'AM', 1, 1, 0),
(720, 8, '2023-08-08', 'PM', 0, 1, 0),
(739, 22, '2023-08-08', 'AM', 1, 1, 0),
(743, 10, '2023-08-09', 'AM', 1, 1, 0),
(744, 10, '2023-08-09', 'PM', 1, 0, 0),
(759, 21, '2023-08-09', 'AM', 0, 0, 1),
(783, 32, '2023-08-12', 'AM', 1, 1, 0),
(784, 32, '2023-08-12', 'PM', 1, 1, 0),
(794, 8, '2023-08-13', 'PM', 1, 0, 0),
(796, 10, '2023-08-13', 'PM', 0, 1, 0),
(799, 16, '2023-08-13', 'AM', 1, 1, 0),
(805, 32, '2023-08-13', 'AM', 1, 1, 0),
(813, 8, '2023-08-14', 'AM', 0, 1, 0),
(819, 16, '2023-08-14', 'AM', 1, 0, 0),
(824, 22, '2023-08-14', 'PM', 1, 0, 0),
(828, 33, '2023-08-14', 'PM', 0, 1, 0),
(830, 34, '2023-08-14', 'PM', 0, 1, 0),
(863, 32, '2023-08-16', 'AM', 1, 1, 0),
(877, 21, '2023-08-23', 'AM', 1, 0, 0),
(878, 21, '2023-08-23', 'PM', 1, 0, 0),
(879, 22, '2023-08-23', 'AM', 1, 0, 0),
(881, 32, '2023-08-23', 'AM', 1, 1, 0),
(882, 32, '2023-08-23', 'PM', 0, 1, 0),
(887, 36, '2023-08-23', 'AM', 0, 0, 1),
(889, 8, '2023-08-26', 'AM', 0, 0, 0),
(890, 8, '2023-08-26', 'PM', 0, 0, 0),
(891, 10, '2023-08-26', 'AM', 0, 0, 0),
(892, 10, '2023-08-26', 'PM', 0, 0, 0),
(893, 16, '2023-08-26', 'AM', 0, 0, 0),
(894, 16, '2023-08-26', 'PM', 0, 0, 0),
(895, 21, '2023-08-26', 'AM', 0, 0, 0),
(896, 21, '2023-08-26', 'PM', 0, 0, 0),
(897, 22, '2023-08-26', 'AM', 0, 0, 0),
(898, 22, '2023-08-26', 'PM', 0, 0, 0),
(899, 32, '2023-08-26', 'AM', 0, 0, 0),
(900, 32, '2023-08-26', 'PM', 0, 0, 0),
(901, 33, '2023-08-26', 'AM', 0, 0, 0),
(902, 33, '2023-08-26', 'PM', 0, 0, 0),
(903, 34, '2023-08-26', 'AM', 0, 0, 0),
(904, 34, '2023-08-26', 'PM', 0, 0, 0),
(905, 36, '2023-08-26', 'AM', 0, 0, 0),
(906, 36, '2023-08-26', 'PM', 0, 0, 0),
(907, 8, '2023-08-27', 'AM', 0, 0, 0),
(908, 8, '2023-08-27', 'PM', 0, 0, 0),
(909, 10, '2023-08-27', 'AM', 0, 0, 0),
(910, 10, '2023-08-27', 'PM', 0, 0, 0),
(911, 16, '2023-08-27', 'AM', 0, 0, 0),
(912, 16, '2023-08-27', 'PM', 0, 0, 0),
(913, 21, '2023-08-27', 'AM', 0, 0, 0),
(914, 21, '2023-08-27', 'PM', 0, 0, 0),
(915, 22, '2023-08-27', 'AM', 0, 0, 0),
(916, 22, '2023-08-27', 'PM', 0, 0, 0),
(917, 32, '2023-08-27', 'AM', 0, 0, 0),
(918, 32, '2023-08-27', 'PM', 0, 0, 0),
(919, 33, '2023-08-27', 'AM', 0, 0, 0),
(920, 33, '2023-08-27', 'PM', 0, 0, 0),
(921, 34, '2023-08-27', 'AM', 0, 0, 0),
(922, 34, '2023-08-27', 'PM', 0, 0, 0),
(923, 36, '2023-08-27', 'AM', 0, 0, 0),
(924, 36, '2023-08-27', 'PM', 0, 0, 0),
(925, 8, '2023-08-28', 'AM', 0, 0, 0),
(926, 8, '2023-08-28', 'PM', 0, 0, 0),
(927, 10, '2023-08-28', 'AM', 0, 0, 0),
(928, 10, '2023-08-28', 'PM', 0, 0, 0),
(929, 16, '2023-08-28', 'AM', 0, 0, 0),
(930, 16, '2023-08-28', 'PM', 0, 0, 0),
(931, 21, '2023-08-28', 'AM', 0, 0, 0),
(932, 21, '2023-08-28', 'PM', 0, 0, 0),
(933, 22, '2023-08-28', 'AM', 0, 0, 0),
(934, 22, '2023-08-28', 'PM', 0, 0, 0),
(935, 32, '2023-08-28', 'AM', 0, 0, 0),
(936, 32, '2023-08-28', 'PM', 0, 0, 0),
(937, 33, '2023-08-28', 'AM', 0, 0, 0),
(938, 33, '2023-08-28', 'PM', 0, 0, 0),
(939, 34, '2023-08-28', 'AM', 0, 0, 0),
(940, 34, '2023-08-28', 'PM', 0, 0, 0),
(941, 36, '2023-08-28', 'AM', 0, 0, 0),
(942, 36, '2023-08-28', 'PM', 0, 0, 0),
(943, 8, '2023-08-30', 'AM', 0, 0, 0),
(944, 8, '2023-08-30', 'PM', 0, 0, 0),
(945, 10, '2023-08-30', 'AM', 0, 0, 0),
(946, 10, '2023-08-30', 'PM', 0, 0, 0),
(947, 16, '2023-08-30', 'AM', 0, 0, 0),
(948, 16, '2023-08-30', 'PM', 0, 0, 0),
(949, 21, '2023-08-30', 'AM', 0, 0, 0),
(950, 21, '2023-08-30', 'PM', 0, 0, 0),
(951, 22, '2023-08-30', 'AM', 0, 0, 0),
(952, 22, '2023-08-30', 'PM', 0, 0, 0),
(953, 32, '2023-08-30', 'AM', 0, 0, 0),
(954, 32, '2023-08-30', 'PM', 0, 0, 0),
(955, 33, '2023-08-30', 'AM', 0, 0, 0),
(956, 33, '2023-08-30', 'PM', 0, 0, 0),
(957, 34, '2023-08-30', 'AM', 0, 0, 0),
(958, 34, '2023-08-30', 'PM', 0, 0, 0),
(959, 36, '2023-08-30', 'AM', 0, 0, 0),
(960, 36, '2023-08-30', 'PM', 0, 0, 0),
(961, 8, '2023-09-01', 'AM', 0, 0, 0),
(962, 8, '2023-09-01', 'PM', 0, 0, 0),
(963, 10, '2023-09-01', 'AM', 0, 0, 0),
(964, 10, '2023-09-01', 'PM', 0, 0, 0),
(965, 16, '2023-09-01', 'AM', 0, 0, 0),
(966, 16, '2023-09-01', 'PM', 0, 0, 0),
(967, 21, '2023-09-01', 'AM', 0, 0, 0),
(968, 21, '2023-09-01', 'PM', 0, 0, 0),
(969, 22, '2023-09-01', 'AM', 0, 0, 0),
(970, 22, '2023-09-01', 'PM', 0, 0, 0),
(971, 32, '2023-09-01', 'AM', 0, 0, 0),
(972, 32, '2023-09-01', 'PM', 0, 0, 0),
(973, 33, '2023-09-01', 'AM', 0, 0, 0),
(974, 33, '2023-09-01', 'PM', 0, 0, 0),
(975, 34, '2023-09-01', 'AM', 0, 0, 0),
(976, 34, '2023-09-01', 'PM', 0, 0, 0),
(977, 36, '2023-09-01', 'AM', 0, 0, 0),
(978, 36, '2023-09-01', 'PM', 0, 0, 0),
(979, 37, '2023-09-01', 'AM', 0, 0, 0),
(980, 37, '2023-09-01', 'PM', 0, 0, 0),
(981, 41, '2023-09-01', 'AM', 0, 0, 0),
(982, 41, '2023-09-01', 'PM', 0, 0, 0),
(983, 88, '2023-09-01', 'AM', 0, 0, 0),
(984, 88, '2023-09-01', 'PM', 0, 0, 0),
(985, 90, '2023-09-01', 'AM', 0, 0, 0),
(986, 90, '2023-09-01', 'PM', 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `groups`
--

INSERT INTO `groups` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'group 1', NULL, '2023-08-23 21:25:39'),
(2, 'group 2', NULL, '2023-08-24 16:31:31'),
(3, 'group 3', '2023-07-16 10:48:07', '2023-08-10 22:49:01'),
(4, 'group 11', '2023-07-16 10:13:18', '2023-08-30 22:19:49'),
(5, 'group 5', '2023-08-10 21:28:39', '2023-08-10 22:45:40'),
(13, 'Group12', '2023-08-23 21:02:12', '2023-08-23 22:02:12');

-- --------------------------------------------------------

--
-- Structure de la table `justified_absence`
--

CREATE TABLE `justified_absence` (
  `id` int(11) NOT NULL,
  `stagiaire_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `justified_absence`
--

INSERT INTO `justified_absence` (`id`, `stagiaire_id`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(6, 10, '2023-08-03', '2023-08-04', '2023-08-03 23:18:34', '2023-08-04 20:50:01'),
(10, 21, '2023-08-09', '2023-08-30', '2023-08-09 22:43:29', '2023-08-26 16:41:47'),
(12, 32, '2023-08-13', '2023-08-16', '2023-08-13 22:27:41', '2023-08-13 22:27:41'),
(15, 36, '2023-08-23', '2023-09-08', '2023-08-23 00:32:32', '2023-08-26 16:41:25');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('11fj-Ieh8OQG9z-rrh1-pFw6-vDRoOkv', 1693649646, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:13:49.054Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('1FdVFpoGiuM63e-_f_UYJ7poc7IrYE2W', 1693652001, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:53:00.493Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('24eiKGi5UVdq6yWPqMXyEcrZy8W8-m81', 1693656843, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:13:09.078Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('5JvkekSV9GqotMKGOhJSZdLJ-c_G38Fb', 1693655939, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T11:45:53.471Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('5KguWw9o1PBmsd0j4Mqv3BT4L9ojIE3R', 1693652687, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:58:12.948Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('6Ah5pGrTC1pdfoEy1lPPXuZlgqtazJZJ', 1693650614, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:29:58.590Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('CXX-OTnRE2g_-whcpt0SDS6ms-EZExgD', 1693650344, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:24:56.855Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('HbFP-uOh-Cgaf7-zN0tx8HzKZoSiMj-H', 1693656361, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:05:52.607Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('HuR3zhvvriGD0DT8hj6gjZvF9WDOwxiV', 1693656173, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:02:38.376Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('HwBe_OBDogQdSyG1hcMVMUbt5vElyRBj', 1693658354, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:39:08.658Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('RgRtyG-Daiq9Dkl7VQ-LUjeVVKosce37', 1693656787, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:13:07.170Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('VTaVpgHBbEN25Pkl3PQwXZB1eT7Q5Phr', 1693651381, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:31:52.527Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('WoF2GteekcuhciGqhJkvwJi3DpuZbnHf', 1693656060, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:00:54.710Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('a6GRJFiFr9Z19dUdufnY8GBAsrQJfJZs', 1693651461, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:44:04.990Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('aSFHf5_UsxfGqYMLUSVLfqn93ksZYrek', 1693653171, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T11:08:30.185Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('cDyXbYyaVnwaTwEPVMZ9ebTu-56puduA', 1693651888, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:51:16.029Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('dB3SMsbxnc1e3iK2qsSvHVbINnYVy4lf', 1693655012, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T11:43:26.648Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('f6kuSO1TJDFVTe-FCD9yLYm5F0c1JVFR', 1693661588, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T13:32:27.532Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('fprqIR36RikTzWywfXieJaC7YKWRQ4cx', 1693589844, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-09-01T17:36:53.456Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('gIqQ-8TOAFMfbtL3cXNUFSVq8OWM-_RH', 1693654976, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T11:15:20.784Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('ht_VYvr_xlwzzK9ZiL5A1_O99GTaUaqf', 1693656408, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:06:41.556Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('mrK4sOLtFbeEs_1kve-buG4k-odaU4Qs', 1693589423, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-01T17:29:59.084Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('orvyM2UwdmLQboHQj64YJmH8W4i57-wU', 1693649288, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:02:06.127Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('pwCLXcEjW89fNly5jSgZ9e_0UmAhkcub', 1693656689, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:09:02.652Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('qNvkdstL3PhdMsr85qP2p4rlCwVWjIEO', 1693650066, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:20:50.050Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('qO0OaxGo84rGuh4cuner-BCAzU9s45du', 1693661434, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:40:16.374Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('rEvMd75u-zswsN25ZjVYWd-iy4sHkEOl', 1693651820, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:50:00.100Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('vjKijQbecW6Zm8VH0B_TxLhrS_iKaiJX', 1693651698, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T10:47:58.019Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('xCEZ2EwGmkujfgl3IIe6l-dbYvTu0OQn', 1693589924, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-01T17:38:04.843Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}'),
('zXgXTT_DJ9KoQsIgofv3p1Oo2gyjUHyY', 1693658077, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-02T12:17:10.626Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupIds\":[],\"groupNames\":[],\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":8}}');

-- --------------------------------------------------------

--
-- Structure de la table `stagiaires`
--

CREATE TABLE `stagiaires` (
  `id` int(11) NOT NULL,
  `CEF` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `groupId` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active',
  `phone_number` varchar(255) DEFAULT NULL,
  `justification` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stagiaires`
--

INSERT INTO `stagiaires` (`id`, `CEF`, `firstName`, `lastName`, `groupId`, `status`, `phone_number`, `justification`) VALUES
(8, 'CEF9', 'Khalid', 'Khalid', 4, 'active', NULL, NULL),
(10, 'CEF7', 'Hicham', 'Hicham', 1, 'active', NULL, NULL),
(16, 'CEF12', 'ahmed', 'ahmed', 4, 'archived', NULL, NULL),
(21, 'CEF4', 'mostafa', 'mostafa', 1, 'active', '066666666', ''),
(22, 'CEF5', 'charaf', 'charaf', 4, 'active', NULL, NULL),
(32, 'CEF3', 'rim', 'rim', 4, 'active', NULL, NULL),
(33, 'CEF6', 'aya', 'aya', 4, 'active', NULL, NULL),
(34, 'CEF8', 'ilyas', 'ilyas', 4, 'active', NULL, 'aaaa'),
(36, 'CEF11', 'mounir', 'mounir', 4, 'active', '+212634455677', NULL),
(37, 'CEF20', 'said', 'said', 3, 'active', '0649538453', 'heeello'),
(41, 'CEF15', 'said', 'said', 2, 'active', '0649538453', 'dddddddsssssssssss'),
(88, 'CEF29', 'said', 'said', 4, 'active', '0649538453', ''),
(90, 'CEF155', 'said', 'said', 5, 'active', '0649538453', '');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom_complete` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `isApproved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom_complete`, `email`, `password`, `role`, `created_at`, `isApproved`) VALUES
(2, 'staff1', 'staff1@gmail.com', 'staff1', 1, '2023-07-12 00:00:00', 1),
(3, 'Abdelhamid', 'Abdelhamid@gmail.com', 'Abdelhamid', 1, '2023-07-12 17:57:20', 0),
(4, 'Hassan', 'Hassan@gmail.com', 'Hassan', 1, '2023-07-12 17:57:20', 0),
(20, 'ahmed1', 'ahmed1@gmail.com', 'ahmed1', 0, '2023-07-16 18:29:36', 1),
(21, 'ahmed2', 'ahmed2@gmail.com', 'ahmed2', 1, '2023-07-16 19:00:14', 0),
(22, 'omar', 'omar@gmail.com', 'omar', 1, '2023-07-22 16:39:29', 1),
(26, 'hicham', 'hicham@gmail.com', 'hicham', 1, '2023-07-25 22:30:31', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `absence`
--
ALTER TABLE `absence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stagiaire_id` (`stagiaire_id`);

--
-- Index pour la table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `justified_absence`
--
ALTER TABLE `justified_absence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stagiaire_id` (`stagiaire_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `stagiaires`
--
ALTER TABLE `stagiaires`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_cef` (`CEF`),
  ADD KEY `groupId` (`groupId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `absence`
--
ALTER TABLE `absence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=987;

--
-- AUTO_INCREMENT pour la table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `justified_absence`
--
ALTER TABLE `justified_absence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `stagiaires`
--
ALTER TABLE `stagiaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`stagiaire_id`) REFERENCES `stagiaires` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `justified_absence`
--
ALTER TABLE `justified_absence`
  ADD CONSTRAINT `justified_absence_ibfk_1` FOREIGN KEY (`stagiaire_id`) REFERENCES `stagiaires` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `stagiaires`
--
ALTER TABLE `stagiaires`
  ADD CONSTRAINT `stagiaires_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
