/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const selected_answers = {}; //lista delle risposte scelte
const boxes = document.querySelectorAll('.choice-grid div'); //lista delle risposte
const result = document.querySelector('#result');

function reset_quiz(event){
    result.classList.add('hidden'); //nascondo risultato
    delete selected_answers.one;//tolgo dalal lista le risposte precedenti
    delete selected_answers.two;
    delete selected_answers.three;
    for(const box of boxes){
        box.addEventListener('click',on_click);//permetto di selezionare di nuovo le risposte
        box.classList.remove('opacity');//tolgo opacità
        box.querySelector(".checkbox").src='./images/unchecked.png';//metto a tutte le immagini la spunta unchecked
        box.classList.remove('selected'); //tolgo lo stile da imagine selezionata
    }
}

//sceglie il risultato in base alle risposte
function choose_result(){
    if(selected_answers['one']===selected_answers['two'] || selected_answers['one']===selected_answers['three'])
      return selected_answers['one']
    if(selected_answers['two']===selected_answers['one'] || selected_answers['two']===selected_answers['three'])
       return selected_answers['two'];
    if(selected_answers['three']===selected_answers['one'] || selected_answers['three']===selected_answers['two'])
       return selected_answers['three'];
    return selected_answers['one'];   
  }


function insert_value(select){
    selected_answers[select.dataset.questionId]=select.dataset.choiceId; //inserisco nella lista delle risposte la risposta
    //console.log(selected_answers);
    let i=0;
    for(let key in selected_answers)
        i++;
    //console.log(i)
    if(i==3){
        for(const box of boxes){
            box.removeEventListener('click',on_click); //dopo che si è risposto a tutto le risposte non possone essere cambiate
        }
        //console.log('finito');
        const answers_result = choose_result();
        //console.log(answers_result);
        const title=RESULTS_MAP[answers_result].title;
        const contents=RESULTS_MAP[answers_result].contents;
        //console.log(title);
        //console.log(contents);
        result.querySelector("h1").textContent=title;
        result.querySelector("p").textContent=contents;
        result.classList.remove('hidden');
        //reset quiz
        const button=document.querySelector('#button');
        button.addEventListener('click',reset_quiz);
    }
}


function opacity(select){
    const selected_answer = select.dataset.choiceId; //salvo id della ripsosta selezionata
    const answers=select.parentNode.querySelectorAll('div'); //seleziono tutti i div
    for (const unselected_answer of answers){ //scorro i div e aggiungo opacità e in caso tolgo aspetto delle rispsote selezionate
        if (unselected_answer.dataset.choiceId!==selected_answer) {
            unselected_answer.classList.add('opacity');
            unselected_answer.querySelector(".checkbox").src='./images/unchecked.png';
            unselected_answer.classList.remove('selected')
        }
    }
}

function on_click(event){
    const select = event.currentTarget;
    select.classList.add('selected'); //imposto classe selected
    select.classList.remove('opacity'); //se si cambia la risposta
    select.querySelector('.checkbox').src = './images/checked.png'
    opacity(select); //rendo opache le risposte non selezionate
    insert_value(select);
}

for(const box of boxes){
  box.addEventListener('click',on_click);
}
