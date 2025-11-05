import { Cliente, ListaClientes } from "/js/classes.js";
import { fetchClientes, createCliente, deleteCliente, carregarClientes } from "/js/utils.js";

const listaClientes = new ListaClientes();
const form = document.querySelector("form");
const busca = document.getElementById("busca");
const listaHTML = document.getElementById("listaClientes");

function atualizarLista(clientes = listaClientes.listar()) {
    listaHTML.innerHTML = '';

    clientes.forEach(cliente => {
        const item = document.createElement("li");
        item.innerHTML = `
        ${cliente.nome} - ${cliente.email}
        <button class="excluir" data-id"=${cliente.id}">X</button>
        `;

        const botaoExcluir = item.querySelector('.excluir');
        botaoExcluir.addEventListener('click', function() {
            excluirCliente(cliente.id, cliente.nome);
        });

        listaHTML.appendChild(item);
    });

    const total = listaClientes.contarClientes();
    document.getElementById('contador').textContent = 
        `Total de clientes: ${total}`;
}

busca.addEventListener("input", function(event) {
    const termo = event.target.value;
    
    if (termo === '') {
        atualizarLista(listaClientes.listar());
    } else {
        const resultados = listaClientes.buscarPorTermo(termo);
        atualizarLista(resultados);
    }
});

async function excluirCliente(id, nome) {
    try {
        await deleteCliente(id);
        listaClientes.removerPorId(id);
        atualizarLista();
    }catch (error) {
        console.error("Erro ao excluir:", error);
    }
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById('cliente').value;
    const email = document.getElementById('email').value;
    
    try {
        const novoCliente = new Cliente(nome, email);
        const clienteSalvo = await createCliente(novoCliente.toObject());
        novoCliente.id = clienteSalvo._id;
        listaClientes.adicionar(novoCliente);
        
        atualizarLista();

        console.log("Cliente criado:", novoCliente);

        document.getElementById('cliente').value = '';
        document.getElementById('email').value = '';

    } catch (error) {
        console.error("Erro:", error.message);
        alert(error.message);
    }
});

async function inicializarApp() {
    try {
        await carregarClientes(listaClientes);
        atualizarLista();
        console.log("Clientes carregados da API!");
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

inicializarApp();