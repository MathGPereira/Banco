import Banco from "./classes/Banco.js";
//import Cliente from "./classes/Cliente.js";

const banco = new Banco();

const usuario = await banco.verificaUsuario(4);

console.log(usuario)