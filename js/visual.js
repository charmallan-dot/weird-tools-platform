// WeirdTools - Visual Experiments

// Particle System
let particles = [];
let particleAnimation;
let particleRunning = true;

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;
    
    // Create particles
    createParticles();
    
    // Animate
    animateParticles();
    
    // Update on slider change
    document.getElementById('particle-count').addEventListener('input', createParticles);
}

function createParticles() {
    const count = parseInt(document.getElementById('particle-count').value);
    particles = [];
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * 800,
            y: Math.random() * 400,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            life: Math.random() * 100
        });
    }
}

function animateParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
    ctx.fillRect(0, 0, 800, 400);
    
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        // Bounce off walls
        if (p.x < 0 || p.x > 800) p.vx *= -1;
        if (p.y < 0 || p.y > 400) p.vy *= -1;
        
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect nearby particles
        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(102, 126, 234, ${1 - dist / 100})`;
                ctx.stroke();
            }
        });
        
        // Respawn dead particles
        if (p.life <= 0) {
            p.x = Math.random() * 800;
            p.y = Math.random() * 400;
            p.life = 100;
            p.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        }
    });
    
    if (particleRunning) {
        particleAnimation = requestAnimationFrame(animateParticles);
    }
}

function toggleParticles() {
    particleRunning = !particleRunning;
    if (particleRunning) {
        animateParticles();
    } else {
        cancelAnimationFrame(particleAnimation);
    }
}

function resetParticles() {
    createParticles();
}

// Infinite Zoom
let zoomLevel = 1;
let zoomDirection = 1;
let zoomAnimation;
let zoomRunning = true;

function initZoom() {
    const canvas = document.getElementById('zoom-canvas');
    if (!canvas) return;
    
    canvas.width = 800;
    canvas.height = 400;
    
    animateZoom();
}

function animateZoom() {
    const canvas = document.getElementById('zoom-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 800, 400);
    
    const centerX = 400;
    const centerY = 200;
    
    // Draw tunnel effect
    for (let i = 0; i < 50; i++) {
        const size = (i + zoomLevel) * 20;
        const angle = (i * 0.1) + (zoomLevel * 0.05);
        const hue = (i * 7 + zoomLevel * 10) % 360;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        
        ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
        ctx.lineWidth = 3;
        ctx.strokeRect(-size/2, -size/2, size, size);
        
        ctx.restore();
    }
    
    zoomLevel += zoomDirection * 0.5;
    if (zoomLevel > 100 || zoomLevel < 0) {
        zoomDirection *= -1;
    }
    
    if (zoomRunning) {
        zoomAnimation = requestAnimationFrame(animateZoom);
    }
}

function toggleZoom() {
    zoomRunning = !zoomRunning;
    if (zoomRunning) {
        animateZoom();
    } else {
        cancelAnimationFrame(zoomAnimation);
    }
}

function resetZoom() {
    zoomLevel = 1;
    zoomDirection = 1;
}

// Color Mixer
function mixColors() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const result = document.getElementById('color-mix-result');
    
    // Parse colors
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    // Mix
    const r = Math.round((r1 + r2) / 2);
    const g = Math.round((g1 + g2) / 2);
    const b = Math.round((b1 + b2) / 2);
    
    const mixed = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    result.style.background = `linear-gradient(to right, ${color1}, ${mixed}, ${color2})`;
    result.innerHTML = `<span style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Mixed: ${mixed}</span>`;
}

// Gradient Generator
function generateGradient() {
    const color1 = document.getElementById('grad1').value;
    const color2 = document.getElementById('grad2').value;
    const type = document.getElementById('grad-type').value;
    const result = document.getElementById('gradient-result');
    
    if (type === 'linear') {
        result.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        result.innerHTML = `<code style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">linear-gradient(135deg, ${color1}, ${color2})</code>`;
    } else {
        result.style.background = `radial-gradient(circle, ${color1}, ${color2})`;
        result.innerHTML = `<code style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">radial-gradient(circle, ${color1}, ${color2})</code>`;
    }
}

// Moiré Pattern
let moireOffset = 0;

function initMoire() {
    drawMoire();
}

function drawMoire() {
    const canvas = document.getElementById('moire-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 300, 300);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    
    const centerX = 150;
    const centerY = 150;
    
    // Draw concentric circles
    for (let i = 0; i < 50; i++) {
        const radius = i * 6 + moireOffset;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw second set offset
    for (let i = 0; i < 50; i++) {
        const radius = i * 6 + 3 + moireOffset;
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    moireOffset = (moireOffset + 0.5) % 6;
    requestAnimationFrame(drawMoire);
}

function randomizeMoire() {
    moireOffset = Math.random() * 6;
}

// Spirograph
function drawSpirograph() {
    const canvas = document.getElementById('spiro-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const R = 100; // Outer radius
    const r = 33;  // Inner radius
    const d = 75;  // Pen offset
    
    const centerX = 150;
    const centerY = 150;
    
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    for (let angle = 0; angle < Math.PI * 40; angle += 0.01) {
        const x = centerX + (R - r) * Math.cos(angle) + d * Math.cos(((R - r) / r) * angle);
        const y = centerY + (R - r) * Math.sin(angle) - d * Math.sin(((R - r) / r) * angle);
        
        if (angle === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
}

function clearSpirograph() {
    const canvas = document.getElementById('spiro-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initZoom();
    initMoire();
});
