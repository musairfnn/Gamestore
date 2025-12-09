-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 23, 2025 at 06:55 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamestore`
--

-- --------------------------------------------------------

--
-- Table structure for table `buying`
--

CREATE TABLE `buying` (
  `id_buy` int NOT NULL,
  `id_user` int NOT NULL,
  `id_game` int NOT NULL,
  `total` double DEFAULT NULL,
  `date_buying` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buying`
--

INSERT INTO `buying` (`id_buy`, `id_user`, `id_game`, `total`, `date_buying`) VALUES
(3, 9, 10, 30000, '2025-10-22'),
(4, 9, 10, 30000, '2025-10-24'),
(5, 9, 10, 30000, '2025-10-24'),
(6, 9, 10, 30000, '2025-10-24'),
(7, 9, 10, 30000, '2025-10-25'),
(8, 9, 10, 30000, '2025-10-26'),
(9, 9, 11, 40000, '2025-10-26'),
(10, 9, 11, 40000, '2025-10-26'),
(21, 9, 11, 40000, '2025-10-26'),
(22, 9, 11, 40000, '2025-10-26'),
(23, 10, 11, 40000, '2025-11-02'),
(24, 10, 10, 30000, '2025-11-02'),
(25, 9, 12, 100000, '2025-11-09'),
(26, 11, 12, 100000, '2025-11-14'),
(27, 11, 11, 40000, '2025-11-14'),
(28, 11, 10, 30000, '2025-11-14'),
(29, 12, 12, 100000, '2025-11-14'),
(30, 12, 11, 40000, '2025-11-14'),
(31, 12, 11, 40000, '2025-11-14'),
(32, 12, 12, 80000, '2025-11-14'),
(33, 12, 10, 24000, '2025-11-14'),
(34, 13, 12, 80000, '2025-11-20'),
(35, 13, 12, 80000, '2025-11-20'),
(36, 13, 12, 80000, '2025-11-20'),
(37, 13, 12, 80000, '2025-11-20'),
(38, 13, 12, 80000, '2025-11-20'),
(39, 13, 12, 80000, '2025-11-20'),
(40, 13, 12, 80000, '2025-11-20'),
(41, 13, 12, 80000, '2025-11-20'),
(42, 13, 12, 80000, '2025-11-20'),
(43, 13, 12, 80000, '2025-11-20'),
(44, 13, 12, 80000, '2025-11-20'),
(45, 13, 12, 80000, '2025-11-20'),
(46, 13, 12, 80000, '2025-11-20'),
(47, 13, 12, 80000, '2025-11-20'),
(48, 13, 12, 80000, '2025-11-20'),
(49, 13, 12, 80000, '2025-11-20'),
(50, 13, 12, 80000, '2025-11-20'),
(51, 13, 12, 80000, '2025-11-20'),
(52, 13, 12, 80000, '2025-11-20'),
(53, 13, 12, 80000, '2025-11-21'),
(54, 13, 12, 80000, '2025-11-22');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id_user` int NOT NULL,
  `id_game` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id_user`, `id_game`) VALUES
(8, 10);

-- --------------------------------------------------------

--
-- Table structure for table `developers`
--

CREATE TABLE `developers` (
  `id_devs` int NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `developers`
--

INSERT INTO `developers` (`id_devs`, `username`, `email`, `password`, `otp_code`) VALUES
(13, 'Bejorka', 'xianyunmy@gmail.com', '$2b$10$BtJl4Ij.GoikwtsN.cNqtOQjndH2fgEcxhdC3hGk0a.2/31vfkQ/G', '$2b$10$MclRg873bJp4gJvJf3998ucFNPg/tyLFeYnOPQQYk1bMNJkT5xS.y');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id_game` int NOT NULL,
  `id_dev` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publisher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` double NOT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `image_profile_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `status_buyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id_game`, `id_dev`, `title`, `publisher`, `description`, `category`, `price`, `file_url`, `image_profile_url`, `image_url`, `status_buyed`) VALUES
(10, 13, 'TOP DOWN SHOOTER', 'GUEH', 'YADADADADADA', 'Online', 30000, 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/6c38e26f-5ff0-450a-af13-3c107512024d.zip', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/f394730e-eec7-4811-868d-e0a093f2ac9f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/04150669-b89c-47df-85ea-23d314e5a921.png,https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/b39fdf5b-094b-42e0-a6ba-6a0cde1ff8a0.png,https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/04e54e55-1a7f-4483-aa54-50efefbd1b7d.png', NULL),
(11, 13, 'FPS Shooter', 'GUEHH', 'YADAYADAYADA', 'Online', 40000, 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/5cd41c6e-96d5-4f19-8a07-0b6a8242b03b.zip', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/9371226a-df88-4a43-a510-4c87caaa9b6f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/678ca2b1-5cbd-4123-909a-893651bded52.png,https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/1d41e433-7efb-45ea-bdb8-2483f7965340.png,https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/9510fa47-e5c9-4402-b32d-6de80afacd6a.png,https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/457ba0b8-81ee-492a-a669-9d87faf32d86.png', NULL),
(12, 13, 'FPS', 'GUEH', 'YADADADADADA', 'Online', 100000, 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/73d079c5-d5c6-45ab-962d-c07bddd0b4b4.zip', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/a088988e-7da1-42ae-a962-67a76d5f2234.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/ad4e2478-478f-4118-b644-fae1abc68183.png,https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/fdfd20d7-51cf-41a3-a41d-6601d7876395.png,https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/7c6488c4-3896-467a-a8d4-8da01498bf65.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `library`
--

CREATE TABLE `library` (
  `id_library` int NOT NULL,
  `id_user` int NOT NULL,
  `id_game` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `cover_image_game` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `library`
--

INSERT INTO `library` (`id_library`, `id_user`, `id_game`, `title`, `cover_image_game`, `file_url`) VALUES
(15, 9, 10, 'TOP DOWN SHOOTER', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/f394730e-eec7-4811-868d-e0a093f2ac9f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/6c38e26f-5ff0-450a-af13-3c107512024d.zip'),
(18, 9, 11, 'FPS Shooter', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/9371226a-df88-4a43-a510-4c87caaa9b6f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/5cd41c6e-96d5-4f19-8a07-0b6a8242b03b.zip'),
(19, 10, 11, 'FPS Shooter', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/9371226a-df88-4a43-a510-4c87caaa9b6f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/5cd41c6e-96d5-4f19-8a07-0b6a8242b03b.zip'),
(20, 10, 10, 'TOP DOWN SHOOTER', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/f394730e-eec7-4811-868d-e0a093f2ac9f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/6c38e26f-5ff0-450a-af13-3c107512024d.zip'),
(21, 9, 12, 'FPS', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/a088988e-7da1-42ae-a962-67a76d5f2234.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/73d079c5-d5c6-45ab-962d-c07bddd0b4b4.zip'),
(22, 11, 12, 'FPS', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/a088988e-7da1-42ae-a962-67a76d5f2234.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/73d079c5-d5c6-45ab-962d-c07bddd0b4b4.zip'),
(23, 11, 11, 'FPS Shooter', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/9371226a-df88-4a43-a510-4c87caaa9b6f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/5cd41c6e-96d5-4f19-8a07-0b6a8242b03b.zip'),
(24, 11, 10, 'TOP DOWN SHOOTER', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/f394730e-eec7-4811-868d-e0a093f2ac9f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/6c38e26f-5ff0-450a-af13-3c107512024d.zip'),
(25, 12, 11, 'FPS Shooter', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/9371226a-df88-4a43-a510-4c87caaa9b6f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/5cd41c6e-96d5-4f19-8a07-0b6a8242b03b.zip'),
(26, 12, 12, 'FPS', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/a088988e-7da1-42ae-a962-67a76d5f2234.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/73d079c5-d5c6-45ab-962d-c07bddd0b4b4.zip'),
(27, 12, 10, 'TOP DOWN SHOOTER', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/f394730e-eec7-4811-868d-e0a093f2ac9f.png', 'https://files.edgestore.dev/oqota98wt66mkih2/publicFiles/_public/6c38e26f-5ff0-450a-af13-3c107512024d.zip');

-- --------------------------------------------------------

--
-- Table structure for table `pendapatan`
--

CREATE TABLE `pendapatan` (
  `id_pendapatan` int NOT NULL,
  `pendapatan` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pendapatan`
--

INSERT INTO `pendapatan` (`id_pendapatan`, `pendapatan`) VALUES
(1, 20000),
(2, 6000),
(3, 20000),
(4, 20000),
(5, 20000),
(6, 20000),
(7, 20000),
(8, 20000),
(9, 20000),
(10, 20000),
(11, 20000),
(12, 20000),
(13, 20000),
(14, 20000),
(15, 20000),
(16, 20000),
(17, 20000),
(18, 20000),
(19, 20000),
(20, 20000),
(21, 20000),
(22, 20000),
(23, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id_rating` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `id_game` int DEFAULT NULL,
  `rating` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id_rating`, `id_user`, `id_game`, `rating`) VALUES
(1, 11, 12, 4.5),
(2, 11, 12, 5),
(3, 11, 12, 5),
(4, 11, 12, 5),
(5, 11, 12, 5),
(6, 11, 12, 5),
(7, 11, 11, 5),
(8, 11, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `review_game`
--

CREATE TABLE `review_game` (
  `id_review` int NOT NULL,
  `id_user` int NOT NULL,
  `id_game` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date_comment` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `review_game`
--

INSERT INTO `review_game` (`id_review`, `id_user`, `id_game`, `comment`, `date_comment`) VALUES
(1, 11, 12, 'yadadadadadadadadadada', '2025-11-22'),
(2, 11, 12, 'yadadadadadadadadadada', '2025-11-22'),
(3, 11, 12, 'yadadadadadadadadadada', '2025-11-22'),
(4, 11, 12, 'yadadadadadadadadadada', '2025-11-22'),
(5, 11, 12, 'undefined', '2025-11-23'),
(6, 11, 12, 'wdawdawdawd', '2025-11-23'),
(7, 11, 12, 'awdawdawdawdawdawd', '2025-11-23'),
(8, 11, 12, 'awdawdawdawdawdawd', '2025-11-23'),
(9, 11, 12, 'awdawdawdawdawdawd', '2025-11-23'),
(10, 11, 12, 'awdawdawdawd', '2025-11-23'),
(11, 11, 11, 'yahahahahaha elek', '2025-11-23'),
(12, 11, 10, 'GAK ADA FILE GAMENYA WOILAH', '2025-11-23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `otp_code`) VALUES
(8, 'Testing', 'adeferdi119@gmail.com', '$2b$10$5DujPAhXxR.IhQFocyhOF.IjLGGctzsfaP.tuoscWMnUQzhx4uTA2', NULL),
(9, 'Bejirka', 'xianyunmy@gmail.com', '$2b$10$UMpwTDEkxGW50TVNLXN25.2YepHx87vHeMrT63TuuWdq4Gcd3yrC.', '$2b$10$TjCBC2t/Hg/qdjGUkDGf.OoW7wUypgt96JQfqnp4XiR.wXex0mCzC'),
(10, 'HAHAHAHA', 'hahahaha@mail.com', '$2b$10$EpSA.AGAh7RH27lE8tmrde/0.6BXG2LJaw/11t04.zD2mudfZCy/2', '$2b$10$A16nJozrY.WbZ5uX5ottNOReUQPapzUSIE00VXjwn7hKdr.jvJ1EO'),
(11, 'Kidnapper', 'Testing@mail.com', '$2b$10$NqKfv6EsLl.P2rtjae0dOev4I4bTT00jTicPIGciZZb3ECBCl5kYu', '$2b$10$DzOgB1TAGV5P1PIuEWaNB.L5UTz/bAtb0Nu4M0JaVleruxVn3.CRy'),
(12, 'TEST', 'TEST@mail.com', '$2b$10$mwuN1xqeSq1QDTvf1aw20OJyovmjnRPQ.vQdYD8GLBJ8x3I3S5qSy', '$2b$10$7tRqXhTNvPD47VGUI67jr.a9vM6YDJPNRDiQQa8LsR4ZQwvY5yKYC'),
(13, 'BEJIRKAS', 'BEJIRKA@mail.com', '$2b$10$TPp/MEPW.ll5vgK6wb6BMuJQEPjhZXQAF/qIn3sCQ1ixye06fkxF.', '$2b$10$R0sDgubIqNOAy9ZYhGxZkeg5t0/Z2jkqvEU7FkhJGjbUhbMgGMkfe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buying`
--
ALTER TABLE `buying`
  ADD PRIMARY KEY (`id_buy`),
  ADD KEY `id_game` (`id_game`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_game` (`id_game`);

--
-- Indexes for table `developers`
--
ALTER TABLE `developers`
  ADD PRIMARY KEY (`id_devs`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id_game`),
  ADD KEY `id_dev` (`id_dev`);

--
-- Indexes for table `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id_library`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_game` (`id_game`);

--
-- Indexes for table `pendapatan`
--
ALTER TABLE `pendapatan`
  ADD PRIMARY KEY (`id_pendapatan`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id_rating`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_game` (`id_game`);

--
-- Indexes for table `review_game`
--
ALTER TABLE `review_game`
  ADD PRIMARY KEY (`id_review`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_game` (`id_game`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buying`
--
ALTER TABLE `buying`
  MODIFY `id_buy` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `developers`
--
ALTER TABLE `developers`
  MODIFY `id_devs` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id_game` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `library`
--
ALTER TABLE `library`
  MODIFY `id_library` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `pendapatan`
--
ALTER TABLE `pendapatan`
  MODIFY `id_pendapatan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id_rating` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `review_game`
--
ALTER TABLE `review_game`
  MODIFY `id_review` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buying`
--
ALTER TABLE `buying`
  ADD CONSTRAINT `buying_ibfk_1` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`),
  ADD CONSTRAINT `buying_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`),
  ADD CONSTRAINT `buying_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`);

--
-- Constraints for table `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`id_dev`) REFERENCES `developers` (`id_devs`);

--
-- Constraints for table `library`
--
ALTER TABLE `library`
  ADD CONSTRAINT `library_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `library_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`),
  ADD CONSTRAINT `library_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `library_ibfk_4` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`);

--
-- Constraints for table `review_game`
--
ALTER TABLE `review_game`
  ADD CONSTRAINT `review_game_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `review_game_ibfk_2` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
