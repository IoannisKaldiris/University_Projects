-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 24, 2024 at 03:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hpP`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `name`, `phone`) VALUES
(1, 'admin', 'admin', 'admin', '6957581235');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `created`, `deleted`) VALUES
(1, '2024-07-16 00:42:43', 0),
(2, '2024-07-15 01:26:29', 0),
(3, '2024-07-16 08:16:10', 0),
(4, '2024-07-22 11:44:54', 0),
(5, '2024-07-22 11:45:37', 0),
(6, '2024-07-22 11:46:02', 0),
(7, '2024-07-22 12:07:22', 0),
(8, '2024-07-22 13:14:47', 0),
(9, '2024-07-22 13:17:07', 0),
(10, '2024-07-22 13:17:14', 0),
(11, '2024-07-22 13:17:18', 0),
(12, '2024-07-22 13:23:05', 0),
(13, '2024-07-22 13:23:24', 0),
(14, '2024-07-22 13:23:25', 0),
(15, '2024-07-22 13:23:28', 0),
(16, '2024-07-22 13:23:29', 0),
(17, '2024-07-22 13:23:30', 0),
(18, '2024-07-22 13:23:30', 0),
(19, '2024-07-22 13:23:31', 0),
(20, '2024-07-22 13:23:31', 0),
(21, '2024-07-22 13:23:32', 0),
(22, '2024-07-22 13:23:37', 0),
(23, '2024-07-22 13:23:41', 0),
(24, '2024-07-22 13:23:41', 0),
(25, '2024-07-22 13:23:42', 0),
(26, '2024-07-22 13:23:42', 0),
(27, '2024-07-22 13:23:45', 0),
(28, '2024-07-22 13:23:45', 0),
(29, '2024-07-22 13:23:50', 0),
(30, '2024-07-22 13:23:51', 0),
(31, '2024-07-22 13:24:23', 0),
(32, '2024-07-22 13:25:07', 0),
(33, '2024-07-22 13:25:30', 0),
(34, '2024-07-22 13:27:27', 0),
(35, '2024-07-22 13:28:17', 0),
(36, '2024-07-22 19:16:15', 0),
(37, '2024-07-22 20:08:24', 0),
(38, '2024-07-22 20:09:00', 0),
(39, '2024-07-24 00:00:37', 0),
(40, '2024-07-24 11:01:02', 0);

-- --------------------------------------------------------

--
-- Table structure for table `announcementproducts`
--

CREATE TABLE `announcementproducts` (
  `id` int(11) NOT NULL,
  `announcementId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcementproducts`
--

INSERT INTO `announcementproducts` (`id`, `announcementId`, `productId`, `quantity`) VALUES
(1, 1, 16, 10),
(2, 2, 46, 27),
(3, 3, 17, 19),
(4, 3, 90, 30),
(5, 4, 17, 2),
(6, 6, 17, 2),
(7, 7, 19, 2),
(8, 8, 17, 2),
(9, 11, 17, 4),
(10, 12, 17, 2),
(11, 15, 16, 3),
(12, 16, 16, 3),
(13, 17, 16, 3),
(14, 18, 16, 3),
(15, 19, 16, 3),
(16, 20, 16, 3),
(17, 21, 16, 3),
(18, 22, 16, 3),
(19, 23, 17, 3),
(20, 24, 17, 3),
(21, 25, 17, 3),
(22, 26, 17, 3),
(23, 27, 17, 3),
(24, 28, 17, 3),
(25, 29, 17, 3),
(26, 30, 17, 3),
(27, 31, 17, 2),
(28, 32, 19, 2),
(29, 33, 16, 2),
(30, 34, 18, 2),
(31, 35, 18, 2),
(32, 36, 17, 3),
(33, 38, 19, 22),
(34, 40, 18, 3);

-- --------------------------------------------------------

--
-- Table structure for table `base`
--

CREATE TABLE `base` (
  `latitude` decimal(30,20) DEFAULT NULL,
  `longitude` decimal(30,20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `base`
--

INSERT INTO `base` (`latitude`, `longitude`) VALUES
(38.27447416160827500000, 21.75073859205001000000);

-- --------------------------------------------------------

--
-- Table structure for table `citizen`
--

CREATE TABLE `citizen` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `latitude` decimal(30,20) DEFAULT NULL,
  `longitude` decimal(30,20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizen`
--

INSERT INTO `citizen` (`id`, `username`, `password`, `name`, `phone`, `latitude`, `longitude`) VALUES
(1, 'Vasilis', 'vasilis223', 'Vasilis', '6952147851', 38.21552506654352000000, 21.77438735961914000000),
(2, 'Costas', 'Cos222', 'Costas', '6987425135', 38.19367244046064500000, 21.72185897827148800000),
(3, 'george2', 'george2222', 'Giorgos', '6932547892', 38.23979806787871600000, 21.73198699951172000000),
(4, 'nick22', 'nick2222222', 'Nikos', '6951247851', 38.20473446610164000000, 21.78468704223632800000),
(5, 'costas22', 'costas223232', 'Constantinos', '6978421837', 38.17910037901977000000, 21.80030822753906200000),
(6, 'jsel', 'Jsel32#@', 'dimitris', '1234567890', 38.27464853746127000000, 21.74852866006620000000),
(9, 'user1', 'user1', 'user1', '6912345567', 38.26038584819130000000, 21.75642972899515500000);

-- --------------------------------------------------------

--
-- Table structure for table `demand`
--

CREATE TABLE `demand` (
  `id` int(11) NOT NULL,
  `citizenId` int(11) NOT NULL,
  `rescuerId` int(11) DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `peopleConcerns` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `completed` datetime DEFAULT NULL,
  `picked` datetime DEFAULT NULL,
  `canceled` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `demand`
--

INSERT INTO `demand` (`id`, `citizenId`, `rescuerId`, `productId`, `peopleConcerns`, `quantity`, `created`, `completed`, `picked`, `canceled`) VALUES
(1, 1, 7, 46, 11, 11, '2024-01-16 18:24:08', NULL, '2024-07-24 09:33:58', 0),
(2, 2, 8, 17, 12, 12, '2024-01-18 09:08:32', NULL, '2024-07-22 15:12:10', 0),
(3, 3, 8, 90, 8, 8, '2024-01-13 01:50:29', NULL, '2024-07-22 11:26:55', 0),
(4, 1, 10, 85, 16, 16, '2024-01-17 22:41:41', NULL, '2024-07-24 09:07:20', 0),
(5, 6, NULL, 16, 3, 3, '2024-07-22 16:56:13', NULL, NULL, 1),
(6, 6, 10, 17, 5, 5, '2024-07-24 09:37:13', NULL, '2024-07-24 09:37:49', 0);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `citizenId` int(11) NOT NULL,
  `rescuerId` int(11) DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `quantity` float NOT NULL,
  `created` datetime NOT NULL,
  `completed` datetime DEFAULT NULL,
  `canceled` tinyint(1) DEFAULT 0,
  `picked` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`id`, `citizenId`, `rescuerId`, `productId`, `quantity`, `created`, `completed`, `canceled`, `picked`) VALUES
(19, 6, NULL, 17, 1, '2024-07-22 19:01:14', NULL, 1, NULL),
(20, 6, NULL, 19, 1, '2024-07-22 19:09:59', NULL, 1, NULL),
(21, 6, 5, 20, 100, '2024-07-23 23:05:59', NULL, 0, '2024-07-23 23:46:13');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `baseQuantity` int(11) DEFAULT 0,
  `category` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `baseQuantity`, `category`) VALUES
(16, 'Water', 110, 'Beverages'),
(17, 'Orange juice', 0, 'Beverages'),
(18, 'Sardines', 0, 'Food'),
(19, 'Canned corn', 0, 'Food'),
(20, 'Bread', 0, 'Food'),
(21, 'Chocolate', 0, 'Food'),
(22, 'Men Sneakers', 0, 'Clothing'),
(24, 'Test Val', 0, 'Flood'),
(25, 'Spaghetti', 0, 'Food'),
(26, 'Croissant', 0, 'Food'),
(30, 'Bandages', 0, 'Medical Supplies'),
(31, 'Disposable gloves', 0, 'Medical Supplies'),
(35, 'Painkillers', 0, 'Medical Supplies'),
(36, 'Blanket', 0, 'Clothing'),
(38, 'Menstrual Pads', 0, 'Personal Hygiene '),
(39, 'Tampon', 0, 'Personal Hygiene '),
(40, 'Toilet Paper', 0, 'Personal Hygiene '),
(41, 'Baby wipes', 0, 'Personal Hygiene '),
(42, 'Toothbrush', 0, 'Personal Hygiene '),
(43, 'Toothpaste', 0, 'Personal Hygiene '),
(44, 'Vitamin C', 0, 'Medical Supplies'),
(45, 'Multivitamines', 0, 'Medical Supplies'),
(46, 'Paracetamol', 0, 'Medical Supplies'),
(47, 'Ibuprofen', 0, 'Medical Supplies'),
(85, 'Coca Cola', 0, 'Beverages'),
(86, 'spray', 0, 'Insect Repellents'),
(87, 'Outdoor spiral', 0, 'Insect Repellents'),
(88, 'Baby bottle', 0, 'Baby Essentials'),
(89, 'Pacifier', 0, 'Baby Essentials'),
(90, 'Condensed milk', 0, 'Food'),
(91, 'Cereal bar', 0, 'Food'),
(196, 'Bar', 10, 'Food');

-- --------------------------------------------------------

--
-- Table structure for table `rescuer`
--

CREATE TABLE `rescuer` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `latitude` decimal(30,20) DEFAULT NULL,
  `longitude` decimal(30,20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rescuer`
--

INSERT INTO `rescuer` (`id`, `username`, `password`, `name`, `phone`, `latitude`, `longitude`) VALUES
(5, 'Nick', 'Fly510Nick22', 'Nikos', '69131025348', 38.22798010120132500000, 21.77016884655608200000),
(6, 'john2', 'john123', 'Yannis', '6937385086', 38.17499601377128000000, 21.80145171315080800000),
(7, 'rescuer', 'rescuer23', 'rescuer', '69831080531', 38.21003519270604000000, 21.80265490516288200000),
(8, 'newR', 'News32#@', 'news', '4213213123', 38.21060205353281000000, 21.75687645020753200000),
(9, 'rescuer3', 'rescuer3', 'rescuer3', '1234556989', 38.26965622661676000000, 21.74674955292878300000),
(10, 'newrescuer', 'new', 'new', '6932323232', 38.27446574734069000000, 21.75050497055053700000),
(11, 'rescuerR', 'rescuerR!', 'rescuerR', '23123213213', 38.27482792251965000000, 21.75044041151338800000);

-- --------------------------------------------------------

--
-- Table structure for table `rescuerproducts`
--

CREATE TABLE `rescuerproducts` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `rescuerId` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rescuerproducts`
--

INSERT INTO `rescuerproducts` (`id`, `productId`, `rescuerId`, `quantity`) VALUES
(1, 16, 10, 10),
(5, 196, 11, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `announcementproducts`
--
ALTER TABLE `announcementproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `announcementId` (`announcementId`);

--
-- Indexes for table `citizen`
--
ALTER TABLE `citizen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `demand`
--
ALTER TABLE `demand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `citizenId` (`citizenId`),
  ADD KEY `rescuerId` (`rescuerId`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `citizenId` (`citizenId`),
  ADD KEY `rescuerId` (`rescuerId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rescuer`
--
ALTER TABLE `rescuer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `rescuerproducts`
--
ALTER TABLE `rescuerproducts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniqueKey` (`productId`,`rescuerId`),
  ADD KEY `rescuerId` (`rescuerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `announcementproducts`
--
ALTER TABLE `announcementproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `citizen`
--
ALTER TABLE `citizen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `demand`
--
ALTER TABLE `demand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT for table `rescuer`
--
ALTER TABLE `rescuer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `rescuerproducts`
--
ALTER TABLE `rescuerproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcementproducts`
--
ALTER TABLE `announcementproducts`
  ADD CONSTRAINT `announcementproducts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `announcementproducts_ibfk_2` FOREIGN KEY (`announcementId`) REFERENCES `announcement` (`id`);

--
-- Constraints for table `demand`
--
ALTER TABLE `demand`
  ADD CONSTRAINT `demand_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `demand_ibfk_2` FOREIGN KEY (`citizenId`) REFERENCES `citizen` (`id`),
  ADD CONSTRAINT `demand_ibfk_3` FOREIGN KEY (`rescuerId`) REFERENCES `rescuer` (`id`);

--
-- Constraints for table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `offer_ibfk_2` FOREIGN KEY (`citizenId`) REFERENCES `citizen` (`id`),
  ADD CONSTRAINT `offer_ibfk_3` FOREIGN KEY (`rescuerId`) REFERENCES `rescuer` (`id`);

--
-- Constraints for table `rescuerproducts`
--
ALTER TABLE `rescuerproducts`
  ADD CONSTRAINT `rescuerproducts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `rescuerproducts_ibfk_2` FOREIGN KEY (`rescuerId`) REFERENCES `rescuer` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
