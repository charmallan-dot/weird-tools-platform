// WeirdTools - Calculators

// Age in Days
function calculateAgeInDays() {
    const birthdate = document.getElementById('birthdate').value;
    const result = document.getElementById('age-days-result');
    
    if (!birthdate) {
        result.textContent = 'Please select your birthdate!';
        return;
    }
    
    const birth = new Date(birthdate);
    const now = new Date();
    const diff = now - birth;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);
    
    result.innerHTML = `
        <strong>${days.toLocaleString()}</strong> days old<br>
        ${hours.toLocaleString()} hours<br>
        ${minutes.toLocaleString()} minutes<br>
        ${seconds.toLocaleString()} seconds
    `;
}

// Life Expectancy
function calculateLifeExpectancy() {
    const birthdate = document.getElementById('life-birthdate').value;
    const gender = document.getElementById('life-gender').value;
    const result = document.getElementById('life-expectancy-result');
    
    if (!birthdate) {
        result.textContent = 'Please select your birthdate!';
        return;
    }
    
    const birth = new Date(birthdate);
    const now = new Date();
    const age = Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));
    
    // Average life expectancy (simplified)
    const expectancy = gender === 'male' ? 76 : 81;
    const remaining = Math.max(0, expectancy - age);
    const percent = Math.min(100, (age / expectancy) * 100);
    
    result.innerHTML = `
        Average life expectancy: <strong>${expectancy} years</strong><br>
        Your age: <strong>${age} years</strong><br>
        Estimated remaining: <strong>${remaining} years</strong><br>
        <div class="progress-bar" style="margin-top: 10px;">
            <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
        <small>${percent.toFixed(1)}% of average lifespan</small>
    `;
}

// Tip Splitter
function calculateTip() {
    const bill = parseFloat(document.getElementById('bill-amount').value);
    const tipPercent = parseFloat(document.getElementById('tip-percent').value);
    const people = parseInt(document.getElementById('people-count').value);
    const result = document.getElementById('tip-result');
    
    if (!bill || !tipPercent || !people) {
        result.textContent = 'Please fill in all fields!';
        return;
    }
    
    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    result.innerHTML = `
        Bill: <strong>$${bill.toFixed(2)}</strong><br>
        Tip (${tipPercent}%): <strong>$${tipAmount.toFixed(2)}</strong><br>
        Total: <strong>$${total.toFixed(2)}</strong><br>
        <hr style="margin: 10px 0; border-color: #444;">
        Per person: <strong style="font-size: 1.5rem; color: #00d26a;">$${perPerson.toFixed(2)}</strong>
    `;
}

// Date Difference
function calculateDateDiff() {
    const date1 = new Date(document.getElementById('date1').value);
    const date2 = new Date(document.getElementById('date2').value);
    const result = document.getElementById('date-diff-result');
    
    if (isNaN(date1) || isNaN(date2)) {
        result.textContent = 'Please select both dates!';
        return;
    }
    
    const diff = Math.abs(date2 - date1);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = (days / 365.25).toFixed(1);
    
    result.innerHTML = `
        <strong>${days.toLocaleString()}</strong> days<br>
        ${weeks.toLocaleString()} weeks<br>
        ${months.toFixed(1)} months<br>
        ${years} years
    `;
}

// Days Until
function calculateDaysUntil() {
    const target = new Date(document.getElementById('target-date').value);
    const result = document.getElementById('days-until-result');
    
    if (isNaN(target)) {
        result.textContent = 'Please select a date!';
        return;
    }
    
    const now = new Date();
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) {
        result.textContent = `That was ${Math.abs(days)} days ago!`;
    } else if (days === 0) {
        result.textContent = '🎉 That\'s today!';
    } else if (days === 1) {
        result.textContent = '⏰ Tomorrow!';
    } else {
        result.innerHTML = `<strong>${days}</strong> days until then!`;
    }
}

// Percentage Calculator
function calculatePercentage() {
    const value = parseFloat(document.getElementById('percent-value').value);
    const total = parseFloat(document.getElementById('percent-total').value);
    const result = document.getElementById('percent-result');
    
    if (!value || !total) {
        result.textContent = 'Please fill in both fields!';
        return;
    }
    
    const percent = (value / total) * 100;
    
    result.innerHTML = `
        <strong>${value}</strong> is <strong style="color: #667eea; font-size: 1.5rem;">${percent.toFixed(2)}%</strong> of ${total}<br>
        <div class="progress-bar" style="margin-top: 10px;">
            <div class="progress-fill" style="width: ${Math.min(100, percent)}%"></div>
        </div>
    `;
}

// Time Zone Converter
function convertTimeZone() {
    const fromTz = document.getElementById('tz-from').value;
    const toTz = document.getElementById('tz-to').value;
    const result = document.getElementById('tz-result');
    
    const now = new Date();
    const fromTime = new Date(now.toLocaleString('en-US', { timeZone: fromTz }));
    const toTime = new Date(now.toLocaleString('en-US', { timeZone: toTz }));
    
    const fromStr = fromTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    const toStr = toTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    const diff = (toTime - fromTime) / (1000 * 60 * 60);
    const diffStr = diff >= 0 ? `+${diff}` : diff;
    
    result.innerHTML = `
        <strong>${fromTz}</strong>: ${fromStr}<br>
        ⬇️ (${diffStr} hours)<br>
        <strong>${toTz}</strong>: <span style="color: #667eea; font-size: 1.3rem;">${toStr}</span>
    `;
}

// BPM Calculator
let bpmTaps = [];
let bpmTimeout;

function tapBPM() {
    const now = Date.now();
    bpmTaps.push(now);
    
    // Keep only taps within last 10 seconds
    bpmTaps = bpmTaps.filter(tap => now - tap < 10000);
    
    const result = document.getElementById('bpm-result');
    
    if (bpmTaps.length < 2) {
        result.textContent = 'Keep tapping...';
        return;
    }
    
    // Calculate intervals between taps
    const intervals = [];
    for (let i = 1; i < bpmTaps.length; i++) {
        intervals.push(bpmTaps[i] - bpmTaps[i-1]);
    }
    
    // Average interval
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const bpm = Math.round(60000 / avgInterval);
    
    result.innerHTML = `
        <span style="font-size: 2rem; color: #667eea;">${bpm}</span> BPM<br>
        <small>${bpmTaps.length} taps</small>
    `;
    
    // Reset after 3 seconds of no taps
    clearTimeout(bpmTimeout);
    bpmTimeout = setTimeout(() => {
        bpmTaps = [];
        result.textContent = 'Ready to tap...';
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bpm-result').textContent = 'Tap the button to calculate BPM...';
});
