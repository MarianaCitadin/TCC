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
    FOREIGN KEY (CategoriaID) REFERENCES TbCategoria(CategoriaID)
);

-- Tabela de Projetos
CREATE TABLE TbProjeto (
    ProjetoID INT AUTO_INCREMENT PRIMARY KEY,
    NomeProjeto VARCHAR(255) NOT NULL,
    AnoEdicao INT,
    Local VARCHAR(255) NOT NULL
);

-- Tabela de Turmas
CREATE TABLE TbTurma (
    TurmaID INT AUTO_INCREMENT PRIMARY KEY,
    NomeTurma VARCHAR(255) NOT NULL,
    ProjetoID INT,
    horario VARCHAR(255),
    dataInicio DATE,
    dataFim DATE, 
    LimiteAlunos INT DEFAULT 20,
    FOREIGN KEY (ProjetoID) REFERENCES TbProjeto(ProjetoID)
);

-- Tabela de Participantes
CREATE TABLE TbParticipantes (
    ParticipanteID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    ProjetoID INT,
    TurmaID INT,
    FOREIGN KEY (UsuarioID) REFERENCES TbUsuario(UsuarioID),
    FOREIGN KEY (ProjetoID) REFERENCES TbProjeto(ProjetoID),
    FOREIGN KEY (TurmaID) REFERENCES TbTurma(TurmaID)  
);

-- Tabela de Eventos
CREATE TABLE TbEventos (
    EventoID INT AUTO_INCREMENT PRIMARY KEY,
    NomeEvento VARCHAR(255) NOT NULL,
    DataEvento DATE NOT NULL,
    LocalEvento VARCHAR(255),
    ProjetoID INT,
    TurmaID INT,
    FOREIGN KEY (ProjetoID) REFERENCES TbProjeto(ProjetoID)
);

-- Tabela de Audiovisuais
CREATE TABLE TbAudiovisuais (
    AudiovisualID INT AUTO_INCREMENT PRIMARY KEY,
    NomeArquivo VARCHAR(255) NOT NULL,
    TipoArquivo VARCHAR(50),
    Descricao TEXT NOT NULL,
    DataRegistro DATE,
    ProjetoID INT,
    FOREIGN KEY (ProjetoID) REFERENCES TbProjeto(ProjetoID)
);

-- Tabela de Registros
CREATE TABLE TbRegistros (
    RegistroID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT,
    ProjetoID INT,
    Descricao TEXT,
    DataRegistro DATE NOT NULL, 
    Foto VARCHAR(255) NOT NULL,
    FOREIGN KEY (UsuarioID) REFERENCES TbUsuario(UsuarioID),
    FOREIGN KEY (ProjetoID) REFERENCES TbProjeto(ProjetoID)
);

-- Inserção de dados na tabela TbCategoria
insert into tbcategoria(CategoriaID, NomeCategoria) values (1, 'Aluno');

insert into tbcategoria(CategoriaID, NomeCategoria) values (2, 'Professor');