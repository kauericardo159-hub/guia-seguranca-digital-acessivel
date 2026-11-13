// ==========================================================================
// NUVEM DE DADOS: Segurança Digital e Direitos na Internet (Aulas 03 e 04)
// ==========================================================================
const dadosSeguranca = [
    {
        titulo: "Autenticação em Dois Fatores (2FA)",
        categoria: "senhas",
        rotulo: "Senhas & Contas",
        descricao: "Ative a verificação em duas etapas em todas as suas redes sociais e e-mails. Mesmo que alguém descubra sua senha, não conseguirá acessar sua conta sem o código temporário."
    },
    {
        titulo: "Proteção de Dados Pessoais (LGPD)",
        categoria: "privacidade",
        rotulo: "Privacidade & LGPD",
        descricao: "A Lei Geral de Proteção de Dados garante a você o direito de saber como empresas coletam, armazenam e utilizam suas informações pessoais na internet."
    },
    {
        titulo: "Cuidado com Links Suspeitos (Phishing)",
        categoria: "golpes",
        rotulo: "Prevenção de Golpes",
        descricao: "Nunca clique em links enviados por SMS ou mensagens prometendo prêmios fáceis ou alertando sobre bloqueios urgentes de conta bancária."
    },
    {
        titulo: "Senhas Fortes e Exclusivas",
        categoria: "senhas",
        rotulo: "Senhas & Contas",
        descricao: "Evite usar datas de nascimento ou sequências numéricas. Crie senhas longas misturando letras maiúsculas, minúsculas, números e símbolos."
    },
    {
        titulo: "Privacidade em Redes Wi-Fi Públicas",
        categoria: "privacidade",
        rotulo: "Privacidade & LGPD",
        descricao: "Evite acessar aplicativos de banco ou digitar senhas importantes quando estiver conectado a redes Wi-Fi abertas em locais públicos."
    },
    {
        titulo: "Perfis Falsos e Engenharia Social",
        categoria: "golpes",
        rotulo: "Prevenção de Golpes",
        descricao: "Desconfie de pedidos de transferência financeira feitos por mensagens, mesmo que pareçam vir de amigos ou familiares. Sempre confirme por ligação."
    }
];

// ==========================================================================
// RENDERIZAÇÃO DINÂMICA DOS CARTÕES NA TELA
// ==========================================================================
const containerDicas = document.getElementById("lista-dicas");
const botoesFiltro = document.querySelectorAll(".filtro-btn");

function renderizarCartoes(categoriaSelecionada = "todos") {
    containerDicas.innerHTML = "";

    const dicasFiltradas = categoriaSelecionada === "todos"
        ? dadosSeguranca
        : dadosSeguranca.filter(item => item.categoria === categoriaSelecionada);

    dicasFiltradas.forEach(item => {
        const cartao = document.createElement("article");
        cartao.className = "cartao-dica";

        cartao.innerHTML = `
            <div>
                <span class="cartao-categoria">${item.rotulo}</span>
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
            </div>
            <button class="btn-ouvir-card" type="button" aria-label="Ouvir dica sobre ${item.titulo}">
                🔊 Ouvir Dica
            </button>
        `;

        // Evento de leitura em voz alta individual do cartão
        const btnOuvir = cartao.querySelector(".btn-ouvir-card");
        btnOuvir.addEventListener("click", () => {
            lerTextoEmVozAlta(`${item.titulo}. ${item.descricao}`);
        });

        containerDicas.appendChild(cartao);
    });
}

// Eventos dos botões de filtro
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        renderizarCartoes(botao.dataset.categoria);
    });
});

// ==========================================================================
// CONTROLES DE TAMANHO DE FONTE E ALTO CONTRASTE (Aulas 05 e 06)
// ==========================================================================
let tamanhoFonteAtual = 16;
const htmlElement = document.documentElement;

document.getElementById("btn-aumentar").addEventListener("click", () => {
    if (tamanhoFonteAtual < 24) {
        tamanhoFonteAtual += 2;
        htmlElement.style.setProperty("--tamanho-base", `${tamanhoFonteAtual}px`);
    }
});

document.getElementById("btn-diminuir").addEventListener("click", () => {
    if (tamanhoFonteAtual > 12) {
        tamanhoFonteAtual -= 2;
        htmlElement.style.setProperty("--tamanho-base", `${tamanhoFonteAtual}px`);
    }
});

document.getElementById("btn-resetar").addEventListener("click", () => {
    tamanhoFonteAtual = 16;
    htmlElement.style.setProperty("--tamanho-base", "16px");
});

const btnContraste = document.getElementById("btn-contraste");
btnContraste.addEventListener("click", () => {
    document.body.classList.toggle("alto-contraste");
    const ativo = document.body.classList.contains("alto-contraste");
    btnContraste.setAttribute("aria-pressed", ativo);
});

// ==========================================================================
// LEITURA EM VOZ ALTA - WEB SPEECH API (Aulas 07 e 08)
// ==========================================================================
const btnLerPagina = document.getElementById("btn-ler-pagina");
const btnPararLeitura = document.getElementById("btn-parar-leitura");

function lerTextoEmVozAlta(texto) {
    if (!("speechSynthesis" in window)) {
        alert("Seu navegador não suporta leitura em voz alta.");
        return;
    }

    window.speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = 1.0;

    fala.onstart = () => {
        btnPararLeitura.classList.remove("btn-oculto");
    };

    fala.onend = () => {
        btnPararLeitura.classList.add("btn-oculto");
    };

    window.speechSynthesis.speak(fala);
}

btnLerPagina.addEventListener("click", () => {
    const conteudoTexto = document.getElementById("conteudo-principal").innerText;
    lerTextoEmVozAlta(`Guia de Segurança Digital. ${conteudoTexto}`);
});

btnPararLeitura.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    btnPararLeitura.classList.add("btn-oculto");
});

// Inicializa a página carregando todos os cartões
renderizarCartoes();
