// Riproduce audio/roma_roma_roma.mp3 all'ingresso della pagina.
// Se il browser blocca l'autoplay, parte al primo tocco/click/tasto.
(function(){
  const audio=new Audio('audio/roma_roma_roma.mp3');
  audio.loop=true;audio.volume=.6;audio.preload='auto';
  const btn=document.createElement('button');
  btn.className='music-btn';btn.setAttribute('aria-label','Musica on/off');btn.textContent='\ud83d\udd07';
  document.body.appendChild(btn);
  const ui=on=>{btn.textContent=on?'\ud83d\udd0a':'\ud83d\udd07';btn.classList.toggle('on',on)};
  const play=()=>audio.play().then(()=>ui(true)).catch(()=>ui(false));
  const stop=()=>{audio.pause();ui(false)};
  btn.addEventListener('click',e=>{e.stopPropagation();if(audio.paused){play();localStorage.setItem('music','on')}else{stop();localStorage.setItem('music','off')}});
  if(localStorage.getItem('music')!=='off'){
    play();
    const evs=['pointerdown','keydown','touchstart'];
    const first=()=>{if(audio.paused&&localStorage.getItem('music')!=='off')play();evs.forEach(ev=>removeEventListener(ev,first))};
    evs.forEach(ev=>addEventListener(ev,first));
  }
})();
