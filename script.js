const listaClientes = document.getElementById("listaClientes");

fetch("https://crudcrud.com/api/1f2feb33831c49d58a9a1aace5903703/clientes")
.then(resposta => resposta.json())
.then((dadosClientes) => {
    console.log("Dados recebidos da API:", dadosClientes);
    
    dadosClientes.forEach(cliente => {
        const item = document.createElement("li");
        item.innerHTML = `${cliente.nome} - ${cliente.email} <button onclick="deletar('${cliente._id}', this)">X</button>`;
        listaClientes.appendChild(item);
    });
})

document.getElementById("add").addEventListener("click", (event)=> {
    event.preventDefault();
        console.log("Botão clicado")
    const nome = document.getElementById('cliente').value;
    const email = document.getElementById('email').value;
        console.log("Nome:", nome);
        console.log("Email:", email);
    
    const novoCliente = {
        nome: nome,
        email: email
    };

    fetch("https://crudcrud.com/api/1f2feb33831c49d58a9a1aace5903703/clientes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoCliente)
    })
    .then(resposta => resposta.json())
    .then((clienteNovo) =>{
        console.log("Cliente criado:", clienteNovo);

        const item = document.createElement("li");
        item.innerHTML = `${clienteNovo.nome} - ${clienteNovo.email} <button onclick="deletar('${clienteNovo._id}', this)">X</button>`;
        listaClientes.appendChild(item);

        document.getElementById("cliente").value = '';
        document.getElementById("email").value = '';
    });
})

function deletar(id, element) {
    console.log("ID do cliente a ser deletado:", id);
    element.parentElement.remove();

    fetch(`https://crudcrud.com/api/1f2feb33831c49d58a9a1aace5903703/clientes/${id}`, {
        method: 'DELETE'
    })
      .then(resposta => {
        console.log("Cliente deletado com êxito.");
      })
      .catch(error => {
        console.error("Erro ao excluir o cliente:", error);
      })
    }