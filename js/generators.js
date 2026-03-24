// WeirdTools - Generators

// Name Generator
function generateName() {
    const type = document.getElementById('name-type').value;
    const result = document.getElementById('name-result');
    
    const generators = {
        'fantasy': () => {
            const prefixes = ['Ael', 'Thor', 'Mor', 'Zar', 'El', 'Gal', 'Fen', 'Dra', 'Syl', 'Rav'];
            const suffixes = ['dor', 'ion', 'ius', 'wyn', 'gard', 'mar', 'thos', 'riel', 'born', 'fire'];
            return randomChoice(prefixes) + randomChoice(suffixes);
        },
        'sci-fi': () => {
            const prefixes = ['Xen', 'Qua', 'Zor', 'Neb', 'Cos', 'Ast', 'Void', 'Nebul', 'Quant', 'Stel'];
            const suffixes = ['tron', 'ex', 'on', 'ix', 'ax', 'us', 'ar', 'is', 'ox', 'yn'];
            return randomChoice(prefixes) + randomChoice(suffixes) + '-' + randomInt(100, 999);
        },
        'startup': () => {
            const adjectives = ['Smart', 'Cloud', 'Data', 'Tech', 'AI', 'Quantum', 'Neo', 'Meta', 'Hyper', 'Ultra'];
            const nouns = ['Flow', 'Base', 'Hub', 'Lab', 'Sync', 'Link', 'Core', 'Edge', 'Wave', 'Spark'];
            return randomChoice(adjectives) + randomChoice(nouns) + '.io';
        },
        'band': () => {
            const adjectives = ['Electric', 'Neon', 'Cosmic', 'Velvet', 'Silent', 'Wild', 'Broken', 'Golden', 'Midnight', 'Crystal'];
            const nouns = ['Dreams', 'Echoes', 'Shadows', 'Waves', 'Ghosts', 'Stars', 'Roses', 'Thunder', 'Phoenix', 'Monkeys'];
            return 'The ' + randomChoice(adjectives) + ' ' + randomChoice(nouns);
        },
        'superhero': () => {
            const prefixes = ['Captain', 'Iron', 'Shadow', 'Quantum', 'Mega', 'Ultra', 'Cosmic', 'Night', 'Star', 'Thunder'];
            const suffixes = ['Fist', 'Wing', 'Storm', 'Blade', 'Heart', 'Strike', 'Guard', 'Hawk', 'Wolf', 'Knight'];
            return randomChoice(prefixes) + ' ' + randomChoice(suffixes);
        }
    };
    
    result.textContent = '✨ ' + generators[type]();
}

// Password Generator
function generatePassword() {
    const length = parseInt(document.getElementById('pass-length').value);
    const useUpper = document.getElementById('pass-upper').checked;
    const useLower = document.getElementById('pass-lower').checked;
    const useNum = document.getElementById('pass-num').checked;
    const useSymbol = document.getElementById('pass-symbol').checked;
    
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';
    const symbol = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNum) chars += num;
    if (useSymbol) chars += symbol;
    
    if (!chars) {
        document.getElementById('password-result').textContent = 'Select at least one option!';
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[randomInt(0, chars.length - 1)];
    }
    
    const result = document.getElementById('password-result');
    result.textContent = password;
    result.onclick = () => copyToClipboard(password);
    result.title = 'Click to copy';
}

// Excuse Generator
function generateExcuse() {
    const excuses = [
        "My dog ate my Wi-Fi signal.",
        "I was abducted by aliens. They had great WiFi though.",
        "My alarm clock is in witness protection.",
        "I got lost in a Wikipedia rabbit hole.",
        "My cat declared independence and hid my keys.",
        "I was training for a marathon... in my sleep.",
        "The universe told me to take a mental health day.",
        "My GPS led me to an alternate dimension.",
        "I was busy teaching my plants to sing.",
        "A wizard turned my car into a toad.",
        "I was fighting crime. Gotham needs me.",
        "My horoscope said to stay home today.",
        "I was debugging my life's source code.",
        "The matrix was glitching. Had to fix it.",
        "I was meditating on the meaning of deadlines.",
        "My time machine is in the shop.",
        "I was helping a turtle cross the highway. All 47 lanes.",
        "My coffee achieved sentience and needed counseling.",
        "I was translating ancient memes.",
        "The squirrels unionized and demanded negotiations."
    ];
    
    document.getElementById('excuse-result').textContent = '🎭 ' + randomChoice(excuses);
}

// Compliment Generator
function generateCompliment() {
    const compliments = [
        "You're doing better than you think you are. 💫",
        "Your existence makes the world more interesting. 🌟",
        "You have a great taste in weird tools! 🌀",
        "Someone out there is smiling because of you. 😊",
        "You're more resilient than you know. 💪",
        "Your perspective is valuable and unique. ✨",
        "You bring good energy to the internet. ⚡",
        "The world needs more people like you. 🌍",
        "You're capable of amazing things. 🚀",
        "Your kindness matters more than you realize. 💝",
        "You're growing even when it doesn't feel like it. 🌱",
        "You have great ideas, even the weird ones. 💡",
        "You're someone's reason to smile today. 😄",
        "Your potential is limitless. 🌈",
        "You're braver than you believe. 🦁",
        "You make difficult things look easy. ⭐",
        "Your creativity inspires others. 🎨",
        "You're enough, exactly as you are. 💖",
        "You're a work of art in progress. 🖼️",
        "The universe is lucky to have you. 🌌"
    ];
    
    document.getElementById('compliment-result').textContent = randomChoice(compliments);
}

// Fortune Cookie
function getFortune() {
    const fortunes = [
        "🥠 A surprising opportunity will present itself soon.",
        "🥠 Your creativity will lead you to success.",
        "🥠 Good things come to those who wait... but better things come to those who hustle.",
        "🥠 A friend will surprise you with a wonderful gift.",
        "🥠 Your hard work will pay off in unexpected ways.",
        "🥠 An adventure awaits you just around the corner.",
        "🥠 Trust your instincts—they're right more often than you think.",
        "🥠 A pleasant surprise is coming your way.",
        "🥠 Your positive attitude will open many doors.",
        "🥠 Something you lost will be found.",
        "🥠 A new friendship will bring you joy.",
        "🥠 Your dreams are closer than you think.",
        "🥠 An unexpected visitor will bring good news.",
        "🥠 Your patience will be rewarded.",
        "🥠 A exciting challenge will help you grow.",
        "🥠 Fortune favors the bold—take the leap!",
        "🥠 Your unique talents will be recognized.",
        "🥠 A small act of kindness will have big effects.",
        "🥠 The best is yet to come.",
        "🥠 Your smile brightens more days than you know."
    ];
    
    const fortune = randomChoice(fortunes);
    const luckyNumbers = Array(6).fill(0).map(() => randomInt(1, 60)).join(' - ');
    document.getElementById('fortune-result').innerHTML = `${fortune}<br><br>🍀 Lucky Numbers: ${luckyNumbers}`;
}

// Haiku Generator
function generateHaiku() {
    const haikus = [
        "Digital whispers\nBits of code dance in the dark\nWeird tools come alive",
        
        "Morning coffee steams\nAnother day to create\nWeirdness awaits us",
        
        "Pixels form patterns\nColors blend in harmony\nArt from algorithms",
        
        "Time flows like water\nMoments slip through fingers fast\nNow is all we have",
        
        "Decisions loom large\nFlip the coin, trust your heart's voice\nPath reveals itself",
        
        "Code compiles, it works!\nCelebration dance ensues\nThen bug appears, sigh",
        
        "Stars above twinkling\nInfinite possibilities\nWhat will you create?",
        
        "Silent keyboard clicks\nIdeas flow through fingertips\nMagic in the making",
        
        "Internet connects\nStrangers through screens, sharing dreams\nWe're not so different",
        
        "Breathe in, breathe out slow\nPeace exists in this moment\nLet go, just be here"
    ];
    
    document.getElementById('haiku-result').textContent = randomChoice(haikus);
}

// Dad Joke Generator
function getDadJoke() {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything! 🤓",
        "I told my wife she was drawing her eyebrows too high. She looked surprised. 😲",
        "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
        "What do you call a fake noodle? An impasta! 🍝",
        "Why don't eggs tell jokes? They'd crack each other up! 🥚",
        "I'm reading a book about anti-gravity. It's impossible to put down! 📚",
        "What do you call a bear with no teeth? A gummy bear! 🐻",
        "Why did the bicycle fall over? It was two-tired! 🚲",
        "What do you call cheese that isn't yours? Nacho cheese! 🧀",
        "Why can't you give Elsa a balloon? Because she will let it go! 🎈",
        "What did the ocean say to the beach? Nothing, it just waved! 🌊",
        "Why do fathers take an extra pair of socks? In case they get a hole in one! ⛳",
        "What do you call a factory that makes okay products? A satisfactory! 🏭",
        "Why did the math book look sad? It had too many problems! 📖",
        "What do you call a dinosaur that crashes their car? Tyrannosaurus Wrecks! 🦕",
        "Why don't skeletons fight each other? They don't have the guts! 💀",
        "What do you call a can opener that doesn't work? A can't opener! 🥫",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one! ⛳",
        "What's brown and sticky? A stick! 🌿",
        "I used to play piano by ear. Now I use my hands! 🎹"
    ];
    
    document.getElementById('joke-result').textContent = randomChoice(jokes);
}

// Conspiracy Theory Generator
function generateConspiracy() {
    const theories = [
        "👽 Birds aren't real. They're government surveillance drones.",
        "🌍 The Earth is flat. NASA has been lying to us for decades.",
        "🌙 The moon landing was filmed in Hollywood by Stanley Kubrick.",
        "🦕 Dinosaurs never existed. Bones are planted by paleontologists.",
        "💊 Water is a hoax created by Big Bottle.",
        "👻 Ghosts are real, but they're just time travelers.",
        "🎭 Celebrities are all clones controlled by the Illuminati.",
        "🌈 Colors were invented to sell more products.",
        "🐱 Cats are spies from another dimension.",
        "💤 Sleep is a conspiracy to make us vulnerable for 8 hours.",
        "📱 Smartphones are mind control devices.",
        "🌲 Trees are alien life forms monitoring us.",
        "🧊 Ice doesn't exist. It's just slow water.",
        "👶 Babies are tiny adults that haven't expanded yet.",
        "🎵 Music is a frequency to control our emotions.",
        "🍕 Pizza was invented as a tracking device for Italians.",
        "🌧️ Rain is just the sky crying over our mistakes.",
        "🔌 Outlets are portals to the electricity dimension.",
        "📦 Boxes are just unfolded cardboard waiting to be free.",
        "🎪 The entire concept of 'weekends' is a social construct."
    ];
    
    document.getElementById('conspiracy-result').textContent = randomChoice(theories);
}

// Utilities
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}
