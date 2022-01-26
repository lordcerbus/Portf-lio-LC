
const html = {
    get(element) {
        return document.querySelector(element);
    },
    getAll(element) {
        return document.querySelectorAll(element);
    }
}

let currentDivIndex = 0,
    Div = html.getAll("div.fundoAplicacao .tela")
    max = Div.length;
    console.log(Div[0])

const eventos = {
    nextDiv() {
        Div[currentDivIndex]
            .classList.remove("show")
        currentDivIndex++
        if(currentDivIndex >= max)
            currentDivIndex = 0
        Div[currentDivIndex]
            .classList.add("show")
            console.log(Div[currentDivIndex])
    },
    
     prevDiv() {
        Div[currentDivIndex]
            .classList.remove("show")
        currentDivIndex--
        if(currentDivIndex < 0)
            currentDivIndex = max - 1
        Div[currentDivIndex]
            .classList.add("show")
            console.log(Div[currentDivIndex])

    },
    listeners() {
        html.get('img[src="imagens/centro.png"]').addEventListener('click', function(){
            html.get('img[src="imagens/centro.png"]').classList.add('appOn')
            setTimeout(function(){
            html.get('img[src="imagens/roda.png"]').style.animation = 'rodar 1s linear infinite'
            }, 400)
            setTimeout(function(){
                html.get('.fundoAplicacao').classList.add('on')
                html.get('img[src="imagens/roda.png"]').style.animation = 'rodar 60s linear infinite'
            }, 1100)
         })
        html.get('div.fundoAplicacao span').addEventListener('click', function(){
             html.get('.fundoAplicacao').classList.remove('on')
             html.get('img[src="imagens/centro.png"]').classList.remove('appOn')
          })
        html.get('div.botoes div.prev').addEventListener('click', eventos.prevDiv)
        
        html.get('div.botoes div.next').addEventListener('click', eventos.nextDiv)
    }
}

eventos.listeners();

/* Fundo com Quadros */
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
 
