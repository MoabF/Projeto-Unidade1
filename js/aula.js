class Coment {
  constructor({ id, id_do_aluno, comentario }) {
    this.id = id;
    this.id_do_aluno = id_do_aluno;
    this.comentario = comentario;
  }
}
const moduleHeaders = document.querySelectorAll(".module h2");
const questionForm = document.getElementById("question-form");
const questionsList = document.getElementById("questions-list");
const edicao_bot = document.getElementById("edicao_bot");
const btnresposta = document.getElementById("btnresposta");
const collapseElements = document.querySelectorAll('[data-toggle="collapse"]');

const botaoeditar = document.createElement("button");
botaoeditar.setAttribute("class", "ml-1 btn btn-success");
botaoeditar.setAttribute("id", "edit");

const botaocancelar = document.createElement("button");
botaocancelar.setAttribute("class", "ml-1 btn btn-danger");
botaocancelar.setAttribute("id", "cancel");

botaoeditar.textContent = `FINALIZAR EDIÇÃO`;
botaocancelar.textContent = `CANCELAR EDIÇÃO`; /*
botaoeditar.style.backgroundImage = '../imgs/editar.png';
botaocancelar.style.backgroundImage = '../imgs/excluir.png'; */

document.addEventListener("DOMContentLoaded", function () {
  if (!sessionStorage.getItem("userId")) {
    alert("Faça login.");
    this.location.replace("forms/login.html");
  }

  Listacoments()
    .then((coments) => {
      atualizacoments(coments);
    })
    .catch((error) => {
      console.error("Houve um problema ao buscar os comentarios:", error);
    });

  collapseElements.forEach((collapseElement) => {
    collapseElement.addEventListener("click", () => {
      const target = document.querySelector(
        collapseElement.getAttribute("data-target")
      );
      const bsCollapse = new bootstrap.Collapse(target, {
        toggle: false,
      });
      bsCollapse.toggle();
    });
  });

  moduleHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      const videoList = this.nextElementSibling;
      if (
        videoList.style.display === "none" ||
        videoList.style.display === ""
      ) {
        videoList.style.display = "block";
      } else {
        videoList.style.display = "none";
      }
    });
  });

  questionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const questionText = document.getElementById("question-text").value;
    const newQuestion = document.createElement("li");
    newQuestion.className = "list-group-item";

    const posicao_buttons = document.createElement("div");
    posicao_buttons.setAttribute("class", "d-flex float-right w-25");
    const imagem_config = document.createElement("img");
    imagem_config.src = "imgs/definicoes.png";
    imagem_config.style.width = "20px";
    const imagem_editar = document.createElement("img");
    const imagem_excluir = document.createElement("img");
    imagem_editar.src = "imgs/editar.png";
    imagem_excluir.src = "imgs/excluir.png";
    imagem_editar.style.width = "20px";
    imagem_excluir.style.width = "20px";

    const config = document.createElement("button");
    config.setAttribute("class", "mt-1 btn btn-light");
    config.appendChild(imagem_config);

    const excluir = document.createElement("button");
    excluir.setAttribute("class", "mt-1 btn btn-light");
    excluir.appendChild(imagem_excluir);

    const editar = document.createElement("button");
    editar.setAttribute("class", "mt-1 btn btn-light");
    editar.appendChild(imagem_editar);

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
    let id_do_alun = 0;
    const comentList = {
      id_do_aluno: id_do_alun,
      comentario: questionText,
    };
    addComent(comentList);

    /* newQuestion.innerHTML = questionContent;
        questionsList.appendChild(newQuestion);
        newQuestion.appendChild(posicao_buttons);
        posicao_buttons.appendChild(config);
        let condicao = 0;
        config.addEventListener("click",  function(event) {
            event.preventDefault();
            if(condicao == 0){
            posicao_buttons.appendChild(editar);
            posicao_buttons.appendChild(excluir); 
            condicao = 1;
        }
            
            else{
                condicao = 0;
                posicao_buttons.removeChild(editar);
                posicao_buttons.removeChild(excluir);
            }
        });
        editar.addEventListener("click",  function(event) {
            event.preventDefault();
            if(condicao == 0){
            posicao_buttons.appendChild(editar);
            posicao_buttons.appendChild(excluir); 
            condicao = 1;
        }
            
            else{
                condicao = 0;
                posicao_buttons.removeChild(editar);
                posicao_buttons.removeChild(excluir);
            }
        });

        excluir.addEventListener("click",  function(event) {
            exclusao(comentList.id);

    });*/
    questionForm.reset();
  });

  function addComent(comentList) {
    return fetch(
      "https://comentarios-ieat-default-rtdb.firebaseio.com/coments.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comentList),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Resposta de rede não foi ok");
      }
      Listacoments()
        .then((coments) => {
          atualizacoments(coments);
        })
        .catch((error) => {
          console.error("Houve um problema ao buscar os comentarios:", error);
        });
    });
  }

  function Listacoments() {
    return fetch(
      "https://comentarios-ieat-default-rtdb.firebaseio.com/coments.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Resposta de rede não foi ok");
        }
        return response.json();
      })
      .then((coments) => {
        console.log({ coments });
        const Listcoment = [];
        for (let key in coments) {
          const coment = new Coment({
            id: key,
            id_do_aluno: coments[key].id_do_aluno,
            comentario: coments[key].comentario,
          });

          Listcoment.push(coment);
        }
        console.log({ Listcoment });
        return Listcoment;
      });
  }

  function atualizacoments(coments) {
    questionsList.innerHTML = "";

    coments.forEach((coment) => {
      const newQuestion = document.createElement("li");
      newQuestion.className = "list-group-item";

      const posicao_buttons = document.createElement("div");
      posicao_buttons.setAttribute("class", "d-flex float-right w-25");
      const imagem_config = document.createElement("img");
      imagem_config.src = "imgs/definicoes.png";
      imagem_config.style.width = "20px";
      const imagem_editar = document.createElement("img");
      const imagem_excluir = document.createElement("img");
      imagem_editar.src = "imgs/editar.png";
      imagem_excluir.src = "imgs/excluir.png";
      imagem_editar.style.width = "20px";
      imagem_excluir.style.width = "20px";

      const config = document.createElement("button");
      config.setAttribute("class", "mt-1 btn btn-light");
      config.appendChild(imagem_config);

      const excluir = document.createElement("button");
      excluir.setAttribute("class", "mt-1 btn btn-light");
      excluir.appendChild(imagem_excluir);

      const editar = document.createElement("button");
      editar.setAttribute("class", "mt-1 btn btn-light");
      editar.appendChild(imagem_editar);

      const questionContent = `
            <div class="d-flex align-items-start mb-2">
                <img src="imgs/user-icon.png" alt="User Icon" class="user-icon me-2">
                <div>
                    <h5 class="mb-1">Nome do Aluno</h5>
                    <p class="mb-1">${coment.comentario}</p>
                </div>
            </div>
            <div id = "resposta">
                <label for="answer-text-${questionsList.childElementCount}">Sua Resposta:</label>
                <textarea class="form-control mb-2" id="answer-text-${questionsList.childElementCount}" rows="2"></textarea>
                <button id = "btnresposta" class="btn btn-primary btn-sm">Enviar Resposta</button>
            </div>
        `;

      newQuestion.innerHTML = questionContent;
      questionsList.appendChild(newQuestion);
      const resposta = document.getElementById("resposta");
      newQuestion.appendChild(posicao_buttons);
      posicao_buttons.appendChild(config);
      let condicao = 0;
      config.addEventListener("click", function (event) {
        event.preventDefault();
        if (condicao == 0) {
          posicao_buttons.appendChild(editar);
          posicao_buttons.appendChild(excluir);
          condicao = 1;
        } else {
          condicao = 0;
          posicao_buttons.removeChild(editar);
          posicao_buttons.removeChild(excluir);
        }
      });
      editar.addEventListener("click", function (event) {
        edicao_bot.appendChild(botaoeditar);
        edicao_visual(coment.id);
        botaoeditar.addEventListener("click", function (event) {
          edicao(coment.id);
        });
      });
      excluir.addEventListener("click", function (event) {
        exclusao(coment.id);
      });

      questionForm.reset();
    });
  }
  btnresposta.addEventListener("click", function (event) {
    event.preventDefault();
  });

  function exclusao(comentid) {
    fetch(
      `https://comentarios-ieat-default-rtdb.firebaseio.com/coments/${comentid}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Resposta de rede não foi ok");
        }
        return Listacoments();
      })
      .then((coments) => {
        atualizacoments(coments);
        alert("Comentario excluído com sucesso!");
      })
      .catch((error) => {
        console.error("Houve um problema ao remover o comentario:", error);
      });
  }
  function edicao_visual(comentid) {
    const questionText = document.getElementById("question-text");
    fetch(
      "https://comentarios-ieat-default-rtdb.firebaseio.com/coments/${comentid}.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Resposta de rede não foi ok");
        }
        return response.json();
      })
      .then((coment) => {
        questionText.value = coment[comentid].comentario;
      });
  }
  function edicao(comentid) {
    const questionText = document.getElementById("question-text").value;
    if (!confirm("Tem certeza que deseja encerrar a edição?")) {
      return;
    }

    fetch(
      `https://comentarios-ieat-default-rtdb.firebaseio.com/coments/${comentid}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comentario: questionText }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Resposta de rede não foi ok");
        }
        return Listacoments();
      })
      .then((coments) => {
        atualizacoments(coments);
      })
      .catch((error) => {
        console.error("Houve um problema ao editar o comentario:", error);
      });
    questionForm.reset();
    alert("Edição realizada com sucesso!");
  }
});
