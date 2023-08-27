-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 26 août 2023 à 18:43
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

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `justified_absence`
--
ALTER TABLE `justified_absence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stagiaire_id` (`stagiaire_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `justified_absence`
--
ALTER TABLE `justified_absence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `justified_absence`
--
ALTER TABLE `justified_absence`
  ADD CONSTRAINT `justified_absence_ibfk_1` FOREIGN KEY (`stagiaire_id`) REFERENCES `stagiaires` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
