// Inject styles once
let stylesInjected = false;

function injectStyles(): void {
    if (stylesInjected) return;
    
    const style = document.createElement('style');
    style.textContent = `
/* Toast notification styles */
.alootid-toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.alootid-toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(21, 128, 61, 0.95));
    color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 
                0 0 0 1px rgba(255, 255, 255, 0.2),
                0 4px 12px rgba(34, 197, 94, 0.4);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    min-width: 280px;
    max-width: 400px;
    opacity: 0;
    transform: translateX(400px);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.alootid-toast-show {
    opacity: 1;
    transform: translateX(0);
}

.alootid-toast-hide {
    opacity: 0;
    transform: translateX(400px) scale(0.8);
}

.alootid-toast-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.alootid-toast-message {
    flex: 1;
    line-height: 1.4;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.alootid-toast:not(:last-child) {
    margin-bottom: 8px;
}
    `;
    document.head.appendChild(style);
    stylesInjected = true;
}

/**
 * Shows a toast notification to the user
 * @param message The message to display in the toast
 * @param duration Duration in milliseconds (default: 3000)
 */
export function showToast(message: string, duration: number = 3000): void {
    // Inject styles if not already done
    injectStyles();
    
    // Check if a toast container already exists, if not create one
    let toastContainer = document.querySelector('.alootid-toast-container') as HTMLElement;
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'alootid-toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'alootid-toast';
    
    // Create icon
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'alootid-toast-icon');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('width', '20');
    icon.setAttribute('height', '20');
    
    const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    checkPath.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z');
    checkPath.setAttribute('fill', 'currentColor');
    icon.appendChild(checkPath);
    
    // Create message element
    const messageEl = document.createElement('span');
    messageEl.className = 'alootid-toast-message';
    messageEl.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(messageEl);
    toastContainer.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('alootid-toast-show');
    });
    
    // Remove toast after duration
    setTimeout(() => {
        toast.classList.remove('alootid-toast-show');
        toast.classList.add('alootid-toast-hide');
        
        setTimeout(() => {
            toast.remove();
            
            // Remove container if no more toasts
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        }, 300);
    }, duration);
}
