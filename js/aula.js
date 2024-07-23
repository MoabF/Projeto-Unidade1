class Coment {
    constructor({id, comentario, respostas = []}) {
        this.id = id;
        this.comentario = comentario;
        this.respostas = respostas;
    }
}
const moduleHeaders = document.querySelectorAll(".module h2");
const questionForm = document.getElementById("question-form");
const questionsList = document.getElementById("questions-list");
const btnresposta = document.getElementById("btnresposta");
const collapseElements = document.querySelectorAll('[data-toggle="collapse"]');

document.addEventListener("DOMContentLoaded", function() {    
    Listacoments()
    .then(coments => {
        atualizacoments(coments);
    })
    .catch(error => {
        console.error('Houve um problema ao buscar os contatos:', error);
    });

    collapseElements.forEach(collapseElement => {
      collapseElement.addEventListener('click', () => {
        const target = document.querySelector(collapseElement.getAttribute('data-target'));
        const bsCollapse = new bootstrap.Collapse(target, {
          toggle: false
        });
        bsCollapse.toggle();
      });
    });

    moduleHeaders.forEach(function(header) {
        header.addEventListener("click", function() {
            const videoList = this.nextElementSibling;
            if (videoList.style.display === "none" || videoList.style.display === "") {
                videoList.style.display = "block";
            } else {
                videoList.style.display = "none";
            }
        });
    });


    questionForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const questionText = document.getElementById("question-text").value;
        const newQuestion = document.createElement("li");
        newQuestion.className = "list-group-item";

        const questionContent = `
            <div class="d-flex align-items-start mb-2">
                <img src="imgs/user-icon.png" alt="User Icon" class="user-icon me-2">
                <div>
                    <h5 class="mb-1">Nome do Aluno</h5>
                    <p class="mb-1">${questionText}</p>
                </div>
            </div>
            <div>
                <label for="answer-text-${questionsList.childElementCount}">Sua Resposta:</label>
                <textarea class="form-control mb-2" id="answer-text-${questionsList.childElementCount}" rows="2"></textarea>
                <button id = "btnresposta" class="btn btn-primary btn-sm">Enviar Resposta</button>
            </div>
        `;
        let id_do_aluno = 0;
        const comentList = {
            id: id_do_aluno,
            comentario: questionText,
        };
        addComent(comentList);

        newQuestion.innerHTML = questionContent;
        questionsList.appendChild(newQuestion);
        questionForm.reset();
    });
});

function addComent(comentList) {
    return fetch('https://comentarios-ieat-default-rtdb.firebaseio.com/coments.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comentList),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            }
        });
}

function Listacoments() {
    return fetch('https://comentarios-ieat-default-rtdb.firebaseio.com/coments.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Resposta de rede não foi ok');
            }
            return response.json();
        })
        .then(coments => {
            const Listcoment = [];
            for (let key in coments) {
                const coment = new Coment({
                    id: coments[key].id, 
                    comentario: coments[key].comentario,
                }
                );

                Listcoment.push(coment);
            }
            return Listcoment;
        });
}


// Função para renderizar contatos na página
function atualizacoments(coments) {
    questionsList.innerHTML = ''; // Limpa os contatos existentes

    coments.forEach(coment => {
        const newQuestion = document.createElement("li");
        newQuestion.className = "list-group-item";

        const questionContent = `
            <div class="d-flex align-items-start mb-2">
                <img src="imgs/user-icon.png" alt="User Icon" class="user-icon me-2">
                <div>
                    <h5 class="mb-1">Nome do Aluno</h5>
                    <p class="mb-1">${coment.comentario}</p>
                </div>
            </div>
            <div>
                <label for="answer-text-${questionsList.childElementCount}">Sua Resposta:</label>
                <textarea class="form-control mb-2" id="answer-text-${questionsList.childElementCount}" rows="2"></textarea>
                <button id = "btnresposta" class="btn btn-primary btn-sm">Enviar Resposta</button>
            </div>
        `;
        
        newQuestion.innerHTML = questionContent;
        questionsList.appendChild(newQuestion);
    });
}
btnresposta.addEventListener("click",  function(event) {
    event.preventDefault();
    
});

