-- MySQL dump 10.13  Distrib 9.4.0, for Linux (aarch64)
--
-- Host: localhost    Database: weddingsbylan
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AppRefreshToken`
--

DROP TABLE IF EXISTS `AppRefreshToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AppRefreshToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(512) DEFAULT NULL,
  `refreshToken` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AppRefreshToken`
--

LOCK TABLES `AppRefreshToken` WRITE;
/*!40000 ALTER TABLE `AppRefreshToken` DISABLE KEYS */;
INSERT INTO `AppRefreshToken` VALUES (1,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzNmQxMDg5LTM2YjctNGE3Mi1iNDhjLWNhOTQxNTY2ZDY2NiIsImlhdCI6MTc0OTQ2Nzk1NCwiZXhwIjoxNzgxMDkwMzU0LCJpc3MiOiJsb29wYmFjazQifQ.cn4QUcjW9PF3covy7AKWnLOVxoEGwJsCUmgAyrQG26o'),(2,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjRkZmQyZTU5LWZmMjgtNGUwOS1iNjVkLTYwYzc2MGI3OTFjNSIsImlhdCI6MTc0OTk1NDAxOSwiZXhwIjoxNzgxNTc2NDE5LCJpc3MiOiJsb29wYmFjazQifQ.eEq5vQsfBqzPeI15K1VMeDoEORg6JK9objk7922gevU'),(3,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjcxZTc3NDRiLWVlYjYtNGI3MS1hYzUwLWMzNjI0YTA2YTE3NiIsImlhdCI6MTc1NDU3MTA4NSwiZXhwIjoxNzg2MTkzNDg1LCJpc3MiOiJsb29wYmFjazQifQ.gnODt_Zm8aErVObCHGKzV8SvMOg7Nwcx89onIWrnxFs'),(4,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQ5ZGZiOTA4LTA4NDctNDRiOS04ZTVmLWQyNTNkZjQ4ODM3NCIsImlhdCI6MTc1ODE1NTQyMSwiZXhwIjoxNzg5Nzc3ODIxLCJpc3MiOiJsb29wYmFjazQifQ.gab3MZa8uGR09TeEmo1c855HdXRi2zFB6DnbgZHmXiM'),(5,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZhNTY3OTBkLWZkMTMtNGM5Zi05OWE0LTgzZTYyYjcxZThlYyIsImlhdCI6MTc1ODQzMzEyMywiZXhwIjoxNzkwMDU1NTIzLCJpc3MiOiJsb29wYmFjazQifQ.rY_l26Pf9fzmKF1F_XgmRWx780Vqk6ReXYy5SkRcdc8'),(6,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI4NmY4ZDcyLTFlNGQtNGZhOS1iYjFlLTNiODBlZGJhNGNhYSIsImlhdCI6MTc1ODQzMzYxOCwiZXhwIjoxNzkwMDU2MDE4LCJpc3MiOiJsb29wYmFjazQifQ.Q2KPzQOyN8x32phokFDAllFYUzsCYRArRNp9vNu_cT4'),(7,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI4MjNmYmI1LTllMzAtNGFhZi1iMDEyLTMzODY1YzJiYzRlOCIsImlhdCI6MTc1ODg5ODY0OCwiZXhwIjoxNzkwNTIxMDQ4LCJpc3MiOiJsb29wYmFjazQifQ.j3jb3TZ4v6Kzlj8inWSNlCrLGxR_PCm3wsZ6QdBgTfo'),(8,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjAzZWY4ZjdhLTY3ZDEtNDZiMi04YzFiLTUwZGY2MGM2N2FkZCIsImlhdCI6MTc1ODkwMTA2NSwiZXhwIjoxNzkwNTIzNDY1LCJpc3MiOiJsb29wYmFjazQifQ.97S744N92ZIQLUqIYqnGILEVglBUVdyuU37Su8SdgUQ'),(9,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNmYTFmYTA3LTFiMDItNGRmMC1hOTAxLTZmZTIxYWIwNTIxYiIsImlhdCI6MTc1OTE1NTc5NSwiZXhwIjoxNzkwNzc4MTk1LCJpc3MiOiJsb29wYmFjazQifQ.UQLZ0LwGn_9oFJpH5zEbZXgto8oYGn0uzGx_mcwAH5g'),(10,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVjYWNlNDJjLWE5ZTktNDU0OS05NzM3LTMyODQ1ZTg2M2VjMiIsImlhdCI6MTc1OTIzODUwMSwiZXhwIjoxNzkwODYwOTAxLCJpc3MiOiJsb29wYmFjazQifQ.S1zFvEJXwk1spfppH_96EaanbykrzLwO9JoQvP8iRao'),(11,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEzYTAyNWZlLTcyZWUtNDhlNS1iZWRmLWZkNjU3NzMxYjZjNiIsImlhdCI6MTc1OTM2MzU4NywiZXhwIjoxNzkwOTg1OTg3LCJpc3MiOiJsb29wYmFjazQifQ.uMZADRUpw4F6NYb-Od49F86jnoMhDkC_PQWWK7VH_To'),(12,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImU4MTQ3NTc2LTVmZGYtNGVhNS1hMWRhLWMyY2FhYjBhZGVhMCIsImlhdCI6MTc1OTU2MzkzNCwiZXhwIjoxNzkxMTg2MzM0LCJpc3MiOiJsb29wYmFjazQifQ.DoPEuS2WKdLtJsPa32GyrtpOjw0U6ds2_8NaFHsAhjM'),(13,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRmNDc0NGI5LTI1OGUtNGRkMS04ODk0LWEwNTY4ZGJmMGNjOCIsImlhdCI6MTc1OTU2NDcwNywiZXhwIjoxNzkxMTg3MTA3LCJpc3MiOiJsb29wYmFjazQifQ.TGkDA3YajSL_QvpRsxo3SU5pWCTWrzGA7XyzEZ88968'),(14,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjQwZDU4MjQzLTk5NDYtNDZhOS05MTAxLTc2YzVjZmYwNDkyNiIsImlhdCI6MTc1OTU3MzIzMiwiZXhwIjoxNzkxMTk1NjMyLCJpc3MiOiJsb29wYmFjazQifQ.OhaWGfJ3UUcrFp6j07ljJeRUXNEavA3mxS9L0KQkDzo'),(15,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImQwYWIzY2Y3LWM0NWMtNGNmNi04NDU1LWRlMzNiNWJiMjI3NiIsImlhdCI6MTc1OTg4MTcwOCwiZXhwIjoxNzkxNTA0MTA4LCJpc3MiOiJsb29wYmFjazQifQ.IK4ZQa2_DKGFZrK02_iQgDh2V3lbdzMHi21GFyx9Ric'),(16,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyYzcxYmQ0LTUwMjYtNDZhZS05Nzk1LTBjNjJjMzExMGE4NCIsImlhdCI6MTc2MDAxNDIwMCwiZXhwIjoxNzkxNjM2NjAwLCJpc3MiOiJsb29wYmFjazQifQ.LafycJZ-8mm47BCIjF2-neUKSLFiN4TZNeeWI0TXdug'),(17,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImM5ZTUyODZkLTdlOTUtNDZjMi04ZGZlLWQ2YWU2NjExMTIzMCIsImlhdCI6MTc2MDIzNDE3NCwiZXhwIjoxNzkxODU2NTc0LCJpc3MiOiJsb29wYmFjazQifQ.0fBbhgr3SXKJJttyl9xNS-HKh9Kaj4vfUqcZEHMVtFg'),(18,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZmNTBjYTExLWZkMzQtNDQ1MC04MzRkLTYzYTgyODQzOGQwOSIsImlhdCI6MTc2MDIzNzA4NiwiZXhwIjoxNzkxODU5NDg2LCJpc3MiOiJsb29wYmFjazQifQ.RM5XbZQ_7fi8yzgbOHIxTzCY4ZptPkJmnfQs936sxYQ'),(19,'d679b025-686a-49ba-8b34-f8e64f80e3d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg1NWVhNjZkLTM0OWMtNGIyNS1hMDlkLWRhMzUyMzI4Y2U4MCIsImlhdCI6MTc2MDQ1MDA5OCwiZXhwIjoxNzkyMDcyNDk4LCJpc3MiOiJsb29wYmFjazQifQ.1lkp0PLKbxf4TObVQnudc1iew6gQUsH1KaiT7V-JFNc');
/*!40000 ALTER TABLE `AppRefreshToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AppUser`
--

DROP TABLE IF EXISTS `AppUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AppUser` (
  `id` varchar(255) NOT NULL,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AppUser`
--

LOCK TABLES `AppUser` WRITE;
/*!40000 ALTER TABLE `AppUser` DISABLE KEYS */;
INSERT INTO `AppUser` VALUES ('d679b025-686a-49ba-8b34-f8e64f80e3d7',NULL,'admin@gmail.com','admin@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `AppUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AppUserCredentials`
--

DROP TABLE IF EXISTS `AppUserCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AppUserCredentials` (
  `id` varchar(255) NOT NULL,
  `password` varchar(512) NOT NULL,
  `userId` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AppUserCredentials`
--

LOCK TABLES `AppUserCredentials` WRITE;
/*!40000 ALTER TABLE `AppUserCredentials` DISABLE KEYS */;
INSERT INTO `AppUserCredentials` VALUES ('340c72fb-3ab8-42f1-95fc-4dd6490f0d40','$2a$10$iWKtszL3JL4AmOx9OD801OrHvg17pephpzsuwwBTrDoK99.jxKQny','d679b025-686a-49ba-8b34-f8e64f80e3d7');
/*!40000 ALTER TABLE `AppUserCredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `News`
--

DROP TABLE IF EXISTS `News`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `News` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(512) NOT NULL,
  `Tags` text NOT NULL,
  `ImageUrl` varchar(512) NOT NULL,
  `Description` text,
  `Content` text NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `Key` varchar(512) DEFAULT NULL,
  `KeyName` varchar(512) DEFAULT NULL,
  `Locale` varchar(512) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `News`
--

LOCK TABLES `News` WRITE;
/*!40000 ALTER TABLE `News` DISABLE KEYS */;
INSERT INTO `News` VALUES (1,'Join and July','Weddings','1758844486643-1700184986698-528520186-1dsc09520.jpg','[{\"id\":\"gallery0jpg-mg115dn9\",\"name\":\"gallery-0.jpg\",\"type\":\"image\",\"url\":\"1758902524415-gallery-0.jpg\"}]','<p>Hello</p>',1,'d6f6b571-8cb4-47fc-8f40-575245ae2945','join-and-july','vn','2025-09-25 23:55:34');
/*!40000 ALTER TABLE `News` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recruitment`
--

DROP TABLE IF EXISTS `Recruitment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recruitment` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(512) NOT NULL,
  `Tags` text NOT NULL,
  `Description` text NOT NULL,
  `ImageUrl` varchar(512) NOT NULL,
  `Content` text NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `Key` varchar(512) DEFAULT NULL,
  `KeyName` varchar(512) DEFAULT NULL,
  `Locale` varchar(512) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recruitment`
--

LOCK TABLES `Recruitment` WRITE;
/*!40000 ALTER TABLE `Recruitment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Recruitment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(512) NOT NULL,
  `Tags` text NOT NULL,
  `Description` text NOT NULL,
  `ImageUrl` varchar(512) NOT NULL,
  `Content` text NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `Key` varchar(512) DEFAULT NULL,
  `KeyName` varchar(512) DEFAULT NULL,
  `Locale` varchar(512) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES (1,'Engagements, couples photoshoots','package','<p>(STARTS AT $425)<br>Creating memories together, the images will reflect your love for each other. 90 minutes session 1 location, 2 outfits 150 images. High resolution online gallery<br>Non local shoots will add a travel fee outside of Gloucester County</p>','1759569640591-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"photography\",\"type\":\"package\"}}',1,'fcc5d69f-29a8-428d-b7f2-0f7737a9e546','engagements-couples-photoshoots','vn','2025-10-02 00:53:14'),(2,'Weddings PACKAGE 1','package','<p>(STARTS AT $2900)<br>Let me capture your genuine laughs, emotions and tears of happiness into your timeless photos. 1 photographer, 8 hours. All images in high resolution online gallery 2 hour engagement engagement session.<br>Non local shoots will add a travel fee outside of Gloucester County</p>','1759569602569-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"photography\",\"type\":\"package\"}}',1,'a6739ace-df84-41a2-ad8a-74b248db59a3','weddings-package-1','vn','2025-10-04 09:20:05'),(3,'Weddings PACKAGE 2','package','<p>(STARTS AT $4000)<br>Let me capture your genuine laughs, emotions and tears of happiness into your timeless photos. 2 photographer, 8 hours. All images in high resolution online gallery 2 hour engagement engagement session.<br>Non local shoots will add a travel fee outside of Gloucester County</p>','1759569889128-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"photography\",\"type\":\"package\"}}',1,'ed52aa6c-b076-4a26-baaf-bc20af6662e9','weddings-package-2','vn','2025-10-04 09:24:50'),(4,'Maternity','package','<p>(STARTS AT $400)<br>Very special time in every woman\'s life, lets freeze it in time. 60 minutes session 1 location, 2 outfits 100-150 images. High resolution online gallery. Non local shoots will add a travel fee outside of Gloucester County</p>','1759570126485-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"photography\",\"type\":\"package\"}}',1,'84ab0ae1-8a6f-4534-b728-47c8eb98b839','maternity','vn','2025-10-04 09:28:50'),(5,'Immediate Family','package','<p>(STARTS AT $425)<br>Freeze in time your family\'s special moments through the photos, to look back though the years to come. 90 min session 1 location, 2 outfit,150 images. High resolution online gallery.Non local shoots will add a travel fee outside of Gloucester County<br>&nbsp;</p>','1759570173054-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"photography\",\"type\":\"package\"}}',1,'890664a0-c559-43c2-a873-e81d789afd7a','immediate-family','vn','2025-10-04 09:29:34'),(6,'Bridal by Lan Le','package','<p>Prewedding $300<br>Wedding $350<br>Touchup $200<br>Makeup $175<br>Hair $175<br>(staring rate)<br>Additional Hours (on-site) $75/hr</p>','1759570233088-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"package\"}}',1,'2700a803-e3c4-4e72-a8b3-010dc8a21be5','bridal-by-lan-le','vn','2025-10-04 09:30:35'),(7,'Bridesmaid & Family','package','<p>Makeup only $115<br>Hair only $115<br>(staring rate)<br>Touchup Makeup &amp; Hair $150<br>Additional Hours (on-site) $75/hr</p>','1759570261085-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"package\"}}',1,'fe1eb9f6-8395-4c44-872f-f8b195809e60','bridesmaid-and-family','vn','2025-10-04 09:31:02'),(8,'Additional Services','package','<p>Faux lashes &amp; application $20<br>Lashes application (clients\') $15 <br>Individual lashes &amp; application $25<br>Hair extension rental &amp; application $150<br>Hair extension application (clients\') $45</p>','1759570292162-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"package\"}}',1,'ad3a4471-a29e-4c6f-a69b-a6b179a1d616','additional-services','vn','2025-10-04 09:31:33'),(9,'Jr Bridesmaid (8-16 yrs)','package','<p>Makeup only $95<br>Hair only $95<br>(staring rate)<br>If NO BRIDE, rate is Special Event</p>','1759570331430-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"package\"}}',1,'c9cd9e0c-3882-4e91-8f49-381d8d2a3785','jr-bridesmaid--8-16-yrs-','vn','2025-10-04 09:32:12'),(10,'Flower Girl ( 1-7 yrs)','package','<p>Makeup only $45<br>Hair only $45<br>(staring rate)<br>If NO BRIDE, rate is Special Event</p>','1759570376814-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"package\"}}',1,'3d997731-c47f-4f2f-8f13-dbf7ce78570e','flower-girl---1-7-yrs-','vn','2025-10-04 09:32:58'),(11,'Engagement Session','package','<p>Makeup &amp; Hair (2+ hrs)<br>+ (Mon-Fri) $250 <br>+ (Sat-Sun) $350 &nbsp;<br>Makeup only $150<br>Hair only $150<br>------------------------<br>SESSION AT STUDIO<br>Up to 2 hours session<br>One makeup &amp; hair look <br>False lashes application <br>Body foundation <br>Hair extension (additional) <br>This is not a trial run, this is a one look makeup and hair application for your engagement photo</p>','1759570420572-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"package\"}}',1,'f178942a-97e5-4b53-b825-d39d1fe398d1','engagement-session','vn','2025-10-04 09:33:42'),(12,'Trial Session','package','<p>Makeup &amp; Hair (3+ hrs) <br>+ (Mon-Fri) $250 <br>+ (Sat-Sun) $350 &nbsp;<br>Makeup $150 (90+ mins)<br>Hair $150 (90+ mins)<br>--------------------<br>SESSION AT STUDIO<br>Up to 3 hrs session <br>Color and style consultation <br>One makeup look application <br>One to two different hair styling<br>Before and after photos <br>Hair extension (additional)<br>Step by step creation of your perfect Bridal look!<br>Adjustment and modification to design your desire beauty! <br>We make sure you are satisfy with the final result.<br>We do not recommend scheduling on a photoshoot date as we would like to show you different ideas.</p>','1759570455928-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"package\"}}',1,'aee4f15d-3856-4b5f-b13e-46c4f2964239','trial-session','vn','2025-10-04 09:34:19'),(13,'Travel','note','<p>Travel Fee $25 (up to 5 miles from Somerdale NJ )<br>After first 5 miles, additional $1.50 per mile per artist.</p>','1759570488427-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"note\"}}',1,'c51deceb-307c-4b34-b8c5-dc65488a11db','travel','vn','2025-10-04 09:34:50'),(14,'Day of Wedding','note','<p>Make sure everyone on the timeline is on-location 45-60 mins prior to their glam schedule. Clean dry hair for styling. Clean face for makeup application. Have prefer look pics on the phone or print out. Wear something easy removal for effortless to get into the dress.<br>&nbsp;</p>','1759570527357-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"note\"}}',1,'5200bed1-713a-4513-a7eb-1bfe5813b7a2','day-of-wedding','vn','2025-10-04 09:35:30'),(15,'Reservation Process','note','<p>To book and lock-in your wedding appointment. We will need a sign contract and $100 non-refundable deposit of the wedding services. Once we get your sign contract and deposit, we can guarantee to block your date on our calendar! Once booked, we will reach out to your event planner, photographer, videographer and other vendors with a collaborate introduction. This will make easy communication about your wedding day of needs and timeline between all vendors.</p>','1759570557227-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"note\"}}',1,'333d334c-9412-4edc-bf3d-e6b2f0d85f8d','reservation-process','vn','2025-10-04 09:35:59'),(16,'Final Wedding Details','note','<p>4 to 5 weeks prior to the wedding, we will send a reminder to confirm the final head counts, and see if there are additional services to add. A glam service timeline will be send for everyone to know their glam schedule.</p>','1759570586014-image-default.png','{\"version\":\"0.0.1\",\"data\":{\"area\":\"makeupAndHair\",\"type\":\"note\"}}',0,'10ac823f-36ed-4ba3-beea-fd99bf95369e','final-wedding-details','vn','2025-10-04 09:36:27');
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Setting`
--

DROP TABLE IF EXISTS `Setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Setting` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(512) NOT NULL,
  `Area` varchar(512) NOT NULL,
  `Title` varchar(512) DEFAULT NULL,
  `Content` text,
  `Description` varchar(512) DEFAULT NULL,
  `ImageUrl` varchar(512) DEFAULT NULL,
  `Href` varchar(512) DEFAULT NULL,
  `Locale` varchar(512) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Setting`
--

LOCK TABLES `Setting` WRITE;
/*!40000 ALTER TABLE `Setting` DISABLE KEYS */;
INSERT INTO `Setting` VALUES (1,'Welcome','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"Welcome\",\"Id\":1749468036769,\"Title\":\"hello\",\"Content\":\"<p>1234</p>\"}]',NULL,NULL,NULL,'en','2025-06-09 11:20:43'),(2,'Welcome','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"Welcome\",\"Id\":1749468053183,\"Title\":\"hello\",\"Content\":\"<p>123</p>\"}]',NULL,NULL,NULL,'vn','2025-06-09 11:20:59'),(3,'CVJob','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"CVJob\",\"Id\":1749468466501,\"Content\":\"Test Job cv\"}]',NULL,NULL,NULL,'en','2025-06-09 11:27:55'),(4,'CVJob','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"CVJob\",\"Id\":1749468480423,\"Content\":\"Test Job cv\"}]',NULL,NULL,NULL,'vn','2025-06-09 11:28:03'),(5,'About','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"About\",\"Id\":1749966892724,\"Title\":\"About Lan Le\",\"Content\":\"Lan Le is a talented and passionate photographer who is dedicated to capturing the special moments of couples, families, and weddings. With an eye for detail and a creative flair, she is able to capture stunning and unique images that truly reflect the essence of her subjects. Her approach to photography is simple yet effective: she seeks to capture the natural beauty and authenticity of her couples, without any artificial posing or staging.\",\"Href\":\"\"}]',NULL,NULL,NULL,'vn','2025-06-15 05:55:19'),(6,'AboutImage','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"AboutImage\",\"Id\":1749967732097,\"ImageUrl\":\"1754571305540-about-0.jpg\"}]',NULL,NULL,NULL,'vn','2025-06-15 06:09:51'),(7,'Footer','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"Footer\",\"Id\":1749969327992,\"LogoUrl\":\"1758433900347-footer-0.png\",\"BgUrl\":\"1758435932856-footer-0.png\"}]',NULL,NULL,NULL,'vn','2025-06-15 06:36:02'),(8,'FooterImage','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"FooterImage\",\"Id\":1749970457212,\"ImageUrl\":\"1749970619451-service-0.jpg\"}]',NULL,NULL,NULL,'vn','2025-06-15 06:54:29'),(9,'Service','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"Service\",\"Id\":1749970473086,\"Title\":\"Our Services\",\"Content\":\"At WeddingsByLan, we offer a range of services to help you create the perfect wedding day. From photography and makeup to hair styling and planning, we have everything you need to make your special day unforgettable. Our team of experienced professionals is dedicated to providing you with the highest quality service and support, ensuring that every detail is taken care of.\",\"Href\":\"\"}]',NULL,NULL,NULL,'vn','2025-06-15 06:54:49'),(10,'ServiceImage','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"ServiceImage\",\"Id\":1749970920496,\"ImageUrl\":\"1754571323887-service-0.jpg\"}]',NULL,NULL,NULL,'vn','2025-06-15 07:02:08'),(11,'Banner','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"Banner\",\"Id\":1749972246076,\"SubTitle\":\"Photography\",\"Title\":\"Capturing the moments that really matter\",\"Content\":\"Our approach to documenting life\'s greatest memories is authentic and intentional. We believe that best photos are created the way you fall in love - naturally. Let us take you on this journey and guide you through every step of the way.\",\"Href\":\"\",\"ImageUrl\":\"1754571270045-slide-0.jpg\"},{\"Area\":\"Home\",\"FormKey\":\"Banner\",\"Id\":1749972289477,\"SubTitle\":\"Makeup &amp; Hair\",\"Title\":\"Enhancing your natural beauty\",\"Content\":\"Our team of skilled makeup artists and hairstylists are dedicated to making you look and feel your best on your special day. We use only the highest quality products and techniques to ensure a flawless finish.\",\"Href\":\"\",\"ImageUrl\":\"1754571275419-slide-1.jpg\"},{\"Area\":\"Home\",\"FormKey\":\"Banner\",\"Id\":1749972320865,\"SubTitle\":\"Portfolio\",\"Title\":\"A collection of our best work\",\"Content\":\" Our portfolio showcases our passion for photography and our commitment to capturing the beauty of every moment. From weddings to family portraits, we have a diverse range of work that highlights our unique style and approach.\",\"Href\":\"\",\"ImageUrl\":\"1754571282023-slide-2.jpg\"}]',NULL,NULL,NULL,'vn','2025-06-15 07:24:47'),(12,'Setting','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"Setting\",\"Id\":1749974590853,\"LogoUrl\":\"1749974596661-logo.png\",\"LogoDarkUrl\":\"\"}]',NULL,NULL,NULL,'vn','2025-06-15 08:03:18'),(13,'MahAboutImage','MakeupAndHair',NULL,'[{\"Area\":\"MakeupAndHair\",\"FormKey\":\"MahAboutImage\",\"Id\":1749978266748,\"ImageUrl\":\"1754571394394-about-0.jpg\"}]',NULL,NULL,NULL,'vn','2025-06-15 09:05:32'),(14,'MahAbout','MakeupAndHair',NULL,'[{\"Area\":\"MakeupAndHair\",\"FormKey\":\"MahAbout\",\"Id\":1749978654366,\"Title\":\"About Lan Le\",\"Content\":\"Lan graduated from Empire Beauty School with distinguished recognition in 2000. Due to her natural curiosity and passion for all that is beauty, she began her professional career learning from in-house artists at salons, spas, and beauty clinics all throughout Philadelphia. With over 20 years of experience, Lan now boasts a vast skill set in both professional hair and makeup. Lan values the needs of her clients and her priority is to always make them the happiest on their special day. She makes sure that her work is done in an efficient and timely manner, reducing any unnecessary stress for her beautiful brides on their memorable day!\"}]',NULL,NULL,NULL,'vn','2025-06-15 09:11:12'),(15,'Setting','Global',NULL,'[{\"Area\":\"Global\",\"FormKey\":\"Setting\",\"Id\":1749978841756,\"LogoUrl\":\"1760572527175-logo-black.webp\",\"LogoDarkUrl\":\"1755435564902-logo.png\"}]',NULL,NULL,NULL,'vn','2025-06-15 09:14:26'),(16,'HomePhotography','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"HomePhotography\",\"Id\":1758437094695,\"Title\":\"Photography\",\"Content\":\"Our approach to documenting life\'s greatest memories is authentic and intentional. We believe that best photos are created the way you fall in love - naturally. Let us take you on this journey and guide you through every step of the way.\",\"Href\":\"/photography\"}]',NULL,NULL,NULL,'vn','2025-09-21 06:45:42'),(17,'HomePhotographyImage','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"HomePhotographyImage\",\"Id\":1758437748171,\"ImageUrl\":\"1758437789099-photography.jpg\"}]',NULL,NULL,NULL,'vn','2025-09-21 06:56:31'),(18,'HomeMakeupAndHairImage','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"HomeMakeupAndHairImage\",\"Id\":1758437993233,\"ImageUrl\":\"1758438021585-makeup-and-hair.jpg\"}]',NULL,NULL,NULL,'vn','2025-09-21 07:00:24'),(19,'HomeMakeupAndHair','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"HomeMakeupAndHair\",\"Id\":1758438045118,\"Title\":\"Makeup and Hair\",\"Content\":\"Get your glam done by me. Event makeup and hair my specialty. Bringing the best of your natural beauty.\",\"Href\":\"/makeip-and-hair\"}]',NULL,NULL,NULL,'vn','2025-09-21 07:01:14'),(20,'HomePortfolioItems','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"HomePortfolioItems\",\"Id\":1758498762942,\"Href\":\"/\",\"ImageUrl\":\"1758498861174-1694454255714-881489236-dsc08912--1-.jpg\"},{\"Area\":\"Home\",\"FormKey\":\"HomePortfolioItems\",\"Id\":1758498861524,\"Href\":\"/\",\"ImageUrl\":\"1758498879912-1694454272104-621848491-dsc08622--1-.jpg\"},{\"Area\":\"Home\",\"FormKey\":\"HomePortfolioItems\",\"Id\":1758498883209,\"Href\":\"\",\"ImageUrl\":\"1758498893083-1694454289184-661599603-dsc09108--1-.jpg\"}]',NULL,NULL,NULL,'vn','2025-09-21 23:54:57'),(21,'HomePortfolio','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"HomePortfolio\",\"Id\":1758499119881,\"Title\":\"Portfolio\",\"Description\":\"Browse through our extensive portfolio showcasing years of experience and countless beautiful moments we\'ve had the privilege to capture.\",\"Href\":\"/portfolio\"}]',NULL,NULL,NULL,'vn','2025-09-21 23:59:33'),(22,'HomePortfolioImage','Home',NULL,'[{\"Area\":\"Home\",\"FormKey\":\"HomePortfolioImage\",\"Id\":1758499363779,\"ImageUrl\":\"1758499392052-portfolio-0.jpg\"}]',NULL,NULL,NULL,'vn','2025-09-22 00:03:15'),(23,'AboutImage','Global',NULL,'[{\"Area\":\"Global\",\"FormKey\":\"AboutImage\",\"Id\":1760452090200,\"ImageUrl\":\"1760452117195-about-1.jpg\"}]',NULL,NULL,NULL,'vn','2025-10-14 14:28:40'),(24,'About','Global',NULL,'[{\"Area\":\"Global\",\"FormKey\":\"About\",\"Id\":1760452135190,\"Title\":\"About Lan Le\",\"Content\":\"Lan graduated from Empire Beauty School with distinguished recognition in 2000. Due to her natural curiosity and passion for all that is beauty, she began her professional career learning from in-house artists at salons, spas, and beauty clinics all throughout Philadelphia. With over 20 years of experience, Lan now boasts a vast skill set in both professional hair and makeup. Lan values the needs of her clients and her priority is to always make them the happiest on their special day. She makes sure that her work is done in an efficient and timely manner, reducing any unnecessary stress for her beautiful brides on their memorable day!\"}]',NULL,NULL,NULL,'vn','2025-10-14 14:29:16'),(25,'Setting','Global',NULL,'[{\"Area\":\"Global\",\"FormKey\":\"Setting\",\"Id\":1749978841756,\"LogoUrl\":\"1760572527175-logo-black.webp\",\"LogoDarkUrl\":\"1755435564902-logo.png\"}]',NULL,NULL,NULL,'vn','2025-10-15 23:57:55'),(26,'Setting','Global',NULL,'[{\"Area\":\"Global\",\"FormKey\":\"Setting\",\"Id\":1760572987152,\"LogoUrl\":\"1760572992603-logo-black.webp\",\"LogoDarkUrl\":\"\"}]',NULL,NULL,NULL,'en','2025-10-16 00:03:14');
/*!40000 ALTER TABLE `Setting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-19  2:36:26
