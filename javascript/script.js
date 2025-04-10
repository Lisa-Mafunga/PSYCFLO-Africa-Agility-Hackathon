// active menu navigation

document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = window.location.pathname.split("/").pop(); // Get current page
    const navLinks = document.querySelectorAll(".nav-link a");

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("active"); // Add active class
        }
    });
});

// hero carousel

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-img');

    let index = 0;
    const totalSlides = images.length;

    function nextSlide() {
        index = (index + 1) % totalSlides;
        if (carousel) {
            carousel.style.transform = `translateX(${-index * 50}%)`;
        }
    }

    // Auto-slide every 3 seconds
    setInterval(nextSlide, 3000);

    // go back arrow
    function goBack() {
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = '../index.html'; // Fallback if no history
        }
    }
});

// menu

document.getElementById("hamburger").addEventListener("click", function () {
    document.getElementById("nav").classList.toggle("active");
});

// chatbot

const input = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');
const voiceBtn = document.getElementById('voice-btn');
const sendBtn = document.getElementById('send-btn');

// Add message: user or bot
function addMessage(content, sender = 'user') {
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', sender);

    if (Array.isArray(content)) {
        const list = document.createElement('ul');
        content.forEach((item, index) => {
            setTimeout(() => {
                const li = document.createElement('li');
                li.textContent = item;
                li.style.animation = 'fadeInUp 0.4s ease forwards';
                list.appendChild(li);
            }, index * 300); // delay each line
        });
        msgElement.appendChild(list);
    } else {
        msgElement.textContent = content;
    }

    chatBox.appendChild(msgElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message
function sendMessage() {
    const message = input.value.trim();
    if (message) {
      addMessage(message, 'user');
      input.value = '';
  
      // Add typing indicator
      const typing = document.createElement('div');
      typing.id = 'typing-indicator';
      typing.className = 'typing-indicator';
      typing.innerHTML = 'Bot is typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
      chatBox.appendChild(typing);
      chatBox.scrollTop = chatBox.scrollHeight;
  
      // Simulate delay, remove typing, then show bot message
      setTimeout(() => {
        typing.remove();
  
        const botReplyList = getBotResponse(message);
        addMessage(botReplyList, 'bot');
      }, 1500);
    }  
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Voice recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    voiceBtn.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
    };
} else {
    voiceBtn.disabled = true;
    voiceBtn.title = 'Speech not supported';
}

// Your bot response logic
function getBotResponse(userMsg) {
    const msg = userMsg.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
        return [
            "Hey there! 👋",
            "How can I help you today?",
            "You can ask me about mental health, coping with stress."
        ];
    }

    if (msg.includes("I'm feeling stressed") || msg.includes("How can I reduce stress it")) {
        return [
            "I'm so sorry to hear that you're feeling stressed. Here are some tips to help:",
            "- Deep breathing exercises",
            "- Physical activity (e.g., walking, yoga)",
            "- Mindfulness meditation",
            "- Relaxing hobbies (e.g., reading, listening to music)",
            "- Take care of yourself."
        ];
    }

    if (
        msg.includes("mental health") ||
        msg.includes("stress") ||
        msg.includes("depressed") ||
        msg.includes("sad") ||
        msg.includes("anxiety") ||
        msg.includes("lonely") ||
        msg.includes("tired")
    ) {
        return [
            "I'm really sorry you're feeling this way 💙",
            "You're not alone — many people go through tough times.",
            "Here are a few things you can try:",
            "1. Talk to someone you trust.",
            "2. Take a walk or get fresh air.",
            "3. Try journaling your thoughts.",
            "4. Reach out to a professional if it's too much to handle.",
            "Remember: you're valuable, and your feelings matter. 🌟"
        ];
    }

    if (msg.includes("thank") || msg.includes("thanks")) {
        return [
            "You're very welcome! 😊",
            "Any other questions? I’m here to help!"
        ];
    }
}
