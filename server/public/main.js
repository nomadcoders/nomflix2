const socket = io("/"),
  messageForm = document.querySelector(".js-messageForm"),
  messageInput = messageForm.querySelector("input"),
  nicknameForm = document.querySelector(".js-nicknameForm"),
  nicknameInput = nicknameForm.querySelector("input"),
  messages = document.querySelector("ul");

messages.scrollTop = messages.scrollHeight;

const NICKNAME = "nickName";
let nickName = localStorage.getItem(NICKNAME);

if (nickName) {
  messageForm.style.display = "block";
} else {
  nicknameForm.style.display = "block";
}

const addMessage = (text, mine) => {
  const message = document.createElement("li");
  message.innerHTML = text;
  message.classList.add(mine ? "mine" : "yours");
  messages.appendChild(message);
};

const getHistory = () => {
  fetch("/messages")
    .then(response => response.json())
    .then(data => {
      const { messages } = data;
      messages.forEach(message =>
        addMessage(
          `${message.creator}: ${message.message}`,
          message.creator === nickName
        )
      );
    });
};

const handleSubmit = event => {
  event.preventDefault();
  const message = messageInput.value;
  socket.emit("new message sent", {
    message,
    creator: nickName
  });
  messageInput.value = "";
  addMessage(`${nickName}: ${message}`, true);
  messages.scrollTop = messages.scrollHeight;
};

const handleNicknameSubmit = event => {
  event.preventDefault();
  const nickNameFromInput = nicknameInput.value;
  localStorage.setItem(NICKNAME, nickNameFromInput);
  nickName = nickNameFromInput;
  nicknameInput.value = "";
  nicknameForm.style.display = "none";
  messageForm.style.display = "block";
};

socket.on("notification", data => {
  const { message, creator } = data;
  addMessage(`${creator}: ${message}`, false);
  messages.scrollTop = messages.scrollHeight;
});

getHistory();
messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit);
