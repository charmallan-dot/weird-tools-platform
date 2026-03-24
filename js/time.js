// WeirdTools - Time Tools (100 Ways to Display Time)

function initTimeTools() {
    updateTimeDisplays();
    setInterval(updateTimeDisplays, 1000);
    
    document.getElementById('more-time-btn').addEventListener('click', () => {
        const extraDiv = document.getElementById('extra-time-formats');
        if (extraDiv.classList.contains('hidden')) {
            extraDiv.classList.remove('hidden');
            document.getElementById('more-time-btn').textContent = 'Show Less';
            showExtraTimeFormats();
        } else {
            extraDiv.classList.add('hidden');
            document.getElementById('more-time-btn').textContent = 'Show 90 More Time Formats';
        }
    });
}

function updateTimeDisplays() {
    const now = new Date();
    
    // Digital Clock
    document.getElementById('digital-clock').textContent = now.toLocaleTimeString();
    
    // Binary Clock
    document.getElementById('binary-clock').textContent = toBinary(now.getHours()) + ':' + 
        toBinary(now.getMinutes()) + ':' + toBinary(now.getSeconds());
    
    // Words Clock
    document.getElementById('words-clock').textContent = timeToWords(now);
    
    // Color Clock
    const colorClock = document.getElementById('color-clock');
    const hue = (now.getHours() / 24) * 360;
    const saturation = (now.getMinutes() / 60) * 100;
    const lightness = (now.getSeconds() / 60) * 50 + 25;
    colorClock.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    colorClock.textContent = `H:${Math.round(hue)}° S:${Math.round(saturation)}% L:${Math.round(lightness)}%`;
    
    // Unix Timestamp
    document.getElementById('unix-clock').textContent = Math.floor(now.getTime() / 1000);
    
    // Hex Time
    document.getElementById('hex-clock').textContent = '#' + 
        now.getHours().toString(16).padStart(2, '0') +
        now.getMinutes().toString(16).padStart(2, '0') +
        now.getSeconds().toString(16).padStart(2, '0');
    
    // Roman Numerals
    document.getElementById('roman-clock').textContent = toRoman(now.getHours()) + ':' + 
        toRoman(now.getMinutes()) + ':' + toRoman(now.getSeconds());
    
    // Progress Bar
    const dayProgress = ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) * 100;
    document.getElementById('day-progress').style.width = dayProgress + '%';
    document.getElementById('day-percent').textContent = dayProgress.toFixed(2) + '% of day complete';
    
    // Emoji Clock
    const hourEmojis = ['🌙', '🌙', '🌙', '🌙', '🌙', '🌙', '🌅', '🌅', '☀️', '☀️', '☀️', '☀️', 
                        '☀️', '☀️', '☀️', '☀️', '🌇', '🌇', '🌆', '🌆', '🌙', '🌙', '🌙', '🌙'];
    const minuteEmojis = ['😴', '😴', '😴', '🙂', '🙂', '🙂', '😊', '😊', '😊', '😄', '😄', '😄',
                          '😄', '😄', '😄', '😊', '😊', '😊', '🙂', '🙂', '🙂', '😴', '😴', '😴'];
    document.getElementById('emoji-clock').textContent = `${hourEmojis[now.getHours()]} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${minuteEmojis[Math.floor(now.getMinutes() / 5)]}`;
    
    // Percentage Clock
    const percentComplete = ((now.getHours() * 60 + now.getMinutes()) / 1440) * 100;
    document.getElementById('percent-clock').textContent = `${percentComplete.toFixed(4)}% of day complete`;
}

function showExtraTimeFormats() {
    const now = new Date();
    const formats = [
        { name: 'ISO 8601', value: now.toISOString() },
        { name: 'UTC', value: now.toUTCString() },
        { name: 'Locale Date', value: now.toLocaleDateString() },
        { name: 'Timezone Offset', value: `UTC${now.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(now.getTimezoneOffset() / 60)}` },
        { name: 'Day of Year', value: `Day ${getDayOfYear(now)}` },
        { name: 'Week Number', value: `Week ${getWeekNumber(now)}` },
        { name: 'Quarter', value: `Q${Math.ceil((now.getMonth() + 1) / 3)}` },
        { name: 'Military Time', value: `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}` },
        { name: 'Swatch Internet Time', value: `@${Math.floor(((now.getUTCHours() + 1) * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds()) / 86.4).toString().padStart(3, '0')}` },
        { name: 'Julian Date', value: getJulianDate(now).toFixed(2) },
        { name: 'Hex Date', value: now.getTime().toString(16) },
        { name: 'Octal Time', value: now.getHours().toString(8) + ':' + now.getMinutes().toString(8) },
        { name: 'Base64 Time', value: btoa(now.toLocaleTimeString()).substring(0, 12) },
        { name: 'Reverse Time', value: now.toLocaleTimeString().split('').reverse().join('') },
        { name: 'Morse Code', value: timeToMorse(now.getHours()) + ' ' + timeToMorse(now.getMinutes()) },
        { name: 'Pig Latin', value: timeToPigLatin(now.toLocaleTimeString()) },
        { name: 'Leet Speak', value: now.toLocaleTimeString().replace(/e/gi, '3').replace(/t/gi, '7').replace(/a/gi, '4').replace(/o/gi, '0') },
        { name: 'Upside Down', value: now.toLocaleTimeString().split('').map(c => flipChar(c)).join('') },
        { name: 'Binary Words', value: ['zero','one'][now.getHours() > 0 ? 1 : 0] + ' ' + ['zero','one'][now.getMinutes() > 0 ? 1 : 0] },
        { name: 'Cat Time', value: '🐱'.repeat(now.getHours() % 12 || 12) },
        { name: 'Bar Code', value: '|||'.repeat(now.getHours()) + '||' + '|||'.repeat(now.getMinutes()) },
        { name: 'Braille', value: numberToBraille(now.getHours()) + numberToBraille(now.getMinutes()) },
        { name: 'Ternary', value: now.getHours().toString(3) + ':' + now.getMinutes().toString(3) },
        { name: 'Duodecimal', value: now.getHours().toString(12) + ':' + now.getMinutes().toString(12) },
        { name: 'Hexadecimal Full', value: '0x' + now.getTime().toString(16) },
        { name: 'Scientific', value: (now.getTime() / 1000).toExponential(4) },
        { name: 'Fraction', value: `${now.getHours()}/24 | ${now.getMinutes()}/60` },
        { name: 'Ratio', value: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` },
        { name: 'Words Full', value: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) },
        { name: '24h Words', value: `${now.getHours()} hours, ${now.getMinutes()} minutes` },
        { name: 'Seconds Only', value: (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) + ' seconds' },
        { name: 'Minutes Only', value: (now.getHours() * 60 + now.getMinutes()) + ' minutes' },
        { name: 'Milliseconds', value: now.getTime() + ' ms' },
        { name: 'Microseconds', value: (now.getTime() * 1000) + ' μs' },
        { name: 'Nanoseconds', value: (now.getTime() * 1000000) + ' ns' },
        { name: 'Prime Check', value: isPrime(now.getHours()) ? 'Prime Hour!' : 'Composite Hour' },
        { name: 'Fibonacci', value: `F(${now.getHours()}) = ${fibonacci(now.getHours() % 10)}` },
        { name: 'Factorial', value: now.getHours() <= 10 ? `${now.getHours()}! = ${factorial(now.getHours())}` : 'Too big!' },
        { name: 'Square', value: `${now.getHours()}² = ${now.getHours() ** 2}` },
        { name: 'Cube', value: `${now.getHours()}³ = ${now.getHours() ** 3}` },
        { name: 'Square Root', value: `√${now.getHours()} = ${Math.sqrt(now.getHours()).toFixed(2)}` },
        { name: 'Logarithm', value: `log(${now.getHours()}) = ${Math.log10(now.getHours() || 1).toFixed(2)}` },
        { name: 'Sine', value: `sin(${now.getHours()}) = ${Math.sin(now.getHours()).toFixed(4)}` },
        { name: 'Cosine', value: `cos(${now.getHours()}) = ${Math.cos(now.getHours()).toFixed(4)}` },
        { name: 'Tangent', value: `tan(${now.getHours()}) = ${Math.tan(now.getHours()).toFixed(4)}` },
        { name: 'Pi Time', value: `${(Math.PI * now.getHours()).toFixed(4)}` },
        { name: 'E Time', value: `${(Math.E * now.getHours()).toFixed(4)}` },
        { name: 'Golden Ratio', value: `${((1 + Math.sqrt(5)) / 2 * now.getHours()).toFixed(4)}` },
        { name: 'ASCII', value: now.getHours().toString().split('').map(c => c.charCodeAt(0)).join('-') },
        { name: 'RGB', value: `rgb(${now.getHours()*10},${now.getMinutes()*4},${now.getSeconds()*4})` },
        { name: 'HSL', value: `hsl(${now.getHours()*15},${now.getMinutes()}%,${now.getSeconds()}%)` },
        { name: 'CMYK', value: `c:${now.getHours()} m:${now.getMinutes()} y:${now.getSeconds()} k:0` },
        { name: 'Temperature', value: `${(now.getHours() * 2) + 10}°C / ${(now.getHours() * 2 + 10) * 9/5 + 32}°F` },
        { name: 'Speed', value: `${now.getHours() * 10} km/h | ${(now.getHours() * 10 * 0.621371).toFixed(1)} mph` },
        { name: 'Distance', value: `${(now.getHours() * 1.609).toFixed(2)} km from midnight` },
        { name: 'Gravity', value: `${(9.81 * now.getHours()).toFixed(2)} m/s²` },
        { name: 'Energy', value: `${(now.getHours() * 4184).toLocaleString()} J` },
        { name: 'Power', value: `${(now.getHours() * 0.7457).toFixed(2)} HP` },
        { name: 'Pressure', value: `${(101.325 + now.getHours()).toFixed(2)} kPa` },
        { name: 'Volume', value: `${now.getHours() * 0.473} L` },
        { name: 'Weight', value: `${(now.getHours() * 0.453592).toFixed(2)} kg` },
        { name: 'Length', value: `${(now.getHours() * 0.3048).toFixed(2)} m` },
        { name: 'Area', value: `${(now.getHours() * 0.092903).toFixed(4)} m²` },
        { name: 'Currency USD', value: `$${now.getHours()}.${now.getMinutes().toString().padStart(2, '0')}` },
        { name: 'Currency EUR', value: `€${(now.getHours() * 0.85).toFixed(2)}` },
        { name: 'Currency GBP', value: `£${(now.getHours() * 0.73).toFixed(2)}` },
        { name: 'Currency JPY', value: `¥${now.getHours() * 110}` },
        { name: 'Bitcoin', value: `₿${(now.getHours() / 100000).toFixed(6)}` },
        { name: 'Ethereum', value: `Ξ${(now.getHours() / 10000).toFixed(4)}` },
        { name: 'Stock Random', value: `$WTF ${((Math.random() * 100) + now.getHours()).toFixed(2)} ${Math.random() > 0.5 ? '▲' : '▼'}` },
        { name: 'Lottery', value: Array(6).fill(0).map(() => randomInt(1, 49)).join('-') },
        { name: 'Coordinates', value: `${(now.getHours() - 12).toFixed(4)}, ${(now.getMinutes() - 30).toFixed(4)}` },
        { name: 'Altitude', value: `${now.getHours() * 100} m` },
        { name: 'BPM', value: `${60 + now.getHours() * 2} BPM` },
        { name: 'pH Level', value: `pH ${5 + (now.getHours() / 3)}` },
        { name: 'Magnitude', value: `M${(now.getHours() / 2).toFixed(1)} earthquake` },
        { name: 'Decibels', value: `${30 + now.getHours() * 3} dB` },
        { name: 'Lumens', value: `${now.getHours() * 100} lm` },
        { name: 'Watts', value: `${now.getHours() * 60} W` },
        { name: 'Volts', value: `${(now.getHours() + 1.5).toFixed(1)} V` },
        { name: 'Amperes', value: `${(now.getHours() / 10).toFixed(2)} A` },
        { name: 'Ohms', value: `${now.getHours() * 10} Ω` },
        { name: 'Hertz', value: `${now.getHours() * 1000} Hz` },
        { name: 'Bytes', value: `${(now.getHours() * 1024).toLocaleString()} B` },
        { name: 'Pixels', value: `${now.getHours() * 1920}x${now.getMinutes() * 1080}` },
        { name: 'FPS', value: `${24 + now.getHours()} FPS` },
        { name: 'Resolution', value: `${now.getHours()}K` },
        { name: 'Bandwidth', value: `${now.getHours() * 100} Mbps` },
        { name: 'Latency', value: `${now.getHours() + 10} ms` },
        { name: 'Uptime', value: `${now.getHours()}h ${now.getMinutes()}m` },
        { name: 'Progress', value: `${((now.getHours() / 24) * 100).toFixed(1)}%` },
        { name: 'Completion', value: `${((now.getMinutes() / 60) * 100).toFixed(1)}% of hour` },
        { name: 'Remaining', value: `${23 - now.getHours()}h ${59 - now.getMinutes()}m left` },
        { name: 'Elapsed', value: `${now.getHours()}h ${now.getMinutes()}m elapsed` },
        { name: 'Momentum', value: `${now.getHours() * now.getMinutes()} kg⋅m/s` },
        { name: 'Velocity', value: `${now.getHours() * 5} m/s` },
        { name: 'Acceleration', value: `${now.getHours() * 0.5} m/s²` },
        { name: 'Force', value: `${now.getHours() * 9.81} N` },
        { name: 'Torque', value: `${now.getHours() * 15} N⋅m` },
        { name: 'Density', value: `${(now.getHours() + 1).toFixed(2)} g/cm³` },
        { name: 'Viscosity', value: `${now.getHours() * 0.89} cP` },
        { name: 'Conductivity', value: `${now.getHours() * 5.96} S/m` },
        { name: 'Resistivity', value: `${(1 / (now.getHours() + 0.01)).toFixed(4)} Ω⋅m` },
        { name: 'Capacitance', value: `${now.getHours() * 10} μF` },
        { name: 'Inductance', value: `${now.getHours() * 0.5} mH` },
        { name: 'Frequency', value: `${now.getHours() * 60} RPM` },
        { name: 'Wavelength', value: `${(300 / (now.getHours() + 1)).toFixed(2)} m` },
        { name: 'Photon Energy', value: `${(now.getHours() * 0.00001).toFixed(6)} eV` },
        { name: 'Half-life', value: `${now.getHours() * 1000} years` },
        { name: 'Entropy', value: `${(now.getHours() * 10).toFixed(2)} J/K` },
        { name: 'Enthalpy', value: `${now.getHours() * 500} kJ/mol` }
    ];
    
    const extraDiv = document.getElementById('extra-time-formats');
    extraDiv.innerHTML = formats.map(f => `
        <div class="tool-card">
            <h4>${f.name}</h4>
            <div class="clock-display">${f.value}</div>
        </div>
    `).join('');
}

// Helper functions
function toBinary(num) {
    return num.toString(2).padStart(2, '0');
}

function timeToWords(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const h = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    
    const hourWords = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 
                       'seven', 'eight', 'nine', 'ten', 'eleven'];
    
    if (minutes === 0) {
        return `${hourWords[h]} o'clock ${ampm}`;
    } else if (minutes === 15) {
        return `quarter past ${hourWords[h]} ${ampm}`;
    } else if (minutes === 30) {
        return `half past ${hourWords[h]} ${ampm}`;
    } else if (minutes === 45) {
        return `quarter to ${hourWords[(h % 12) + 1]} ${ampm}`;
    } else if (minutes < 30) {
        return `${minutes} past ${hourWords[h]} ${ampm}`;
    } else {
        return `${60 - minutes} to ${hourWords[(h % 12) + 1]} ${ampm}`;
    }
}

function toRoman(num) {
    const roman = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let str = '';
    for (let i of Object.keys(roman)) {
        let q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }
    return str || '0';
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getJulianDate(date) {
    return (date.getTime() / 86400000) + 2440587.5;
}

function timeToMorse(num) {
    const morse = {0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.'};
    return num.toString().split('').map(d => morse[d]).join(' ');
}

function timeToPigLatin(str) {
    return str.split(' ').map(word => {
        if (word.match(/\d/)) return word;
        const vowels = 'aeiouAEIOU';
        if (vowels.includes(word[0])) return word + 'way';
        const consonants = word.match(/^[^aeiouAEIOU]+/);
        if (consonants) return word.slice(consonants[0].length) + consonants[0] + 'ay';
        return word;
    }).join(' ');
}

function flipChar(c) {
    const flip = {'0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'h','5':'S','6':'9','7':'L','8':'8','9':'6',':':':','.':'˙','a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z'};
    return flip[c] || c;
}

function numberToBraille(num) {
    const braille = {'0':'⣀','1':'⠁','2':'⠃','3':'⠇','4':'⠓','5':'⠑','6':'⠗','7':'⠿','8':'⠯','9':'⠹'};
    return num.toString().split('').map(d => braille[d] || '').join('');
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

function factorial(n) {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
