let programmes = [];

function afficherFormations() {
  const container = document.querySelector('.card-container');
  if (!container) return;

  container.innerHTML = '';

  programmes.forEach(programme => {
    const card = document.createElement('div');
    card.className = 'cards';
    card.innerHTML = `
      <img src="../assets/chapeau2.jpg" alt="chapeau" class="chapeau">
      <h3>${programme.titre}</h3>
      <p>${programme.description}</p>
      <p><strong>Durée:</strong> ${programme.durée}</p>
      <p><strong>Compétences:</strong> ${programme.compétences}</p>
      <a href="contact.html">S'inscrire</a>
    `;
    container.appendChild(card);
  });
}

function afficherMessage(message) {
  const msg = document.createElement('div');
  msg.textContent = message;
  msg.style.position = 'fixed';
  msg.style.bottom = '20px';
  msg.style.right = '20px';
  msg.style.backgroundColor = message.includes('✅') ? '#4CAF50' : '#f44336';
  msg.style.color = 'white';
  msg.style.padding = '10px 20px';
  msg.style.borderRadius = '5px';
  msg.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  msg.style.zIndex = '1000';
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000);
}

// Gestion du menu toggle (mobile)
const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".liste");
if(menuToggle && menuList) {
  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });
}

function loadProgrammes() {
  const form = document.getElementById("add-form");

  axios.get('http://localhost:4007/programmes')
    .then(res => {
      programmes = res.data;
      afficherFormations();
    })
    .catch(error => {
      console.error("Erreur lors du chargement des formations :", error);
    });

  if(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const titre = document.getElementById('titre').value.trim();
      const description = document.getElementById('description').value.trim();
      const duree = document.getElementById('duree').value.trim();
      const competences = document.getElementById('competences').value.trim();

      if(description.length > 150) {
        afficherMessage("La description ne doit pas dépasser 150 caractères.");
        return;
      }

      const newFormation = {
        titre,
        description,
        durée: duree,
        compétences: competences
      };

      axios.post('http://localhost:4007/programmes', newFormation)
        .then(res => {
          programmes.push(res.data);
          afficherFormations();
          afficherMessage(" Formation ajoutée avec succès !");
          form.reset();
        })
        .catch(error => {
          console.error("Erreur lors de l'ajout :", error);
          afficherMessage(" Échec de l'ajout de la formation.");
        });
    });
  }
}

