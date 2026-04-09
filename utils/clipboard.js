const Clipboard = {
  async copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        this.showToast('Copied to clipboard!');
        return true;
      } catch (err) {
        console.error('Clipboard API failed:', err);
      }
    }
    return this.fallbackCopy(text);
  },

  fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        this.showToast('Copied to clipboard!');
        return true;
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      document.body.removeChild(textArea);
    }
    return false;
  },

  showToast(message) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast animate-slide-up';
    toast.innerHTML = `
      <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      ${message}
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('animate-slide-up');
      toast.classList.add('animate-slide-down');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Clipboard;
}