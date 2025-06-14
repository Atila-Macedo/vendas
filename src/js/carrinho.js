class Carrinho {
    constructor() {
        this.itens = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Elementos do DOM
        this.btnCarrinho = document.querySelector('.btn-carrinho');
        this.carrinhoItens = document.querySelector('.carrinho-itens');
        this.listaCarrinho = document.querySelector('.lista-carrinho');
        this.contadorCarrinho = document.querySelector('.carrinho-contador');
        this.totalElement = document.querySelector('.carrinho-total span');
        this.btnFinalizar = document.querySelector('.btn-finalizar');

        // Event Listeners
        this.btnCarrinho.addEventListener('click', () => this.toggleCarrinho());
        this.btnFinalizar.addEventListener('click', () => this.finalizarCompra());

        // Adicionar eventos aos botões
        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', (e) => this.comprarItem(e));
        });

        document.querySelectorAll('.btn-adicionar').forEach(btn => {
            btn.addEventListener('click', (e) => this.adicionarItem(e));
        });
    }

    toggleCarrinho() {
        this.carrinhoItens.classList.toggle('ativo');
    }

    getItemInfo(carta) {
        const nome = carta.querySelector('.nome-personagem').textContent;
        const preco = parseFloat(carta.querySelector('.preco').textContent.replace('R$ ', '').replace(' ', '').replace(',', '.'));
        const categoria = carta.querySelector('.categoria').textContent.replace('Categoria: ', '');

        return { nome, preco, categoria };
    }

    comprarItem(evento) {
        const carta = evento.target.closest('.carta');
        const item = this.getItemInfo(carta);

        // Criar mensagem para o WhatsApp
        let mensagem = `Olá! Gostaria de comprar o seguinte item:\n\n`;
        mensagem += `- ${item.nome} (${item.categoria}): R$ ${item.preco.toFixed(2)}`;

        // Codificar a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Criar link do WhatsApp
        const whatsappLink = `https://wa.me/5592993129978?text=${mensagemCodificada}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappLink, '_blank');
    }

    adicionarItem(evento) {
        const carta = evento.target.closest('.carta');
        const item = this.getItemInfo(carta);

        this.itens.push(item);
        this.atualizarCarrinho();
        this.toggleCarrinho();
    }

    atualizarCarrinho() {
        // Limpar lista
        this.listaCarrinho.innerHTML = '';
        
        // Calcular total
        this.total = this.itens.reduce((acc, item) => acc + item.preco, 0);

        // Atualizar contador
        this.contadorCarrinho.textContent = this.itens.length;

        // Atualizar lista
        this.itens.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.nome} - ${item.categoria}</span>
                <span>R$ ${item.preco.toFixed(2)}</span>
            `;
            this.listaCarrinho.appendChild(li);
        });

        // Atualizar total
        this.totalElement.textContent = `Total: R$ ${this.total.toFixed(2)}`;
    }

    finalizarCompra() {
        if (this.itens.length === 0) {
            alert('Adicione itens ao carrinho primeiro!');
            return;
        }

        // Criar mensagem para o WhatsApp
        let mensagem = 'Olá! Gostaria de comprar os seguintes itens:\n\n';
        this.itens.forEach(item => {
            mensagem += `- ${item.nome} (${item.categoria}): R$ ${item.preco.toFixed(2)}\n`;
        });
        mensagem += `\nTotal: R$ ${this.total.toFixed(2)}`;

        // Codificar a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Criar link do WhatsApp
        const whatsappLink = `https://wa.me/5592993129978?text=${mensagemCodificada}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappLink, '_blank');
        
        // Limpar carrinho
        this.itens = [];
        this.atualizarCarrinho();
        this.toggleCarrinho();
    }

    atualizarCartasFiltro() {
        const cartas = document.querySelectorAll('.carta');
        cartas.forEach(carta => {
            if (carta.classList.contains('esconder')) {
                carta.style.display = 'none';
            } else {
                carta.style.display = '';
            }
        });
    }
}

// Inicializar carrinho quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new Carrinho();
}); 