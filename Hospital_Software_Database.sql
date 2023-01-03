CREATE DATABASE  IF NOT EXISTS `yourhospital` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yourhospital`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: yourhospital
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department_entity`
--

DROP TABLE IF EXISTS `department_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_entity` (
  `id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_entity`
--

LOCK TABLES `department_entity` WRITE;
/*!40000 ALTER TABLE `department_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `department_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1),(1),(1),(1),(1),(1),(1),(1),(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_session_entity`
--

DROP TABLE IF EXISTS `login_session_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_session_entity` (
  `id` int NOT NULL,
  `expires` bigint DEFAULT NULL,
  `privilege_id` int DEFAULT NULL,
  `session_token` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_session_entity`
--

LOCK TABLES `login_session_entity` WRITE;
/*!40000 ALTER TABLE `login_session_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_session_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_activity_entity`
--

DROP TABLE IF EXISTS `patient_activity_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_activity_entity` (
  `id` int NOT NULL,
  `activity_type` varchar(255) NOT NULL,
  `date_time` datetime(6) DEFAULT NULL,
  `next_appointment_date_time` datetime(6) DEFAULT NULL,
  `patient_id` int NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `staff_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_activity_entity`
--

LOCK TABLES `patient_activity_entity` WRITE;
/*!40000 ALTER TABLE `patient_activity_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_activity_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_detail_entity`
--

DROP TABLE IF EXISTS `patient_detail_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_detail_entity` (
  `id` int NOT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `city_of_origin` varchar(255) DEFAULT NULL,
  `current_address` varchar(255) NOT NULL,
  `date_of_birth` datetime(6) NOT NULL,
  `doctor_in_charge` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `height` double DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `next_of_kin_name` varchar(255) DEFAULT NULL,
  `next_of_kin_phone` varchar(255) DEFAULT NULL,
  `nurse_in_charge` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `state_of_origin` varchar(255) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_detail_entity`
--

LOCK TABLES `patient_detail_entity` WRITE;
/*!40000 ALTER TABLE `patient_detail_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_detail_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_entity`
--

DROP TABLE IF EXISTS `patient_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_entity` (
  `id` int NOT NULL,
  `code` int DEFAULT NULL,
  `join_date_time` date NOT NULL DEFAULT '1970-01-01',
  `patient_card_type` varchar(255) NOT NULL,
  `staff_in_charge_id` int DEFAULT NULL,
  `patient_detail_entity_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_an6nk3jf72ykbant4oq528dpn` (`patient_detail_entity_id`),
  CONSTRAINT `FKb2jqxlt76qlw0cbx5ghvvyit4` FOREIGN KEY (`patient_detail_entity_id`) REFERENCES `patient_detail_entity` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_entity`
--

LOCK TABLES `patient_entity` WRITE;
/*!40000 ALTER TABLE `patient_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_entity`
--

DROP TABLE IF EXISTS `staff_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_entity` (
  `id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `join_date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastname` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `privilege_id` int DEFAULT NULL,
  `pwd` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_entity`
--

LOCK TABLES `staff_entity` WRITE;
/*!40000 ALTER TABLE `staff_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_privilege_entity`
--

DROP TABLE IF EXISTS `staff_privilege_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_privilege_entity` (
  `id` int NOT NULL,
  `code` varchar(255) NOT NULL,
  `manage_patient` bit(1) NOT NULL,
  `manage_staff` bit(1) NOT NULL,
  `manage_transactions` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_privilege_entity`
--

LOCK TABLES `staff_privilege_entity` WRITE;
/*!40000 ALTER TABLE `staff_privilege_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_privilege_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_entity`
--

DROP TABLE IF EXISTS `transaction_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_entity` (
  `id` int NOT NULL,
  `is_broken` tinyint(1) DEFAULT '0',
  `transaction_date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `department_id` int DEFAULT NULL,
  `staff_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_entity`
--

LOCK TABLES `transaction_entity` WRITE;
/*!40000 ALTER TABLE `transaction_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_entity_transaction_item_detail_entities`
--

DROP TABLE IF EXISTS `transaction_entity_transaction_item_detail_entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_entity_transaction_item_detail_entities` (
  `transaction_entity_id` int NOT NULL,
  `transaction_item_detail_entities_id` int NOT NULL,
  UNIQUE KEY `UK_caii9o0rpxvu2ga2xtp1iq2kl` (`transaction_item_detail_entities_id`),
  KEY `FKl03ur6wvynrcc39h8vvido31g` (`transaction_entity_id`),
  CONSTRAINT `FK1pihq2ixcxvf69s28davwdrwb` FOREIGN KEY (`transaction_item_detail_entities_id`) REFERENCES `transaction_item_detail_entity` (`id`),
  CONSTRAINT `FKl03ur6wvynrcc39h8vvido31g` FOREIGN KEY (`transaction_entity_id`) REFERENCES `transaction_entity` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_entity_transaction_item_detail_entities`
--

LOCK TABLES `transaction_entity_transaction_item_detail_entities` WRITE;
/*!40000 ALTER TABLE `transaction_entity_transaction_item_detail_entities` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_entity_transaction_item_detail_entities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_item_detail_entity`
--

DROP TABLE IF EXISTS `transaction_item_detail_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_item_detail_entity` (
  `id` int NOT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `item_price` int DEFAULT NULL,
  `item_quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_item_detail_entity`
--

LOCK TABLES `transaction_item_detail_entity` WRITE;
/*!40000 ALTER TABLE `transaction_item_detail_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_item_detail_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-03 17:29:46
