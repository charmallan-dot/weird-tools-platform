// WeirdTools - Main JavaScript

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.section).classList.add('active');
    });
});

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function showPremium() {
    document.getElementById('premium-modal').classList.remove('hidden');
}

function showAPI() {
    document.getElementById('api-modal').classList.remove('hidden');
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.add('hidden');
    }
}

// Initialize all tools
document.addEventListener('DOMContentLoaded', () => {
    initTimeTools();
    initWheel();
    initParticles();
    initZoom();
    initMoire();
    loadHabits();
    loadDailyChallenge();
    
    // Password length display
    document.getElementById('pass-length').addEventListener('input', (e) => {
        document.getElementById('pass-length-val').textContent = e.target.value;
    });
});

// Utility functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Save/Load from localStorage
function saveToStorage(key, data) {
    localStorage.setItem(`weirdtools_${key}`, JSON.stringify(data));
}

function loadFromStorage(key) {
    const data = localStorage.getItem(`weirdtools_${key}`);
    return data ? JSON.parse(data) : null;
}

console.log('🌀 WeirdTools loaded! Ready to get weird.');
