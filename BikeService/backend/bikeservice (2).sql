-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2024 at 01:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bikeservice`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `model` varchar(50) NOT NULL,
  `regno` int(100) NOT NULL,
  `year` int(20) NOT NULL,
  `service` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Not Completed',
  `pickup_date` varchar(255) NOT NULL,
  `pickup` varchar(20) NOT NULL,
  `drop_date` varchar(255) NOT NULL,
  `drop` varchar(20) NOT NULL,
  `note` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `name`, `phone`, `email`, `model`, `regno`, `year`, `service`, `status`, `pickup_date`, `pickup`, `drop_date`, `drop`, `note`) VALUES
(11, 'anushka', '1234567890', '927621bcs094@mkce.ac.in', 'susuki', 1231, 2000, 'general service', 'Completed', '1/2/30', 'yes', '2/1/30', '', 'be carefull'),
(12, 'jeeva', '99999999999', '927621bcs094@mkce.ac.in', 'susuki', 2546, 2002, 'ljikm', 'Completed', '2024-05-08', '', '2024-05-25', '', 'az'),
(21, 'RITHIKA MANOHARAN', '208248042949', 'rithikamano.31@gmail.com', 'bajaj', 2546, 2002, 'ljikm', 'Completed', '2024-05-29', 'on', '2024-05-17', 'on', '952'),
(22, 'RITHIKA MANOHARAN', '8248042949', 'rithikamano.31@gmail.com', 'bajaj', 2546, 2002, 'ljikm', 'Completed', '2024-05-15', 'on', '2024-05-31', '', 'l,');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `name` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`name`, `pass`, `phone`, `email`) VALUES
('RITHIKA MANOHARAN', '123', '8248042949', 'rithikamano.31@gmail.com'),
('Udan Services', '0', '8248042949', 'udan.services3@gmail.com'),
('user', '0', '01234567891', '927621bcs094@mkce.ac.in'),
('Uma ', '123', '01234567891', 'umamaheswarims2002@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(100) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `price`, `description`) VALUES
(14, 'General service Check', 1000, 'Engine Oil, Air Filter Clean,Chain Spray, Noise Check'),
(15, 'Oil Change', 599, 'Fluid Automatic, Power Steering Fluid, Washer Fluid, Headlights, Tire Pressure'),
(16, 'Water wash', 499, 'All Parts');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
