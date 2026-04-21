let timeLeft = 30;

async function sync() {
  const data = await API.fetchSignal();
  updateUI(data);
  timeLeft = 30;
}

setInterval(() => {
  timeLeft--;
  document.getElementById('timer').innerText = timeLeft;
  if (timeLeft <= 0) sync();
}, 1000);

sync();