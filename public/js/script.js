let mensagens = [];

fetch("http://localhost:3000/mensagens")
  .then((response) => response.json())
  .then((data) => {
    mensagens = data;
    const chatList = document.getElementById("chatList");
    chatList.innerHTML = "";
    const conversas = [...new Set(data.map((msg) => msg.nome))];
    conversas.forEach((nome) => {
      const li = document.createElement("li");
      li.innerText = nome;
      li.onclick = () => openChat(nome);
      chatList.appendChild(li);
    });
  });

function inserirMensagem(msg) {
  const message = document.createElement("div");
  message.classList.add("message-container");
  if (msg.tipo === "enviada") {
    message.classList.add("message-send");
  } else {
    message.classList.add("message-receive");
  }

  const div = document.createElement("div");
  div.className = "message";
  div.innerText = `${msg.hora} - ${msg.mensagem}`;
  message.appendChild(div);
  document.getElementById("messages").appendChild(message);
}

let currentChat = "";

function openChat(name) {
  currentChat = name;
  document.getElementById("chatHeader").innerText = name;
  document.getElementById("messages").innerHTML = "";
  mensagens
    .filter((msg) => msg.nome === name)
    .forEach((msg) => inserirMensagem(msg));
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const message = input.value.trim();
  if (!message) return;

  const hora = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  inserirMensagem({
    mensagem: message,
    hora: hora,
    tipo: "enviada",
  });


  input.value = "";

  const msgContainer = document.getElementById("messages");
  msgContainer.scrollTop = msgContainer.scrollHeight;

  fetch("http://localhost:3000/mensagens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: currentChat,
      mensagem: message,
      hora: hora,
      tipo: "enviada",
    }),
  });
}
