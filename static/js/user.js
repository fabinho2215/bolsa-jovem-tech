
 
 
 
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
const cadastrar = express();

app.use(express.json());

const FILE = './empresas.json';

// ===== UTIL =====
function loadEmpresas() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

function saveEmpresas(empresas) {
  fs.writeFileSync(FILE, JSON.stringify(empresas, null, 2));
}

// ===== CNPJ =====
function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  return true; // simplificado (já suficiente para projeto)
}

// ===== ROTA =====
app.post('/registrar', (req, res) => {
  const {
    nomeDaEmpresa,
    cnpjDaEmpresa,
    enderecoDaEmpresa,
    numeroDaEmpresa,
    responsavelDaEmpresa
  } = req.body;

  if (
    !nomeDaEmpresa ||
    !cnpjDaEmpresa ||
    !enderecoDaEmpresa ||
    !numeroDaEmpresa ||
    !responsavelDaEmpresa
  ) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  if (!validarCNPJ(cnpjDaEmpresa)) {
    return res.status(400).json({ message: "CNPJ inválido" });
  }

  const empresas = loadEmpresas();

  empresas.push({
    id: Date.now(),
    nomeDaEmpresa,
    cnpjDaEmpresa,
    enderecoDaEmpresa,
    numeroDaEmpresa, // ✅ AGORA SALVA
    responsavelDaEmpresa
  });

  saveEmpresas(empresas);

  res.json({ message: "✅ Empresa cadastrada com sucesso!" });
});

// ===== SERVIDOR =====
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});








function cadastrarEmpresa() {
  const dados = {
    nomeDaEmpresa: document.getElementById("nomeDaEmpresa").value,
    cnpjDaEmpresa: document.getElementById("cnpjDaEmpresa").value,
    enderecoDaEmpresa: document.getElementById("enderecoDaEmpresa").value,
    numeroDaEmpresa: document.getElementById("numeroDaEmpresa").value,
    responsavelDaEmpresa: document.getElementById("responsavelDaEmpresa").value
  };

  if (
    !dados.nomeDaEmpresa ||
    !dados.cnpjDaEmpresa ||
    !dados.enderecoDaEmpresa ||
    !dados.numeroDaEmpresa ||
    !dados.responsavelDaEmpresa
  ) {
    alert("⚠️ Preencha todos os campos!");
    return;
  }

  fetch("http://localhost:3000/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
  .then(res => res.json())
  .then(resposta => {
    alert(resposta.message);
  })
  .catch(() => {
    alert("❌ Erro ao cadastrar empresa");
  });
}


