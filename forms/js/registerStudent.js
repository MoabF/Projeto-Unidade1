const studentsUrl =
  "https://ieat-web-30e04-default-rtdb.firebaseio.com/students.json";

const studentRegisterFormElement = document.getElementById(
  "registerStudentForm"
);

studentRegisterFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputs = Object.values(event.target);

  if (inputs[12].value !== inputs[13].value) {
    alert("Senhas não coincidem.");
    return;
  }

  const newUser = {
    nome: inputs[0].value,
    email: inputs[1].value,
    tel1: inputs[2].value,
    tel2: inputs[3].value,
    cpf: inputs[4].value,
    rg: inputs[5].value,
    dataNascimento: inputs[6].value,
    genero: inputs[7].value,
    ehEspecial: inputs[8].checked,
    requerAtendimentoEspecial: inputs[10].checked,
    password: inputs[12].value,
  };

  fetch(studentsUrl, {
    method: "POST",
    body: JSON.stringify(newUser),
  }).then(() => alert("Registrado!"));
});
