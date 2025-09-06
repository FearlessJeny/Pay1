/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

//   menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // При нажатии на каждую ссылку nav__link класс show-menu удаляется.
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    // когда прокрутка превышает высоту области просмотра 50, добавьте класс blur-header к тегу заголовка
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)










// document.querySelectorAll('.whatsapp-btn').forEach(btn => {
//     btn.addEventListener('click', function (e) {
//         e.preventDefault();
//         let card = this.closest('.profile-card');
//         let img = card.querySelector('img');
//         let altText = img.getAttribute('alt'); // <-- берём ALT из фото

//         let phone = this.getAttribute('data-phone');
//         let baseText = "Привет! Смотри фото:"; // твой текст
//         let text = `${baseText} ${altText}`;

//         window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
//     });
// });



// document.querySelectorAll('.panorama-btn').forEach(btn => {
//     btn.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = this.getAttribute('data-id');
//         const set = document.querySelector(`#product-panoramas .panorama-set[data-id="${id}"]`);
//         if (!set) return;

//         const images = Array.from(set.querySelectorAll('img')).map(img => img.src);
//         let current = 0;

//         // Создаём модальное окно
//         const modal = document.createElement('div');
//         modal.classList.add('modal');
//         modal.innerHTML = `
//             <span class="close">&times;</span>
//             <span class="prev">&#10094;</span>
//             <img src="${images[current]}" alt="panorama">
//             <span class="next">&#10095;</span>
//         `;
//         document.body.appendChild(modal);

//         const modalImg = modal.querySelector('img');

//         function showImage(index) {
//             modalImg.src = images[index];
//         }

//         modal.querySelector('.close').onclick = () => modal.remove();
//         modal.querySelector('.prev').onclick = () => {
//             current = (current - 1 + images.length) % images.length;
//             showImage(current);
//         }
//         modal.querySelector('.next').onclick = () => {
//             current = (current + 1) % images.length;
//             showImage(current);
//         }

//         // Свайп для мобильных
//         let startX = 0;
//         modalImg.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
//         modalImg.addEventListener('touchend', e => {
//             let endX = e.changedTouches[0].clientX;
//             if (startX - endX > 50) { current = (current + 1) % images.length; showImage(current); }
//             else if (endX - startX > 50) { current = (current - 1 + images.length) % images.length; showImage(current); }
//         });
//     });
// });




// document.querySelectorAll('.info-btn').forEach(btn => {
//     btn.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = this.getAttribute('data-id');
//         const descBlock = document.querySelector(`#product-descriptions .description[data-id="${id}"]`);
//         const description = descBlock ? descBlock.innerHTML : "Описание отсутствует";

//         // Создаем модальное окно
//         const modal = document.createElement('div');
//         modal.classList.add('modal-description');
//         modal.innerHTML = `
//             <div class="content">
//                 <span class="close">&times;</span>
//                 <p>${description}</p>
//             </div>
//         `;
//         document.body.appendChild(modal);

//         modal.querySelector('.close').onclick = () => modal.remove();
//     });
// });



// Универсальная делегация кликов — работает с динамически подгруженным контентом
document.addEventListener('click', (e) => {
  // ---- WHATSAPP ----
  const waBtn = e.target.closest('.whatsapp-btn');
  if (waBtn) {
    e.preventDefault();

    // Ищем карточку — пробуем несколько вариантов селекторов (на случай, если у тебя profile__card или profile-card)
    const card = waBtn.closest('.profile__card') || waBtn.closest('.profile-card') || waBtn.closest('.card');
    const img = card ? card.querySelector('img') : null;
    const altText = img ? (img.alt || img.getAttribute('alt') || '') : '';

    let phone = waBtn.dataset.phone || waBtn.getAttribute('data-phone') || '9720532570604';
    phone = String(phone).replace(/\D/g, ''); // оставляем только цифры

    const baseText = "Привет! Смотри фото:";
    const text = `${baseText} ${altText}`.trim();

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    return;
  }

  // ---- PANORAMA (галерея) ----
  const panoBtn = e.target.closest('.panorama-btn');
  if (panoBtn) {
    e.preventDefault();

    const id = panoBtn.dataset.id;
    if (!id) {
      console.warn('panorama-btn без data-id');
      return;
    }

    // Ищем набор изображений для этой панели (убедись, что у тебя есть #product-panoramas .panorama-set[data-id="..."])
    const set = document.querySelector(`#product-panoramas .panorama-set[data-id="${id}"]`);
    if (!set) {
      console.warn('Panorama set not found for id', id);
      return;
    }

    const images = Array.from(set.querySelectorAll('img')).map(i => i.dataset.src || i.src).filter(Boolean);
    if (!images.length) return;

    let current = 0;

    // Создаём оверлей + модалку
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" aria-label="Close">&times;</button>
        <button class="modal-prev" aria-label="Prev">&#10094;</button>
        <img class="modal-img" src="${images[0]}" alt="">
        <button class="modal-next" aria-label="Next">&#10095;</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const modalImg = overlay.querySelector('.modal-img');
    const closeBtn = overlay.querySelector('.modal-close');
    const prevBtn = overlay.querySelector('.modal-prev');
    const nextBtn = overlay.querySelector('.modal-next');

    function show(index) {
      current = (index + images.length) % images.length;
      modalImg.src = images[current];
    }

    closeBtn.addEventListener('click', () => overlay.remove());
    prevBtn.addEventListener('click', () => show(current - 1));
    nextBtn.addEventListener('click', () => show(current + 1));

    // Закрытие по клику вне контента
    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay) overlay.remove();
    });

    // Клавиши
    const onKey = (ev) => {
      if (ev.key === 'Escape') overlay.remove();
      if (ev.key === 'ArrowLeft') show(current - 1);
      if (ev.key === 'ArrowRight') show(current + 1);
    };
    document.addEventListener('keydown', onKey);

    // Удаляем обработчик при закрытии
    const cleanup = () => document.removeEventListener('keydown', onKey);
    overlay.addEventListener('remove', cleanup);
    // Также вызываем cleanup при удалении через closeBtn
    closeBtn.addEventListener('click', cleanup);

    // Touch swipe (простая реализация)
    let startX = 0;
    modalImg.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    modalImg.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) show(current + 1);
      else if (endX - startX > 50) show(current - 1);
    });

    return;
  }

  // ---- INFO BUTTON (пример) ----
  const infoBtn = e.target.closest('.info-btn');
  if (infoBtn) {
    e.preventDefault();
    const id = infoBtn.dataset.id;
    console.log('info clicked for id:', id);
    // тут можешь открыть модалку с инфо, fetch, и т.д.
    return;
  }
});

