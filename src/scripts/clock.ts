// Live time in Pakistan (Asia/Karachi), HH:MM:SS.
const clock = document.getElementById('clock');
if (clock) {
  let fmt: Intl.DateTimeFormat | null = null;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  } catch {
    fmt = null;
  }
  const tick = () => {
    clock.textContent = fmt ? fmt.format(new Date()) : 'PKT';
  };
  tick();
  if (fmt) setInterval(tick, 1000);
}

export {};
