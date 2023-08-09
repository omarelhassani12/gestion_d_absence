-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 09 août 2023 à 22:49
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
(610, 8, '2023-08-01', 'PM', 0, 0, 0),
(612, 10, '2023-08-01', 'PM', 1, 1, 0),
(614, 12, '2023-08-01', 'PM', 0, 1, 0),
(616, 14, '2023-08-01', 'PM', 0, 1, 0),
(618, 16, '2023-08-01', 'PM', 1, 1, 0),
(619, 17, '2023-08-01', 'AM', 1, 1, 0),
(621, 18, '2023-08-01', 'AM', 1, 1, 0),
(623, 19, '2023-08-01', 'AM', 1, 1, 0),
(625, 20, '2023-08-01', 'AM', 1, 1, 0),
(627, 21, '2023-08-01', 'AM', 1, 1, 0),
(628, 21, '2023-08-01', 'PM', 1, 1, 0),
(630, 20, '2023-08-01', 'PM', 1, 1, 0),
(634, 10, '2023-08-02', 'PM', 1, 1, 0),
(637, 14, '2023-08-02', 'AM', 1, 1, 0),
(641, 17, '2023-08-02', 'AM', 1, 1, 0),
(651, 20, '2023-08-02', 'AM', 1, 1, 0),
(663, 17, '2023-08-03', 'AM', 1, 1, 1),
(667, 21, '2023-08-03', 'AM', 1, 1, 0),
(670, 20, '2023-08-03', 'PM', 1, 1, 1),
(674, 20, '2023-08-03', 'PM', 1, 1, 0),
(678, 10, '2023-08-04', 'PM', 1, 1, 0),
(680, 12, '2023-08-04', 'PM', 1, 1, 0),
(682, 21, '2023-08-04', 'PM', 1, 1, 1),
(684, 16, '2023-08-04', 'PM', 1, 0, 0),
(685, 17, '2023-08-04', 'AM', 1, 1, 0),
(697, 18, '2023-08-05', 'AM', 1, 1, 0),
(698, 18, '2023-08-05', 'PM', 1, 1, 0),
(699, 10, '2023-08-05', 'AM', 1, 1, 0),
(700, 10, '2023-08-05', 'PM', 1, 1, 0),
(701, 12, '2023-08-05', 'AM', 1, 1, 0),
(702, 12, '2023-08-05', 'PM', 1, 1, 0),
(703, 21, '2023-08-05', 'AM', 1, 1, 0),
(704, 21, '2023-08-05', 'PM', 1, 1, 0),
(705, 21, '2023-08-05', 'AM', 1, 1, 1),
(706, 16, '2023-08-05', 'PM', 0, 1, 0),
(707, 21, '2023-08-05', 'AM', 1, 1, 0),
(708, 17, '2023-08-05', 'PM', 0, 0, 0),
(709, 18, '2023-08-05', 'AM', 1, 1, 0),
(710, 18, '2023-08-05', 'PM', 1, 1, 0),
(711, 19, '2023-08-05', 'AM', 0, 0, 0),
(712, 19, '2023-08-05', 'PM', 0, 0, 0),
(713, 18, '2023-08-05', 'AM', 1, 1, 0),
(714, 20, '2023-08-05', 'PM', 1, 1, 0),
(715, 20, '2023-08-06', 'AM', 1, 1, 0),
(716, 21, '2023-08-06', 'PM', 1, 0, 0),
(717, 10, '2023-08-06', 'AM', 0, 1, 0),
(718, 22, '2023-08-06', 'PM', 0, 0, 0),
(719, 8, '2023-08-08', 'AM', 0, 0, 0),
(720, 8, '2023-08-08', 'PM', 0, 0, 0),
(721, 10, '2023-08-08', 'AM', 0, 0, 0),
(722, 10, '2023-08-08', 'PM', 0, 0, 0),
(723, 12, '2023-08-08', 'AM', 0, 0, 0),
(724, 12, '2023-08-08', 'PM', 0, 0, 0),
(725, 14, '2023-08-08', 'AM', 0, 0, 0),
(726, 14, '2023-08-08', 'PM', 0, 0, 0),
(727, 16, '2023-08-08', 'AM', 0, 0, 0),
(728, 16, '2023-08-08', 'PM', 0, 0, 0),
(729, 17, '2023-08-08', 'AM', 0, 0, 0),
(730, 17, '2023-08-08', 'PM', 0, 0, 0),
(731, 18, '2023-08-08', 'AM', 0, 0, 0),
(732, 18, '2023-08-08', 'PM', 0, 0, 0),
(733, 19, '2023-08-08', 'AM', 0, 0, 0),
(734, 19, '2023-08-08', 'PM', 0, 0, 0),
(735, 20, '2023-08-08', 'AM', 0, 0, 0),
(736, 20, '2023-08-08', 'PM', 0, 0, 0),
(737, 21, '2023-08-08', 'AM', 0, 0, 0),
(738, 21, '2023-08-08', 'PM', 0, 0, 0),
(739, 22, '2023-08-08', 'AM', 0, 0, 0),
(740, 22, '2023-08-08', 'PM', 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `groups`
--

INSERT INTO `groups` (`id`, `name`, `created_at`, `updated_at`, `user_id`) VALUES
(2, 'group 1', '2023-07-16 10:04:46', '2023-07-16 10:04:46', 2),
(3, 'group 2', '2023-07-16 10:08:26', '2023-08-08 15:42:52', 22),
(4, 'group 3', '2023-07-16 10:11:12', '2023-07-16 11:11:12', 3),
(5, 'group 4', '2023-07-16 10:13:18', '2023-07-16 11:13:18', 3);

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
(1, 17, '2023-08-01', '2023-08-17', '2023-08-03 13:55:41', '2023-08-04 20:56:41'),
(6, 10, '2023-08-03', '2023-08-04', '2023-08-03 23:18:34', '2023-08-04 20:50:01'),
(8, 14, '2023-08-04', '2023-08-10', '2023-08-04 21:12:05', '2023-08-04 21:12:05'),
(9, 16, '2023-08-05', '2023-08-08', '2023-08-05 11:14:19', '2023-08-05 11:14:19');

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
('-RQHljeTu58HMKoVfSqEH2SmG20Cu62M', 1691620831, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:40:30.739Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('0YbTFijPWsCeeATq22latMNl3vWDmWTt', 1691620876, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:41:16.401Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('0fhyj_ZjLy-N8s3J_-zCpY9k8QxpY02F', 1691621037, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:43:56.678Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('2035wJgeGYdhbiIvatbB0SCS6irB6TAT', 1691666969, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:27:24.952Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('2vwqCQo58BydH-wI4akQVCxi14-SUKv7', 1691618313, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T21:58:31.322Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('3CLeAbAVMjjveM6GHo8RoqWI1w6qx4iT', 1691621412, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:50:11.149Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('4H973BBY3Y8KqcqC4M2KikMFUEutnKMf', 1691677209, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T14:19:53.343Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('4wAfYnhnUWFpLJ3-8FyGBmBKXilZGa-Q', 1691662217, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T10:10:16.544Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('5uIW01iOeOIHOtKLRrN4whEJ8ZLAw95l', 1691621237, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:47:16.892Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('6hvJmCKfruQ4hfvmidgM_5QbtCHB_wxn', 1691670141, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:21:57.978Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('7I2EbV3Mt3NA8KAUhcDheoc9yKDdkHaS', 1691671288, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:41:05.449Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":0}}'),
('9Van9rfc5AhmXfUnzQJQZZvojQPJOQBn', 1691618341, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T21:59:00.933Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('A80X6juE7kNJvSUOsYn_laDwmylYGa8O', 1691677300, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T14:21:39.600Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('AJVgtvwtvqb_563Iu3L7k5CVgCne46en', 1691671099, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:38:17.293Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('An4TkpAEorRIevExBPkdhs2QjMzzOn97', 1691666476, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:21:15.186Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('B9HnN5A-6CDVN_24lwbxwuvRWmnB3Ew0', 1691619883, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:24:42.848Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('Bh72xFH70XXvLbqkhBUQLqxUKczLgPqg', 1691698106, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:08:24.106Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('BoIfdQegJEByvYVUnWv2miyUGOYgm2JZ', 1691618410, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:00:09.985Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('CAKoCWgkl8flD3wCuhD7s1aYJmVCthkq', 1691621379, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:49:39.029Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('DRoyXLji2c9ByAXm5_5U7rxr-4SL4_xP', 1691696142, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-08-10T19:26:27.905Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('DioSbCsaB17RBap_2MV6ysONrtr7CdkB', 1691671615, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:46:46.651Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('ELbXGOUJ7bkwcteVyOt07A8DYJnjWxM-', 1691611239, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T20:00:37.565Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1}}'),
('G2KtJ5Qh_LHSAF4hmZZnHEDJJPY23cyR', 1691671947, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:52:22.751Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('G3IRDh7FPiv2iYgZB9dkP1Ch5r_IDhws', 1691611152, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T19:57:36.339Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1}}'),
('GMCQBRsaHIIDqf9LpfIk6PW6yaHIPgfm', 1691697330, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T19:37:31.677Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('HDfbRfu_WMf0dpSeTh4eitLRQ7Uj5Yiw', 1691665396, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T10:39:44.287Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('HqiFNJUbD1f3zHt9I0rZCms3lq2urrJA', 1691620012, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:26:51.855Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('IG3Emzv4vnaJKnzhHl1pUKRbUIlhUY-3', 1691700117, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:41:56.467Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('JSYK_F5I8_X4V_Kqj1yWMJo5EIlREF2I', 1691676458, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T14:05:58.511Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('KN4cT3laXVgWVHWjMRT0zlkMoUkRy_k4', 1691669608, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:06:02.746Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('LDQwf_307dvtERhFOLJI_brue9G8ptlc', 1691666084, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:14:44.430Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('LhASu4FCdrstCMBpp-I675L1ZN4f3FtS', 1691672599, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T13:03:12.856Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('LkxN_WA6Xoh3IEq_H2PsdKpJwVRa2hDd', 1691700239, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:43:40.138Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\",\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('LnA-U5oMelU4b4rzQ1gtdj3HqSGknHvn', 1691663544, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T10:32:23.121Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('NJUT0BSpQgZBKx5RAevxXvRdXRHePjO8', 1691666100, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:14:59.755Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('NTq0hNMqXw-zhQjqMLr0_BRYNyIhWoLK', 1691619750, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:22:30.170Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('Nblj5xEBKLqPjQd3v9qDcPjxgmUEfYDY', 1691619935, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:25:35.246Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('NlSC1NtJ1H_eTvQGl55bbaZpngbLv1Y9', 1691618356, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T21:59:16.409Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('PjP5WJ4sZ6On-naegdbkmFPVFgnxqBOw', 1691671512, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:45:09.209Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('SCj0y14p3A3W8ybNd48xtqovd6WkVKiu', 1691671405, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:43:22.641Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('SYTE9aDJtzAlgNoa_QryjliMranayO1U', 1691670633, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-08-10T12:30:32.263Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"notActiveAccount\":4}}'),
('SrOxmpHYipcxOYK0y2VYix-YSJFq9mBd', 1691666229, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:17:08.748Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('TMxGqtz5N6U5M9FSiVdFWoX7OJiyrrbu', 1691620111, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:28:30.844Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('U1EQJ7DmXHFFzTI0d0M1AJaamulVhTR1', 1691699296, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:21:49.535Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('UOTQQqgl9mx2ngVo9__iH2zdPjc5Wumx', 1691697954, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:05:52.458Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('UOs40mnH4k9s4MNVrDMwa6fw26FatwvX', 1691611021, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T19:56:50.679Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('UiGRqv6xX1KJ_OBA2Z_UVQeh6NJR6gUX', 1691672162, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:56:00.197Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('UiPT0x13G8h6mJ3MMFj3fNLwONYk4RDB', 1691666699, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:24:58.177Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('UqIR5IuZEIusN0OEMhaK1UzVRuuHK9T3', 1691618548, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:02:23.737Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('V9_rVh-9oAjFN2gzi5IpcqTgUnYVQMYx', 1691671459, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:44:15.442Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('Vkag0e4LRLpk4VWv-hVjmOEm35C_O2UH', 1691618714, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:05:13.179Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('W-o_oSpGHH5MFzvM3jfpKxVZXOnWn0cL', 1691670325, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:25:10.230Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('WuBjMpeNOF9J015VVld6Kw0H11RxuaJf', 1691619563, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:19:22.502Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('XZsw4FvvAr94tNaPg9DwGGktjb-XDUnZ', 1691618089, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T20:02:53.063Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2}}'),
('Y5ovL695LqUfklGO8H2k6IECgkmzOidR', 1691699500, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:30:01.252Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('YjjT1zx0zJsnSHIGeXXXmEzjKlWCZXu0', 1691671767, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:49:22.953Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('YwkBg3flW_QDZktsew9KArBDqT7QCmlf', 1691672046, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:54:05.117Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":0}}'),
('ZYG8hkdvkBOPhRlLmTzooZOF4wGGe7cm', 1691621149, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:45:48.955Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('Z_zrzlvIXvu4lIifgeq2c3Pokdhn_tCf', 1691695505, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T19:25:04.114Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('_G2t6_OSIc57fk5sZc_nLR-bnP2dd0cl', 1691620789, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:39:49.016Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('_ah0eve-2KYk2QUzSLTklyvfovlAPjIt', 1691621290, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:48:09.563Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('b9M9RxL0HmnE2Y9JWTOHTb6x7dx2oEM0', 1691698842, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:20:41.129Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('bhEA7aiWmCaieuLXNHqCPeyqUUnxqTYu', 1691671722, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:48:39.499Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('bhEUPMRmFj-X0udmWw5bhipEDcy254ih', 1691697527, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T19:58:45.716Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('biypIvoe5MWX3IpBJRVekx2l5FCEbrTs', 1691695398, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T17:28:11.516Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('cVV47ILrHXzLtjEpZa_CziD4qSe7pibV', 1691665699, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:08:18.671Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('d1HztkX_N5XIvItbSCZLk3rPhz-LPglx', 1691666433, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:20:32.466Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('eCGXrfe1EvvXwbo9KC4glI9PHkjGMoou', 1691665950, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:12:30.273Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('eH3JhNVj1ZR5bDQsYk-j2b2tcwQ_MX9z', 1691671558, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-08-10T12:45:52.178Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('f6VnKWHm6EAfuYL_hujsv7sjIhwNVfXy', 1691662789, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T10:17:51.006Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('f_9txjSp0VK4Vszj1Y3ZQzQ1Vk_p924v', 1691698731, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:18:50.184Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('fiVnZUJpQwHMejMw58P8sxLfj-e84Gm7', 1691672215, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:56:54.545Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":0}}'),
('gW82OC05iLM2iNVY_6GoMFe3KGSQo4Im', 1691620922, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:42:01.900Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('ggiBgwh_eCthPYQUYGuUw8BPaAIhLAjj', 1691619788, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:23:07.693Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('hJjCtMg2245ZApwOQWmPP1pkFy8250sw', 1691670672, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:31:06.314Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4}}'),
('i4DJiSG-BcFeaxI68b0io-rK18RIvYg2', 1691672490, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T13:01:29.873Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('lecIlT06gXb0Oivitd3DnBCdHljWsWKm', 1691672288, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:58:05.648Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('m39eUixiVgx_ucqrA8n7inhHZ5gd1JIP', 1691670432, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:27:07.993Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('mA1QhzUqgucpB6VBx9Q_HlmU4-dw4Qwq', 1691611037, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T19:57:16.146Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('oB0OAWLCxNIAy3NDL7MQZq8OmB8D9qip', 1691620286, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:31:26.219Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('oeZYLbk_E6FLT326OTFxkTW1Ovn5Cu0e', 1691671969, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:52:48.885Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":0}}'),
('okuSpV6LFdxoNeEq4i3py2EJBu10nLr_', 1691672190, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:56:29.276Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4}}'),
('pEKmxTYRSSxdhb06Hwdzo_4mHcUMePlh', 1691666654, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:24:13.756Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('rFSMuPT3tU0KyPp7gG_MnGhY25vdCRa_', 1691666188, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:16:28.348Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('rJPpJXMKYbsLL4YLHVI3DimJf0DjUcGC', 1691672918, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T13:08:37.611Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\",\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('sVeJYtBq7tHWHs3vmlxrfbHwYzUHbnvU', 1691662505, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T10:15:04.141Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('tA60keKw3ijwB5JURxvQQp_2zWWEY93S', 1691675892, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T13:58:11.866Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\",\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('teHy2bOYFOl2OHx9XZt3eVc021G5P3JO', 1691662347, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T10:12:26.601Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('tfNuyUFavcguHJgOafbwgqzqdL9AXNUx', 1691672449, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T13:00:46.503Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('tlEXLhOR0_0RGNAb-BlFdD7ePYcj3Er3', 1691620702, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:38:22.012Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('uusESi2JsToXuXqri7nrsMJ6j1HLXpYw', 1691671652, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:47:30.393Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('vURzBhcwPYekkpZ7AhtpznfYQ0Ba9srp', 1691620612, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:36:51.519Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('vyhkzG5sr0Av-BwByJVdwchqyTVpP2Zf', 1691619600, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:19:59.686Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('wZHovuOTojgaVqQlQdTU3QW80oaMwPfs', 1691665822, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T11:10:22.187Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\"}}'),
('wemjQIbOff0xVlPVhDvt03L8509KLcH3', 1691662983, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T10:20:11.725Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('xFtOEjNCDCZQunaGvC6DUAsFATcwh5Jg', 1691611314, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-08-09T20:01:53.243Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1}}'),
('xdWsI6_mOTtEeoqN8mUl08oGdcAGnfKT', 1691671861, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T12:51:01.179Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":0}}'),
('xtJiwgi2AjCe9qQRqxr5Sckec10vknca', 1691698687, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:18:06.015Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('y3mY-kwv-MziftSk78GAjBgRC-yDHtle', 1691620980, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:42:59.534Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}'),
('yf_mA5LFXD9qXbbwJYE-gdCXSX-usFXR', 1691673508, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T13:16:53.948Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"name\":\"staff1\",\"email\":\"staff1@gmail.com\",\"role\":1,\"groupId\":2,\"groupName\":\"group 1\",\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('z4CTf3xtmBL6WGvQinVRAl5uJiYQPknY', 1691677246, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T14:20:45.350Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('zHK7gKU1Senq3_XuBvdwgLjMlhy2VzPm', 1691698894, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-10T20:21:33.447Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null,\"nonActiveCompetesCount\":4,\"countStagiairesWithNonZeroAbsence\":9}}'),
('zrshbry-h-FWgaN4xH2iQbQiHg-Qtltr', 1691621186, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-08-09T22:46:25.068Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":20,\"name\":\"ahmed1\",\"email\":\"ahmed1@gmail.com\",\"role\":0,\"groupId\":null,\"groupName\":null}}');

-- --------------------------------------------------------

--
-- Structure de la table `stagiaires`
--

CREATE TABLE `stagiaires` (
  `id` int(11) NOT NULL,
  `CEF` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `groupId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stagiaires`
--

INSERT INTO `stagiaires` (`id`, `CEF`, `firstName`, `lastName`, `groupId`) VALUES
(8, 'CEF9', 'Khalid', 'Khalid', 3),
(10, 'CEF7', 'Hicham', 'Hicham', 2),
(12, 'CEF13', 'saad', 'saad', 2),
(14, 'CEF10D', 'Mohamed', 'Mohamed', 3),
(16, 'CEF12', 'ahmed', 'ahmed', 4),
(17, 'CEF15', 'fatima', 'fatima', 3),
(18, 'CFE1', 'zaineb', 'zaineb', 2),
(19, 'CFE2', 'ahlam', 'ahlam', 3),
(20, 'CFE3', 'abderazek', 'abderazek', 3),
(21, 'CFE4', 'mostafa', 'mostafa', 2),
(22, 'CFE5', 'charaf', 'charaf', 4);

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
(3, 'staff2', 'staff2@gmail.com', 'staff2', 1, '2023-07-12 17:57:20', 0),
(4, 'staff3', 'staff3@gmail.com', 'staff3', 1, '2023-07-12 17:57:20', 0),
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=741;

--
-- AUTO_INCREMENT pour la table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `justified_absence`
--
ALTER TABLE `justified_absence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `stagiaires`
--
ALTER TABLE `stagiaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`stagiaire_id`) REFERENCES `stagiaires` (`id`);

--
-- Contraintes pour la table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

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
