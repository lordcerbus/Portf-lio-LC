
const html = {
    get(element) {
        return document.querySelector(element);
    },
    getAll(element) {
        return document.querySelectorAll(element);
    }
}

// Selection of Div´s
let currentDivIndex = 0,
    Div = html.getAll("div.fundoAplicacao .tela")
    max = Div.length;

const eventos = {
    nextDiv() {
        Div[currentDivIndex]
            .classList.remove("show")
        Div[currentDivIndex]
            .classList.add("notShow")
        currentDivIndex++
        if(currentDivIndex >= max)
            currentDivIndex = max - 1
        Div[currentDivIndex]
            .classList.add("show")
        Div[currentDivIndex]
            .classList.remove("notShow")
            if (currentDivIndex == 4) {
                typewriterAnimation('.texto-animado', {
                    speed: 50,       // Velocidade (ms por caractere)
                    cursor: '|',     // Caractere do cursor (deixe vazio para remover)
                    loop: false      // Se deve repetir a animação
                });
                setInterval(function(){
                    html.get('.whats').style.display = 'flex'
                    html.get('.whats').style.opacity = '1'
                    html.get('.whats').style.transform = 'scale(1.2)'
                    html.get('.whats').style.backgroundColor = 'green'
                    html.get('.whats').style.transition = 'all 2s ease-in-out'
                }, 3000) 
            }
    },
     prevDiv() {
        Div[currentDivIndex]
            .classList.remove("show")
        Div[currentDivIndex]
            .classList.add("notShow")
        currentDivIndex--
        if(currentDivIndex < 0)
            currentDivIndex = 0
        Div[currentDivIndex]
            .classList.add("show")
        Div[currentDivIndex]
            .classList.remove("notShow")
     
    },
    Initial() {
        setTimeout(function(){
            html.get('img[src="imagens/centro.png"]').classList.add('appOn')
            html.get('img[src="imagens/roda.png"]').style.animation = 'rodar 1.5s linear infinite'
            }, 4600)
            setTimeout(function(){
                html.get('.fundoAplicacao').classList.toggle('on')
                html.get('.fundoAplicacao').classList.toggle('off')
                html.get('img[src="imagens/roda.png"]').style.animation = 'rodar 60s linear infinite'
            }, 5000)
    },
    squares() {
        const ulSquares = document.querySelector('ul.squares')
    
    for (let i = 0; i < 50; i++) {
        const li = document.createElement('li')
    
        const random = (min, max) => Math.random() * (max - min) + min
    
        const size = Math.floor(random(10, 60))
        const position = random(1, 99)
        const delay = random(5, 0.1)
        const duration = random(24, 12)
    
        li.style.width = `${size}px`
        li.style.height = `${size}px`
        li.style.bottom = `-${size}px`
        li.style.left = `${position}%`
        li.style.animationDelay = `${delay}s`
        li.style.animationDuration = `${duration}s`
        li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`
    
        ulSquares.appendChild(li)
        } 
    },
    modal() {
        html.getAll('div.projeto img').forEach(function(img){
            img.addEventListener('click', function(e){
                html.get('div.modal').style.visibility = 'visible'
            html.get('div.modal').style.backgroundImage = 'url("' + e.target.src + '")'
         })
        })
        html.get('div.modal').addEventListener('click', function(){
            html.get('div.modal').style.visibility = 'hidden'
        })
    },
    listeners() {
        html.get('img[src="imagens/centro.png"]').addEventListener('click', function(){
            html.get('img[src="imagens/centro.png"]').classList.add('appOn')
            setTimeout(function(){
            html.get('img[src="imagens/roda.png"]').style.animation = 'rodar 1.5s linear infinite'
            }, 400)
            setTimeout(function(){
                html.get('.fundoAplicacao').classList.toggle('on')
                html.get('.fundoAplicacao').classList.toggle('off')
                html.get('img[src="imagens/roda.png"]').style.animation = 'rodar 60s linear infinite'
            }, 1000)
         })
        html.get('div.fundoAplicacao span').addEventListener('click', function(){
                html.get('.fundoAplicacao').classList.toggle('on')
                html.get('.fundoAplicacao').classList.toggle('off')
                html.get('img[src="imagens/centro.png"]').classList.remove('appOn')
          })
        html.get('div.botoes div.prev').addEventListener('click', eventos.prevDiv)
        html.get('div.botoes div.next').addEventListener('click', eventos.nextDiv)
    }
}

function typewriterAnimation(targetSelector, options = {}) {
    // Configurações padrão
    const config = {
        speed: 50,
        cursor: '|',
        loop: false,
        ...options
    };

    // Seleciona todos os elementos alvo
    const elements = document.querySelectorAll(targetSelector);
    
    // Verifica se elementos existem
    if (elements.length === 0) {
        console.warn(`Nenhum elemento encontrado com o seletor: ${targetSelector}`);
        return;
    }

    // Observer para detectar quando o elemento está visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                startAnimation(element);
                observer.unobserve(element); // Para de observar após a primeira vez
            }
        });
    }, { threshold: 0.5 }); // 50% do elemento visível

    // Inicia o observer para cada elemento
    elements.forEach(element => {
        // Salva o texto original como atributo
        const originalText = element.textContent;
        element.setAttribute('data-original-text', originalText);
        element.textContent = ''; // Limpa o texto inicial
        
        observer.observe(element);
    });

    // Função que executa a animação
    function startAnimation(element) {
        const originalText = element.getAttribute('data-original-text');
        let i = 0;
        let displayText = '';
        
        // Adiciona cursor se configurado
        if (config.cursor) {
            element.classList.add('typewriter-cursor');
        }

        // Intervalo de digitação
        const typingInterval = setInterval(() => {
            if (i < originalText.length) {
                displayText += originalText.charAt(i);
                element.textContent = displayText;
                
                // Adiciona cursor
                if (config.cursor) {
                    element.textContent += config.cursor;
                }
                
                i++;
            } else {
                // Remove cursor ao finalizar
                if (config.cursor) {
                    element.textContent = displayText;
                    element.classList.remove('typewriter-cursor');
                }
                
                clearInterval(typingInterval);
                
                // Se for para repetir, reinicia após 3 segundos
                if (config.loop) {
                    setTimeout(() => {
                        element.textContent = '';
                        startAnimation(element);
                    }, 3000);
                }
            }
        }, config.speed);
    }
}

// CSS recomendado para o cursor piscando
const style = document.createElement('style');
style.textContent = `
    .typewriter-cursor::after {
        content: '|';
        animation: blink 1s step-end infinite;
    }
    @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
    }
`;

document.head.appendChild(style);

function init() {
 eventos.modal();
 eventos.squares();
 eventos.Initial();
 eventos.listeners();
}

init()
