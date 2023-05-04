import Conta from "./classes/Conta.js";
import Cliente from "./classes/Cliente.js";

const conta = new Conta("josesilv", "123123123213", "0125410365", "0426");
const cliente = new Cliente("josé", "Silva", "jsilva@outlook.com", "11111111111", conta)
