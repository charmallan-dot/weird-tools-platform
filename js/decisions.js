// WeirdTools - Decision Makers

let wheelSegments = ['Yes', 'No', 'Maybe', 'Try Again', 'Ask Later', 'Go For It!', 'Think More', 'Trust Instincts'];
let wheelColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#a29bfe', '#fd79a8'];
let wheelRotation = 0;

function initWheel() {
    drawWheel();
}

// Coin Flip
function flipCoin() {
    const coin = document.getElementById('coin');
    const result = document.getElementById('coin-result');
    
    coin.classList.remove('flipping');
    void coin.offsetWidth; // Trigger reflow
    coin.classList.add('flipping');
    
    const isHeads = Math.random() > 0.5;
    
    setTimeout(() => {
        coin.style.transform = `rotateY(${isHeads ? 0 : 180}deg)`;
        result.textContent = isHeads ? '👑 HEADS!' : '🦅 TAILS!';
        result.style.color = isHeads ? '#ffd700' : '#c0c0c0';
    }, 3000);
}

// Dice Roll
function rollDice() {
    const dice = document.getElementById('dice');
    const result = document.getElementById('dice-result');
    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    
    dice.classList.remove('rolling');
    void dice.offsetWidth;
    dice.classList.add('rolling');
    
    let rolls = 0;
    const interval = setInterval(() => {
        dice.textContent = diceFaces[randomInt(0, 5)];
        rolls++;
        if (rolls > 10) {
            clearInterval(interval);
            const final = randomInt(1, 6);
            dice.textContent = diceFaces[final - 1];
            result.textContent = `You rolled a ${final}!`;
        }
    }, 100);
}

// Wheel of Fortune
function drawWheel() {
    const canvas = document.getElementById('wheel');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 140;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const segmentAngle = (2 * Math.PI) / wheelSegments.length;
    
    wheelSegments.forEach((segment, i) => {
        const startAngle = i * segmentAngle + wheelRotation;
        const endAngle = startAngle + segmentAngle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = wheelColors[i % wheelColors.length];
        ctx.fill();
        ctx.stroke();
        
        // Text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Inter';
        ctx.fillText(segment, radius - 10, 5);
        ctx.restore();
    });
    
    // Pointer
    ctx.beginPath();
    ctx.moveTo(centerX + radius + 10, centerY);
    ctx.lineTo(centerX + radius - 10, centerY - 10);
    ctx.lineTo(centerX + radius - 10, centerY + 10);
    ctx.closePath();
    ctx.fillStyle = '#ff0000';
    ctx.fill();
}

function spinWheel() {
    const result = document.getElementById('wheel-result');
    const spins = randomInt(5, 10);
    const spinAngle = (spins * 2 * Math.PI) + (Math.random() * 2 * Math.PI);
    
    let currentRotation = 0;
    const duration = 3000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out
        const ease = 1 - Math.pow(1 - progress, 3);
        currentRotation = wheelRotation + spinAngle * ease;
        
        wheelRotation = currentRotation;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Calculate result
            const normalizedRotation = currentRotation % (2 * Math.PI);
            const segmentIndex = Math.floor(((2 * Math.PI - normalizedRotation) / (2 * Math.PI)) * wheelSegments.length) % wheelSegments.length;
            result.textContent = `🎯 ${wheelSegments[segmentIndex]}`;
            result.style.color = wheelColors[segmentIndex];
        }
    }
    
    animate();
}

// AI Advisor
function getAIAdvice() {
    const input = document.getElementById('decision-input');
    const result = document.getElementById('ai-advice');
    
    if (!input.value.trim()) {
        result.textContent = 'Please enter your dilemma!';
        return;
    }
    
    const advices = [
        "🔮 The stars suggest: Go with your gut feeling.",
        "🎯 My analysis: The data points to 'yes'.",
        "🤔 Hmm... Have you considered doing nothing?",
        "✨ Trust the process. Everything happens for a reason.",
        "⚡ Bold move? I like it. Do it!",
        "🌙 Sleep on it. Big decisions need rest.",
        "🎲 Flip a coin. Your reaction will tell you what you want.",
        "💡 Ask yourself: What would your future self advise?",
        "🚀 When in doubt, choose the adventure.",
        "🧘 The answer is already within you. Meditate on it.",
        "📊 Pros vs Cons: Make a list. The longer side wins.",
        "🎭 What would your hero do in this situation?",
        "⏰ Will this matter in 5 years? If not, don't stress.",
        "🌈 Choose the option that makes you more kind.",
        "🔥 Feel the fear and do it anyway.",
        "🎪 Life's too short for maybe. Commit or move on.",
        "🌟 The universe is conspiring in your favor.",
        "🧭 Your compass points to growth. Follow it.",
        "💫 Sometimes the wrong turn leads to the right place.",
        "🎨 Create your own luck. Take the leap."
    ];
    
    result.textContent = randomChoice(advices);
}

// Random Number Generator
function generateRandomNumber() {
    const min = parseInt(document.getElementById('min-num').value) || 1;
    const max = parseInt(document.getElementById('max-num').value) || 100;
    const result = document.getElementById('random-number');
    
    if (min >= max) {
        result.textContent = 'Min must be less than Max!';
        return;
    }
    
    const num = randomInt(min, max);
    result.textContent = `🎲 ${num}`;
    result.style.fontSize = '2rem';
    result.style.fontWeight = 'bold';
}

// Yes/No/Maybe
function getYesNoMaybe() {
    const result = document.getElementById('ynm-result');
    const options = ['✅ YES', '❌ NO', '🤷 MAYBE', '🔮 ASK AGAIN', '⭐ DEFINITELY', '🚫 NEVER'];
    const choice = randomChoice(options);
    
    result.textContent = choice;
    result.style.color = choice.includes('YES') ? '#00d26a' : 
                         choice.includes('NO') ? '#ff4757' : 
                         choice.includes('MAYBE') ? '#ffc107' : '#667eea';
}

// Utility
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
