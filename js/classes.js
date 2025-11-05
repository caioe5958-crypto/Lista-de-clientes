class Cliente {
    constructor(nome, email, id=null){
        if (!nome || !email){
            throw new Error("Nome e email são obrigatórios");
        }
        this.nome = nome;
        this.email = email;
        this.id = id;
    }

    toObject() {
        return {
            nome: this.nome,
            email: this.email,
            id: this.id
        }
    }
}

class ListaClientes {
    constructor() {
        this.clientes = [];
    }

    adicionar(cliente) {
        this.clientes.push(cliente);
    }

    listar() {
        return this.clientes;
    }

    removerPorId(id) {
        this.clientes = this.clientes.filter( c => c.id !== id);
    }

    buscarPorNome(nome) {
        return this.clientes.find(c => c.nome === nome);
    }

    buscarPorTermo(termo) {
        const termoNormal = termo.toLowerCase();
        return this.clientes.filter(c => 
        c.nome.toLowerCase().includes(termoNormal) ||
        c.email.toLowerCase().includes(termoNormal));
    }

    listarNomes() {
        return this.clientes.map(c => c.nome);
    }

    contarClientes() {
        return this.clientes.reduce((acc) => acc + 1, 0)
    }
}

export { Cliente, ListaClientes };
