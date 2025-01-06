-- Criação do banco de dados
CREATE DATABASE ClicandoNaTerceiraIdade;
USE ClicandoNaTerceiraIdade;

-- Tabela de Categorias
CREATE TABLE TbCategoria (
    CategoriaID INT AUTO_INCREMENT PRIMARY KEY,
    NomeCategoria VARCHAR(255) NOT NULL
);

-- Tabela de Usuários com os campos de endereço
CREATE TABLE TbUsuario (
    UsuarioID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    DataNascimento DATE NOT NULL,
    Documento VARCHAR(50) NOT NULL UNIQUE,
    Genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    Telefone VARCHAR(20),
    Email VARCHAR(255) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    CategoriaID INT,
    Logradouro VARCHAR(255),
    Numero VARCHAR(20),
    Bairro VARCHAR(255),
    Cidade VARCHAR(255),
    Estado VARCHAR(2),
    CEP VARCHAR(15),
    FOREIGN KEY (CategoriaID) REFERENCES TbCategoria(CategoriaID)
);

-- Tabela de Participantes
CREATE TABLE TbParticipantes (
    ParticipanteID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    ProjetoID INT,
    FOREIGN KEY (UsuarioID) REFERENCES TbUsuario(UsuarioID)
);

-- Tabela de Turmas
CREATE TABLE TbTurma (
    TurmaID INT AUTO_INCREMENT PRIMARY KEY,
    NomeTurma VARCHAR(255) NOT NULL,
    horario VARCHAR(255),
    dataInicio DATE,
    dataFim DATE, 
    LimiteAlunos INT DEFAULT 20
);

-- Tabela de Eventos
CREATE TABLE TbEventos (
    EventoID INT AUTO_INCREMENT PRIMARY KEY,
    NomeEvento VARCHAR(255) NOT NULL,
    DataEvento DATE NOT NULL,
    LocalEvento VARCHAR(255)
);

-- Tabela de Audiovisuais
CREATE TABLE TbAudiovisuais (
    AudiovisualID INT AUTO_INCREMENT PRIMARY KEY,
    NomeArquivo VARCHAR(255) NOT NULL,
    TipoArquivo VARCHAR(50),
    Descricao TEXT NOT NULL,
    DataRegistro DATE
);

-- Tabela de Registros
CREATE TABLE TbRegistros (
    RegistroID INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    Descricao TEXT NOT NULL,
    DataRegistro DATE,
    Foto VARCHAR(255) NOT NULL
);

-- Inserção de Categorias
INSERT INTO TbCategoria (CategoriaID, NomeCategoria) VALUES (1, 'Aluno');
INSERT INTO TbCategoria (CategoriaID, NomeCategoria) VALUES (2, 'Professor');
