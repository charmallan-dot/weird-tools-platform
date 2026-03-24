// WeirdTools - Productivity Tools

// Pomodoro Timer
let pomodoroTime = 25 * 60;
let pomodoroInitial = 25 * 60;
let pomodoroInterval;
let pomodoroRunning = false;

function updatePomodoroDisplay() {
    const minutes = Math.floor(pomodoroTime / 60);
    const seconds = pomodoroTime % 60;
    document.getElementById('pomodoro-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update title
    document.title = pomodoroRunning ? 
        `(${minutes}:${seconds.toString().padStart(2, '0')}) Pomodoro - WeirdTools` : 
        '⚡ WeirdTools - Productivity';
}

function startPomodoro() {
    if (pomodoroRunning) return;
    
    pomodoroRunning = true;
    pomodoroInterval = setInterval(() => {
        pomodoroTime--;
        updatePomodoroDisplay();
        
        if (pomodoroTime <= 0) {
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
            new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp+ZjHlxcHd9g4WEgHp0b2xqaWdoaWprbW9xcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==').play().catch(() => {});
            alert('🍅 Pomodoro complete! Time for a break!');
        }
    }, 1000);
    
    updatePomodoroDisplay();
}

function pausePomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
}

function resetPomodoro() {
    pausePomodoro();
    pomodoroTime = pomodoroInitial;
    updatePomodoroDisplay();
}

function setPomodoroMode(minutes) {
    pausePomodoro();
    pomodoroTime = minutes * 60;
    pomodoroInitial = minutes * 60;
    updatePomodoroDisplay();
}

// Focus Timer
let focusTime = 30 * 60;
let focusInitial = 30 * 60;
let focusInterval;
let focusRunning = false;

function updateFocusDisplay() {
    const minutes = Math.floor(focusTime / 60);
    const seconds = focusTime % 60;
    document.getElementById('focus-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startFocus() {
    if (focusRunning) return;
    
    focusRunning = true;
    focusInterval = setInterval(() => {
        focusTime--;
        updateFocusDisplay();
        
        if (focusTime <= 0) {
            clearInterval(focusInterval);
            focusRunning = false;
            alert('⏰ Focus session complete! Great work!');
        }
    }, 1000);
}

function pauseFocus() {
    clearInterval(focusInterval);
    focusRunning = false;
}

function resetFocus() {
    pauseFocus();
    focusTime = focusInitial;
    updateFocusDisplay();
}

// Initialize focus input
document.addEventListener('DOMContentLoaded', () => {
    const focusInput = document.getElementById('focus-minutes');
    if (focusInput) {
        focusInput.addEventListener('change', (e) => {
            const mins = parseInt(e.target.value) || 30;
            focusTime = mins * 60;
            focusInitial = mins * 60;
            updateFocusDisplay();
        });
    }
});

// Break Reminder
let breakInterval = null;
let breakEnabled = false;

function toggleBreakReminder() {
    const btn = document.getElementById('break-toggle');
    const status = document.getElementById('break-status');
    const interval = parseInt(document.getElementById('break-interval').value) || 30;
    
    if (breakEnabled) {
        clearInterval(breakInterval);
        breakEnabled = false;
        btn.textContent = 'Enable';
        btn.style.background = 'var(--gradient)';
        status.textContent = '';
    } else {
        breakEnabled = true;
        btn.textContent = 'Disable';
        btn.style.background = '#00d26a';
        
        let minutes = interval;
        status.textContent = `Next break in ${minutes} minutes`;
        
        breakInterval = setInterval(() => {
            minutes--;
            status.textContent = `Next break in ${minutes} minutes`;
            
            if (minutes <= 0) {
                if (Notification.permission === 'granted') {
                    new Notification('⏰ Break Time!', {
                        body: 'Take a 5-minute break. Stretch, hydrate, rest your eyes!',
                        icon: '🧘'
                    });
                } else {
                    alert('🧘 Break Time! Take 5 minutes to stretch and rest.');
                }
                minutes = interval;
            }
        }, 60000);
        
        // Request notification permission
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }
}

// Habit Tracker
let habits = [];

function loadHabits() {
    const saved = localStorage.getItem('weirdtools_habits');
    if (saved) {
        habits = JSON.parse(saved);
        renderHabits();
    }
}

function saveHabits() {
    localStorage.setItem('weirdtools_habits', JSON.stringify(habits));
}

function addHabit() {
    const input = document.getElementById('habit-name');
    const name = input.value.trim();
    
    if (!name) return;
    
    habits.push({
        id: Date.now(),
        name: name,
        completed: false,
        streak: 0,
        completedDates: []
    });
    
    input.value = '';
    saveHabits();
    renderHabits();
}

function toggleHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.completed = !habit.completed;
        const today = new Date().toDateString();
        
        if (habit.completed) {
            if (!habit.completedDates.includes(today)) {
                habit.completedDates.push(today);
                habit.streak++;
            }
        } else {
            habit.completedDates = habit.completedDates.filter(d => d !== today);
            habit.streak = Math.max(0, habit.streak - 1);
        }
        
        saveHabits();
        renderHabits();
    }
}

function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    saveHabits();
    renderHabits();
}

function renderHabits() {
    const container = document.getElementById('habits-list');
    if (!container) return;
    
    if (habits.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888;">No habits yet. Add one above!</p>';
        return;
    }
    
    container.innerHTML = habits.map(habit => `
        <div class="habit-item ${habit.completed ? 'completed' : ''}">
            <div>
                <strong>${habit.name}</strong>
                <div style="font-size: 0.8rem; color: #888;">
                    🔥 ${habit.streak} day streak
                </div>
            </div>
            <div>
                <button onclick="toggleHabit(${habit.id})" style="background: ${habit.completed ? '#00d26a' : 'var(--dark)'}; border: 2px solid #00d26a;">
                    ${habit.completed ? '✓' : '○'}
                </button>
                <button onclick="deleteHabit(${habit.id})" style="background: var(--dark); border: 2px solid #ff4757; color: #ff4757;">×</button>
            </div>
        </div>
    `).join('');
}

// Breathing Exercise
let breathingInterval;
let breathingRunning = false;

function startBreathing() {
    const circle = document.getElementById('breath-circle');
    const text = document.getElementById('breath-text');
    
    if (breathingRunning) {
        clearInterval(breathingInterval);
        breathingRunning = false;
        text.textContent = 'Ready';
        circle.classList.remove('inhale', 'exhale');
        return;
    }
    
    breathingRunning = true;
    let phase = 'inhale';
    
    const breathe = () => {
        if (phase === 'inhale') {
            text.textContent = 'Breathe In...';
            circle.classList.add('inhale');
            circle.classList.remove('exhale');
            phase = 'hold';
            setTimeout(breathe, 4000);
        } else if (phase === 'hold') {
            text.textContent = 'Hold...';
            phase = 'exhale';
            setTimeout(breathe, 4000);
        } else {
            text.textContent = 'Breathe Out...';
            circle.classList.remove('inhale');
            circle.classList.add('exhale');
            phase = 'inhale';
            setTimeout(breathe, 4000);
        }
    };
    
    breathe();
}

// Task Randomizer
function randomizeTask() {
    const textarea = document.getElementById('task-list');
    const result = document.getElementById('random-task');
    
    const tasks = textarea.value.split('\n').filter(t => t.trim());
    
    if (tasks.length === 0) {
        result.textContent = 'Add some tasks first!';
        return;
    }
    
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    result.innerHTML = `<strong>📋 Your task:</strong><br><span style="font-size: 1.3rem; color: #667eea;">${task}</span>`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePomodoroDisplay();
    updateFocusDisplay();
});
