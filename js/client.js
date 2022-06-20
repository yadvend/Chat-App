
const socket = io.connect('http://localhost:8000', {reconnect: true});

// get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// audio that will play on receiving messages
var audio = new Audio('ting1.mp3');

// func which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }

}

// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// If a new user joins, receive his name from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, `right`);
});

//If server sends a msg receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, `left`);
});

//If a user leaves the chat, append the info to the container
socket.on('left', name =>{
    append(`${name} left the chat`, `right`);
});

// If the form get submitted, send server the msg
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value= '';
})






