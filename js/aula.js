document.addEventListener("DOMContentLoaded", function() {
    const moduleHeaders = document.querySelectorAll(".module h2");
    const questionForm = document.getElementById("question-form");
    const questionsList = document.getElementById("questions-list");


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
                <button class="btn btn-primary btn-sm">Enviar Resposta</button>
            </div>
        `;

        newQuestion.innerHTML = questionContent;
        questionsList.appendChild(newQuestion);
        questionForm.reset();
    });
});
