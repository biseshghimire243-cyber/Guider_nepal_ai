const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const suggestions = document.querySelectorAll(".suggestion");


function addMessage(message, type) {

    const messageElement = document.createElement("div");

    messageElement.className = `message ${type}`;

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function showTyping() {

    const typingElement = document.createElement("div");

    typingElement.className = "message ai typing";
    typingElement.id = "typingMessage";

    typingElement.textContent = "Guider Nepal AI is thinking...";

    chatMessages.appendChild(typingElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function removeTyping() {

    const typingMessage =
        document.getElementById("typingMessage");

    if (typingMessage) {
        typingMessage.remove();
    }
}


async function sendMessage(message) {

    if (!message.trim()) {
        return;
    }

    addMessage(message, "user");

    messageInput.value = "";

    sendButton.disabled = true;

    showTyping();

    try {

        const response = await fetch("/api/ai-guide", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        const data = await response.json();

        removeTyping();


        if (data.success) {

            addMessage(
                data.reply,
                "ai"
            );

        } else {

            addMessage(
                data.message || "Sorry, something went wrong.",
                "ai"
            );

        }

    } catch (error) {

        removeTyping();

        addMessage(
            "I couldn't connect to the travel assistant. Please make sure the Flask server is running.",
            "ai"
        );

        console.error(error);

    } finally {

        sendButton.disabled = false;

        messageInput.focus();
    }
}


chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    sendMessage(messageInput.value);

});


suggestions.forEach(button => {

    button.addEventListener("click", function() {

        const question =
            this.dataset.question;

        sendMessage(question);

    });

});