const container = document.getElementById("card-container");

fetch("card.json")
    .then(response => response.json())
    .then(cardsData => {
        cardsData.forEach(card => {
            const cardHTML = `
        <div class="profile__card">
          <div class="profile__image">
              <img src="${card.image}" alt="${card.name}">
          </div>
          <div class="profile__info-section">
              <div class="bio">
                  <h2 class="name">${card.name}</h2>
                  <p class="description">${card.description}</p>
                    <div class="price">${card.price}</div>
                  </div>
              
              <div class="profile__action-area">
                  <div class="intro-text">
                      <p class="glav">${card.glav}</p>
                  </div>
                  <div class="social-icon">
                      <a href="#" data-phone="${card.phone}" class="whatsapp-btn">
                          <i class="fa-brands fa-whatsapp"></i>
                      </a>
                      <a href="#" class="panorama-btn" data-id="${card.id}">
                          <i class="fa-solid fa-panorama"></i>
                      </a>
                      <a href="#" class="info-btn" data-id="${card.id}">
                          <i class="fa-solid fa-info"></i>
                      </a>
                      <a href="#" class="like-btn" data-id="${card.id}">
                      <i class="fa-brands fa-cc-paypal"></i>
                      </a>
                  </div>
              </div>
          </div>
        </div>
      `;
            container.innerHTML += cardHTML;
        });
    })
    .catch(error => console.error("Ошибка загрузки JSON:", error));