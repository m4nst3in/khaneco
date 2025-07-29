const ver = "V3.1.2";

const repoPath = `https://raw.githubusercontent.com/m4nst3in/khan/refs/heads/main/`;

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

let user = {
    username: "visitante",
    nickname: "visitante",
    UID: 0
}

let loadedPlugins = [];
const scriptCache = new Map(); // Cache para scripts já carregados

const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => { if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) { e.preventDefault(); } });
console.log(Object.defineProperties(new Error, { toString: {value() {(new Error).stack.includes('toString@') && location.reload();}}, message: {get() {location.reload();}}, }));

document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));
document.querySelector("link[rel~='icon']").href = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJjdXAiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3MmZmNzIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM1MGQ2NTAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIgcng9IjE1Ii8+PHBhdGggZD0iTTIwIDI1IEwyMCA3NSBDMjAgODIgMjcgODUgMzAgODUgTDYwIDg1IEM2MyA4NSA3MCA4MiA3MCA3NSBMNzAgMjUgWiIgZmlsbD0idXJsKCNjdXApIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik03MCAzNSBDNzUgMzUgODAgNDAgODAgNDUgTDgwIDU1IEM4MCA2MCA3NSA2NSA3MCA2NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjE1IiByPSIxLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNyI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIwLjM7MC43OzAuMyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT48Y2lyY2xlIGN4PSI0NSIgY3k9IjEyIiByPSIxLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIwLjI7MC42OzAuMiIgZHVyPSIyLjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjU1IiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC42Ij48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuNDswLjg7MC40IiBkdXI9IjEuOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9jaXJjbGU+PC9zdmc+';

class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

window.debug = function(text) { }
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); debug(`🔊 Playing audio from ${url}`); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`⭕ Pressionando ${selector}...`, 1000); } };

// Função para verificar conectividade
async function checkConnectivity() {
    try {
        const response = await fetch('https://httpbin.org/get', { 
            method: 'HEAD', 
            mode: 'no-cors',
            cache: 'no-cache'
        });
        return true;
    } catch {
        return navigator.onLine;
    }
}

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); debug(text); };

async function showSplashScreen() { splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;"; splashScreen.innerHTML = '<span style="color:white;">KHANECO</span><span style="color:#72ff72;">.SPACE</span>'; document.body.appendChild(splashScreen); setTimeout(() => splashScreen.style.opacity = '1', 10);};
async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 1000); };

async function loadScript(url, label) { 
    try {
        // Verificar cache primeiro
        if (scriptCache.has(url)) {
            loadedPlugins.push(label);
            eval(scriptCache.get(url));
            return;
        }
        
        await delay(100); // Pequeno delay para evitar muitas requisições simultâneas
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Falha ao carregar ${label}: ${response.status}`);
            return;
        }
        const script = await response.text();
        
        // Armazenar no cache
        scriptCache.set(url, script);
        loadedPlugins.push(label);
        eval(script);
    } catch (error) {
        console.error(`Erro ao carregar ${label}:`, error);
    }
}

async function loadCss(url) { 
    return new Promise((resolve) => { 
        const link = document.createElement('link'); 
        link.rel = 'stylesheet'; 
        link.type = 'text/css'; 
        link.href = url; 
        link.onload = () => resolve(); 
        link.onerror = () => {
            console.warn(`Falha ao carregar CSS: ${url}`);
            resolve();
        };
        document.head.appendChild(link); 
    }); 
}

async function setupMenu() {
    await loadScript(repoPath+'visuals/mainMenu.js', 'mainMenu');
    await delay(200);
    await loadScript(repoPath+'visuals/statusPanel.js', 'statusPanel');
    await delay(200);
    await loadScript(repoPath+'visuals/widgetBot.js', 'widgetBot');
}

async function setupMain(){
    const scripts = [
        'functions/questionSpoof.js',
        'functions/videoSpoof.js', 
        'functions/minuteFarm.js',
        'functions/spoofUser.js',
        'functions/answerRevealer.js',
        'functions/rgbLogo.js',
        'functions/customBanner.js',
        'functions/autoAnswer.js'
    ];
    
    for (const script of scripts) {
        await loadScript(repoPath + script, script.split('/')[1].replace('.js', ''));
        await delay(150); // Delay entre cada carregamento
    }
}

if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Khaneco Failed to Injected!\n\nVocê precisa executar o Khaneco no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

showSplashScreen();

// Carregamento sequencial para evitar erro 429
(async () => {
    try {
// Carregamento sequencial para evitar erro 429
(async () => {
    try {
        // Verificar conectividade
        const isOnline = await checkConnectivity();
        if (!isOnline) {
            sendToast("⚠️ Conectividade limitada. Carregando modo básico...", 3000);
            await loadBasicMode();
            return;
        }

        // Carregar recursos externos com delay e retry
        const loadWithRetry = async (loadFn, maxRetries = 3) => {
            for (let i = 0; i < maxRetries; i++) {
                try {
                    await loadFn();
                    return;
                } catch (error) {
                    if (i === maxRetries - 1) throw error;
                    await delay(1000 * (i + 1)); // Delay progressivo
                }
            }
        };

        await loadWithRetry(async () => {
            await loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs');
            if (window.onekoEl) {
                onekoEl = document.getElementById('oneko'); 
                onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')"; 
                onekoEl.style.display = "none";
            }
        });
        await delay(500);
        
        await loadWithRetry(async () => {
            await loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin');
        });
        await delay(500);
        
        await loadWithRetry(async () => {
            await loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css');
        });
        await delay(500);
        
        await loadWithRetry(async () => {
            await loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin');
        });
        await delay(1000);

        // Buscar informações do usuário
        await loadUserInfo();

        // Notificações de sucesso
        sendToast("🌿 Khaneco injetado com sucesso!");
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
        
        await delay(500);
        
        sendToast(`⭐ Bem vindo(a) de volta: ${user.nickname}`);
        if(device.apple) { 
            await delay(500); 
            sendToast(`🪽 Que tal comprar um Samsung?`); 
        }
        
        loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} carregado!`, 2000, 'top'));
        
        hideSplashScreen();
        
        // Carregar módulos da interface e funcionalidades
        await setupMenu();
        await delay(500);
        await setupMain();
        
        console.clear();
        
    } catch (error) {
        console.error('Erro durante o carregamento do Khaneco:', error);
        sendToast("❌ Erro no carregamento. Carregando modo básico...", 5000);
        await loadBasicMode();
    }
})();

// Função para carregar informações do usuário
async function loadUserInfo() {
    try {
        const response = await fetch("https://pt.khanacademy.org/api/internal/graphql/getFullUserProfile", {
            referrer: "https://pt.khanacademy.org/profile/me",
            body: '{"operationName":"getFullUserProfile","query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    isInKhanClassroomDistrict\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}',
            method: "POST",
            mode: "cors",
            credentials: "include"
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.data && data.data.user) {
                user = { 
                    nickname: data.data.user.nickname || 'Visitante', 
                    username: data.data.user.username || 'visitante', 
                    UID: data.data.user.id ? data.data.user.id.slice(-5) : '00000' 
                };
            }
        }
    } catch (error) {
        console.warn('Não foi possível carregar informações do usuário:', error);
    }
}

// Modo básico para quando há problemas de conectividade
async function loadBasicMode() {
    hideSplashScreen();
    
    // Criar interface básica inline
    const basicPanel = document.createElement('div');
    basicPanel.style.cssText = `
        position: fixed; top: 20px; right: 20px; width: 300px; padding: 20px;
        background: white; border: 2px solid #dc2626; border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000;
        font-family: Arial, sans-serif; font-size: 14px;
    `;
    
    basicPanel.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #dc2626;">⚠️ Khaneco (Modo Básico)</h3>
        <p style="margin: 0 0 15px 0; color: #666; font-size: 12px;">
            Alguns recursos podem estar limitados devido a problemas de conectividade.
        </p>
        <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button onclick="location.reload()" style="
                padding: 8px 16px; background: #dc2626; color: white; 
                border: none; border-radius: 5px; cursor: pointer;
                font-size: 12px;
            ">Tentar Novamente</button>
            <button onclick="this.parentElement.parentElement.remove()" style="
                padding: 8px 16px; background: #6b7280; color: white; 
                border: none; border-radius: 5px; cursor: pointer;
                font-size: 12px;
            ">Fechar</button>
        </div>
    `;
    
    document.body.appendChild(basicPanel);
    
    // Funcionalidades básicas ainda funcionam
    setupBasicFeatures();
}

// Configurar funcionalidades básicas que não dependem de recursos externos
function setupBasicFeatures() {
    // Implementar funcionalidades básicas aqui se necessário
    console.log('Khaneco rodando em modo básico');
}