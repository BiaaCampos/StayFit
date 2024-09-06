-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: stayfit
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `alimentos`
--

DROP TABLE IF EXISTS `alimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `calorias` decimal(6,2) NOT NULL,
  `proteinas` decimal(6,2) NOT NULL,
  `carboidratos` decimal(6,2) NOT NULL,
  `gorduras` decimal(6,2) NOT NULL,
  `fibras` decimal(6,2) DEFAULT NULL,
  `id_grupo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `alimentos_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupos_alimentares` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentos`
--

LOCK TABLES `alimentos` WRITE;
/*!40000 ALTER TABLE `alimentos` DISABLE KEYS */;
INSERT INTO `alimentos` VALUES (1,'Arroz Integral',130.00,2.50,28.00,1.00,1.80,1),(2,'Peito de Frango',165.00,31.00,0.00,3.60,0.00,2),(3,'Abacate',160.00,2.00,9.00,15.00,7.00,3),(4,'Maçã',52.00,0.26,14.00,0.17,2.40,4),(5,'Espinafre',23.00,2.90,3.60,0.40,2.20,4),(6,'Salmão',208.00,20.00,0.00,13.00,0.00,2);
/*!40000 ALTER TABLE `alimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alimentos_refeicoes`
--

DROP TABLE IF EXISTS `alimentos_refeicoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimentos_refeicoes` (
  `id_alimento` int(11) NOT NULL,
  `id_refeicao` int(11) NOT NULL,
  PRIMARY KEY (`id_alimento`,`id_refeicao`),
  KEY `id_refeicao` (`id_refeicao`),
  CONSTRAINT `alimentos_refeicoes_ibfk_1` FOREIGN KEY (`id_alimento`) REFERENCES `alimentos` (`id`),
  CONSTRAINT `alimentos_refeicoes_ibfk_2` FOREIGN KEY (`id_refeicao`) REFERENCES `refeicoes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentos_refeicoes`
--

LOCK TABLES `alimentos_refeicoes` WRITE;
/*!40000 ALTER TABLE `alimentos_refeicoes` DISABLE KEYS */;
INSERT INTO `alimentos_refeicoes` VALUES (1,2),(2,2),(3,5),(4,1),(4,4),(5,2),(6,3);
/*!40000 ALTER TABLE `alimentos_refeicoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultas`
--

DROP TABLE IF EXISTS `consultas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_nutricionista` int(11) NOT NULL,
  `data_consulta` datetime NOT NULL,
  `descricao` text DEFAULT NULL,
  `id_status` int(11) NOT NULL,
  `data_criacao` datetime DEFAULT current_timestamp(),
  `data_atualizacao` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_nutricionista` (`id_nutricionista`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `consultas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `consultas_ibfk_2` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionistas` (`id`),
  CONSTRAINT `consultas_ibfk_3` FOREIGN KEY (`id_status`) REFERENCES `status_consulta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultas`
--

LOCK TABLES `consultas` WRITE;
/*!40000 ALTER TABLE `consultas` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disponibilidade_nutricionistas`
--

DROP TABLE IF EXISTS `disponibilidade_nutricionistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disponibilidade_nutricionistas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_nutricionista` int(11) NOT NULL,
  `data` date NOT NULL,
  `horario` time NOT NULL,
  `id_status_disponibilidade` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_nutricionista` (`id_nutricionista`,`data`,`horario`),
  KEY `id_status_disponibilidade` (`id_status_disponibilidade`),
  CONSTRAINT `disponibilidade_nutricionistas_ibfk_1` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionistas` (`id`),
  CONSTRAINT `disponibilidade_nutricionistas_ibfk_2` FOREIGN KEY (`id_status_disponibilidade`) REFERENCES `status_disponibilidade` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disponibilidade_nutricionistas`
--

LOCK TABLES `disponibilidade_nutricionistas` WRITE;
/*!40000 ALTER TABLE `disponibilidade_nutricionistas` DISABLE KEYS */;
/*!40000 ALTER TABLE `disponibilidade_nutricionistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descricao` (`descricao`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (2,'Feminino'),(1,'Masculino'),(3,'Não-binário'),(5,'Outro'),(4,'Prefiro não dizer');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos_alimentares`
--

DROP TABLE IF EXISTS `grupos_alimentares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos_alimentares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos_alimentares`
--

LOCK TABLES `grupos_alimentares` WRITE;
/*!40000 ALTER TABLE `grupos_alimentares` DISABLE KEYS */;
INSERT INTO `grupos_alimentares` VALUES (1,'Carboidratos'),(2,'Proteínas'),(3,'Gorduras'),(4,'Fibras'),(5,'Vitaminas'),(6,'Minerais');
/*!40000 ALTER TABLE `grupos_alimentares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingestao_agua`
--

DROP TABLE IF EXISTS `ingestao_agua`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingestao_agua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `data` date NOT NULL,
  `quantidade_ml` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_usuario` (`id_usuario`,`data`),
  CONSTRAINT `ingestao_agua_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingestao_agua`
--

LOCK TABLES `ingestao_agua` WRITE;
/*!40000 ALTER TABLE `ingestao_agua` DISABLE KEYS */;
/*!40000 ALTER TABLE `ingestao_agua` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutricionistas`
--

DROP TABLE IF EXISTS `nutricionistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricionistas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `crn` varchar(20) NOT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `id_genero` int(11) DEFAULT NULL,
  `id_tipo_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `crn` (`crn`),
  KEY `id_genero` (`id_genero`),
  KEY `id_tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `nutricionistas_ibfk_1` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`),
  CONSTRAINT `nutricionistas_ibfk_2` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricionistas`
--

LOCK TABLES `nutricionistas` WRITE;
/*!40000 ALTER TABLE `nutricionistas` DISABLE KEYS */;
/*!40000 ALTER TABLE `nutricionistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objetivos_nutricionais`
--

DROP TABLE IF EXISTS `objetivos_nutricionais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objetivos_nutricionais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetivos_nutricionais`
--

LOCK TABLES `objetivos_nutricionais` WRITE;
/*!40000 ALTER TABLE `objetivos_nutricionais` DISABLE KEYS */;
INSERT INTO `objetivos_nutricionais` VALUES (1,'Perda de peso'),(2,'Ganho de massa muscular'),(3,'Melhora da saúde geral'),(4,'Aumento de energia e vitalidade'),(5,'Controle de doenças crônicas'),(6,'Aprimoramento do desempenho esportivo'),(7,'Manutenção do peso atual'),(8,'Melhora na digestão e saúde intestinal'),(9,'Redução do colesterol'),(10,'Controle da glicemia');
/*!40000 ALTER TABLE `objetivos_nutricionais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_plano` int(11) NOT NULL,
  `id_status_pagamento` int(11) NOT NULL,
  `valor_pago` decimal(10,2) NOT NULL,
  `data_pagamento` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_plano` (`id_plano`),
  KEY `id_status_pagamento` (`id_status_pagamento`),
  CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`id_plano`) REFERENCES `planos` (`id`),
  CONSTRAINT `pagamentos_ibfk_2` FOREIGN KEY (`id_status_pagamento`) REFERENCES `status_pagamento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perguntas_relatorio`
--

DROP TABLE IF EXISTS `perguntas_relatorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perguntas_relatorio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pergunta` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas_relatorio`
--

LOCK TABLES `perguntas_relatorio` WRITE;
/*!40000 ALTER TABLE `perguntas_relatorio` DISABLE KEYS */;
INSERT INTO `perguntas_relatorio` VALUES (1,'Nome completo:'),(2,'Idade:'),(3,'Gênero:'),(4,'Altura:'),(5,'Peso atual:'),(6,'IMC (Índice de Massa Corporal):'),(7,'Data de nascimento:'),(8,'Contato:'),(9,'Você tem alguma condição médica diagnosticada?'),(10,'Você já teve alguma cirurgia? Se sim, qual e quando?'),(11,'Você tem histórico familiar de doenças?'),(12,'Você está tomando algum medicamento atualmente? Se sim, quais?'),(13,'Você tem alergias ou intolerâncias alimentares?'),(14,'Você já foi diagnosticado com transtornos alimentares?'),(15,'Quantas refeições você faz por dia?'),(16,'Descreva a sua dieta atual: Café da manhã, Almoço, Jantar, Lanches'),(17,'Você consome alimentos processados? Com que frequência?'),(18,'Você consome bebidas alcoólicas? Com que frequência e em qual quantidade?'),(19,'Quantos litros de água você consome diariamente?'),(20,'Você segue alguma dieta específica?'),(21,'Você pratica exercícios físicos regularmente? Se sim, qual tipo e com que frequência?'),(22,'Você tem alguma limitação física que impeça a prática de atividades físicas?'),(23,'Qual é o seu nível de atividade física diária?'),(24,'Qual é o seu principal objetivo nutricional?'),(25,'Você tem algum prazo específico para alcançar esse objetivo?'),(26,'Você está disposto a fazer mudanças significativas na sua dieta?'),(27,'Você sente fome excessiva em algum momento do dia?'),(28,'Você tem problemas digestivos? (Inchaço, constipação, diarreia, azia, etc.)'),(29,'Você se sente cansado ou sem energia frequentemente?'),(30,'Você tem dificuldades para dormir? Quantas horas de sono você tem por noite?'),(31,'Você fez algum exame laboratorial recentemente? Quais foram os resultados relevantes?'),(32,'Você já fez alguma avaliação de composição corporal?'),(33,'Você tem medição de pressão arterial recente? Se sim, qual foi o resultado?'),(34,'Você toma suplementos alimentares? Se sim, quais e em que dosagem?'),(35,'Você já fez uso de suplementos ou medicamentos para perda de peso ou ganho de massa muscular?'),(36,'Como é o seu nível de estresse diário?'),(37,'Você fuma? Se sim, com que frequência?'),(38,'Você tem um histórico de uso de substâncias? (Drogas recreativas, álcool, etc.)'),(39,'Como é o seu relacionamento com a comida?'),(40,'Como é a sua rotina diária?'),(41,'Quais são as suas expectativas em relação ao acompanhamento nutricional?'),(42,'Você está comprometido em seguir o plano nutricional e as recomendações do nutricionista?'),(43,'Você já fez acompanhamento com outro nutricionista anteriormente? Se sim, como foi a experiência?');
/*!40000 ALTER TABLE `perguntas_relatorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planos`
--

DROP TABLE IF EXISTS `planos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_inicio` date DEFAULT NULL,
  `data_termino` date DEFAULT NULL,
  `id_tipo_plano` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_plano` (`id_tipo_plano`),
  CONSTRAINT `planos_ibfk_1` FOREIGN KEY (`id_tipo_plano`) REFERENCES `tipo_plano` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planos`
--

LOCK TABLES `planos` WRITE;
/*!40000 ALTER TABLE `planos` DISABLE KEYS */;
/*!40000 ALTER TABLE `planos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refeicoes`
--

DROP TABLE IF EXISTS `refeicoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refeicoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refeicoes`
--

LOCK TABLES `refeicoes` WRITE;
/*!40000 ALTER TABLE `refeicoes` DISABLE KEYS */;
INSERT INTO `refeicoes` VALUES (1,'Café da Manhã'),(2,'Almoço'),(3,'Jantar'),(4,'Lanche da Tarde'),(5,'Ceia');
/*!40000 ALTER TABLE `refeicoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regime_usuario`
--

DROP TABLE IF EXISTS `regime_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regime_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_alimento` int(11) NOT NULL,
  `quantidade` decimal(6,2) NOT NULL,
  `data_inclusao` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_alimento` (`id_alimento`),
  CONSTRAINT `regime_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `regime_usuario_ibfk_2` FOREIGN KEY (`id_alimento`) REFERENCES `alimentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regime_usuario`
--

LOCK TABLES `regime_usuario` WRITE;
/*!40000 ALTER TABLE `regime_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `regime_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas_relatorio`
--

DROP TABLE IF EXISTS `respostas_relatorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respostas_relatorio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_pergunta` int(11) NOT NULL,
  `resposta` text DEFAULT NULL,
  `data_resposta` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_pergunta` (`id_pergunta`),
  CONSTRAINT `respostas_relatorio_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `respostas_relatorio_ibfk_2` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas_relatorio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas_relatorio`
--

LOCK TABLES `respostas_relatorio` WRITE;
/*!40000 ALTER TABLE `respostas_relatorio` DISABLE KEYS */;
/*!40000 ALTER TABLE `respostas_relatorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_consulta`
--

DROP TABLE IF EXISTS `status_consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_consulta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_consulta`
--

LOCK TABLES `status_consulta` WRITE;
/*!40000 ALTER TABLE `status_consulta` DISABLE KEYS */;
INSERT INTO `status_consulta` VALUES (1,'agendada'),(3,'cancelada'),(2,'realizada');
/*!40000 ALTER TABLE `status_consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_disponibilidade`
--

DROP TABLE IF EXISTS `status_disponibilidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_disponibilidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descricao` (`descricao`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_disponibilidade`
--

LOCK TABLES `status_disponibilidade` WRITE;
/*!40000 ALTER TABLE `status_disponibilidade` DISABLE KEYS */;
INSERT INTO `status_disponibilidade` VALUES (1,'disponivel'),(2,'reservado');
/*!40000 ALTER TABLE `status_disponibilidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_pagamento`
--

DROP TABLE IF EXISTS `status_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_pagamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descricao` (`descricao`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_pagamento`
--

LOCK TABLES `status_pagamento` WRITE;
/*!40000 ALTER TABLE `status_pagamento` DISABLE KEYS */;
INSERT INTO `status_pagamento` VALUES (3,'cancelado'),(2,'confirmado'),(1,'pendente'),(4,'reembolsado');
/*!40000 ALTER TABLE `status_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_plano`
--

DROP TABLE IF EXISTS `tipo_plano`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_plano` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_plano`
--

LOCK TABLES `tipo_plano` WRITE;
/*!40000 ALTER TABLE `tipo_plano` DISABLE KEYS */;
INSERT INTO `tipo_plano` VALUES (1,'freemium',0.00),(2,'premium',0.00),(3,'premium+',0.00);
/*!40000 ALTER TABLE `tipo_plano` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descricao` (`descricao`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (3,'Administrador'),(1,'Nutricionista'),(2,'Usuário');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `altura` decimal(5,2) DEFAULT NULL,
  `peso_atual` decimal(5,2) DEFAULT NULL,
  `peso_ideal` decimal(5,2) DEFAULT NULL,
  `id_genero` int(11) DEFAULT NULL,
  `id_objetivo` int(11) DEFAULT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL,
  `id_plano` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `id_genero` (`id_genero`),
  KEY `id_objetivo` (`id_objetivo`),
  KEY `id_tipo_usuario` (`id_tipo_usuario`),
  KEY `id_plano` (`id_plano`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_objetivo`) REFERENCES `objetivos_nutricionais` (`id`),
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id`),
  CONSTRAINT `usuarios_ibfk_4` FOREIGN KEY (`id_plano`) REFERENCES `planos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'stayfit'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-04 12:14:49
