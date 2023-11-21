const fs = require("fs")

//Função de Retorno do Timestamp;
function dataString(){
    return new Date(Date.now()).toLocaleDateString('pt-BR') +" "+ new Date(Date.now()).toLocaleTimeString()
};

//Ver se a pasta existe Se não, criar
const dir = "./logsacessos/";

//Verifica se não existe
if (!fs.existsSync(dir)){
    //Efetua a criação do diretório
    fs.mkdirSync(dir);
}

//Stream de Conexão ao Arquivo de Log
const data = new Date;
const logPath = data.getDate() +"_"+ `${data.getMonth() + 1}` +"_"+ data.getFullYear() +"-"+ new Date(Date.now()).toLocaleTimeString().split(":").join(".")
const logFile = fs.createWriteStream(`./logsacessos/${logPath}_acesso.log`)

const logger = (req, res, next) => {
       
    //Escrever em Console o Request e Resposta realizado.   
    res.on( "finish", () => {
        let eventoAcesso = dataString() +" | "+ req.method +" "+ decodeURI(req.url) +" "+ res.statusCode +" "+ res.statusMessage +" "+ "ORIGEM: " + req.ip
        console.log(eventoAcesso);
        logFile.write(`${eventoAcesso} \n`)
    });
    next()
}

export default logger