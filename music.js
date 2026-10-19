// Musica originale generata con Web Audio API (nessun file audio esterno).
// Parte all'ingresso se il browser lo consente, altrimenti al primo tocco/click.
(function(){
  const btn=document.createElement('button');
  btn.className='music-btn';btn.setAttribute('aria-label','Musica on/off');btn.textContent='🔇';
  document.body.appendChild(btn);
  let ctx,master,timer,playing=false,step=0;
  const BPM=118,beat=60/BPM;
  // Melodia da coro da stadio (originale), note in Hz, 0 = pausa
  const N={C4:261.6,D4:293.7,E4:329.6,F4:349.2,G4:392,A4:440,B4:493.9,C5:523.3,D5:587.3,E5:659.3};
  const mel=[N.G4,N.G4,N.C5,N.C5,N.E5,N.D5,N.C5,0, N.A4,N.A4,N.D5,N.D5,N.F4*2,N.E5,N.D5,0, N.G4,N.B4,N.D5,N.G4*2,N.E5,N.C5,N.D5,N.B4, N.C5,N.E5,N.G4,N.E5,N.C5,0,N.C5,0];
  const bass=[130.8,130.8,146.8,146.8,98,98,130.8,130.8];
  function tone(f,t,d,type,vol){if(!f)return;const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(master);o.start(t);o.stop(t+d+.05)}
  function drum(t,low){const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(low?120:200,t);o.frequency.exponentialRampToValueAtTime(40,t+.15);g.gain.setValueAtTime(.6,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g).connect(master);o.start(t);o.stop(t+.25)}
  function clap(t){const b=ctx.createBuffer(1,ctx.sampleRate*.1,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=ctx.createBufferSource(),g=ctx.createGain();s.buffer=b;g.gain.value=.25;s.connect(g).connect(master);s.start(t)}
  function schedule(){const t=ctx.currentTime+.05;const i=step%mel.length;tone(mel[i],t,beat*.9,'triangle',.18);tone(mel[i]/2,t,beat*.9,'sawtooth',.04);if(i%2===0){tone(bass[(i/4|0)%bass.length],t,beat*1.8,'sine',.3);drum(t,true)}if(i%4===2)clap(t);step++}
  function start(){if(playing)return;ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();master=master||ctx.createGain();master.gain.value=.5;master.connect(ctx.destination);ctx.resume().then(()=>{if(ctx.state!=='running')return;playing=true;btn.textContent='🔊';btn.classList.add('on');timer=setInterval(schedule,beat*1000)})}
  function stop(){playing=false;clearInterval(timer);btn.textContent='🔇';btn.classList.remove('on')}
  btn.addEventListener('click',e=>{e.stopPropagation();playing?stop():start();localStorage.setItem('music',playing?'off':'on')});
  if(localStorage.getItem('music')!=='off'){
    try{start()}catch(e){}
    const first=()=>{if(!playing&&localStorage.getItem('music')!=='off')start();['pointerdown','keydown','touchstart'].forEach(ev=>removeEventListener(ev,first))};
    ['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,first,{once:true}));
  }
})();
