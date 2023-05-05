import Banco from "./classes/Banco.js";
import Conta from "./classes/Conta.js";

const banco = new Banco();
//banco.cadastrarUsuario("matheus", "pereira", "matheus@outlook.com", "39782056880", new Conta("1", "1", "1", "1", "1"));
banco.deletarUsuario(5);
