const ver = "V4.6.0";
let isDev = false;
const repoPath = `https://raw.githubusercontent.com/hitlbungee09/anders/${isDev ? "dev" : "main"}/`;

const device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

let user = {
    username: "User",
    nickname: "User",
    UID: "00000"
};

let loadedPlugins = [];

const dropdownMenu = document.createElement('div');
const watermark = document.createElement('div');
const splashScreen = document.createElement('div');

window.features = {
    questionSpoof: true, videoSpoof: true, showAnswers: false,
    autoAnswer: false, customBanner: false, nextRecomendation: false,
    repeatQuestion: false, minuteFarmer: false, rgbLogo: false,
    darkMode: true, onekoJs: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => { if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) e.preventDefault(); });
console.log(Object.defineProperties(new Error, { toString: {value() {(new Error).stack.includes('toString@') && location.reload();}}, message: {get() {location.reload();}}, }));

document.head.appendChild(Object.assign(document.createElement("style"),{ innerHTML:`
    @font-face{ font-family:'MuseoSans'; src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf') format('truetype'); }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #888; }
`}));
const favicon = document.querySelector("link[rel~='icon']") || document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';
document.head.appendChild(favicon);

class EventEmitter{constructor(){this.events={}}on(t,e){(t="string"==typeof t?[t]:t).forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){(t="string"==typeof t?[t]:t).forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}}
const plppdo = new EventEmitter();
new MutationObserver((mutations) => { for (let mut of mutations) if (mut.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

const delay = ms => new Promise(res => setTimeout(res, ms));
const playAudio = url => new Audio(url).play();
const sendToast = (text, duration = 3000, gravity = 'bottom') => {
    Toastify({ text, duration, gravity, position: "center", stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #8e2de2, #4a00e0)",
            borderRadius: "10px",
            fontFamily: "'Segoe UI', Roboto, sans-serif"
        }
    }).showToast();
};

async function showSplashScreen(initialTip) {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn { 0% { opacity: 0; transform: scale(0.98); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 10px #8e2de2, 0 0 20px #8e2de2; }
            50% { text-shadow: 0 0 20px #8e2de2, 0 0 40px #4a00e0; }
        }
        @keyframes tipFade {
            0%, 100% { opacity: 0; transform: translateY(5px); }
            20%, 80% { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    Object.assign(splashScreen.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', zIndex: '9999', opacity: '0',
        transition: 'opacity 0.5s ease-out', userSelect: 'none',
        fontFamily: "MuseoSans, sans-serif",
        animation: 'fadeIn 0.5s forwards'
    });
    splashScreen.innerHTML = `
        <div style="font-size: 42px;">
            <span style="color:white;">SENSEWARE</span><span style="color:#c084fc; animation: textGlow 2s infinite ease-in-out;">.SPACE</span>
        </div>
        <div id="splash-tip-container" style="height: 40px; display: flex; align-items: center;">
             <p id="splash-tip" style="font-size: 16px; color: #aaa; margin-top: 20px;">${initialTip}</p>
        </div>
    `;
    document.body.appendChild(splashScreen);
}

async function hideSplashScreen() {
    splashScreen.style.opacity = '0';
    setTimeout(() => splashScreen.remove(), 500);
}

const loadScript = (url, label) => fetch(url).then(r => r.text()).then(s => { loadedPlugins.push(label); eval(s); });
const loadCss = url => new Promise(res => Object.assign(document.head.appendChild(document.createElement('link')), { rel: 'stylesheet', href: url, onload: res }));

function setupMenu() {
    const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }

    function addFeature(features) {
        const featureContainer = document.createElement('div');
        features.forEach(attribute => {
            if (attribute.type === 'nonInput') {
                const header = document.createElement('label');
                header.innerHTML = attribute.name;
                header.classList.add('menu-header');
                featureContainer.appendChild(header);
                return;
            }
            const featureRow = document.createElement('div');
            featureRow.className = 'feature-row';
            if (attribute.className) featureRow.classList.add(attribute.className);
            if (attribute.attributes && attribute.attributes.includes('style="display:none;"')) featureRow.style.display = 'none';
            const label = document.createElement('label');
            label.setAttribute('for', attribute.name);
            label.textContent = attribute.label;
            const element = document.createElement('input');
            element.type = attribute.type;
            element.id = attribute.name;
            if (attribute.attributes) {
                attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                    value = value ? value.replace(/"/g, '') : '';
                    key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
                });
            }
            if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
            if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
            featureRow.appendChild(label);
            featureRow.appendChild(element);
            featureContainer.appendChild(featureRow);
        });
        dropdownMenu.innerHTML += featureContainer.innerHTML;
    }

    function handleInput(ids, callback = null) {
        (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
        .forEach(element => {
            if (!element) return;
            const setting = element.getAttribute('setting-data');
            const dependent = element.getAttribute('dependent');
            const handleEvent = (e, value) => {
                setFeatureByPath(setting, value);
                if (callback) callback(value, e);
            };
            if (element.type === 'checkbox') {
                element.addEventListener('change', (e) => {
                    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                    handleEvent(e, e.target.checked);
                    if (dependent) dependent.split(',').forEach(dep => document.querySelectorAll(`.${dep}`).forEach(el => el.style.display = e.target.checked ? 'flex' : "none"));
                });
            } else {
                element.addEventListener('input', (e) => handleEvent(e, e.target.value));
            }
        });
    }

    Object.assign(watermark.style, {
        position: 'fixed', top: '20px', left: 'calc(100% - 100px)', width: '80px', height: '30px',
        backgroundColor: 'rgba(20, 20, 30, 0.6)', color: 'white',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif", fontWeight: '600',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderRadius: '15px', zIndex: '1001', cursor: 'pointer', userSelect: 'none',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
    });
    watermark.innerHTML = `MENU`;
    document.body.appendChild(watermark);

    Object.assign(dropdownMenu.style, {
        position: 'absolute', top: 'calc(100% + 10px)', right: '0', width: '240px',
        backgroundColor: 'rgba(20, 20, 30, 0.7)', borderRadius: '16px', color: 'white',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
        display: 'flex', flexDirection: 'column', gap: '5px', zIndex: '1000', padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
        opacity: '0', transform: 'translateY(-10px)', pointerEvents: 'none',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
    });
    
    dropdownMenu.innerHTML = `<style>
        .feature-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; transition: background-color 0.2s ease; }
        .feature-row:hover { background-color: rgba(255, 255, 255, 0.05); }
        .feature-row label { color: #e0e0e0; font-size: 14px; }
        .menu-header { font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; padding: 15px 12px 5px; }
        input[type="checkbox"] { appearance: none; -webkit-appearance: none; position: relative; width: 38px; height: 22px; background-color: rgba(255, 255, 255, 0.1); border-radius: 11px; cursor: pointer; transition: background-color 0.3s ease; }
        input[type="checkbox"]::before { content: ''; position: absolute; width: 16px; height: 16px; left: 3px; top: 3px; background-color: #bbb; border-radius: 50%; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
        input[type="checkbox"]:checked { background-image: linear-gradient(45deg, #8e2de2, #4a00e0); }
        input[type="checkbox"]:checked::before { transform: translateX(16px); background-color: white; }
        input[type="range"] { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #e0e0e0; cursor: pointer; transition: background 0.2s ease; }
        input[type="range"]::-webkit-slider-thumb:hover { background: white; }
        input[type="text"] { width: 100%; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1); color: white; padding: 6px 10px; border-radius: 6px; font-size: 13px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        input[type="text"]:focus { border-color: #8e2de2; box-shadow: 0 0 0 2px rgba(142, 45, 226, 0.3); }
    </style>`;
    watermark.appendChild(dropdownMenu);
    
    let featuresList = [
        { name: 'general', type: 'nonInput' },
        { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', label: 'Reveal Answers' },
        { name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', label: 'Auto Answer [Beta]' },
        { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', label: 'Delay' },
        { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', label: 'Smart Next' },
        { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', label: 'Repeat Correct' },
        { name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', label: 'Farm Minutes [Decoration]' },
        { name: 'spoofing', type: 'nonInput' },
        { name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', label: 'Spoof Questions' },
        { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', label: 'Spoof Videos' },
        { name: 'visuals', type: 'nonInput' },
        { name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', label: 'Dark Mode' },
        { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', label: 'Custom Banner' },
        { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', label: 'RGB Logo' },
        { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', label: 'Cat Companion' },
        { name: 'profile', type: 'nonInput' },
        { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off" placeholder="Custom username..."', label: 'Username'},
        { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off" placeholder="Image URL..."', label: 'Avatar' }
    ];
    addFeature(featuresList);
    
    handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo', 'onekoJs']);
    handleInput(['customName', 'customPfp']);
    handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
    handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
    handleInput('darkMode', checked => checked ? DarkReader.enable() : DarkReader.disable());
    
    const showMenu = () => { dropdownMenu.style.opacity = '1'; dropdownMenu.style.transform = 'translateY(0)'; dropdownMenu.style.pointerEvents = 'auto'; };
    const hideMenu = () => { dropdownMenu.style.opacity = '0'; dropdownMenu.style.transform = 'translateY(-10px)'; dropdownMenu.style.pointerEvents = 'none'; };
    const toggleMenu = () => {
        const isVisible = dropdownMenu.style.opacity === '1';
        if (isVisible) { hideMenu(); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'); } 
        else { showMenu(); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'); }
    };

    let isDragging = false;
    watermark.addEventListener('mousedown', (e) => {
        isDragging = false;
        const offsetX = e.clientX - watermark.getBoundingClientRect().left;
        const offsetY = e.clientY - watermark.getBoundingClientRect().top;
        
        const onMouseMove = (moveEvent) => {
            isDragging = true;
            hideMenu();
            watermark.style.transition = 'none';
            let newX = Math.max(0, Math.min(moveEvent.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
            let newY = Math.max(0, Math.min(moveEvent.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
            Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` });
        };
        
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp, true);
            watermark.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, true);
    });

    watermark.addEventListener('click', (e) => {
        if (!isDragging) {
            toggleMenu();
        }
    });

    document.addEventListener('click', (e) => {
        if (dropdownMenu.style.opacity === '1' && !watermark.contains(e.target)) {
            hideMenu();
        }
    });
}

function setupMain(){
    loadScript(repoPath+'functions/questionSpoof.js', 'questionSpoof');
    loadScript(repoPath+'functions/videoSpoof.js', 'videoSpoof');
    loadScript(repoPath+'functions/minuteFarm.js', 'minuteFarm');
    loadScript(repoPath+'functions/spoofUser.js', 'spoofUser');
    loadScript(repoPath+'functions/answerRevealer.js', 'answerRevealer');
    loadScript(repoPath+'functions/rgbLogo.js', 'rgbLogo');
    loadScript(repoPath+'functions/customBanner.js', 'customBanner');
    loadScript(repoPath+'functions/autoAnswer.js', 'autoAnswer');
}

(async () => {
    if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) {
        alert("❌ Senseware Failed to Inject!\n\nYou must run Senseware on the Khan Academy website! (e.g., https://www.khanacademy.org/)");
        return window.location.href = "https://www.khanacademy.org/";
    }

    const loadingTips = [
        "No uses esta herramienta descaradamente...",
        "Recuerda que es mejor saber qué hay detrás de cada proceso.",
        "La curiosidad es el primer paso hacia el conocimiento.",
        "Usa tus nuevos poderes para el bien, no para el mal.",
        "Cada error es una oportunidad de aprendizaje."
    ];
    let tipIndex = 0;
    showSplashScreen(loadingTips[tipIndex]);

    const tipElement = document.getElementById('splash-tip');
    const tipInterval = setInterval(() => {
        tipIndex = (tipIndex + 1) % loadingTips.length;
        tipElement.style.animation = 'none';
        void tipElement.offsetWidth;
        tipElement.style.animation = 'tipFade 1.7s ease-in-out';
        tipElement.textContent = loadingTips[tipIndex];
    }, 1700);
    
    await Promise.all([
        loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin'),
        loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin'),
        loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css'),
        delay(5000)
    ]);
    
    clearInterval(tipInterval);

    DarkReader.setFetchMethod(window.fetch);
    if (features.darkMode) DarkReader.enable();
    
    try {
        const response = await fetch("https://pt.khanacademy.org/api/internal/graphql/getFullUserProfile", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ operationName: "getFullUserProfile", query: "query getFullUserProfile { user { id nickname username } }" }) });
        const data = await response.json();
        user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) };
    } catch (error) { console.error("Senseware: Failed to fetch user profile.", error); }
    
    sendToast("✅ Senseware Injected Successfully");
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
    
    await hideSplashScreen();
    
    sendToast(`⭐ Welcome back, ${user.nickname}`);
    
    setupMenu();
    setupMain();

    loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.js', 'onekoJs').then(() => {
        let onekoEl = document.getElementById('oneko');
        if (onekoEl) {
            onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
            onekoEl.style.display = features.onekoJs ? 'block' : 'none';
            const onekoCheckbox = document.getElementById('onekoJs');
            if (onekoCheckbox) { onekoCheckbox.addEventListener('change', (e) => { onekoEl.style.display = e.target.checked ? 'block' : 'none'; }); }
        }
    });
    
    console.clear();
})();
