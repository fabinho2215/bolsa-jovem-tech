
 
 
 
 var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })


  // 🔒 Datas bloqueadas (Natal e Ano Novo)
  const datasBloqueadas = ["2025-12-25", "2025-12-31"];

  const ocupados = [
    { espaco: "auditorio", data: "2025-12-20", hora: "14:00" },
    { espaco: "sala1", data: "2025-12-21", hora: "10:00" },
    { espaco: "sala2", data: "2025-12-22", hora: "15:00" },
    { espaco: "coworking", data: "2025-12-23", hora: "09:00" }
  ];

  const dataInput = document.getElementById("data");

  // 🚫 Bloquear datas no momento da escolha
  dataInput.addEventListener("change", () => {
    if (datasBloqueadas.includes(dataInput.value)) {
      alert("❌ Data indisponível: Natal ou Ano Novo.");
      dataInput.value = "";
    }
  });

  function verificar() {
    const espaco = document.getElementById("espaco").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const tipo = document.getElementById("tipoEvento").value;
    const resultado = document.getElementById("resultado");
    const reservarBtn = document.getElementById("reservarBtn");

    if (!espaco || !data || !hora || !tipo) {
      alert("⚠️ Por favor, preencha todos os campos.");
      return;
    }

    if (datasBloqueadas.includes(data)) {
      resultado.innerHTML = "❌ Data bloqueada (feriado).";
      resultado.style.color = "red";
      reservarBtn.style.display = "none";
      return;
    }

    const ocupado = ocupados.some(o =>
      o.espaco === espaco &&
      o.data === data &&
      o.hora === hora
    );

    const nomes = {
      auditorio: "Auditorio Inovatech",
      sala1: "Sala Alan Turning",
      sala2: "sala Ala Lovelace",
      coworking: "Connect Hub"
    };

    if (ocupado) {
      resultado.innerHTML = `❌ ${nomes[espaco]} indisponível às ${hora}`;
      resultado.style.color = "red";
      reservarBtn.style.display = "none";
    } else {
      resultado.innerHTML = `✅ ${nomes[espaco]} disponível às ${hora}`;
      resultado.style.color = "green";
      reservarBtn.style.display = "block";
    }
  }

  function reservar() {
    alert("✅ Reserva realizada com sucesso!");
  }


  function validarFormulario() {
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const nome = document.getElementById("nome").value;

  if (!data || !hora || !nome) {
    alert("⚠️ Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Se tudo estiver preenchido
  alert("✅ Formulário enviado com sucesso!");
}

function salvarLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {
        alert("Preencha email e senha!");
        return;
    }

    // Objeto JSON
    const login = {
        email: email,
        senha: senha
    };

    // Salvando no localStorage
    localStorage.setItem("loginUsuario", JSON.stringify(login));

    // Redireciona após salvar
    window.location.href = "salas.html";
}

function salvarCadastro() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (!email || !senha || !confirmarSenha) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Busca usuários existentes ou cria lista vazia
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se já existe
    const existe = usuarios.find(u => u.email === email);
    if (existe) {
        alert("Usuário já cadastrado!");
        return;
    }

    // Salva novo usuário
    usuarios.push({ email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}

function fazerLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(
        u => u.email === email && u.senha === senha
    );

    if (!usuarioValido) {
        alert("Email ou senha inválidos!");
        return;
    }

    // Salva sessão
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

    window.location.href = "salas.html";
}






const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const USERS_FILE = './users.json';

// Ler usuários
function loadUsers() {
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Salvar usuários
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const users = loadUsers();

  users.push({
    username,
    password: hashedPassword
  });

  saveUsers(users);
  res.json({ message: 'Usuário cadastrado' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


app.post('/register', (req, res) => {
  const { Nomedaempresa, cnpjdaempresa } = req.body;

  const users = loadUsers();

  users.push({
    username,
    password: hashedPassword
  });

  saveUsers(users);
  res.json({ message: 'Usuário cadastrado' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});