-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2023 at 11:18 AM
-- Server version: 8.0.30
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `security_report`
--

-- --------------------------------------------------------

--
-- Table structure for table `pdf-files`
--

CREATE TABLE `pdf-files` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `paths` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `updatedAt` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pdf-files`
--

INSERT INTO `pdf-files` (`id`, `name`, `paths`, `createdAt`, `updatedAt`) VALUES
(1, 'PBIReport.pdf', 'http://localhost:5000/UploadPDF/PBIReport.pdf', '2023-04-26 12:48:48', '2023-04-29 14:46:14');

-- --------------------------------------------------------

--
-- Table structure for table `security_reports`
--

CREATE TABLE `security_reports` (
  `id` int NOT NULL,
  `dates` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `times` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `shift` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `site` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pic` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `jenis_giat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `giat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lokasi` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `objek` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `jumlah_kegiatan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `temuan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `jumlah_temuan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `detail_temuan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tindak_lanjut` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `kategori_temuan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `keterangan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(7, 'admin', '$2a$12$EbHovjYEbEzi1TAl7ViPEOHQ8p92nCAfxnGbgJ1w0iB8dIdX3vxii', 'admin', '2022-11-28 05:51:51', '2022-11-28 05:51:51'),
(8, 'user', '$2a$12$WgZwKV0EfLVKG7FkQZ2wu.jDBgOtDihOafg9p2nAs/tc4TwgeHqMu', 'user', '2023-04-14 05:34:56', '2023-04-14 05:34:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pdf-files`
--
ALTER TABLE `pdf-files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `security_reports`
--
ALTER TABLE `security_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pdf-files`
--
ALTER TABLE `pdf-files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `security_reports`
--
ALTER TABLE `security_reports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
