const teachersUrl =
  "https://ieat-web-30e04-default-rtdb.firebaseio.com/teachers.json";

const teacherRegisterFormElement = document.getElementById(
  "registerTeacherForm"
);

teacherRegisterFormElement.addEventListener("submit", (event) => {
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
    dataNascimento: inputs[5].value,
    genero: inputs[6].value,
    estadoCivil: inputs[7].value,
    temDeficiencia: inputs[8].checked,
    formacao: inputs[10].value,
    cargo: inputs[11].value,
    password: inputs[12].value,
  };

  fetch(teachersUrl, {
    method: "POST",
    body: JSON.stringify(newUser),
  }).then(() => alert("Registrado!"));
});
