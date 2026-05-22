// JavaScript for interactivity, popups, and animations

document.addEventListener('DOMContentLoaded', ()=>{
  const cards = document.querySelectorAll('.card');
  const noteCards = document.querySelectorAll('.note-card');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalDetails = document.getElementById('modal-details');
  const modalClose = document.getElementById('modalClose');
  const modalHeart = document.getElementById('modal-heart');
  const surpriseBtn = document.getElementById('surpriseBtn');
  const postcardBtn = document.getElementById('postcardBtn');
  const postcard = document.querySelector('.postcard');
  const noteText = document.getElementById('noteText');
  const statusText = document.getElementById('statusText');
  const floatArea = document.getElementById('float-area');

  const messages = {
    why: {
      tag: 'Exact words',
      title: 'Why I Love You',
      body: `hit nti aktr insan 9lbo byd w ajmal bnita 3rftha w aktar bnigta dryfaaa
nti insana li bghit nkml m3aha hyati latalama knti dryfa m3aaya w ktsm3iliya w kulshi i love you soosoosos muchhh hajaroo \u2764\uFE0F`,
      details: [
        'This one stays exactly the way you wrote it.',
        'No rewritten version, no polished version, just your real words.',
        'That is what makes it special.'
      ]
    },
    smile: {
      tag: 'A favorite thing',
      title: 'My Favorite Smile',
      body: 'Hajaro, your smile changes the whole atmosphere around me. It makes the heavy moments feel lighter and the good moments feel even more beautiful.',
      details: [
        'It is the kind of smile that stays in my head after the moment ends.',
        'It gives warmth without even trying.',
        'It is one of the first things my heart notices about you.'
      ]
    },
    safe: {
      tag: 'What stands out',
      title: 'Your Kindness',
      body: 'The kindness in you feels honest and rare. The way you care, the way you listen, and the softness in your heart make you unforgettable to me.',
      details: [
        'You make people feel comfortable just by being yourself.',
        'There is gentleness in the way you carry your heart.',
        'That kindness is one of the reasons loving you feels so natural.'
      ]
    },
    forever: {
      tag: 'The deeper part',
      title: 'My Love for You',
      body: 'My love for you is not loud for one second and gone the next. It is steady, real, and growing. It lives in the small moments, the quiet thoughts, and every soft dream I have about us.',
      details: [
        'It shows up when I wake up and think of you.',
        'It stays when the day gets quiet.',
        'It keeps choosing you again and again.'
      ]
    }
  };

  const rotatingThoughts = [
    'your smile makes every day look better.',
    'you have one of the kindest hearts I know.',
    'loving you feels soft, simple, and real.',
    'even this page still cannot say enough about you.'
  ];

  const notes = {
    smile: 'Your smile has this quiet power. It can calm me, lift me, and make even a simple moment feel unforgettable.',
    energy: 'There is something about your energy that makes everything feel easier. You bring comfort without forcing it and beauty without trying too hard.',
    heart: 'The most beautiful thing about you is your heart. It is soft, kind, and full of the kind of warmth people never forget.'
  };

  let thoughtIndex = 0;

  function heartBurst(count = 7, originX = 50, originY = 65){
    for(let i = 0; i < count; i += 1){
      const el = document.createElement('div');
      el.className = 'heart-burst';
      const size = 10 + Math.random() * 18;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${originX + (Math.random() * 10 - 5)}%`;
      el.style.top = `${originY + (Math.random() * 10 - 5)}%`;
      floatArea.appendChild(el);

      const dx = Math.random() * 160 - 80;
      const dy = -120 - Math.random() * 120;
      const scale = 0.7 + Math.random() * 0.8;
      const rotate = Math.random() * 90 - 45;

      el.animate([
        {transform: 'translate(0, 0) scale(1)', opacity: 1},
        {transform: `translate(${dx}px, ${dy}px) scale(${scale}) rotate(${rotate}deg)`, opacity: 0}
      ], {
        duration: 1500 + Math.random() * 900,
        easing: 'cubic-bezier(.2,.7,.2,1)'
      }).onfinish = ()=>el.remove();
    }
  }

  function showModal(key){
    const message = messages[key] || messages.forever;
    modalTag.textContent = message.tag;
    modalTitle.textContent = message.title;
    modalBody.innerHTML = '';
    modalDetails.innerHTML = '';

    modalTitle.classList.add('pop');
    setTimeout(()=>modalTitle.classList.remove('pop'), 500);

    const body = document.createElement('div');
    body.className = 'personal-message';
    body.textContent = message.body;
    modalBody.appendChild(body);

    message.details.forEach((detail)=>{
      const item = document.createElement('li');
      item.textContent = detail;
      modalDetails.appendChild(item);
    });

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    heartBurst(6);
  }

  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  function setActiveNote(key){
    noteCards.forEach((card)=>{
      const isActive = card.dataset.note === key;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-pressed', String(isActive));
    });

    noteText.textContent = notes[key] || notes.smile;
    heartBurst(4, 28, 78);
  }

  function rotateThought(){
    thoughtIndex = (thoughtIndex + 1) % rotatingThoughts.length;
    statusText.textContent = rotatingThoughts[thoughtIndex];
  }

  cards.forEach((card, index)=>{
    card.style.setProperty('--tilt', index % 2 === 0 ? '-1.5' : '1.5');

    card.addEventListener('click', ()=>{
      showModal(card.dataset.key);
    });

    card.addEventListener('keyup', (event)=>{
      if(event.key === 'Enter' || event.key === ' '){
        card.click();
      }
    });
  });

  noteCards.forEach((card)=>{
    card.addEventListener('click', ()=>{
      setActiveNote(card.dataset.note);
    });
  });

  surpriseBtn.addEventListener('click', ()=>{
    modalTag.textContent = 'Just because';
    modalTitle.textContent = 'A Sweet Surprise';
    modalBody.innerHTML = '';
    modalDetails.innerHTML = '';

    const msg = document.createElement('div');
    msg.className = 'personal-message';
    msg.textContent = 'Hajaro, I love you more than words can explain. You are my peace, my favorite smile, and the softest part of my heart.';
    modalBody.appendChild(msg);

    ['You make ordinary moments feel beautiful.', 'You stay on my mind in the sweetest way.', 'This page is only a small piece of how much I love you.'].forEach((detail)=>{
      const item = document.createElement('li');
      item.textContent = detail;
      modalDetails.appendChild(item);
    });

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    heartBurst(12, 50, 55);
  });

  postcardBtn.addEventListener('click', ()=>{
    postcard.classList.add('postcard-bounce');
    setTimeout(()=>postcard.classList.remove('postcard-bounce'), 520);
    setActiveNote('heart');
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event)=>{
    if(event.target === modal || event.target.classList.contains('modal-backdrop')){
      closeModal();
    }
  });

  modalHeart.addEventListener('click', ()=>heartBurst(10, 52, 58));

  document.addEventListener('keydown', (event)=>{
    if(event.key === 'Escape' && modal.classList.contains('show')){
      closeModal();
    }
  });

  document.addEventListener('mousemove', (event)=>{
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    document.documentElement.style.setProperty('--mx', `${x}px`);
    document.documentElement.style.setProperty('--my', `${y}px`);
  });

  setInterval(rotateThought, 3200);
});
