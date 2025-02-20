// JavaScript for AI Chatbot and Image Generation
const API_KEY = "YOUR_OPENAI_API_KEY";

// Function to handle chatbot messages
async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user message
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }]
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Display bot response
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
    document.getElementById("user-input").value = ""; // Clear input field
}

// Function to generate images
async function generateImage() {
    const prompt = document.getElementById("image-prompt").value;
    if (!prompt) return;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "512x512"
        })
    });

    const data = await response.json();
    const imageUrl = data.data[0].url;

    // Display image result
    document.getElementById("image-result").innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
}

// Function to generate videos (Placeholder for future implementation)
async function generateVideo() {
    alert("Video generation is not yet implemented.");
}
