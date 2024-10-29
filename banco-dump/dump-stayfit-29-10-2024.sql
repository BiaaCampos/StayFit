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
-- Table structure for table `alternativa`
--

DROP TABLE IF EXISTS `alternativa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alternativa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_questao` int(11) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_questao` (`id_questao`),
  CONSTRAINT `alternativa_ibfk_1` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternativa`
--

LOCK TABLES `alternativa` WRITE;
/*!40000 ALTER TABLE `alternativa` DISABLE KEYS */;
INSERT INTO `alternativa` VALUES (1,2,'Sim'),(2,2,'Não'),(3,3,'1-2 vezes'),(4,3,'3-4 vezes'),(5,3,'5 ou mais vezes'),(6,5,'Sim'),(7,5,'Não'),(8,6,'Sim'),(9,6,'Não'),(10,8,'Sim'),(11,8,'Não'),(12,10,'1'),(13,10,'2'),(14,10,'3'),(15,10,'4 ou mais'),(16,11,'Sim'),(17,11,'Não');
/*!40000 ALTER TABLE `alternativa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anamnese_questao`
--

DROP TABLE IF EXISTS `anamnese_questao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anamnese_questao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_status_anamnese` int(11) NOT NULL,
  `id_questao` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status_anamnese` (`id_status_anamnese`),
  KEY `id_questao` (`id_questao`),
  CONSTRAINT `anamnese_questao_ibfk_1` FOREIGN KEY (`id_status_anamnese`) REFERENCES `status_anamnese` (`id`),
  CONSTRAINT `anamnese_questao_ibfk_2` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anamnese_questao`
--

LOCK TABLES `anamnese_questao` WRITE;
/*!40000 ALTER TABLE `anamnese_questao` DISABLE KEYS */;
/*!40000 ALTER TABLE `anamnese_questao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cadastro_nutricional`
--

DROP TABLE IF EXISTS `cadastro_nutricional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadastro_nutricional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_paciente` int(11) DEFAULT NULL,
  `id_pergunta` int(11) DEFAULT NULL,
  `resposta` text NOT NULL,
  `data_resposta` datetime DEFAULT current_timestamp(),
  `id_usuario_modificacao` int(11) DEFAULT NULL,
  `data_modificacao` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_tipo_pergunta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_pergunta` (`id_pergunta`),
  KEY `id_usuario_modificacao` (`id_usuario_modificacao`),
  KEY `fk_tipo_pergunta` (`id_tipo_pergunta`),
  CONSTRAINT `cadastro_nutricional_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `cadastro_nutricional_ibfk_2` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id`),
  CONSTRAINT `cadastro_nutricional_ibfk_3` FOREIGN KEY (`id_usuario_modificacao`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_tipo_pergunta` FOREIGN KEY (`id_tipo_pergunta`) REFERENCES `tipo_perguntas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro_nutricional`
--

LOCK TABLES `cadastro_nutricional` WRITE;
/*!40000 ALTER TABLE `cadastro_nutricional` DISABLE KEYS */;
/*!40000 ALTER TABLE `cadastro_nutricional` ENABLE KEYS */;
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
  CONSTRAINT `consultas_ibfk_2` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionistas` (`ID`),
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
  CONSTRAINT `disponibilidade_nutricionistas_ibfk_1` FOREIGN KEY (`id_nutricionista`) REFERENCES `nutricionistas` (`ID`),
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
-- Table structure for table `especialidades`
--

DROP TABLE IF EXISTS `especialidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidades` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRICAO` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (1,'Nutrição Clínica'),(2,'Nutrição Esportiva'),(3,'Nutrição Funcional'),(4,'Nutrição Pediátrica'),(5,'Nutrição Geriátrica'),(6,'Nutrição Oncológica'),(7,'Nutrição Comportamental'),(8,'Nutrição Hospitalar'),(9,'Nutrição Materno-Infantil'),(10,'Nutrição Vegetariana e Vegana');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (2,'Feminino'),(3,'Homem Trans'),(1,'Masculino'),(4,'Mulher Trans'),(5,'Não-binário'),(7,'Outro'),(6,'Prefiro não dizer');
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
-- Table structure for table `nutricionista_especialidade`
--

DROP TABLE IF EXISTS `nutricionista_especialidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricionista_especialidade` (
  `ID_NUTRICIONISTA` int(11) NOT NULL,
  `ID_ESPECIALIDADE` int(11) NOT NULL,
  PRIMARY KEY (`ID_NUTRICIONISTA`,`ID_ESPECIALIDADE`),
  KEY `ID_ESPECIALIDADE` (`ID_ESPECIALIDADE`),
  CONSTRAINT `nutricionista_especialidade_ibfk_1` FOREIGN KEY (`ID_NUTRICIONISTA`) REFERENCES `nutricionistas` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `nutricionista_especialidade_ibfk_2` FOREIGN KEY (`ID_ESPECIALIDADE`) REFERENCES `especialidades` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricionista_especialidade`
--

LOCK TABLES `nutricionista_especialidade` WRITE;
/*!40000 ALTER TABLE `nutricionista_especialidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `nutricionista_especialidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutricionistas`
--

DROP TABLE IF EXISTS `nutricionistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricionistas` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `SENHA` varchar(100) NOT NULL,
  `CRN` varchar(20) NOT NULL,
  `TELEFONE` varchar(20) DEFAULT NULL,
  `ID_GENERO` int(11) DEFAULT NULL,
  `TIPO_USUARIO` int(11) NOT NULL,
  `ATIVO` varchar(100) NOT NULL DEFAULT 'S',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`EMAIL`),
  UNIQUE KEY `crn` (`CRN`),
  KEY `id_genero` (`ID_GENERO`),
  KEY `id_tipo_usuario` (`TIPO_USUARIO`),
  CONSTRAINT `nutricionistas_ibfk_1` FOREIGN KEY (`ID_GENERO`) REFERENCES `generos` (`id`),
  CONSTRAINT `nutricionistas_ibfk_2` FOREIGN KEY (`TIPO_USUARIO`) REFERENCES `tipo_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricionistas`
--

LOCK TABLES `nutricionistas` WRITE;
/*!40000 ALTER TABLE `nutricionistas` DISABLE KEYS */;
INSERT INTO `nutricionistas` VALUES (1,'NAT DA NUTRI','natdanutri@email.com','8a9bcf1e51e812d0af8465a8dbcc9f741064bf0af3b3d08e6b0246437c19f7fb','SP111111','14999999999',NULL,1,'S');
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
-- Table structure for table `perguntas`
--

DROP TABLE IF EXISTS `perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_pergunta` int(11) DEFAULT NULL,
  `texto_pergunta` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_pergunta` (`id_tipo_pergunta`),
  CONSTRAINT `perguntas_ibfk_1` FOREIGN KEY (`id_tipo_pergunta`) REFERENCES `tipo_perguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
INSERT INTO `perguntas` VALUES (1,1,'Doenças pré-existentes (diabetes, hipertensão, etc.)'),(2,1,'Alergias alimentares'),(3,1,'Medicamentos em uso'),(4,1,'Cirurgias anteriores'),(5,1,'Histórico familiar de doenças'),(6,2,'Hábitos alimentares'),(7,2,'Preferências alimentares'),(8,2,'Intolerâncias alimentares'),(9,2,'Consumo de água diário'),(10,2,'Frequência de atividade física'),(11,2,'Consumo de suplementos alimentares'),(12,2,'Histórico de dietas anteriores'),(13,3,'Objetivo de peso'),(14,3,'Objetivo de composição corporal (ganho de massa muscular, perda de gordura, etc.)'),(15,3,'Outros objetivos específicos (melhoria na digestão, controle de glicemia, etc.)'),(16,4,'Nível de estresse'),(17,4,'Qualidade do sono'),(18,4,'Rotina diária (horários de refeições, trabalho, etc.)'),(19,5,'Histórico de acompanhamento com outros profissionais de saúde (endocrinologistas, cardiologistas, etc.)'),(20,5,'Exames de sangue (glicemia, colesterol, triglicerídeos, etc.)'),(21,5,'Resultados de outros exames relevantes (vitaminas, minerais, etc.)'),(22,5,'Anotações ou observações do nutricionista');
/*!40000 ALTER TABLE `perguntas` ENABLE KEYS */;
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
-- Table structure for table `questao`
--

DROP TABLE IF EXISTS `questao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  `tipo_resposta` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questao`
--

LOCK TABLES `questao` WRITE;
/*!40000 ALTER TABLE `questao` DISABLE KEYS */;
INSERT INTO `questao` VALUES (1,'Principal objetivo?','alternativa'),(2,'Pratica atividade física?','alternativa'),(3,'Se sim, qual a frequência semanal?','alternativa'),(4,'Quais as atividades?','dissertativa'),(5,'Você está grávida?','alternativa'),(6,'Você tem alguma alergia ou intolerância alimentar?','alternativa'),(7,'Se sim, quais?','dissertativa'),(8,'Você faz uso de algum medicamento regularmente?','alternativa'),(9,'Se sim, qual?','dissertativa'),(10,'Quantas refeições você faz por dia?','alternativa'),(11,'Você consome alimentos industrializados com frequência?','alternativa');
/*!40000 ALTER TABLE `questao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questao_objetivo`
--

DROP TABLE IF EXISTS `questao_objetivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questao_objetivo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_questao` int(11) NOT NULL,
  `id_objetivo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_questao` (`id_questao`),
  KEY `id_objetivo` (`id_objetivo`),
  CONSTRAINT `questao_objetivo_ibfk_1` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id`),
  CONSTRAINT `questao_objetivo_ibfk_2` FOREIGN KEY (`id_objetivo`) REFERENCES `objetivos_nutricionais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questao_objetivo`
--

LOCK TABLES `questao_objetivo` WRITE;
/*!40000 ALTER TABLE `questao_objetivo` DISABLE KEYS */;
INSERT INTO `questao_objetivo` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10);
/*!40000 ALTER TABLE `questao_objetivo` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regime_usuario`
--

LOCK TABLES `regime_usuario` WRITE;
/*!40000 ALTER TABLE `regime_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `regime_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resposta`
--

DROP TABLE IF EXISTS `resposta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resposta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_anamnese` int(11) NOT NULL,
  `id_questao` int(11) NOT NULL,
  `id_alternativa` int(11) DEFAULT NULL,
  `texto_resposta` text DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_nutricionista` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_questao` (`id_questao`),
  KEY `id_alternativa` (`id_alternativa`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_nutricionista` (`id_nutricionista`),
  CONSTRAINT `resposta_ibfk_1` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id`),
  CONSTRAINT `resposta_ibfk_2` FOREIGN KEY (`id_alternativa`) REFERENCES `alternativa` (`id`),
  CONSTRAINT `resposta_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `resposta_ibfk_4` FOREIGN KEY (`id_nutricionista`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resposta`
--

LOCK TABLES `resposta` WRITE;
/*!40000 ALTER TABLE `resposta` DISABLE KEYS */;
INSERT INTO `resposta` VALUES (23,1,1,NULL,'sim',1,1),(24,1,2,NULL,'4',1,1),(25,1,3,NULL,'volei',1,1),(26,1,4,NULL,'sim',1,1),(27,1,5,NULL,'sim',1,1),(28,1,6,NULL,'teste',1,1),(29,1,7,NULL,'sim',1,1),(30,1,8,NULL,'teste',1,1),(31,1,9,NULL,'13',1,1),(32,1,10,NULL,'sim',1,1),(33,1,1,NULL,'sim',1,1),(34,1,2,NULL,'4',1,1),(35,1,3,NULL,'volei',1,1),(36,1,4,NULL,'sim',1,1),(37,1,5,NULL,'sim',1,1),(38,1,6,NULL,'teste',1,1),(39,1,7,NULL,'sim',1,1),(40,1,8,NULL,'teste',1,1),(41,1,9,NULL,'13',1,1),(42,1,10,NULL,'sim',1,1),(43,1,1,NULL,'sim',1,1),(44,1,2,NULL,'4',1,1),(45,1,3,NULL,'volei',1,1),(46,1,4,NULL,'sim',1,1),(47,1,5,NULL,'sim',1,1),(48,1,6,NULL,'teste',1,1),(49,1,7,NULL,'sim',1,1),(50,1,8,NULL,'teste',1,1),(51,1,9,NULL,'13',1,1),(52,1,10,NULL,'sim',1,1);
/*!40000 ALTER TABLE `resposta` ENABLE KEYS */;
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
-- Table structure for table `status_anamnese`
--

DROP TABLE IF EXISTS `status_anamnese`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_anamnese` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_anamnese`
--

LOCK TABLES `status_anamnese` WRITE;
/*!40000 ALTER TABLE `status_anamnese` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_anamnese` ENABLE KEYS */;
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
-- Table structure for table `tipo_perguntas`
--

DROP TABLE IF EXISTS `tipo_perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_perguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_perguntas`
--

LOCK TABLES `tipo_perguntas` WRITE;
/*!40000 ALTER TABLE `tipo_perguntas` DISABLE KEYS */;
INSERT INTO `tipo_perguntas` VALUES (1,'Histórico Médico'),(2,'Avaliação Nutricional'),(3,'Objetivos do Tratamento'),(4,'Estilo de Vida'),(5,'Informações Adicionais');
/*!40000 ALTER TABLE `tipo_perguntas` ENABLE KEYS */;
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
-- Table structure for table `usuario_objetivos`
--

DROP TABLE IF EXISTS `usuario_objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_objetivos` (
  `ID_USUARIO` int(11) NOT NULL,
  `ID_OBJETIVO` int(11) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`,`ID_OBJETIVO`),
  KEY `ID_OBJETIVO` (`ID_OBJETIVO`),
  CONSTRAINT `usuario_objetivos_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `usuario_objetivos_ibfk_2` FOREIGN KEY (`ID_OBJETIVO`) REFERENCES `objetivos_nutricionais` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_objetivos`
--

LOCK TABLES `usuario_objetivos` WRITE;
/*!40000 ALTER TABLE `usuario_objetivos` DISABLE KEYS */;
INSERT INTO `usuario_objetivos` VALUES (2,1),(2,5),(2,6),(2,10);
/*!40000 ALTER TABLE `usuario_objetivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(100) NOT NULL,
  `SENHA` varchar(100) NOT NULL,
  `ALTURA` decimal(5,2) DEFAULT NULL,
  `PESO_ATUAL` decimal(5,2) DEFAULT NULL,
  `PESO_IDEAL` decimal(5,2) DEFAULT NULL,
  `ID_GENERO` int(11) DEFAULT NULL,
  `ID_OBJETIVO` int(11) DEFAULT NULL,
  `TIPO_USUARIO` int(11) DEFAULT NULL,
  `ID_PLANO` int(11) DEFAULT NULL,
  `ATIVO` varchar(1) NOT NULL DEFAULT 'S',
  `CPF` varchar(11) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `TELEFONE` varchar(100) NOT NULL,
  `DATA_NASCIMENTO` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `id_genero` (`ID_GENERO`),
  KEY `id_objetivo` (`ID_OBJETIVO`),
  KEY `id_tipo_usuario` (`TIPO_USUARIO`),
  KEY `id_plano` (`ID_PLANO`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_objetivo`) REFERENCES `objetivos_nutricionais` (`id`),
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`TIPO_USUARIO`) REFERENCES `tipo_usuario` (`id`),
  CONSTRAINT `usuarios_ibfk_4` FOREIGN KEY (`id_plano`) REFERENCES `planos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Gica','1234',1.61,60.00,55.00,2,1,2,NULL,'S',NULL,NULL,'14999999999',NULL),(2,'LUCAS','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',NULL,NULL,NULL,1,NULL,2,NULL,'S','11111111111','teste@email.com','14999999999',NULL),(3,'LUCAS','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',NULL,NULL,NULL,1,NULL,2,NULL,'S','11111111111','teste@teste.com','14999999999',NULL),(4,'LUCAS','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',NULL,NULL,NULL,1,NULL,2,NULL,'S','11111111111','teste@teste.com','14999999999',NULL),(5,'LUCAS','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',NULL,NULL,NULL,1,NULL,2,NULL,'S','11111111111','teste@teste.com','14999999999',NULL),(6,'LUCAS','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',NULL,NULL,NULL,1,NULL,2,NULL,'S','11111111111','teste@teste.com','14999999999',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'stayfit'
--
/*!50003 DROP PROCEDURE IF EXISTS `PROC_GETSEQUENCIA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PROC_GETSEQUENCIA`(
	IN p_table_name VARCHAR(100)
)
BEGIN
    
	SET @SQL = CONCAT('SELECT coalesce(MAX(ID), 0) + 1 AS SEQ FROM ', P_TABLE_NAME);

PREPARE stmt FROM @sql;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-29 17:00:49
