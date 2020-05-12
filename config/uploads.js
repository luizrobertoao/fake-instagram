// Requisição do módulo multer, o qual irá gerenciar o upload de arquivos em formulários.
const multer = require("multer");

// Requisição do módulo path para simplificar a especificação de pastas e arquivos dentro do sistema.
const path= require('path')

// Configuração de armazenamento do multer. Sempre a mesma, copiada da documentação do multer no dite do npm. Altera-se sempre o caminho da pasta onde queremos salvar nosso arquivo e o nome que queremos que o arquivo tenha.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // alteração da pasta.
      cb(null, path.join('public', 'posts'));
    },
    // alteração do nome do arquivo, no caso concatenamos a data do momento em que o arquivo está sendo salvo com o nome original do arquivo, por meio do objeto "file"(que o multer nos proporciona) chamando a propriedade "originalname", este nome que criamos ficará registrado em "file" como a propriedade "filename".
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  // Armazenamos a execução do multer na variável "upload" e então exportamos para utilizar dentro do sistema.
  const upload = multer({ storage: storage })

  module.exports = upload;