const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }

function addFeature(features) {
    const featureContainer = document.createElement('div');
    features.forEach(attribute => {
        let element = attribute.type === 'nonInput' ? document.createElement('label') : document.createElement('input');
        if (attribute.type === 'nonInput') {
            element.innerHTML = attribute.name;
        } else {
            element.type = attribute.type;
            element.id = attribute.name;
        }

        if (attribute.attributes) {
            attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                value = value ? value.replace(/"/g, '') : '';
                key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
            });
        }

        if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
        if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
        if (attribute.className) element.classList.add(attribute.className);

        if (attribute.type === 'nonInput') {
            element.classList.add('menu-header');
            featureContainer.appendChild(element);
            return;
        }
        
        const featureRow = document.createElement('div');
        featureRow.className = 'feature-row';
        if (attribute.className) featureRow.classList.add(attribute.className);
        if (attribute.attributes && attribute.attributes.includes('style="display:none;"')) {
            featureRow.style.display = 'none';
        }

        const label = document.createElement('label');
        label.setAttribute('for', attribute.name);
        label.textContent = attribute.label;

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
        const setting = element.getAttribute('setting-data'),
            dependent = element.getAttribute('dependent'),
            handleEvent = (e, value) => {
                setFeatureByPath(setting, value);
                if (callback) callback(value, e);
            };

        if (element.type === 'checkbox') {
            element.addEventListener('change', (e) => {
                playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                handleEvent(e, e.target.checked);
                if (dependent) {
                    dependent.split(',').forEach(dep => 
                        document.querySelectorAll(`.${dep}`).forEach(depEl => {
                            depEl.style.display = e.target.checked ? 'flex' : "none";
                        })
                    );
                }
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
    backgroundColor: 'rgba(20, 20, 30, 0.7)',
    borderRadius: '16px', color: 'white',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    display: 'flex', flexDirection: 'column', gap: '5px',
    zIndex: '1000', padding: '10px', userSelect: 'none',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
    opacity: '0', transform: 'translateY(-10px)', pointerEvents: 'none',
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
});

dropdownMenu.innerHTML = `
    <style>
        .feature-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; transition: background-color 0.2s ease; }
        .feature-row:hover { background-color: rgba(255, 255, 255, 0.05); }
        .feature-row label { color: #e0e0e0; font-size: 14px; }
        .menu-header { font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; padding: 15px 12px 5px; }

        input[type="checkbox"] {
            appearance: none; -webkit-appearance: none; position: relative;
            width: 38px; height: 22px; background-color: rgba(255, 255, 255, 0.1);
            border-radius: 11px; cursor: pointer; transition: background-color 0.3s ease;
        }
        input[type="checkbox"]::before {
            content: ''; position: absolute;
            width: 16px; height: 16px; left: 3px; top: 3px;
            background-color: #bbb; border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        input[type="checkbox"]:checked {
            background-image: linear-gradient(45deg, #8e2de2, #4a00e0);
        }
        input[type="checkbox"]:checked::before {
            transform: translateX(16px); background-color: white;
        }

        input[type="range"] {
            -webkit-appearance: none; appearance: none;
            width: 100%; height: 4px; background: rgba(255, 255, 255, 0.1);
            border-radius: 2px; outline: none; transition: opacity .2s;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 16px; height: 16px; border-radius: 50%;
            background: #e0e0e0; cursor: pointer;
            transition: background 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover { background: white; }
        
        input[type="text"] {
            width: 100%; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1);
            color: white; padding: 6px 10px; border-radius: 6px; font-size: 13px;
            outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        input[type="text"]:focus {
            border-color: #8e2de2;
            box-shadow: 0 0 0 2px rgba(142, 45, 226, 0.3);
        }
    </style>
`;
watermark.appendChild(dropdownMenu);

let featuresList = [
    { name: 'general', type: 'nonInput' },
    { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Reveal Answers' },
    { name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: 'Auto Answer [Beta]' },
    { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', label: 'Delay' },
    { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: 'Smart Next' },
    { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: 'Repeat Correct' },
    { name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: 'Farm Minutes [Decoration]' },
    
    { name: 'spoofing', type: 'nonInput' },
    { name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: 'Spoof Questions' },
    { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: 'Spoof Videos' },

    { name: 'visuals', type: 'nonInput' },
    { name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: 'Dark Mode' },
    { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: 'Custom Banner' },
    { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: 'RGB Logo' },
    { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: 'Cat Companion' },

    { name: 'profile', type: 'nonInput' },
    { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off" placeholder="Custom username..."', label: 'Username'},
    { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off" placeholder="Image URL..."', label: 'Avatar' }
];

addFeature(featuresList);

handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp']);
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { let onekoEl = document.getElementById('oneko'); if (onekoEl) onekoEl.style.display = checked ? null : "none" });

let isDragging = false, offsetX, offsetY;
watermark.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - watermark.getBoundingClientRect().left;
    offsetY = e.clientY - watermark.getBoundingClientRect().top;
    watermark.style.transition = 'none';
    watermark.style.transform = 'scale(0.95)';
});

document.addEventListener('mousemove', e => {
    if (isDragging) {
        let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
        let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
        Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` });
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        watermark.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        watermark.style.transform = 'scale(1)';
    }
});

const showMenu = () => {
    dropdownMenu.style.opacity = '1';
    dropdownMenu.style.transform = 'translateY(0)';
    dropdownMenu.style.pointerEvents = 'auto';
};

const hideMenu = () => {
    dropdownMenu.style.opacity = '0';
    dropdownMenu.style.transform = 'translateY(-10px)';
    dropdownMenu.style.pointerEvents = 'none';
};

let menuHover = false;
let watermarkHover = false;
let hideTimeout;

watermark.addEventListener('mouseenter', () => {
    watermarkHover = true;
    clearTimeout(hideTimeout);
    showMenu();
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
});

watermark.addEventListener('mouseleave', () => {
    watermarkHover = false;
    hideTimeout = setTimeout(() => {
        if (!menuHover) {
            hideMenu();
            playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
        }
    }, 100);
});

dropdownMenu.addEventListener('mouseenter', () => {
    menuHover = true;
    clearTimeout(hideTimeout);
});

dropdownMenu.addEventListener('mouseleave', () => {
    menuHover = false;
    hideTimeout = setTimeout(() => {
        if (!watermarkHover) {
            hideMenu();
            playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
        }
    }, 100);
});
