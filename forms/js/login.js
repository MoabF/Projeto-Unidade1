const studentsUrl =
  "https://ieat-web-30e04-default-rtdb.firebaseio.com/students.json";
const teachersUrl =
  "https://ieat-web-30e04-default-rtdb.firebaseio.com/teachers.json";

const loginFormElement = document.getElementById("loginForm");
const loggedinElement = document.getElementById("loggedin");

document.addEventListener("DOMContentLoaded", () => {
  const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("userEmail");
  const aulaLinkElement = document.getElementById("aulaLink");

  if (userId) {
    loginFormElement.hidden = true;
    loggedinElement.style.display = "block";
    loggedinElement.firstElementChild.textContent += ` (${userEmail})`;
    loggedinElement.children[1].addEventListener("click", () => {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userType");
      location.reload();
    });
    aulaLinkElement.style.display = "block";
  }
});

loginFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  Promise.all([fetch(studentsUrl), fetch(teachersUrl)]).then(
    async ([res1, res2]) => {
      if (!res1.ok || !res2.ok) {
        throw new Error("Resposta de rede não foi ok");
      }

      const students = await res1.json();
      const teachers = await res2.json();

      const studentsList = Object.entries(students);
      const teachersList = Object.entries(teachers);

      let user;
      let userType = "student";

      user = studentsList.find(
        ([_, student]) =>
          student.email === email && student.password === password
      );

      if (!user) {
        userType = "teacher";

        user = teachersList.find(
          ([_, teacher]) =>
            teacher.email === email && teacher.password === password
        );
      }

      if (!user) {
        window.alert("E-mail e/ou senha incorretos.");
        return;
      }

      alert("Autenticado com sucesso!");

      sessionStorage.setItem("userId", `${user[0]}`);
      sessionStorage.setItem("userEmail", `${user[1].email}`);
      sessionStorage.setItem("userName", `${user[1].nome}`);
      sessionStorage.setItem("userType", userType);
      location.reload();
    }
  );
});
