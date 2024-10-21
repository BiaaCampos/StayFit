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
DROP TABLE IF EXISTS `objetivos_nutricionais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objetivos_nutricionais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `objetivos_nutricionais` WRITE;
/*!40000 ALTER TABLE `objetivos_nutricionais` DISABLE KEYS */;
INSERT INTO `objetivos_nutricionais` VALUES (1,'Perda de peso'),(2,'Ganho de massa muscular'),(3,'Melhora da saúde geral'),(4,'Aumento de energia e vitalidade'),(5,'Controle de doenças crônicas'),(6,'Aprimoramento do desempenho esportivo'),(7,'Manutenção do peso atual'),(8,'Melhora na digestão e saúde intestinal'),(9,'Redução do colesterol'),(10,'Controle da glicemia');
/*!40000 ALTER TABLE `objetivos_nutricionais` ENABLE KEYS */;
UNLOCK TABLES;

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


CREATE TABLE `status_anamnese` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `questao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL, -- Pergunta da questão
  `tipo_resposta` varchar(20) NOT NULL, -- 'dissertativa' ou 'alternativa'
  PRIMARY KEY (`id`)
);

CREATE TABLE `alternativa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_questao` int(11) NOT NULL,
  `descricao` varchar(255) NOT NULL, -- Texto da alternativa
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_questao`) REFERENCES `questao`(`id`)
);

CREATE TABLE `anamnese_questao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_status_anamnese` int(11) NOT NULL, -- Refere-se se é pré-anamnese ou anamnese
  `id_questao` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_status_anamnese`) REFERENCES `status_anamnese`(`id`),
  FOREIGN KEY (`id_questao`) REFERENCES `questao`(`id`)
);

CREATE TABLE `resposta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_anamnese` int(11) NOT NULL, -- Referência à anamnese específica
  `id_questao` int(11) NOT NULL,
  `id_alternativa` int(11) DEFAULT NULL, -- Pode ser NULL para respostas dissertativas
  `texto_resposta` text DEFAULT NULL, -- Pode ser NULL se for alternativa
  `id_usuario` int(11) NOT NULL,
  `id_nutricionista` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_questao`) REFERENCES `questao`(`id`),
  FOREIGN KEY (`id_alternativa`) REFERENCES `alternativa`(`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`),
  FOREIGN KEY (`id_nutricionista`) REFERENCES `usuarios`(`id`)
);

INSERT INTO `status_anamnese` (descricao) VALUES ('pre_anamnese'), ('anamnese');
INSERT INTO `questao` (descricao, tipo_resposta) VALUES 
('Principal objetivo?', 'alternativa'),
('Pratica atividade física?', 'alternativa'),
('Se sim, qual a frequência semanal?', 'alternativa'),
('Quais as atividades?', 'dissertativa'),
('Você está grávida?', 'alternativa'),
('Você tem alguma alergia ou intolerância alimentar?', 'alternativa'),
('Se sim, quais?', 'dissertativa'),
('Você faz uso de algum medicamento regularmente?', 'alternativa'),
('Se sim, qual?', 'dissertativa'),
('Quantas refeições você faz por dia?', 'alternativa'),
('Você consome alimentos industrializados com frequência?', 'alternativa');

INSERT INTO `alternativa` (id_questao, descricao) VALUES 
(2, 'Sim'), 
(2, 'Não'),
(3, '1-2 vezes'), 
(3, '3-4 vezes'), 
(3, '5 ou mais vezes'),
(5, 'Sim'),
(5, 'Não'),
(6, 'Sim'),
(6, 'Não'),
(8, 'Sim'),
(8, 'Não'),
(10, '1'),
(10, '2'),
(10, '3'),
(10, '4 ou mais'),
(11, 'Sim'),
(11, 'Não');

CREATE TABLE `questao_objetivo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_questao` int(11) NOT NULL,
  `id_objetivo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_questao`) REFERENCES `questao`(`id`),
  FOREIGN KEY (`id_objetivo`) REFERENCES `objetivos_nutricionais`(`id`)
);

-- Inserindo relação
INSERT INTO `questao_objetivo` (id_questao, id_objetivo) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10);

SELECT 
	q.id AS id_questao, 
	q.descricao AS pergunta, 
    a.id AS id_alternativa, 
    a.descricao AS alternativa
FROM questao q
JOIN 
	alternativa a ON q.id = a.id_questao
WHERE q.id = 3;

SELECT q.id AS id_questao, q.descricao AS pergunta, a.id AS id_alternativa, a.descricao AS alternativa
FROM questao q
JOIN alternativa a ON q.id = a.id_questao
WHERE q.id = 10;

SELECT * FROM alternativa WHERE id_questao = 3;
DELETE FROM alternativa
WHERE id IN (20, 21, 22, 32);
