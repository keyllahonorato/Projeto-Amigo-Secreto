//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Array para armazenar os amigos
let amigos = [];
let sorteados = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const amigoNome = inputAmigo.value.trim();

    // Verificar se o nome não está vazio e se já não foi adicionado
    if (amigoNome && !amigos.includes(amigoNome)) {
        amigos.push(amigoNome);

        // Atualiza a lista visível na interface
        const ulLista = document.getElementById('listaAmigos');
        const li = document.createElement('li');
        li.textContent = amigoNome;
        ulLista.appendChild(li);

        // Atualiza a quantidade de amigos
        atualizarQuantidadeAmigos();
    }

    // Limpar o campo de entrada após adicionar
    inputAmigo.value = '';
}

// Função para atualizar a quantidade de amigos visível
function atualizarQuantidadeAmigos() {
    const quantidadeElement = document.getElementById('quantidadeAmigos');
    quantidadeElement.textContent = `Quantidade de amigos: ${amigos.length}`; // Atualiza o número de amigos
}

// Função para sortear um amigo secreto de cada vez
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para fazer o sorteio.');
        return;
    }

    // Caso todos os amigos já tenham sido sorteados, limpa o sorteio e reinicia
    if (sorteados.length === amigos.length) {
        alert('Todos os amigos já foram sorteados. Reiniciando...');
        reiniciarSorteio();
        return;
    }

    // Sorteia um amigo não sorteado ainda
    let amigoSorteado;
    do {
        const indexAleatorio = Math.floor(Math.random() * amigos.length);
        amigoSorteado = amigos[indexAleatorio];
    } while (sorteados.includes(amigoSorteado));

    // Registra o amigo sorteado
    sorteados.push(amigoSorteado);

    // Exibe o nome da pessoa sorteada (substituindo o anterior)
    const ulResultado = document.getElementById('resultado');

    // Limpa o nome do sorteio anterior
    ulResultado.innerHTML = '';

    const liResultado = document.createElement('li');
    liResultado.textContent = amigoSorteado; // Exibe apenas o nome do sorteado
    ulResultado.appendChild(liResultado);

    // Definir um tempo de 3 segundos para esconder o nome sorteado
    setTimeout(() => {
        ulResultado.innerHTML = ''; // Limpa o nome sorteado após 3 segundos
    }, 3000); // 3000 milissegundos = 3 segundos

    // Desabilita o botão de sorteio se todos os amigos foram sorteados
    if (sorteados.length === amigos.length) {
        document.querySelector('.button-draw').disabled = true;
    }
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    sorteados = []; // Limpa a lista de sorteados
    document.getElementById('resultado').innerHTML = ''; // Limpa a lista de resultados
    document.querySelector('.button-draw').disabled = false; // Habilita o botão de sorteio novamente

    // Restaura a lista de amigos original e a exibe novamente
    // Restaurar a lista de amigos original
    const ulLista = document.getElementById('listaAmigos');
    amigos = [...ulLista.children].map(item => item.textContent);

    // Atualiza a lista de amigos visível na tela
    atualizarListaAmigos();
}

// Função para atualizar a lista de amigos visível
function atualizarListaAmigos() {
    const ulLista = document.getElementById('listaAmigos');
    ulLista.innerHTML = ''; // Limpa a lista de amigos

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        ulLista.appendChild(li);
    });

    // Atualiza a quantidade de amigos após a reinicialização
    atualizarQuantidadeAmigos();
}
