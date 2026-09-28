const dbgBtn = document.getElementById('btnDebug');
const toastEl = document.getElementById('toast');

let toastTimer: ReturnType<typeof setTimeout> | undefined;
function toast(msg: string) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2000);
}

dbgBtn?.addEventListener('click', () => {
  const on = document.body.classList.toggle('debug');
  dbgBtn.setAttribute('aria-pressed', String(on));
  toast(on ? 'debugPaintSizeEnabled = true' : 'debugPaintSizeEnabled = false');
});
