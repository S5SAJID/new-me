import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '../../index.mjs';

const chatMessages = document.querySelector('.chat-messages');
const chatForm = document.querySelector('form.chat-input');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');
const chatContainer = document.querySelector('dialog');
const botBtn = document.querySelector('.bot');
const spinningCircle = document.querySelector(".bot .circle");

// Is Model Open or not
let show = false;
let initiated = false;

let history = []

chatContainer.close()

class ChatBot {
    apiKey = "AIzaSyCiK4kVczd6eITCGSa14bjioNg_FQS9qCU";
    genAI = new GoogleGenerativeAI(this.apiKey);
    model = null;

    chatSession = null;
    generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };
    history = []
    constructor() {
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `
                You are a helpful chatbot. 
                your reply should be short if neccesary.
                your reply will not be in markdown.
                your reply will be only in plain text.
                your name is "S5 Bot".
                if anybody asked you who is your developer. you will not say google. instead you will say "Sajidullah known as S5SAJID".
                Your reply should contain emojis.

                This is info about your developer.
                "👨‍💻 Sajid Ullah (S5SAJID)
                I am a passionate and skilled Web & Mobile Developer with over 3 years of experience. My expertise lies in front-end development, particularly with React JS, as well as pure HTML, CSS, and JavaScript. I have a profound love for JavaScript and creative coding, combining both coding and designing to make beautiful art with code.
                
                🌟 Personal Information:
                Website: s5sajid.github.io
                Email: s5sajidyt@gmail.com
                Freelance: Available
                📚 Skills:
                HTML: 100%
                CSS: 90%
                JavaScript: 75%
                Flask (Backend): 78%
                React JS: 80%
                Flutter: 55%
                Python: 70%
                Next JS: 78%
                💼 Professional Experience:
                Mobile Apps Development (2022 - 2023)
                Developed cross-platform mobile apps using React Native, including projects like MySchool App, Salah Tracker, and Note Pad.
                
                Back-End Development (2020 - 2021)
                Created dynamic and RESTful APIs using Python and Flask, developed a blogging website with a proper backend and admin panel, and completed over 70+ projects including front-end, native apps, backend projects, and AI programs.
                
                Front-End Development (2020 - 2021)
                Learned and mastered front-end development through Programming Hub, obtaining certifications and honing skills in HTML, CSS, and JavaScript."
            `
        });
        this.chatSession = this.model.startChat({
            history: history
        });
    }
    async sendMessage(message) {
let totalMessage = ""
        try {
            const result = await this.chatSession.sendMessageStream(message);
            const messageBubble = addMessageBubble("bot", totalMessage);
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                totalMessage += chunkText;
                messageBubble.scrollIntoView({ behavior: "smooth" })
                messageBubble.innerHTML = totalMessage;
            }
        } catch (error) {
            alert(error)
        }
        history.push({role: "model", parts: [{text: totalMessage}]});
        chatInput.disabled = false
        chatInput.focus()
    }
}

let chatbotInstance;

botBtn.addEventListener("click", () => {
    if (!show) {
        chatContainer.show()
        chatContainer.classList.add('show')
        spinningCircle.style = 'width: 15px; height: 15px';
        chatInput.focus()
        show = true
    } else {
        spinningCircle.style = 'width: 20px; height: 20px';
        chatContainer.classList.remove("show")
        show = false
    }
})

chatForm.addEventListener("submit", e => {
    e.preventDefault()
    if (!initiated) {
        try {
            chatbotInstance = new ChatBot();
        } catch (error) {
            alert(error)
        }
    }
    const message = chatInput.value.trim();
    addMessageBubble('user', message)
    chatbotInstance.sendMessage(message);
    history.push({role: "user", parts: [{text: message}]});
    chatInput.disabled = true
    chatInput.value = ""
})

function addMessageBubble(type, message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", type == "user" ? "sent" : "received")
    messageContainer.innerHTML = `
    <div class="bubble">
        ${message}
    </div>
    `;
    chatMessages.appendChild(messageContainer)
    messageContainer.querySelector('.bubble').scrollIntoView({ behavior: "smooth" })
    return messageContainer.querySelector('.bubble')
}