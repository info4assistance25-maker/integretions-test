// Musica all'ingresso. I browser bloccano l'audio automatico senza un'interazione,
// quindi: prova l'autoplay; se bloccato mostra la schermata "Entra" e parte al tocco.
(function(){
  const audio=new Audio('audio/roma_roma_roma.mp3');
  audio.loop=true;audio.volume=.7;audio.preload='auto';
  const btn=document.createElement('button');
  btn.className='music-btn';btn.setAttribute('aria-label','Musica on/off');
  document.body.appendChild(btn);
  const ui=on=>{btn.textContent=on?'\ud83d\udd0a':'\ud83d\udd07';btn.classList.toggle('on',on)};
  ui(false);
  const play=()=>audio.play().then(()=>{ui(true);return true}).catch(()=>{ui(false);return false});
  btn.addEventListener('click',e=>{e.stopPropagation();audio.paused?play():(audio.pause(),ui(false))});

  const splash=document.createElement('div');
  splash.className='splash';
  splash.innerHTML='<div class="splash-in"><div class="splash-crown">\ud83d\udc51</div><h2>Il Re dei <span>Bomber</span></h2><button class="splash-btn">\u25b6 Entra in campo</button><p>Tocca per entrare con la musica</p></div>';
  const enter=()=>{play();splash.classList.add('out');setTimeout(()=>splash.remove(),600)};
  splash.addEventListener('click',enter);

  play().then(ok=>{if(!ok){document.body.appendChild(splash)}});
})();
