
// contains the flipped cards
let active = [];

//Event Listener just to start the game.
document.querySelector('.submit').addEventListener('click',()=>{
        let levelChoice = Number(document.querySelector('#level').value);
        startGame(levelChoice);
});

document.querySelector('.restart').addEventListener('click',()=>{
    document.querySelector('.end-game').style.visibility = 'hidden';
    document.querySelector('.overlay').style.visibility = 'visible';
});

//Event listener for all clicks inside the container and flip cards on click.
document.querySelector('.container').addEventListener('click',(event)=>{

        if(event.target.classList.contains('front-img')){
            setTimeout(()=>{ event.target.parentNode.classList.toggle('flipflap');},200)
            active.push(event.target.parentNode);
            checkMatch(active);
        }
     
        
});

//Checks if card matchs or not, if yes it keeps them fliped, otherwise it flips them back.
function checkMatch(arr) {
    if(arr.length == 2){
        setTimeout(()=>{
            if(arr[0].type == arr[1].type){
                arr.forEach(cur=>{cur.classList.add('done');});  
                    console.log('Match!!!');
                        endGame();
            }
            arr.forEach(cur=>{cur.classList.toggle('flipflap');});
                active = [];
        },800);
    }

}

function startGame(choice){
    document.querySelector('.overlay').style.visibility = 'hidden';
    createBoard(choice);
}

//Function that creates the board according to the size the player can choose from an overlay droplist.
function createBoard(num){
    let j = 0;
    let newHtml = `<div class="inner-div"><img src="imgs/front.png" alt="" class="front-img"><img src="imgs/%picNum%.png" alt="" class="back-img"></div>`;

        for(let i = 0; i < num; i++){
            (i % 2 == 0) ? j++ : j = j;
            document.querySelector('.container').insertAdjacentHTML('beforeend', newHtml.replace('%picNum%',j));
        }
        
    const allCards = [...document.querySelectorAll('.inner-div')];
    const typeNames = ['karam','wagde','alaa','firefix','chrome','mario','batman','fox','gru','yoda','stormtrooper','angrybird','snorlax','dog','flappybird','cat'];
    
    
        shuffleCards(allCards,typeNames);

}

// Shuffles the cards order, adds type to the elements prototype that includes specific name from "typeNames".
function shuffleCards(cards,checkNames){
    let j = 0;
        cards.forEach((card, index) => {
            let random = Math.floor(Math.random() * 12);

              card.style.order = random;
                 (index % 2 == 0) ? j++ : j = j;
                     card.type = checkNames[j];
        });  
}

function endGame(){
    let cards = [...document.querySelectorAll('.done')];
    let levelChoice = Number(document.querySelector('#level').value);

        if(cards.length == levelChoice){
            document.querySelector('.end-game').style.visibility = 'visible';
            document.querySelector('.container').innerHTML = '';
        }
};