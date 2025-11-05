import { Cliente } from "/js/classes.js";

const api_url = "https://crudcrud.com/api/f2efd53c5eef4091a9429b77a7046d81/clientes";

export async function fetchClientes(){
    const resposta = await fetch(api_url);
    if (!resposta.ok) throw new Error("Erro ao buscar clientes");
    return await resposta.json();
}

export async function createCliente(cliente){
    const resposta = await fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    if (!resposta.ok) throw new Error("Erro ao criar cliente");
    return await resposta.json();
}

export async function deleteCliente(id){
    const resposta = await fetch(`${api_url}/${id}`, {
        method: 'DELETE'
    });
    if (!resposta.ok) throw new Error("Erro ao deletar cliente");
    return resposta.ok;
}

export async function carregarClientes(listaClientes) {
    try {
        const clientesAPI = await fetchClientes();
        clientesAPI.forEach(clienteAPI => {
            const cliente = new Cliente(clienteAPI.nome, clienteAPI.email, clienteAPI._id);
            listaClientes.adicionar(cliente);
        });
        return true;
    } catch (error){
        console.error("Erro ao carregar clientes:", error);
        throw error; 
    }
}