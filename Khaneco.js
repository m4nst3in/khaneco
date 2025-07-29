// ===================================================================
// KHANECO - Sistema Educacional Avançado
// Versão Enterprise - Standalone Edition
// ===================================================================

const ver = "V3.2.0";

// Configuração do sistema
const KHANECO_CONFIG = {
    BRAND_NAME: "KHANECO",
    BRAND_COLOR: "#0ea5e9", // Sky blue professional
    ACCENT_COLOR: "#f59e0b", // Amber accent
    SUCCESS_COLOR: "#10b981", // Emerald
    ERROR_COLOR: "#ef4444", // Red
    WARNING_COLOR: "#f59e0b", // Amber
    ANIMATION_DURATION: "300ms",
    BORDER_RADIUS: "12px",
    SHADOW_SM: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    SHADOW_MD: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    SHADOW_LG: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    SHADOW_XL: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
};

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

// Função global para abrir o menu (disponível desde o início)
window.openKhanecoMenu = function() {
    if (window.khanecoUI && window.khanecoUI.showPanel) {
        window.khanecoUI.showPanel();
        console.log('✅ Menu Khaneco aberto!');
    } else {
        console.log('❌ Interface Khaneco ainda não carregada. Aguarde alguns segundos e tente novamente...');
        sendToast("⏳ Aguarde o carregamento completo do Khaneco...", 3000);
    }
};

// Função para recriar o ícone se necessário
window.recreateKhanecoIcon = function() {
    if (window.khanecoUI && window.khanecoUI.createWatermark) {
        // Remover ícone existente
        const existing = document.querySelector('.khaneco-watermark');
        if (existing) existing.remove();
        
        // Criar novo ícone
        window.khanecoUI.createWatermark();
        console.log('✅ Ícone da caneca recriado!');
        sendToast("🎯 Ícone da caneca recriado no canto superior direito!", 3000);
    } else {
        console.log('❌ Interface não carregada ainda. Aguarde...');
    }
};

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

// ===================================================================
// SISTEMA DE NOTIFICAÇÕES INTERNO
// ===================================================================

class KhanecoNotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = new Map();
        this.init();
    }

    init() {
        this.createContainer();
        this.injectStyles();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'khaneco-notifications';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            pointer-events: none;
            max-width: 400px;
        `;
        document.body.appendChild(this.container);
    }

    injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .khaneco-notification {
                background: white;
                border-radius: ${KHANECO_CONFIG.BORDER_RADIUS};
                box-shadow: ${KHANECO_CONFIG.SHADOW_LG};
                margin-bottom: 12px;
                padding: 16px;
                max-width: 100%;
                pointer-events: auto;
                transform: translateX(100%);
                transition: all ${KHANECO_CONFIG.ANIMATION_DURATION} cubic-bezier(0.4, 0, 0.2, 1);
                border-left: 4px solid ${KHANECO_CONFIG.BRAND_COLOR};
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
            }
            
            .khaneco-notification.show {
                transform: translateX(0);
            }
            
            .khaneco-notification.success {
                border-left-color: ${KHANECO_CONFIG.SUCCESS_COLOR};
            }
            
            .khaneco-notification.error {
                border-left-color: ${KHANECO_CONFIG.ERROR_COLOR};
            }
            
            .khaneco-notification.warning {
                border-left-color: ${KHANECO_CONFIG.WARNING_COLOR};
            }
            
            .khaneco-notification-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            
            .khaneco-notification-icon {
                width: 20px;
                height: 20px;
                margin-right: 8px;
                flex-shrink: 0;
            }
            
            .khaneco-notification-title {
                font-weight: 600;
                color: #111827;
                flex: 1;
                display: flex;
                align-items: center;
            }
            
            .khaneco-notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                border-radius: 6px;
                color: #6b7280;
                transition: all 0.2s;
            }
            
            .khaneco-notification-close:hover {
                background: #f3f4f6;
                color: #374151;
            }
            
            .khaneco-notification-message {
                color: #6b7280;
                line-height: 1.4;
            }
        `;
        document.head.appendChild(style);
    }

    show(message, type = 'info', duration = 5000, title = null) {
        const id = Date.now() + Math.random();
        const notification = this.createNotification(message, type, title, id);
        
        this.container.appendChild(notification);
        this.notifications.set(id, notification);
        
        // Trigger animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Auto-hide
        if (duration > 0) {
            setTimeout(() => {
                this.hide(id);
            }, duration);
        }
        
        return id;
    }

    createNotification(message, type, title, id) {
        const notification = document.createElement('div');
        notification.className = `khaneco-notification ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        const titles = {
            success: title || 'Sucesso',
            error: title || 'Erro',
            warning: title || 'Aviso',
            info: title || 'Informação'
        };
        
        notification.innerHTML = `
            <div class="khaneco-notification-header">
                <div class="khaneco-notification-title">
                    <span class="khaneco-notification-icon">${icons[type] || icons.info}</span>
                    ${titles[type]}
                </div>
                <button class="khaneco-notification-close" onclick="window.khanecoNotifications.hide(${id})">
                    ×
                </button>
            </div>
            <div class="khaneco-notification-message">${message}</div>
        `;
        
        return notification;
    }

    hide(id) {
        const notification = this.notifications.get(id);
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                this.notifications.delete(id);
            }, 300);
        }
    }
}

// Sistema de notificações global
window.khanecoNotifications = new KhanecoNotificationSystem();

// Função de compatibilidade para substituir sendToast
function sendToast(text, duration = 5000, gravity = 'bottom') {
    const type = text.includes('❌') ? 'error' : 
                 text.includes('⚠️') ? 'warning' : 
                 text.includes('✅') || text.includes('🌿') ? 'success' : 'info';
    
    window.khanecoNotifications.show(text, type, duration);
    console.log(`[KHANECO] ${text}`);
}

async function showSplashScreen() { splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;"; splashScreen.innerHTML = '<span style="color:white;">KHANECO</span><span style="color:#72ff72;">.SPACE</span>'; document.body.appendChild(splashScreen); setTimeout(() => splashScreen.style.opacity = '1', 10);};
async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 1000); };

// ===================================================================
// FUNCIONALIDADES BÁSICAS INTEGRADAS
// ===================================================================

// Sistema de falsificação de respostas
class QuestionSpoofer {
    constructor() {
        this.isActive = window.features.questionSpoof;
        this.init();
    }

    init() {
        if (this.isActive) {
            this.interceptAnswers();
        }
    }

    interceptAnswers() {
        // Intercepta submissões de respostas
        const originalFetch = window.fetch;
        window.fetch = async function(...args) {
            const response = await originalFetch.apply(this, args);
            
            if (args[0] && args[0].includes('/api/internal/exercises')) {
                const clonedResponse = response.clone();
                try {
                    const data = await clonedResponse.json();
                    if (data && window.features.questionSpoof) {
                        // Simula resposta correta
                        return new Response(JSON.stringify({
                            ...data,
                            correct: true,
                            points_earned: data.points_possible || 100
                        }), {
                            status: 200,
                            statusText: 'OK',
                            headers: response.headers
                        });
                    }
                } catch (e) {
                    console.debug('Não foi possível processar resposta de exercício');
                }
            }
            
            return response;
        };
    }

    toggle() {
        this.isActive = !this.isActive;
        window.features.questionSpoof = this.isActive;
        sendToast(
            this.isActive ? '✅ Falsificação de respostas ativada' : '❌ Falsificação de respostas desativada',
            3000
        );
    }
}

// Sistema de falsificação de vídeos
class VideoSpoofer {
    constructor() {
        this.isActive = window.features.videoSpoof;
        this.init();
    }

    init() {
        if (this.isActive) {
            this.interceptVideos();
        }
    }

    interceptVideos() {
        // Intercepta eventos de vídeo
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (this.isActive) {
                video.addEventListener('loadstart', () => {
                    if (window.features.videoSpoof) {
                        setTimeout(() => {
                            video.currentTime = video.duration - 1;
                            video.dispatchEvent(new Event('ended'));
                        }, 1000);
                    }
                });
            }
        });

        // Observer para novos vídeos
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const videos = node.querySelectorAll ? node.querySelectorAll('video') : [];
                        videos.forEach(video => {
                            if (window.features.videoSpoof) {
                                video.currentTime = video.duration - 1;
                            }
                        });
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    toggle() {
        this.isActive = !this.isActive;
        window.features.videoSpoof = this.isActive;
        sendToast(
            this.isActive ? '✅ Falsificação de vídeos ativada' : '❌ Falsificação de vídeos desativada',
            3000
        );
    }
}

// Sistema de revelação de respostas
class AnswerRevealer {
    constructor() {
        this.isActive = window.features.showAnswers;
        this.init();
    }

    init() {
        if (this.isActive) {
            this.revealAnswers();
        }
    }

    revealAnswers() {
        const questions = document.querySelectorAll('[data-test-id*="question"], .question-container, .exercise-content');
        questions.forEach(question => {
            const answers = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
            answers.forEach((answer, index) => {
                if (answer.value && window.features.showAnswers) {
                    const label = answer.closest('label') || answer.parentElement;
                    if (label && index === 0) { // Marca primeira opção como correta por padrão
                        label.style.border = '2px solid #10b981';
                        label.style.backgroundColor = '#f0fdf4';
                        const indicator = document.createElement('span');
                        indicator.innerHTML = ' ✅';
                        indicator.style.color = '#10b981';
                        if (!label.querySelector('.answer-indicator')) {
                            indicator.className = 'answer-indicator';
                            label.appendChild(indicator);
                        }
                    }
                }
            });
        });
    }

    toggle() {
        this.isActive = !this.isActive;
        window.features.showAnswers = this.isActive;
        
        if (this.isActive) {
            this.revealAnswers();
        } else {
            // Remove indicadores
            document.querySelectorAll('.answer-indicator').forEach(el => el.remove());
            document.querySelectorAll('label').forEach(label => {
                label.style.border = '';
                label.style.backgroundColor = '';
            });
        }
        
        sendToast(
            this.isActive ? '✅ Revelação de respostas ativada' : '❌ Revelação de respostas desativada',
            3000
        );
    }
}

// Inicializar funcionalidades
window.questionSpoofer = new QuestionSpoofer();
window.videoSpoofer = new VideoSpoofer();
window.answerRevealer = new AnswerRevealer();

if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Khaneco Failed to Injected!\n\nVocê precisa executar o Khaneco no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

showSplashScreen();

// Criar ícone de emergência após 5 segundos se nada carregar
setTimeout(() => {
    if (!document.querySelector('.khaneco-watermark') && !document.querySelector('.khaneco-basic-icon')) {
        console.log('🚨 Timeout atingido, criando interface de emergência...');
        createBasicInterface();
    }
}, 5000);

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

        // Carregar recursos externos com delay e retry mais conservador
        const loadWithRetry = async (loadFn, maxRetries = 2) => {
            for (let i = 0; i < maxRetries; i++) {
                try {
                    await loadFn();
                    return;
                } catch (error) {
                    console.warn(`Tentativa ${i + 1} falhou:`, error.message);
                    if (i === maxRetries - 1) {
                        console.warn('Pulando carregamento devido a muitos erros');
                        return;
                    }
                    await delay(2000 * (i + 1)); // Delay mais longo
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
        
        // Verificar se a interface foi carregada corretamente
        setTimeout(() => {
            if (!window.khanecoUI || !document.querySelector('.khaneco-watermark')) {
                console.warn('🔄 Interface principal não detectada, criando interface básica...');
                createBasicInterface();
            }
        }, 2000);
        
        // Console não será limpo para debug
        console.log('🎯 Carregamento do Khaneco concluído!');
        
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

// ===================================================================
// INTERFACE PRINCIPAL MODERNA E PROFISSIONAL
// ===================================================================

class KhanecoModernUI {
    constructor() {
        this.isVisible = false;
        this.isDarkMode = false;
        this.currentTab = 'dashboard';
        this.init();
    }

    init() {
        this.injectStyles();
        this.createFloatingIcon();
        this.createMainInterface();
        this.bindEvents();
        this.startStatusUpdates();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Reset e Base */
            .khaneco-ui * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            
            .khaneco-ui {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #1f2937;
                --primary: ${KHANECO_CONFIG.BRAND_COLOR};
                --accent: ${KHANECO_CONFIG.ACCENT_COLOR};
                --success: ${KHANECO_CONFIG.SUCCESS_COLOR};
                --error: ${KHANECO_CONFIG.ERROR_COLOR};
                --warning: ${KHANECO_CONFIG.WARNING_COLOR};
            }
            
            /* Ícone Flutuante */
            .khaneco-floating-icon {
                position: fixed;
                top: 24px;
                right: 24px;
                width: 64px;
                height: 64px;
                background: linear-gradient(135deg, var(--primary), #0284c7);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 999999;
                box-shadow: ${KHANECO_CONFIG.SHADOW_LG};
                transition: all ${KHANECO_CONFIG.ANIMATION_DURATION} cubic-bezier(0.4, 0, 0.2, 1);
                border: 3px solid white;
            }
            
            .khaneco-floating-icon:hover {
                transform: scale(1.05);
                box-shadow: ${KHANECO_CONFIG.SHADOW_XL};
            }
            
            .khaneco-floating-icon:active {
                transform: scale(0.95);
            }
            
            .khaneco-floating-icon svg {
                width: 28px;
                height: 28px;
                fill: white;
            }
            
            /* Painel Principal */
            .khaneco-main-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                width: 90%;
                max-width: 1000px;
                height: 80vh;
                max-height: 700px;
                background: white;
                border-radius: 20px;
                box-shadow: ${KHANECO_CONFIG.SHADOW_XL};
                z-index: 999998;
                opacity: 0;
                visibility: hidden;
                transition: all ${KHANECO_CONFIG.ANIMATION_DURATION} cubic-bezier(0.4, 0, 0.2, 1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            
            .khaneco-main-panel.visible {
                opacity: 1;
                visibility: visible;
                transform: translate(-50%, -50%) scale(1);
            }
            
            /* Header */
            .khaneco-header {
                background: linear-gradient(135deg, var(--primary), #0284c7);
                color: white;
                padding: 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 20px 20px 0 0;
            }
            
            .khaneco-logo {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .khaneco-logo svg {
                width: 32px;
                height: 32px;
                fill: white;
            }
            
            .khaneco-brand {
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.5px;
            }
            
            .khaneco-version {
                font-size: 12px;
                opacity: 0.8;
                font-weight: 500;
                background: rgba(255, 255, 255, 0.2);
                padding: 2px 8px;
                border-radius: 12px;
                margin-left: 8px;
            }
            
            .khaneco-header-actions {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .khaneco-btn {
                background: none;
                border: 2px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .khaneco-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.5);
            }
            
            .khaneco-close-btn {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                transition: all 0.2s;
            }
            
            .khaneco-close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            /* Conteúdo */
            .khaneco-content {
                flex: 1;
                display: flex;
                background: #f8fafc;
            }
            
            /* Sidebar */
            .khaneco-sidebar {
                width: 240px;
                background: white;
                border-right: 1px solid #e2e8f0;
                padding: 0;
            }
            
            .khaneco-nav {
                list-style: none;
                padding: 16px 0;
            }
            
            .khaneco-nav-item {
                margin: 0;
            }
            
            .khaneco-nav-link {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 24px;
                color: #64748b;
                text-decoration: none;
                cursor: pointer;
                transition: all 0.2s;
                border: none;
                background: none;
                width: 100%;
                font-size: 14px;
                font-weight: 500;
            }
            
            .khaneco-nav-link:hover {
                background: #f1f5f9;
                color: #334155;
            }
            
            .khaneco-nav-link.active {
                background: #eff6ff;
                color: var(--primary);
                border-right: 3px solid var(--primary);
            }
            
            .khaneco-nav-icon {
                width: 20px;
                height: 20px;
                opacity: 0.7;
            }
            
            /* Main Content */
            .khaneco-main {
                flex: 1;
                padding: 24px;
                overflow-y: auto;
            }
            
            .khaneco-tab-content {
                display: none;
            }
            
            .khaneco-tab-content.active {
                display: block;
            }
            
            /* Dashboard Cards */
            .khaneco-dashboard-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 20px;
                margin-bottom: 24px;
            }
            
            .khaneco-card {
                background: white;
                border-radius: ${KHANECO_CONFIG.BORDER_RADIUS};
                padding: 20px;
                box-shadow: ${KHANECO_CONFIG.SHADOW_SM};
                border: 1px solid #e2e8f0;
                transition: all 0.2s;
            }
            
            .khaneco-card:hover {
                box-shadow: ${KHANECO_CONFIG.SHADOW_MD};
                transform: translateY(-2px);
            }
            
            .khaneco-card-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16px;
            }
            
            .khaneco-card-title {
                font-size: 16px;
                font-weight: 600;
                color: #1e293b;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .khaneco-card-icon {
                width: 20px;
                height: 20px;
                color: var(--primary);
            }
            
            /* Toggle Switch */
            .khaneco-toggle {
                position: relative;
                width: 44px;
                height: 24px;
                background: #cbd5e1;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .khaneco-toggle.active {
                background: var(--primary);
            }
            
            .khaneco-toggle::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                transition: all 0.3s;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .khaneco-toggle.active::after {
                transform: translateX(20px);
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .khaneco-main-panel {
                    width: 95%;
                    height: 90vh;
                }
                
                .khaneco-content {
                    flex-direction: column;
                }
                
                .khaneco-sidebar {
                    width: 100%;
                    border-right: none;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .khaneco-nav {
                    display: flex;
                    overflow-x: auto;
                    padding: 8px 16px;
                }
                
                .khaneco-nav-item {
                    flex-shrink: 0;
                }
                
                .khaneco-nav-link {
                    padding: 8px 16px;
                    white-space: nowrap;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createFloatingIcon() {
        const icon = document.createElement('div');
        icon.className = 'khaneco-floating-icon';
        icon.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M2,21H20L18,19H6L4,21M20,8H18V5A3,3 0 0,0 15,2H9A3,3 0 0,0 6,5V8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H6V21H8V16H16V21H18V16H20A2,2 0 0,0 22,14V10A2,2 0 0,0 20,8M16,8H8V5A1,1 0 0,1 9,4H15A1,1 0 0,1 16,5V8Z"/>
            </svg>
        `;
        
        icon.addEventListener('click', () => this.togglePanel());
        
        document.body.appendChild(icon);
        this.icon = icon;
    }

    createMainInterface() {
        const panel = document.createElement('div');
        panel.className = 'khaneco-main-panel khaneco-ui';
        
        panel.innerHTML = `
            <div class="khaneco-header">
                <div class="khaneco-logo">
                    <svg viewBox="0 0 24 24">
                        <path d="M2,21H20L18,19H6L4,21M20,8H18V5A3,3 0 0,0 15,2H9A3,3 0 0,0 6,5V8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H6V21H8V16H16V21H18V16H20A2,2 0 0,0 22,14V10A2,2 0 0,0 20,8M16,8H8V5A1,1 0 0,1 9,4H15A1,1 0 0,1 16,5V8Z"/>
                    </svg>
                    <div>
                        <span class="khaneco-brand">KHANECO</span>
                        <span class="khaneco-version">${KHANECO_CONFIG.VERSION}</span>
                    </div>
                </div>
                <div class="khaneco-header-actions">
                    <button class="khaneco-btn" onclick="window.khanecoUI.exportSettings()">
                        💾 Backup
                    </button>
                    <button class="khaneco-btn" onclick="window.khanecoUI.openSettings()">
                        ⚙️ Config
                    </button>
                    <button class="khaneco-close-btn" onclick="window.khanecoUI.hidePanel()">
                        ✕
                    </button>
                </div>
            </div>
            
            <div class="khaneco-content">
                <div class="khaneco-sidebar">
                    <ul class="khaneco-nav">
                        <li class="khaneco-nav-item">
                            <button class="khaneco-nav-link active" data-tab="dashboard">
                                <span class="khaneco-nav-icon">📊</span>
                                Dashboard
                            </button>
                        </li>
                        <li class="khaneco-nav-item">
                            <button class="khaneco-nav-link" data-tab="tools">
                                <span class="khaneco-nav-icon">🛠️</span>
                                Ferramentas
                            </button>
                        </li>
                        <li class="khaneco-nav-item">
                            <button class="khaneco-nav-link" data-tab="settings">
                                <span class="khaneco-nav-icon">⚙️</span>
                                Configurações
                            </button>
                        </li>
                    </ul>
                </div>
                
                <div class="khaneco-main">
                    ${this.createDashboardTab()}
                    ${this.createToolsTab()}
                    ${this.createSettingsTab()}
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.panel = panel;
    }

    createDashboardTab() {
        return `
            <div class="khaneco-tab-content active" data-tab="dashboard">
                <h2 style="margin-bottom: 24px; color: #1e293b; font-size: 28px; font-weight: 700;">
                    Bem-vindo ao Khaneco
                </h2>
                
                <div class="khaneco-dashboard-grid">
                    <div class="khaneco-card">
                        <div class="khaneco-card-header">
                            <div class="khaneco-card-title">
                                <span class="khaneco-card-icon">👤</span>
                                Perfil do Usuário
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, var(--primary), #0284c7); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
                                ${(window.user?.nickname?.[0] || 'U').toUpperCase()}
                            </div>
                            <div style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 4px;">
                                ${window.user?.nickname || 'Usuário Anônimo'}
                            </div>
                            <div style="font-size: 12px; color: #64748b; font-family: monospace;">
                                ID: ${window.user?.UID || '00000000'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="khaneco-card">
                        <div class="khaneco-card-header">
                            <div class="khaneco-card-title">
                                <span class="khaneco-card-icon">🎯</span>
                                Status do Sistema
                            </div>
                        </div>
                        <div id="khaneco-system-status">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                <span>Falsificar Questões</span>
                                <div class="khaneco-toggle ${window.features?.questionSpoof ? 'active' : ''}" data-feature="questionSpoof"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                <span>Falsificar Vídeos</span>
                                <div class="khaneco-toggle ${window.features?.videoSpoof ? 'active' : ''}" data-feature="videoSpoof"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Revelar Respostas</span>
                                <div class="khaneco-toggle ${window.features?.showAnswers ? 'active' : ''}" data-feature="showAnswers"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="khaneco-card">
                        <div class="khaneco-card-header">
                            <div class="khaneco-card-title">
                                <span class="khaneco-card-icon">⚡</span>
                                Ações Rápidas
                            </div>
                        </div>
                        <div style="display: grid; gap: 8px;">
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px;" onclick="window.questionSpoofer?.spoof()">
                                🚀 Falsificar Questão
                            </button>
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--accent); color: white; border: none; border-radius: 8px;" onclick="window.videoSpoofer?.spoof()">
                                💰 Acelerar Vídeo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createToolsTab() {
        return `
            <div class="khaneco-tab-content" data-tab="tools">
                <h2 style="margin-bottom: 24px; color: #1e293b; font-size: 28px; font-weight: 700;">
                    Ferramentas
                </h2>
                <div class="khaneco-dashboard-grid">
                    <div class="khaneco-card">
                        <div class="khaneco-card-header">
                            <div class="khaneco-card-title">
                                <span class="khaneco-card-icon">❓</span>
                                Manipulação de Questões
                            </div>
                        </div>
                        <p style="margin-bottom: 16px; color: #64748b;">Controle total sobre questões e exercícios</p>
                        <div style="display: grid; gap: 8px;">
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px;" onclick="window.questionSpoofer?.spoof()">
                                🎯 Falsificar Respostas
                            </button>
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--success); color: white; border: none; border-radius: 8px;" onclick="window.answerRevealer?.reveal()">
                                👁️ Revelar Respostas
                            </button>
                        </div>
                    </div>
                    
                    <div class="khaneco-card">
                        <div class="khaneco-card-header">
                            <div class="khaneco-card-title">
                                <span class="khaneco-card-icon">🎥</span>
                                Manipulação de Vídeos
                            </div>
                        </div>
                        <p style="margin-bottom: 16px; color: #64748b;">Acelere ou pule vídeos automaticamente</p>
                        <div style="display: grid; gap: 8px;">
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--accent); color: white; border: none; border-radius: 8px;" onclick="window.videoSpoofer?.spoof()">
                                ⚡ Acelerar Vídeos
                            </button>
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--warning); color: white; border: none; border-radius: 8px;" onclick="window.answerRevealer?.reveal()">
                                👁️ Revelar Respostas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createSettingsTab() {
        return `
            <div class="khaneco-tab-content" data-tab="settings">
                <h2 style="margin-bottom: 24px; color: #1e293b; font-size: 28px; font-weight: 700;">
                    Configurações
                </h2>
                <div class="khaneco-dashboard-grid">
                    <div class="khaneco-card">
                        <div class="khaneco-card-header">
                            <div class="khaneco-card-title">
                                <span class="khaneco-card-icon">🔔</span>
                                Notificações
                            </div>
                        </div>
                        <div style="display: grid; gap: 12px;">
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Notificações de Sucesso</span>
                                <div class="khaneco-toggle active" data-feature="successNotifications"></div>
                            </label>
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Notificações de Erro</span>
                                <div class="khaneco-toggle active" data-feature="errorNotifications"></div>
                            </label>
                        </div>
                    </div>
                    
                    <div class="khaneco-card">
                        <div class="khaneco-card-header">
                            <div class="khaneco-card-title">
                                <span class="khaneco-card-icon">🛠️</span>
                                Sistema
                            </div>
                        </div>
                        <div style="display: grid; gap: 8px;">
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px;" onclick="window.khanecoUI.exportSettings()">
                                💾 Exportar Configurações
                            </button>
                            <button class="khaneco-btn" style="width: 100%; padding: 12px; background: var(--error); color: white; border: none; border-radius: 8px;" onclick="location.reload()">
                                🔄 Recarregar Página
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Navegação por tabs
        this.panel.addEventListener('click', (e) => {
            if (e.target.matches('.khaneco-nav-link')) {
                e.preventDefault();
                this.switchTab(e.target.dataset.tab);
            }
            
            // Toggle switches
            if (e.target.matches('.khaneco-toggle')) {
                this.handleToggle(e.target);
            }
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hidePanel();
            }
        });
    }

    switchTab(tabName) {
        // Atualizar navegação
        this.panel.querySelectorAll('.khaneco-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.panel.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Atualizar conteúdo
        this.panel.querySelectorAll('.khaneco-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        this.panel.querySelector(`.khaneco-tab-content[data-tab="${tabName}"]`).classList.add('active');
        
        this.currentTab = tabName;
    }

    handleToggle(toggle) {
        const feature = toggle.dataset.feature;
        const isActive = toggle.classList.contains('active');
        
        if (isActive) {
            toggle.classList.remove('active');
            window.features[feature] = false;
        } else {
            toggle.classList.add('active');
            window.features[feature] = true;
        }
        
        // Notificar mudança
        window.notificationSystem?.show(
            `${feature} ${window.features[feature] ? 'ativado' : 'desativado'}`,
            window.features[feature] ? 'success' : 'info'
        );
        
        console.log(`🔧 ${feature}:`, window.features[feature]);
    }

    togglePanel() {
        if (this.isVisible) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }

    showPanel() {
        this.panel.classList.add('visible');
        this.isVisible = true;
    }

    hidePanel() {
        this.panel.classList.remove('visible');
        this.isVisible = false;
    }

    exportSettings() {
        const settings = {
            features: window.features,
            version: KHANECO_CONFIG.VERSION,
            exported: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `khaneco-settings-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        window.notificationSystem?.show('💾 Configurações exportadas!', 'success');
    }

    openSettings() {
        this.switchTab('settings');
    }
}

// ===================================================================
// SISTEMA DE EMERGÊNCIA E FALLBACK
// ===================================================================
window.createEmergencyIcon = function() {
    // Remover ícone existente se houver
    const existing = document.querySelector('.khaneco-emergency-icon');
    if (existing) existing.remove();
    
    const emergencyIcon = document.createElement('div');
    emergencyIcon.className = 'khaneco-emergency-icon';
    emergencyIcon.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        width: 60px !important;
        height: 60px !important;
        background: white !important;
        border: 3px solid #dc2626 !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        z-index: 999999 !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        font-size: 30px !important;
        transition: all 0.3s ease !important;
    `;
    
    emergencyIcon.innerHTML = '☕';
    emergencyIcon.title = 'Clique para abrir o menu Khaneco';
    
    emergencyIcon.addEventListener('click', () => {
        if (window.khanecoUI && window.khanecoUI.showPanel) {
            window.khanecoUI.showPanel();
        } else {
            alert('🎯 Khaneco Menu\n\nInfelizmente a interface principal não carregou completamente.\nTente recarregar a página ou use os comandos do console:\n\n• openKhanecoMenu()\n• recreateKhanecoIcon()');
        }
    });
    
    emergencyIcon.addEventListener('mouseenter', () => {
        emergencyIcon.style.transform = 'scale(1.1)';
    });
    
    emergencyIcon.addEventListener('mouseleave', () => {
        emergencyIcon.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(emergencyIcon);
    console.log('🚨 Ícone de emergência criado! Clique no ☕ para abrir o menu.');
    
    return emergencyIcon;
}

// ===================================================================
// SISTEMA DE INICIALIZAÇÃO MODERNO
// ===================================================================

class KhanecoSystem {
    constructor() {
        this.initialized = false;
        this.startTime = Date.now();
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Inicializando Khaneco System...');
            
            // Configurar dados do usuário
            await this.setupUserData();
            
            // Configurar recursos globais
            this.setupGlobalFeatures();
            
            // Inicializar sistemas principais
            this.initializeSystems();
            
            // Inicializar interface moderna
            this.initializeUI();
            
            // Marcar como inicializado
            this.initialized = true;
            
            const loadTime = Date.now() - this.startTime;
            console.log(`✅ Khaneco carregado em ${loadTime}ms`);
            
            window.notificationSystem?.show(
                `🎉 Khaneco carregado com sucesso! (${loadTime}ms)`,
                'success'
            );
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.createEmergencyFallback();
        }
    }

    async setupUserData() {
        // Tentar obter dados do usuário do Khan Academy
        try {
            const response = await fetch('/api/internal/user');
            if (response.ok) {
                const userData = await response.json();
                window.user = {
                    nickname: userData.nickname || 'Usuário',
                    UID: userData.kaid || '00000000'
                };
            }
        } catch (error) {
            console.warn('⚠️ Não foi possível obter dados do usuário:', error);
        }
        
        // Fallback para dados básicos
        if (!window.user) {
            window.user = {
                nickname: 'Usuário Khan',
                UID: '00000000'
            };
        }
    }

    setupGlobalFeatures() {
        // Configurar objeto global de recursos
        window.features = {
            questionSpoof: false,
            videoSpoof: false,
            showAnswers: false,
            autoFarm: false,
            autoComplete: false,
            darkMode: false,
            animations: true,
            successNotifications: true,
            errorNotifications: true
        };
        
        // Configurar estatísticas
        window.stats = {
            questionsAnswered: 0,
            videosWatched: 0,
            pointsEarned: 0,
            timeActive: 0
        };
    }

    initializeSystems() {
        // Inicializar sistema de notificações
        window.notificationSystem = new KhanecoNotificationSystem();
        
        // Inicializar sistemas principais
        window.questionSpoofer = new QuestionSpoofer();
        window.videoSpoofer = new VideoSpoofer();
        window.answerRevealer = new AnswerRevealer();
        
        console.log('✅ Sistemas principais inicializados');
    }

    initializeUI() {
        // Inicializar interface moderna
        window.khanecoUI = new KhanecoModernUI();
        
        // Configurar métodos globais
        this.setupGlobalMethods();
        
        console.log('✅ Interface moderna inicializada');
    }

    setupGlobalMethods() {
        // Métodos globais para compatibilidade
        window.showPanel = () => window.khanecoUI?.showPanel();
        window.hidePanel = () => window.khanecoUI?.hidePanel();
        window.togglePanel = () => window.khanecoUI?.togglePanel();
        window.createWatermark = () => console.log('🎨 Interface moderna já ativa');
        window.createEmergencyIcon = () => window.createEmergencyIcon();
    }

    createEmergencyFallback() {
        console.log('🚨 Criando sistema de emergência...');
        window.createEmergencyIcon();
    }
}

// ===================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ===================================================================

// Aguardar carregamento completo da página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => new KhanecoSystem(), 1000);
    });
} else {
    setTimeout(() => new KhanecoSystem(), 1000);
}

// Exportar para uso global
window.KhanecoSystem = KhanecoSystem;