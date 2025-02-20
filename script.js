document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    darkModeToggle.addEventListener("change", () => {
        body.classList.toggle("dark-mode", darkModeToggle.checked);
        localStorage.setItem("darkMode", darkModeToggle.checked);
    });

    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "true") {
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    // Section Switching
    function showSection(sectionId) {
        document.querySelectorAll(".section").forEach(section => {
            section.classList.add("hidden");
        });
        document.getElementById(sectionId).classList.remove("hidden");
    }
    window.showSection = showSection;

    // Chatbot Functionality
    async function sendMessage() {
        const userInput = document.getElementById("user-input").value;
        if (!userInput) return;
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

        const response = await fetch("https://your-backend-url.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
        document.getElementById("user-input").value = "";
    }
    window.sendMessage = sendMessage;

    // Image Generation
    async function generateImage() {
        const prompt = document.getElementById("image-prompt").value;
        if (!prompt) return;
        const response = await fetch("https://your-backend-url.onrender.com/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        document.getElementById("image-result").innerHTML = `<img src="${data.url}" alt="Generated Image">`;
    }
    window.generateImage = generateImage;

    // Video Generation
    async function generateVideo() {
        const prompt = document.getElementById("video-prompt").value;
        if (!prompt) return;
        const response = await fetch("https://your-backend-url.onrender.com/video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        document.getElementById("video-result").innerHTML = `<video controls><source src="${data.url}" type="video/mp4"></video>`;
    }
    window.generateVideo = generateVideo;

    // Essay Generation
    async function generateEssay() {
        const prompt = document.getElementById("essay-prompt").value;
        if (!prompt) return;
        const response = await fetch("https://your-backend-url.onrender.com/essay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        document.getElementById("essay-result").innerText = data.text;
    }
    window.generateEssay = generateEssay;
});

