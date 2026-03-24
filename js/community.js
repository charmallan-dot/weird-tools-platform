// WeirdTools - Community Features

// Daily Challenges
const dailyChallenges = [
    "Create something weird today and share it!",
    "Learn a new keyboard shortcut",
    "Compliment 3 people online",
    "Try a tool you've never used before",
    "Write down 10 ideas (no matter how weird)",
    "Take a different route on your walk",
    "Listen to a genre of music you normally avoid",
    "Cook something you've never made before",
    "Read an article about a topic you know nothing about",
    "Draw something with your non-dominant hand",
    "Write a haiku about your day",
    "Call someone just to say hi",
    "Try meditating for 5 minutes",
    "Learn a fun fact and share it",
    "Organize one small thing in your space",
    "Take a photo of something beautiful",
    "Write a thank-you note to someone",
    "Try a new productivity technique",
    "Dance to your favorite song",
    "Stargaze for 10 minutes"
];

function loadDailyChallenge() {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('weirdtools_challenge_date');
    const completed = localStorage.getItem('weirdtools_challenge_completed');
    
    let challengeIndex;
    
    if (saved === today) {
        challengeIndex = parseInt(localStorage.getItem('weirdtools_challenge_index')) || 0;
    } else {
        // New day, new challenge
        challengeIndex = Math.floor(Math.random() * dailyChallenges.length);
        localStorage.setItem('weirdtools_challenge_date', today);
        localStorage.setItem('weirdtools_challenge_index', challengeIndex.toString());
        localStorage.removeItem('weirdtools_challenge_completed');
    }
    
    const challengeText = document.getElementById('challenge-text');
    if (challengeText) {
        challengeText.textContent = dailyChallenges[challengeIndex];
    }
    
    if (completed === today) {
        const btn = document.querySelector('#daily-challenge button');
        if (btn) {
            btn.textContent = '✓ Completed!';
            btn.disabled = true;
            btn.style.background = '#00d26a';
        }
    }
}

function completeChallenge() {
    const today = new Date().toDateString();
    localStorage.setItem('weirdtools_challenge_completed', today);
    
    const btn = document.querySelector('#daily-challenge button');
    if (btn) {
        btn.textContent = '✓ Completed!';
        btn.disabled = true;
        btn.style.background = '#00d26a';
    }
    
    // Add points to leaderboard
    addLeaderboardPoints(10);
    
    alert('🎉 Challenge completed! +10 points added to your score!');
}

// Leaderboard
let userPoints = parseInt(localStorage.getItem('weirdtools_points')) || 0;

function addLeaderboardPoints(points) {
    userPoints += points;
    localStorage.setItem('weirdtools_points', userPoints.toString());
    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    if (!leaderboard) return;
    
    // Get saved leaderboard or use defaults
    let leaders = JSON.parse(localStorage.getItem('weirdtools_leaderboard')) || [
        { name: 'ToolMaster', points: 1234 },
        { name: 'WeirdWizard', points: 987 },
        { name: 'ChaosCoder', points: 756 }
    ];
    
    // Add user if not present
    const userEntry = leaders.find(l => l.name === 'You');
    if (userEntry) {
        userEntry.points = userPoints;
    } else if (userPoints > 0) {
        leaders.push({ name: 'You', points: userPoints });
    }
    
    // Sort by points
    leaders.sort((a, b) => b.points - a.points);
    
    // Update display
    leaderboard.innerHTML = leaders.slice(0, 10).map((leader, i) => `
        <div class="leader-entry" style="${leader.name === 'You' ? 'background: rgba(102, 126, 234, 0.2);' : ''}">
            <span>${i + 1}.</span>
            <span>${leader.name}</span>
            <span>${leader.points.toLocaleString()} pts</span>
        </div>
    `).join('');
}

// Tool Idea Submission
function submitToolIdea() {
    const idea = document.getElementById('tool-idea').value.trim();
    const desc = document.getElementById('tool-desc').value.trim();
    const result = document.getElementById('submit-result');
    
    if (!idea) {
        result.textContent = 'Please enter a tool idea!';
        return;
    }
    
    // Save submission
    const submissions = JSON.parse(localStorage.getItem('weirdtools_submissions') || '[]');
    submissions.push({
        id: Date.now(),
        idea: idea,
        description: desc,
        date: new Date().toISOString(),
        votes: 0
    });
    localStorage.setItem('weirdtools_submissions', JSON.stringify(submissions));
    
    // Clear form
    document.getElementById('tool-idea').value = '';
    document.getElementById('tool-desc').value = '';
    
    result.innerHTML = '✅ Thanks for your idea! We\'ll review it soon.<br><small>+5 points for contributing!</small>';
    
    addLeaderboardPoints(5);
    
    // In a real app, this would send to a server
    console.log('Tool submission:', { idea, desc });
}

// Initialize community features
document.addEventListener('DOMContentLoaded', () => {
    loadDailyChallenge();
    updateLeaderboard();
    
    // Award points for visiting
    const lastVisit = localStorage.getItem('weirdtools_last_visit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        addLeaderboardPoints(1); // Daily visit bonus
        localStorage.setItem('weirdtools_last_visit', today);
    }
});

// Utility functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
