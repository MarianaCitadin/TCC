CREATE DATABASE clicando;
use clicando;


-- Tabela Endereço
CREATE TABLE `endereco` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `cidade` VARCHAR(30) NOT NULL,
  `rua` VARCHAR(35) NOT NULL,
  `bairro` VARCHAR(35) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `numero` INT NOT NULL,
  `cep` CHAR(8) NOT NULL,
  PRIMARY KEY (`cod`)
);

-- Tabela Categoria
CREATE TABLE `categoria` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(15) DEFAULT NULL,
  PRIMARY KEY (`cod`)
);

-- Tabela Cadastro
CREATE TABLE `cadastro` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `datanascimento` DATE NOT NULL,
  `senha` VARCHAR(10) NOT NULL,
  `login` VARCHAR(25) NOT NULL UNIQUE,
  `categoria` INT NOT NULL,
  `fone` CHAR(15) NOT NULL,
  `documento` CHAR(11) NOT NULL UNIQUE,
  `genero` CHAR(14) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `endereco` INT NOT NULL,
  PRIMARY KEY (`cod`),
  FOREIGN KEY (`categoria`) REFERENCES `categoria` (`cod`),
  FOREIGN KEY (`endereco`) REFERENCES `endereco` (`cod`)
);

-- Tabela Turma
CREATE TABLE `turma` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`cod`)
);

-- Tabela Audiovisuais
CREATE TABLE `audiovisuais` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`cod`)
);

-- Tabela Eventos
CREATE TABLE `eventos` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(250) DEFAULT NULL,
  PRIMARY KEY (`cod`)
);

-- Tabela Participantes
CREATE TABLE `participantes` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(15) DEFAULT NULL,
  PRIMARY KEY (`cod`)
);

-- Tabela Projeto
CREATE TABLE `projeto` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `turma` INT NOT NULL,
  `eventos` INT NOT NULL,
  `audiovisuais` INT NOT NULL,
  `titulo` VARCHAR(50) NOT NULL DEFAULT 'Projeto Clicando na Terceira Idade',
  `descricao` VARCHAR(50) DEFAULT NULL,
  `anoedicao` YEAR NOT NULL,
  `datalancamento` DATE NOT NULL,
  `materiais` BLOB NOT NULL,
  `observacoes` VARCHAR(150) DEFAULT NULL,
  `participantes` INT NOT NULL,
  `coordenador` VARCHAR(50) NOT NULL,
  `num_vagas` INT NOT NULL,
  `cargahoraria` TIME NOT NULL,
  `datafinalizacao` DATE NOT NULL,
  PRIMARY KEY (`cod`),
  FOREIGN KEY (`turma`) REFERENCES `turma` (`cod`),
  FOREIGN KEY (`eventos`) REFERENCES `eventos` (`cod`),
  FOREIGN KEY (`audiovisuais`) REFERENCES `audiovisuais` (`cod`),
  FOREIGN KEY (`participantes`) REFERENCES `participantes` (`cod`)
);

-- Tabela Acesso
CREATE TABLE `acesse` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `hora` TIME DEFAULT NULL,
  `dataacesso` DATE DEFAULT NULL,
  `codusuario` INT,
  `codprojeto` INT NOT NULL,
  PRIMARY KEY (`cod`),
  FOREIGN KEY (`codusuario`) REFERENCES `cadastro` (`cod`),
  FOREIGN KEY (`codprojeto`) REFERENCES `projeto` (`cod`)
);
