-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 15, 2020 at 07:44 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `project_psychology`
--

--
-- Dumping data for table `p_permission`
--

INSERT INTO `p_permission` (`id`, `status`, `role_id`, `apis`, `name`) VALUES
(1, 1, 1, '[\"/api/login/login\",\"/api/user/userInfo\",\"/api/role/routes\",\"/api/user/logout\",\"/api/user/userDetail\",\"/api/msg/add\",\"/api/msg/getList\",\"/api/msg/update\",\"/api/msg/del\"]', 'base'),
(2, 1, 1, '[\"/api/record/add\",\"/api/record/getUserList\",\"/api/record/getRecords\",\"/api/record/getOneRecords\",\"/api/record/updateTalkRecord\",\"/api/record/del\"]', 'record'),
(3, 1, 1, '[\"/api/role/add\",\"/api/role/get\",\"/api/role/update\",\"/api/role/del\"]', 'role'),
(4, 1, 1, '[\"/api/user/userDetail\",\"/api/user/userList\",\"/api/user/register\",\"/api/user/multiAdd\",\"/api/user/userChange\",\"/api/user/userDel\"]', 'user'),
(5, 1, 1, '[\"/api/reservation/getList\",\"/api/reservation/addReservation\",\"/api/reservation/modify\",\"/api/reservation/del\",\"/api/reservationType/add\",\"/api/reservationType/getList\",\"/api/reservationType/update\",\"/api/reservationType/del\"]', 'reservation'),
(6, 1, 1, '[\"/api/exercise/add\",\"/api/exercise/multiAdd\",\"/api/exercise/getList\",\"/api/exercise/update\",\"/api/exercise/del\",\"/api/type/getList\"]', 'exercise'),
(7, 1, 1, '[\"/api/paper/add\",\"/api/paper/getList\",\"/api/paper/detail-score\",\"/api/paper/detail\",\"/api/paper/update\",\"/api/paper/del\",\"/api/distribution/add\",\"/api/distribution/multiAdd\",\"/api/distribution/getList\",\"/api/distribution/update\",\"/api/distribution/del\"]', 'paper'),
(8, 1, 1, '[\"/api/record/add\",\"/api/record/getUserList\",\"/api/record/getRecords\",\"/api/record/getOneRecords\",\"/api/record/updateTalkRecord\",\"/api/record/del\"]', 'record');
