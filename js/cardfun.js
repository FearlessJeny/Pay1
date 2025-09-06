
//   const container = document.getElementById("cards");
//   const links = document.querySelectorAll(".nav__link[data-file]");

//   function loadContent(file, el) {
//     fetch(file)
//       .then(res => res.text())
//       .then(html => {
//         container.classList.add("fade-out");
//         setTimeout(() => {
//           container.innerHTML = html;
//           container.classList.remove("fade-out");
//           container.classList.add("fade-in");
//           setTimeout(() => container.classList.remove("fade-in"), 300);
//         }, 300);

//         // Подсветка активного пункта меню
//         links.forEach(link => link.classList.remove("active-link"));
//         el.classList.add("active-link");
//       })
//       .catch(() => {
//         container.innerHTML = "<p>Ошибка загрузки!</p>";
//       });
//   }

//   links.forEach(link => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault(); // чтобы не прыгал якорь
//       const file = link.dataset.file;
//       if (file) {
//         loadContent(file, link);
//       }
//     });
//   });

//   // Загружаем стартовый раздел (soft.html)
//   loadContent("soft.html", document.querySelector(".nav__link[data-file='soft.html']"));





document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards");
  const nav = document.getElementById("nav-menu");
  const links = nav.querySelectorAll(".nav__link[data-file]");

  async function loadContent(file, clickedLink = null) {
    try {
      container.classList.add("fade-out");
      const res = await fetch(file, { cache: "no-store" });
      if (!res.ok) throw new Error(res.status);
      const html = await res.text();

      // заменяем контент
      setTimeout(() => {
        container.innerHTML = html;
        container.classList.remove("fade-out");
        container.classList.add("fade-in");
        setTimeout(() => container.classList.remove("fade-in"), 250);
      }, 200);

      // подсветка активного пункта
      links.forEach(a => a.classList.remove("active-link"));
      if (clickedLink) clickedLink.classList.add("active-link");
    } catch (e) {
      console.error("Fetch error:", e);
      container.innerHTML = `<p style="padding:1rem">Ошибка загрузки (${e}).</p>`;
      container.classList.remove("fade-out");
    }
  }

  // Обработчики ссылок меню
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const file = link.dataset.file;
      if (file) loadContent(file, link);
    });
  });

  // Делегирование кликов внутри карточек (контент меняется -> навешиваем один раз)
  document.addEventListener("click", (e) => {
    // WhatsApp
    const wa = e.target.closest(".whatsapp-btn");
    if (wa) {
      e.preventDefault();
      const phone = wa.dataset.phone || "9720532570604";
      window.open(`https://wa.me/${phone}`, "_blank");
    }

    // Info
    const info = e.target.closest(".info-btn");
if (info) {  // ✅ проверяем существование именно info
  e.preventDefault();
  const id = info.dataset.id; // ✅ берём dataset у info
  console.log("info clicked for id:", id);

  // ---- открываем модалку с описанием ----
  const descriptionEl = document.querySelector(`#product-descriptions .description[data-id="${id}"]`);
  if (!descriptionEl) return;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <p>${descriptionEl.textContent}</p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".modal-close").onclick = () => modal.remove();
}

    // Panorama
    const pano = e.target.closest(".panorama-btn");
    if (pano) {
      e.preventDefault();
      const id = pano.dataset.id;
      console.log("panorama:", id);
      // твоя логика открытия панорамы/галереи
    }
  });

  // Стартовая загрузка
  loadContent("card/soft.html", nav.querySelector(`.nav__link[data-file="card/soft.html"]`));
});
