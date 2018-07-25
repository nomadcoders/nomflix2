const socket = io("https://warm-bullfrog-32.localtunnel.me"),
  form = document.querySelector("form"),
  input = form.querySelector("input"),
  messages = document.querySelector("ul");

const addMessage = (text, mine) => {
  const message = document.createElement("li");
  message.innerHTML = text;
  message.classList.add(mine ? "mine" : "yours");
  messages.appendChild(message);
};

const handleSubmit = event => {
  event.preventDefault();
  const message = input.value;
  socket.emit("new message sent", {
    message
  });
  input.value = "";
  addMessage(message, true);
};

socket.on("notification", data => {
  const { message } = data;
  addMessage(message, false);
});

form.addEventListener("submit", handleSubmit);
