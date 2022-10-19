import images from "./imagesData.js";
let arrayImgs = [...images];

arrayImgs.sort(comparator);
let plays = 0;
let quantity = 0;

function cardsDistribution() {
    while(!(quantity % 2 === 0) || !(quantity >= 4 && quantity <= 14) || !(typeof(quantity) === "number") || quantity === NaN || quantity === undefined){
        quantity = parseInt(prompt("Insira a quantidade de cartas com que deseja jogar"));
    }
    createArrayCards();
}

function comparator() { 
	return Math.random() - 0.5; 
}

function createArrayCards() {
    let newArray = [];
    let arrayCards = [];

    arrayImgs.forEach(elt => {
        if(newArray.length != quantity/2) {
            newArray.push(elt);
        }
    });

    newArray.map(el => {
        arrayCards.push(el, el)
    });

    arrayCards.sort(comparator);
    renderCards(arrayCards);

    return {arrayCards};
}

function renderCards(array) { 
    const ul = document.querySelector(".cards"); 
    ul.innerHTML = "";
    array.forEach(elt => {
        ul.append(createCards(elt));
    })
    cardClick(); 
}

function createCards(imgFront) {
    const li = document.createElement("li");
    li.classList.add("card");

    const frontface = document.createElement("div");
    frontface.classList.add("front-face", "hidden");
    const imageFront = document.createElement("img");
    imageFront.src = imgFront;

    const backface = document.createElement("div");
    backface.classList.add("back-face", "face");

    const imageBack = document.createElement("img");
    imageBack.src = "./src/assets/back.png";

    frontface.appendChild(imageFront);
    backface.appendChild(imageBack);
    li.append(frontface, backface);

    return li;
}

function cardClick() {
    const cards = document.querySelectorAll(".card");
    let arrayCardsTurned = [];
    cards.forEach(card => {
        card.addEventListener("click", ()=> {
            const backface = card.querySelector(".back-face");
            const frontface = card.querySelector(".front-face");
            if(frontface.classList.contains("hidden")) {
                backface.classList.add("hidden");
                backface.classList.remove("face");
                frontface.classList.remove("hidden");
                frontface.classList.add("face"); 
                arrayCardsTurned.push(backface);
            } 
           
            let faces = Array.from(document.querySelectorAll(".front-face.face > img"));
            
            if(faces.length % 2 == 0) { 
                if(faces[0] != faces[1]) {   
                    console.log(faces[0], faces[1]);
                    setTimeout(() => {
                        faces[0].parentNode.classList.add("hidden");
                        faces[1].parentNode.classList.add("hidden");
                        faces[0].parentNode.classList.remove("face");
                        faces[1].parentNode.classList.remove("face");
                        arrayCardsTurned[0].classList.remove("hidden");
                        arrayCardsTurned[1].classList.remove("hidden");
                        faces = [];
                        arrayCardsTurned = [];
                    }, 1000);
                }
            }    
            plays++;
            endGame();
        })
    })
}

function endGame() {
    const back = document.querySelectorAll(".back-face.hidden")
    console.log(back);
    const message = `
    Você ganhou em ${plays} jogadas!
    `
    if(back.length == quantity) {
        alert(message);
    }
}

cardsDistribution();