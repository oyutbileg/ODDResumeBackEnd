-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: resume.cc3pjoktlalj.ap-southeast-1.rds.amazonaws.com    Database: resume
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_password` varchar(255) DEFAULT NULL,
  `is_reparing` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'$2b$10$WnsBwK0dZgp3Ka5gvQrMhOdaGiowP.1pblmFVZ00vuJLHhxO019hG',0,'2022-06-14 16:26:04');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `appstore_url` varchar(255) DEFAULT NULL,
  `playstore_url` varchar(255) DEFAULT NULL,
  `web_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `sysUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sysUserId` (`sysUserId`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Chimege Writer','A transcriber for Mongolian audio and video contents based on Chimege technology.',NULL,NULL,'https://writer.chimege.com','2022-06-16 10:43:12',NULL,3),(2,'Mongol Voice','The main goal of this small project is to save Mongolian unique dialects before completely disappearing. Thus, we are inviting all those people specially old persons.','https://apps.apple.com/us/app/mongol-voice/id1518578966','https://play.google.com/store/apps/details?id=com.bolorsoft.mongolvoice',NULL,'2022-06-16 10:43:43',NULL,3),(3,'Feel Mongolia','Choose your vacation and travel plan. discover Mongolian beautiful places to visit','https://apps.apple.com/mn/app/feel-mongolia/id1504582728','https://play.google.com/store/apps/details?id=pms.ihotel.rms&hl=en&gl=US',NULL,'2022-06-16 10:44:14',NULL,3),(4,'MyTravel','Travel Agency News Site',NULL,NULL,'https://mytravel.mn/','2022-06-16 10:44:38',NULL,3),(5,'Monpay','First e-money licensed digital service powered by Bank of Mongolia','','','https://monpay.mn','2022-06-20 01:57:40','2022-06-20 02:10:13',1),(6,'Stora','E-commerce',NULL,NULL,'https://www.stora.mn/','2022-06-20 07:22:35',NULL,2),(7,'Monpay','Monpay mobile app','https://apps.apple.com/us/app/monpay/id978594162','https://play.google.com/store/apps/details?id=mn.mobicom.candy&hl=en&gl=US','https://monpay.mn/#/','2022-06-20 07:27:28',NULL,2),(8,'MSM BETASTAR APP','e-Commerce','https://apps.apple.com/mn/app/msm-betastar/id1261210379','https://play.google.com/store/apps/details?id=mn.msm.betastar','','2022-06-20 07:38:00',NULL,10),(9,'VOO','I was working on VOO\'s back-end development.\nprogramming language is JAVA EE','https://apps.apple.com/us/app/voo/id1479350458','https://play.google.com/store/apps/details?id=com.mobicom.smarttv','https://www.voo.mn/home','2022-06-20 07:49:14',NULL,7),(10,'Mobicom App','Mobicom application','https://apps.apple.com/us/app/mobicom/id567384694','https://play.google.com/store/apps/details?id=mn.mobicom.onemediastore',NULL,'2022-06-20 07:50:06',NULL,10),(11,'Zochil','Zochil is the ecommerce automation platform for small and medium businesses trying to open their online shop. Using our mobile application and web dashboard SMEs, importers and food delivery companies able to start sell their products online.','https://apps.apple.com/mn/app/zochil-manager/id1488589262','https://play.google.com/store/apps/details?id=shop.zochil.zochilapp&hl=mn&gl=US','https://zochil.mn/','2022-06-20 07:50:31','2022-06-20 07:51:50',11),(12,'Monpay','Working experience iOS native, Crossplatform developer\n-iOS native 2 year experience\n-Crossplatform 5 years\n-Developed all features like Loan, Transfer, QR, Auth... more\n-Took a lead role to native to crossplatform.','https://apps.apple.com/us/app/candy-pay/id978594162','https://play.google.com/store/apps/details?id=mn.mobicom.candy','https://www.monpay.mn/#/','2022-06-20 07:55:16','2022-06-20 09:16:15',7),(13,'MMarket','e-Commerce','https://apps.apple.com/mn/app/mmarket/id929069007','https://play.google.com/store/apps/details?id=com.muchworks.mobile.mmarket','www.mmarket.mn','2022-06-20 08:05:23',NULL,10),(14,'NUBIA','Coordination to New Ulaanbaatar International Airport construction project for 7 years  at Mitsubishi Chiyoda Joint Venture',NULL,NULL,'https://en.nubia-llc.mn/','2022-06-20 08:15:35','2022-06-20 08:21:24',6),(15,'e-Mongolia','e-Mongolia V1','https://apps.apple.com/us/app/e-mongolia/id1513340888','https://play.google.com/store/apps/details?id=mn.gov.emongolia&hl=en&gl=US',NULL,'2022-06-20 08:17:15','2022-06-20 08:22:44',10),(16,'DigitalBond','Project info:\n- 1 billion balance bond purchase system.\nExperience:\n- Hyperledger blockchain smart contract development\n- Hyperledger administrator\n- Node js, Go lang, Linux, Express js\n',NULL,NULL,NULL,'2022-06-20 08:20:35',NULL,7);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_tag`
--

DROP TABLE IF EXISTS `skill_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag` (`tag`),
  UNIQUE KEY `tag_2` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_tag`
--

LOCK TABLES `skill_tag` WRITE;
/*!40000 ALTER TABLE `skill_tag` DISABLE KEYS */;
INSERT INTO `skill_tag` VALUES (1,'CSS','2022-06-10 06:38:55',NULL),(2,'JavaScript','2022-06-10 08:36:56',NULL),(4,'Java','2022-06-11 07:12:17',NULL),(6,'Php','2022-06-11 07:15:30',NULL),(7,'Docker','2022-06-11 07:15:48',NULL),(8,'Kubernetes','2022-06-11 07:20:50',NULL),(10,'HTML','2022-06-11 13:29:01',NULL),(11,'React','2022-06-11 13:29:35',NULL),(12,'Angular','2022-06-11 13:29:42',NULL),(13,'Flutter','2022-06-11 13:29:46',NULL),(14,'Vue.js','2022-06-11 13:29:54',NULL);
/*!40000 ALTER TABLE `skill_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `skill_tags` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `experience` int DEFAULT '0',
  `is_admin` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `portfolio_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `list_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (1,'Janchiv','Magvanshiirev','Department Manager','Department Manager','magvanshiirev@mobicom.mn','$2b$10$Eth63iW6jlEgHQH0b6SqluhSrBJB8g.TkC6jz6Dl4sqhfjjgnNHMG','[\"Vue.js\",\"Angular\",\"HTML\",\"JavaScript\",\"Kubernetes\",\"React\",\"Flutter\",\"Php\",\"Docker\"]','photo_1.jpg',9,1,1,'51a0fe49-10f2-480a-961e-e56e4760b41d',NULL,'2022-06-10 05:12:16','2022-06-15 10:49:41',1),(2,'Ganbaatar','Badral','Full Stack, Fast learner','Software Engineer','badral@mobicom.mn','$2b$10$t4ov/kFWdEjhoyWxvDG3ce2aG60JaRX0ZES4sZqRR/wzBcYafSc/2','[\"Flutter\",\"React\",\"HTML\",\"Vue.js\",\"CSS\",\"JavaScript\",\"Tailwind CSS\",\"TypeScript\",\"React Native\",\"Next.js\",\"Next.ts\",\"Node.js\",\"Python\",\"Figma\"]','photo_2.jpg',2,0,1,'d5d01c88-5285-4dd8-96fa-f39a0c9302e1',NULL,'2022-06-10 05:32:09','2022-06-21 05:49:40',4),(3,'Sainkhishig','Erdenebulgan','A passionate Full Stack Software Engineer ? having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / React Native and some other cool libraries and frameworks.','Software Engineer','erdenebulgan.s@mobicom.mn','$2b$10$uom6SV6n3UrVDQYnA73ROu87dNCFd6on8UoIQZQsnjIv4vnChXpt.','[\"CSS\",\"JavaScript\",\"Typescript\",\"React\",\"Flutter\",\"Android Native(Java)\",\"Docker\",\"Java\",\"Node\",\"Express\"]','photo_3.png',3,1,1,'7eea10a0-2e3c-4e93-a802-e398d4a45e56',NULL,'2022-06-09 12:06:13','2022-06-21 09:10:05',2),(6,'Byambadorj','Tserensodnom',NULL,'Product specialist','tserensodnom.b@mobicom.mn','$2b$10$/rMQx/ushxp.sAB2MZ0Tf.r/nvfBlrw4C3aI7kAi5PfuZIArG4quu','[\"Coordination\",\"Japanese\"]','photo_6.png',8,0,1,'7537fdfe-81a8-4b46-b226-84ce16650891',NULL,'2022-06-20 02:32:57','2022-06-20 07:48:06',3),(7,'Altan-Ochir','Myagmarnaran','Fullstack, Architecture, Problem solving, Critical thinking, Advanced mobile developer, Fast learner','Senior software engineer','myagmarnaran.a@mobicom.mn','$2b$10$l9fG1aQHlDeBji1KyXWmtexs5EQK85edMnScYQizYOIbKNaCYEkIq','[\"Flutter\",\"Vue.js\",\"Angular\",\"React\",\"HTML\",\"Kubernetes\",\"Docker\",\"Java\",\"JavaScript\",\"CSS\"]','photo_7.jpeg',8,0,1,'a46ece38-3c90-4f44-8d40-a79595cd3154',NULL,'2022-06-20 02:38:37','2022-06-20 08:28:21',5),(8,'Baigalimaa','Tserentogtokh',NULL,'Software Architect','tserentogtokh@mobicom.mn','$2b$10$a4KOIPdKNpfklLX0064RduhKAJ5IqJCzE9pnawKbBfUDihrQBz68G','[]','photo_8.png',9,0,1,'02f211ca-c25b-4ab0-b90d-417a3a4a6318',NULL,'2022-06-20 02:40:19','2022-06-20 08:02:41',6),(9,'Ulziikhishig','Oyunerdene',NULL,'Software Engineer','oyunerdene.u@mobicom.mn','$2b$10$ifTz.TdNKuOqSLRKvB6EteYWFVst.SYicKWpvV96Qq8/J0OsKO06q','[\"React\",\"JavaScript\",\"CSS\"]','photo_9.png',5,0,1,'7f575c0c-0527-4c95-a171-cc88f89ecba7',NULL,'2022-06-20 02:41:08','2022-06-30 02:48:04',7),(10,'Batjargal','Erdenebileg',NULL,'Software engineer','erdenebileg.ba@mobicom.mn','$2b$10$6L9Ire37Hjg2m6qroaGLteU45p57XJjKepq/vnu.G/V1tKMHcL.BS','[\"React Native\",\"Android Native(Java)\",\"ReactJS\",\"Java\",\"Design Sprint\",\"Figma\"]','photo_10.jpeg',7,0,1,'98f6efd6-07d1-4102-b035-11c56ada0e45',NULL,'2022-06-20 02:42:19','2022-06-20 07:32:51',8),(11,'Ganzorig','Jamba','Full Stack Engineer with a demonstrated history of working in the ecommerce, fintech, logistics, blockchain industry. Skilled in Communication, Team Workshops, Web and Mobile. Worked on several projects.\n','Software engineer (UI - UX)','jamba@mobicom.mn','$2b$10$8qyPBU5gQ3o0eT9vGDRpDuYrUWWwd6ssa0i6PLDH/qem.Q8W3fZBO','[\"Kubernetes\",\"Docker\",\"React native\",\"Express\",\"React\",\"Vue.js\",\"Go\",\"UI\",\"UX\"]','photo_11.jpeg',4,0,1,'7e083342-e64a-4687-885b-c92ba6610411',NULL,'2022-06-20 02:43:22','2022-06-20 09:36:53',9);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-27 17:14:18
