// Interface moderna do Khaneco - Tema claro por padrão
class KhanecoUI {
    constructor() {
        this.isDarkMode = false;
        this.isVisible = false;
        this.features = window.features;
        this.featureConfigs = window.featureConfigs;
        this.init();
    }

    init() {
        this.createStyles();
        this.createWatermark();
        this.createMainPanel();
        this.setupEventListeners();
        this.initializeFeatures();
    }

    createStyles() {
        const styles = `
            <style id="khaneco-styles">
                .khaneco-watermark {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: white;
                    border: 2px solid #dc2626;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: all 0.3s ease;
                    font-family: 'MuseoSans', Arial, sans-serif;
                }

                .khaneco-watermark:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
                }

                .khaneco-icon {
                    width: 30px;
                    height: 30px;
                    fill: #dc2626;
                }

                .khaneco-panel {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.9);
                    width: 450px;
                    max-height: 600px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    z-index: 9999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    font-family: 'MuseoSans', Arial, sans-serif;
                    overflow: hidden;
                }

                .khaneco-panel.visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translate(-50%, -50%) scale(1);
                }

                .khaneco-header {
                    background: linear-gradient(135deg, #dc2626, #ef4444);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    position: relative;
                }

                .khaneco-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 0;
                }

                .khaneco-version {
                    font-size: 12px;
                    opacity: 0.8;
                    margin-top: 5px;
                }

                .khaneco-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s;
                }

                .khaneco-close:hover {
                    background-color: rgba(255,255,255,0.2);
                }

                .khaneco-content {
                    padding: 25px;
                    max-height: 450px;
                    overflow-y: auto;
                }

                .khaneco-section {
                    margin-bottom: 25px;
                }

                .khaneco-section-title {
                    font-size: 16px;
                    font-weight: bold;
                    color: #374151;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid #f3f4f6;
                }

                .khaneco-feature {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid #f3f4f6;
                }

                .khaneco-feature:last-child {
                    border-bottom: none;
                }

                .khaneco-feature-info {
                    flex: 1;
                }

                .khaneco-feature-name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #374151;
                    margin-bottom: 2px;
                }

                .khaneco-feature-desc {
                    font-size: 12px;
                    color: #6b7280;
                }

                .khaneco-toggle {
                    position: relative;
                    width: 44px;
                    height: 24px;
                    background: #d1d5db;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .khaneco-toggle.active {
                    background: #dc2626;
                }

                .khaneco-toggle-slider {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    transition: transform 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .khaneco-toggle.active .khaneco-toggle-slider {
                    transform: translateX(20px);
                }

                .khaneco-input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.2s;
                    background: white;
                    color: #374151;
                }

                .khaneco-input:focus {
                    outline: none;
                    border-color: #dc2626;
                }

                .khaneco-slider {
                    width: 100%;
                    height: 6px;
                    border-radius: 3px;
                    background: #e5e7eb;
                    outline: none;
                    -webkit-appearance: none;
                    margin: 10px 0;
                }

                .khaneco-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .khaneco-user-info {
                    background: #f9fafb;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .khaneco-user-name {
                    font-size: 16px;
                    font-weight: bold;
                    color: #374151;
                    margin-bottom: 5px;
                }

                .khaneco-user-id {
                    font-size: 12px;
                    color: #6b7280;
                }

                /* Modo escuro */
                .dark-mode .khaneco-panel {
                    background: #1f2937;
                    color: white;
                }

                .dark-mode .khaneco-section-title {
                    color: #f9fafb;
                    border-bottom-color: #374151;
                }

                .dark-mode .khaneco-feature-name {
                    color: #f9fafb;
                }

                .dark-mode .khaneco-feature-desc {
                    color: #9ca3af;
                }

                .dark-mode .khaneco-feature {
                    border-bottom-color: #374151;
                }

                .dark-mode .khaneco-input {
                    background: #374151;
                    border-color: #4b5563;
                    color: white;
                }

                .dark-mode .khaneco-user-info {
                    background: #374151;
                }

                .dark-mode .khaneco-user-name {
                    color: #f9fafb;
                }

                .dark-mode .khaneco-slider {
                    background: #4b5563;
                }

                @media (max-width: 500px) {
                    .khaneco-panel {
                        width: 90%;
                        max-width: 400px;
                    }
                    
                    .khaneco-watermark {
                        top: 10px;
                        right: 10px;
                        width: 50px;
                        height: 50px;
                    }
                    
                    .khaneco-icon {
                        width: 25px;
                        height: 25px;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    createWatermark() {
        this.watermark = document.createElement('div');
        this.watermark.className = 'khaneco-watermark';
        this.watermark.innerHTML = `
            <svg class="khaneco-icon" viewBox="0 0 100 100">
                <path d="M20 25 L20 75 C20 82 27 85 30 85 L60 85 C63 85 70 82 70 75 L70 25 Z" />
                <path d="M70 35 C75 35 80 40 80 45 L80 55 C80 60 75 65 70 65" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="35" cy="15" r="1.5" opacity="0.7">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="45" cy="12" r="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="55" cy="15" r="1.5" opacity="0.6">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        document.body.appendChild(this.watermark);
    }

    createMainPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'khaneco-panel';
        this.panel.innerHTML = `
            <div class="khaneco-header">
                <h2 class="khaneco-title">KHANECO</h2>
                <div class="khaneco-version">${ver}</div>
                <button class="khaneco-close">×</button>
            </div>
            <div class="khaneco-content">
                <div class="khaneco-user-info">
                    <div class="khaneco-user-name">${user.nickname || 'Usuário'}</div>
                    <div class="khaneco-user-id">ID: ${user.UID || '00000'}</div>
                </div>

                <div class="khaneco-section">
                    <div class="khaneco-section-title">🎯 Recursos Principais</div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Falsificar Respostas</div>
                            <div class="khaneco-feature-desc">Mostra respostas incorretas como corretas</div>
                        </div>
                        <div class="khaneco-toggle active" data-feature="questionSpoof">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Falsificar Vídeos</div>
                            <div class="khaneco-feature-desc">Marca vídeos como assistidos automaticamente</div>
                        </div>
                        <div class="khaneco-toggle active" data-feature="videoSpoof">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Revelar Respostas</div>
                            <div class="khaneco-feature-desc">Mostra as respostas corretas das questões</div>
                        </div>
                        <div class="khaneco-toggle" data-feature="showAnswers">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Resposta Automática</div>
                            <div class="khaneco-feature-desc">Responde questões automaticamente</div>
                        </div>
                        <div class="khaneco-toggle" data-feature="autoAnswer">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                    <div class="khaneco-feature auto-answer-delay" style="display: none;">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Velocidade da Resposta</div>
                            <div class="khaneco-feature-desc">Controla o tempo entre respostas (1=rápido, 3=lento)</div>
                        </div>
                        <input type="range" class="khaneco-slider" min="1" max="3" value="${this.featureConfigs.autoAnswerDelay}" data-config="autoAnswerDelay">
                    </div>
                </div>

                <div class="khaneco-section">
                    <div class="khaneco-section-title">🎨 Personalização</div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Banner Personalizado</div>
                            <div class="khaneco-feature-desc">Substitui banners do site por mensagens personalizadas</div>
                        </div>
                        <div class="khaneco-toggle" data-feature="customBanner">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Logo RGB</div>
                            <div class="khaneco-feature-desc">Adiciona efeito colorido ao logo do Khan Academy</div>
                        </div>
                        <div class="khaneco-toggle" data-feature="rgbLogo">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Nome Personalizado</div>
                            <div class="khaneco-feature-desc">Altera o nome exibido no perfil</div>
                        </div>
                        <input type="text" class="khaneco-input" placeholder="Digite o nome personalizado" data-config="customUsername" value="${this.featureConfigs.customUsername}">
                    </div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Foto de Perfil Personalizada</div>
                            <div class="khaneco-feature-desc">URL da imagem para foto de perfil</div>
                        </div>
                        <input type="text" class="khaneco-input" placeholder="URL da imagem" data-config="customPfp" value="${this.featureConfigs.customPfp}">
                    </div>
                </div>

                <div class="khaneco-section">
                    <div class="khaneco-section-title">⚙️ Configurações</div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Modo Escuro</div>
                            <div class="khaneco-feature-desc">Alterna entre tema claro e escuro</div>
                        </div>
                        <div class="khaneco-toggle" data-feature="darkMode">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                    <div class="khaneco-feature">
                        <div class="khaneco-feature-info">
                            <div class="khaneco-feature-name">Farm de Minutos</div>
                            <div class="khaneco-feature-desc">Acumula minutos de estudo automaticamente</div>
                        </div>
                        <div class="khaneco-toggle" data-feature="minuteFarmer">
                            <div class="khaneco-toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.panel);
    }

    setupEventListeners() {
        // Toggle do watermark
        this.watermark.addEventListener('click', () => {
            this.togglePanel();
        });

        // Botão de fechar
        this.panel.querySelector('.khaneco-close').addEventListener('click', () => {
            this.hidePanel();
        });

        // Clique fora do painel
        this.panel.addEventListener('click', (e) => {
            if (e.target === this.panel) {
                this.hidePanel();
            }
        });

        // Toggles de recursos
        this.panel.querySelectorAll('.khaneco-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const feature = toggle.dataset.feature;
                const isActive = toggle.classList.contains('active');
                
                if (isActive) {
                    toggle.classList.remove('active');
                    this.features[feature] = false;
                } else {
                    toggle.classList.add('active');
                    this.features[feature] = true;
                }

                this.handleFeatureChange(feature, this.features[feature]);
                this.playSound('toggle');
            });
        });

        // Inputs de configuração
        this.panel.querySelectorAll('[data-config]').forEach(input => {
            input.addEventListener('input', (e) => {
                const config = e.target.dataset.config;
                const value = e.target.value;
                
                if (config === 'autoAnswerDelay') {
                    this.featureConfigs[config] = parseInt(value);
                } else {
                    this.featureConfigs[config] = value;
                }
            });
        });

        // ESC para fechar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hidePanel();
            }
        });
    }

    initializeFeatures() {
        // Inicializar toggles baseado no estado atual
        Object.keys(this.features).forEach(feature => {
            const toggle = this.panel.querySelector(`[data-feature="${feature}"]`);
            if (toggle) {
                if (this.features[feature]) {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
            }
        });

        // Mostrar/ocultar elementos dependentes
        this.updateDependentElements();
    }

    handleFeatureChange(feature, enabled) {
        window.features[feature] = enabled;

        // Lógica específica para cada recurso
        switch (feature) {
            case 'darkMode':
                this.toggleDarkMode(enabled);
                break;
            case 'autoAnswer':
                this.updateDependentElements();
                if (enabled && !this.features.questionSpoof) {
                    // Auto-habilitar questionSpoof se autoAnswer for habilitado
                    this.features.questionSpoof = true;
                    window.features.questionSpoof = true;
                    const questionSpoofToggle = this.panel.querySelector('[data-feature="questionSpoof"]');
                    if (questionSpoofToggle) {
                        questionSpoofToggle.classList.add('active');
                    }
                }
                break;
        }
    }

    updateDependentElements() {
        const autoAnswerEnabled = this.features.autoAnswer;
        const delayElement = this.panel.querySelector('.auto-answer-delay');
        if (delayElement) {
            delayElement.style.display = autoAnswerEnabled ? 'flex' : 'none';
        }
    }

    toggleDarkMode(enabled) {
        if (enabled) {
            document.documentElement.classList.add('dark-mode');
            if (window.DarkReader) {
                DarkReader.setFetchMethod(window.fetch);
                DarkReader.enable();
            }
        } else {
            document.documentElement.classList.remove('dark-mode');
            if (window.DarkReader) {
                DarkReader.disable();
            }
        }
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
        this.playSound('open');
    }

    hidePanel() {
        this.panel.classList.remove('visible');
        this.isVisible = false;
        this.playSound('close');
    }

    playSound(type) {
        const sounds = {
            toggle: 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav',
            open: 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav',
            close: 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'
        };

        if (sounds[type] && window.playAudio) {
            playAudio(sounds[type]);
        }
    }
}

// Inicializar a interface quando o DOM estiver pronto
(() => {
    const initUI = () => {
        if (document.body && window.user) {
            window.khanecoUI = new KhanecoUI();
            sendToast("🎨 Interface moderna carregada!", 3000);
        } else {
            setTimeout(initUI, 100);
        }
    };
    initUI();
})();