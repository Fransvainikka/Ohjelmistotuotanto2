CREATE DATABASE  IF NOT EXISTS `toimitilavuokra` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `toimitilavuokra`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: toimitilavuokra
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

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
-- Table structure for table `kayttajat`
--

DROP TABLE IF EXISTS `kayttajat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kayttajat` (
  `ID` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Role` varchar(45) NOT NULL,
  `Salasana` varchar(100) NOT NULL,
  `FullName` varchar(45) NOT NULL,
  `TimeStamp` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kayttajat`
--

LOCK TABLES `kayttajat` WRITE;
/*!40000 ALTER TABLE `kayttajat` DISABLE KEYS */;
INSERT INTO `kayttajat` VALUES (1,'Maija Meikäläinen','','','',NULL);
/*!40000 ALTER TABLE `kayttajat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kolmekaupunkia`
--

DROP TABLE IF EXISTS `kolmekaupunkia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kolmekaupunkia` (
  `KaupunkiID` int(11) NOT NULL AUTO_INCREMENT,
  `KayttajaID` int(11) DEFAULT NULL,
  `KaupunkiYKsi` varchar(100) NOT NULL,
  `KaupunkiKaksi` varchar(100) NOT NULL,
  `KaupunkiKolme` varchar(100) NOT NULL,
  PRIMARY KEY (`KaupunkiID`),
  KEY `KayttajaID` (`KayttajaID`),
  CONSTRAINT `kolmekaupunkia_ibfk_1` FOREIGN KEY (`KayttajaID`) REFERENCES `kayttajat` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kolmekaupunkia`
--

LOCK TABLES `kolmekaupunkia` WRITE;
/*!40000 ALTER TABLE `kolmekaupunkia` DISABLE KEYS */;
/*!40000 ALTER TABLE `kolmekaupunkia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kuvat`
--

DROP TABLE IF EXISTS `kuvat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kuvat` (
  `KuvaID` int(11) NOT NULL AUTO_INCREMENT,
  `TilaVID` int(11) DEFAULT NULL,
  `ImageURL` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`KuvaID`),
  KEY `TilaVID` (`TilaVID`),
  CONSTRAINT `kuvat_ibfk_1` FOREIGN KEY (`TilaVID`) REFERENCES `toimitilat` (`TilaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kuvat`
--

LOCK TABLES `kuvat` WRITE;
/*!40000 ALTER TABLE `kuvat` DISABLE KEYS */;
/*!40000 ALTER TABLE `kuvat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sopimukset`
--

DROP TABLE IF EXISTS `sopimukset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sopimukset` (
  `SopimusID` int(11) NOT NULL AUTO_INCREMENT,
  `BookingID` int(11) DEFAULT NULL,
  `PDF_URL` varchar(200) DEFAULT NULL,
  `OwnerSigned` int(11) NOT NULL,
  `RenterSigned` int(11) NOT NULL,
  `AikaLeima` datetime DEFAULT NULL,
  PRIMARY KEY (`SopimusID`),
  KEY `BookingID` (`BookingID`),
  CONSTRAINT `sopimukset_ibfk_1` FOREIGN KEY (`BookingID`) REFERENCES `varaukset` (`VarausID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sopimukset`
--

LOCK TABLES `sopimukset` WRITE;
/*!40000 ALTER TABLE `sopimukset` DISABLE KEYS */;
/*!40000 ALTER TABLE `sopimukset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `toimitilat`
--

DROP TABLE IF EXISTS `toimitilat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `toimitilat` (
  `TilaID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `Title` varchar(100) NOT NULL,
  `Kuvaus` varchar(1000) NOT NULL,
  `Rent` varchar(20) DEFAULT NULL,
  `Location` varchar(100) NOT NULL,
  `SecurityDeposit` varchar(20) DEFAULT NULL,
  `Responsibility` varchar(100) DEFAULT NULL,
  `VirtualTour` varchar(100) DEFAULT NULL,
  `Tila` varchar(100) DEFAULT NULL,
  `Aika` datetime DEFAULT NULL,
  `City` varchar(100) NOT NULL,
  PRIMARY KEY (`TilaID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `toimitilat_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `kayttajat` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toimitilat`
--

LOCK TABLES `toimitilat` WRITE;
/*!40000 ALTER TABLE `toimitilat` DISABLE KEYS */;
/*!40000 ALTER TABLE `toimitilat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `varaukset`
--

DROP TABLE IF EXISTS `varaukset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `varaukset` (
  `VarausID` int(11) NOT NULL AUTO_INCREMENT,
  `TilaVID` int(11) DEFAULT NULL,
  `KayttajaID` int(11) DEFAULT NULL,
  `StartDate` datetime NOT NULL,
  `Tila` varchar(50) NOT NULL,
  `TotalPrice` varchar(50) NOT NULL,
  PRIMARY KEY (`VarausID`),
  KEY `TilaVID` (`TilaVID`),
  KEY `KayttajaID` (`KayttajaID`),
  CONSTRAINT `varaukset_ibfk_1` FOREIGN KEY (`TilaVID`) REFERENCES `toimitilat` (`TilaID`),
  CONSTRAINT `varaukset_ibfk_2` FOREIGN KEY (`KayttajaID`) REFERENCES `kayttajat` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `varaukset`
--

LOCK TABLES `varaukset` WRITE;
/*!40000 ALTER TABLE `varaukset` DISABLE KEYS */;
/*!40000 ALTER TABLE `varaukset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viesti`
--

DROP TABLE IF EXISTS `viesti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viesti` (
  `VarausID` int(11) NOT NULL AUTO_INCREMENT,
  `TilaVID` int(11) DEFAULT NULL,
  `KayttajaID` int(11) DEFAULT NULL,
  `Viesti` varchar(500) NOT NULL,
  PRIMARY KEY (`VarausID`),
  KEY `TilaVID` (`TilaVID`),
  KEY `KayttajaID` (`KayttajaID`),
  CONSTRAINT `viesti_ibfk_1` FOREIGN KEY (`TilaVID`) REFERENCES `toimitilat` (`TilaID`),
  CONSTRAINT `viesti_ibfk_2` FOREIGN KEY (`KayttajaID`) REFERENCES `kayttajat` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viesti`
--

LOCK TABLES `viesti` WRITE;
/*!40000 ALTER TABLE `viesti` DISABLE KEYS */;
/*!40000 ALTER TABLE `viesti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-01 23:20:51
