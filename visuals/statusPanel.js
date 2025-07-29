// Status panel simplificado para Khaneco
Object.assign(statsPanel.style, {
    position: 'fixed', 
    bottom: '20px', 
    left: '20px', 
    padding: '8px 15px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    color: '#374151', 
    fontSize: '12px', 
    fontFamily: 'MuseoSans, Arial, sans-serif',
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px',
    cursor: 'default', 
    borderRadius: '12px',
    userSelect: 'none', 
    zIndex: '1000', 
    transition: 'all 0.3s ease',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
});

const getTime = () => new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
});

const updateStatus = () => {
    const activeFeatures = Object.keys(window.features).filter(f => window.features[f]).length;
    statsPanel.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: #dc2626; font-weight: bold;">Khaneco</span>
            <span style="color: #6b7280;">•</span>
            <span>${activeFeatures} recursos ativos</span>
            <span style="color: #6b7280;">•</span>
            <span>${getTime()}</span>
        </div>
    `;
};

// Tornar o painel arrastável
let isDragging = false, offsetX, offsetY;

statsPanel.addEventListener('mousedown', e => { 
    isDragging = true; 
    offsetX = e.clientX - statsPanel.offsetLeft; 
    offsetY = e.clientY - statsPanel.offsetTop; 
    statsPanel.style.transform = 'scale(0.98)'; 
});

statsPanel.addEventListener('mouseup', () => { 
    isDragging = false; 
    statsPanel.style.transform = 'scale(1)'; 
});

document.addEventListener('mousemove', e => { 
    if (isDragging) { 
        const newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - statsPanel.offsetWidth));
        const newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - statsPanel.offsetHeight));
        Object.assign(statsPanel.style, { 
            left: `${newX}px`, 
            top: `${newY}px`,
            bottom: 'auto'
        }); 
    }
});

// Adicionar suporte ao modo escuro
const updateTheme = () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    if (isDark) {
        Object.assign(statsPanel.style, {
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            color: '#f9fafb',
            border: '1px solid rgba(220, 38, 38, 0.3)'
        });
    } else {
        Object.assign(statsPanel.style, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#374151',
            border: '1px solid rgba(220, 38, 38, 0.2)'
        });
    }
};

// Observer para mudanças de tema
const themeObserver = new MutationObserver(updateTheme);
themeObserver.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['class'] 
});

updateStatus(); 
updateTheme();
document.body.appendChild(statsPanel); 
setInterval(updateStatus, 1000);

if(device.mobile) plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? statsPanel.style.display = 'flex' : statsPanel.style.display = 'none' );