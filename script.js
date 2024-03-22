document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    sendButton.addEventListener("click", function() {
        const userMessage = userInput.value;
        if (userMessage.trim() === "") return;

        appendMessage("You", userMessage);
        userInput.value = "";

        fetchMessage(userMessage)
            .then(response => response.json())
            .then(data => {
                const botMessage = data.choices[0].text.trim();
                appendMessage("Bot", botMessage);
            })
            .catch(error => console.error("Error fetching message:", error));
    });

    function fetchMessage(message) {
        return fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "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" // Replace with your ChatGPT API key
            },
            body: JSON.stringify({
                model: "text-davinci-002", // You can use other models if you prefer
                prompt: message,
                max_tokens: 50
            })
        });
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
