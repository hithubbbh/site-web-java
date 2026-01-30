// --- Recherche ---
const searchinput = document.querySelector(".barrederecherche");
const searchbtn = document.querySelector(".search-button");
const produitsContainer = document.querySelector(".produits");

function rechercher() {
  const query = searchinput.value.toLowerCase();
  const produits = Array.from(produitsContainer.querySelectorAll(".produit-wrapper"));
  produits.forEach(prd => {
    const nom = prd.querySelector(".titre-produit").textContent.toLowerCase();
    prd.style.display = nom.includes(query) ? "block" : "none";
  });
}

if (searchbtn) searchbtn.addEventListener("click", rechercher);
if (searchinput) searchinput.addEventListener("input", rechercher);

// --- Tri ---
const selectTri = document.getElementById("tri");

if (selectTri && produitsContainer) {
  selectTri.addEventListener("change", () => {
    const valeur = selectTri.value;
    let produits = Array.from(produitsContainer.querySelectorAll(".produit-wrapper"));

    if (valeur === "alphabetique") {
      produits.sort((a, b) => a.querySelector(".titre-produit").textContent.localeCompare(b.querySelector(".titre-produit").textContent));
    } else if (valeur === "prix") {
      produits.sort((a, b) => parseInt(a.querySelector(".prix").textContent) - parseInt(b.querySelector(".prix").textContent));
    } else if (valeur === "theme") {
      produits.sort((a, b) => {
        let themeA = a.querySelector(".titre-produit").textContent.includes("Fleur") ? 1 : 0;
        let themeB = b.querySelector(".titre-produit").textContent.includes("Fleur") ? 1 : 0;
        return themeB - themeA;
      });
    } else {
      return;
    }

    produitsContainer.innerHTML = "";
    produits.forEach(p => produitsContainer.appendChild(p));
  });
}

// --- Fiche détaillée (modale 1) ---
const modal = document.getElementById("fiche-detaillee");
const modalImage = document.getElementById("modal-image");
const modalTitre = document.getElementById("modal-titre");
const modalPrix = document.getElementById("modal-prix");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector("#fiche-detaillee .close");

if (produitsContainer && modal) {
  produitsContainer.addEventListener("click", (e) => {
    const img = e.target.closest(".produit .image");
    if (!img) return;

    const parent = img.closest(".produit");
    modal.style.display = "block";
    if (modalImage) modalImage.src = img.src;
    if (modalTitre) modalTitre.textContent = parent.querySelector(".titre-produit").textContent;
    if (modalPrix) modalPrix.textContent = "Prix : " + parent.querySelector(".prix").textContent;
    if (modalDescription) modalDescription.textContent = parent.dataset.description || "Une belle bougie artisanale.";
  });

  if (closeBtn) closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
}

// --- Modal Ajouter Produit ---
const modalAjout2 = document.getElementById("modal-ajout2");
const btnAjout = document.getElementById("ajout");
const closeBtn2 = document.querySelector("#modal-ajout2 .close2");
const formAjout2 = document.getElementById("form-ajout-produit2");

if (btnAjout && modalAjout2) btnAjout.addEventListener("click", () => { modalAjout2.classList.add("open"); });
if (closeBtn2 && modalAjout2) closeBtn2.addEventListener("click", () => { modalAjout2.classList.remove("open"); });
if (modalAjout2) window.addEventListener("click", (event) => { if (event.target === modalAjout2) modalAjout2.classList.remove("open"); });

function afficherProduit(p) {
  const produitWrapper = document.createElement("div");
  produitWrapper.classList.add("produit-wrapper");
  produitWrapper.innerHTML = `
    <div class="produit" data-description="${p.description}">
      <div class="actions">
        <button class="favoris btn-modifier">Modifier</button>
        <button class="favoris btn-supprimer">Supprimer</button>
      </div>
      <img src="${p.imageURL}" alt="${p.titre}" class="image">
      <h3 class="titre-produit">${p.titre}</h3>
      <p class="prix">${p.prix} MAD</p>
    </div>
  `;
  produitsContainer.appendChild(produitWrapper);
}

if (formAjout2) formAjout2.addEventListener("submit", (e) => {
  e.preventDefault();

  const titre = document.getElementById("titre").value.trim();
  const prix = document.getElementById("prix").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!titre || !prix || !description || !imageFile) {
    alert("Merci de remplir tous les champs.");
    return;
  }

  const imageURL = URL.createObjectURL(imageFile);
  const produit = { titre, prix, description, imageURL };

  afficherProduit(produit);

  let produits = JSON.parse(localStorage.getItem("produits")) || [];
  produits.push(produit);
  localStorage.setItem("produits", JSON.stringify(produits));

  formAjout2.reset();
  modalAjout2.classList.remove("open");
});

// --- Modal Modifier Produit ---
const modalModifier = document.getElementById("modal-modifier");
const closeModifierBtn = document.querySelector(".close-modifier");
const formModifier = document.getElementById("form-modifier-produit");

let produitEnCours = null;

if (produitsContainer && modalModifier) {
  produitsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-modifier")) {
      produitEnCours = e.target.closest(".produit");

      const modifTitre = document.getElementById("modif-titre");
      const modifPrix = document.getElementById("modif-prix");
      const modifDescription = document.getElementById("modif-description");
      if (modifTitre) modifTitre.value = produitEnCours.querySelector(".titre-produit").textContent;
      if (modifPrix) modifPrix.value = produitEnCours.querySelector(".prix").textContent.replace(" MAD", "");
      if (modifDescription) modifDescription.value = produitEnCours.dataset.description;

      modalModifier.classList.add("open");
    }
  });

  if (closeModifierBtn) closeModifierBtn.addEventListener("click", () => { modalModifier.classList.remove("open"); });
  window.addEventListener("click", (event) => { if (event.target === modalModifier) modalModifier.classList.remove("open"); });

  if (formModifier) formModifier.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTitre = document.getElementById("modif-titre").value.trim();
    const newPrix = document.getElementById("modif-prix").value.trim();
    const newDescription = document.getElementById("modif-description").value.trim();
    const newImageFile = document.getElementById("modif-image").files[0];

    if (!newTitre || !newPrix || !newDescription) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    produitEnCours.querySelector(".titre-produit").textContent = newTitre;
    produitEnCours.querySelector(".prix").textContent = newPrix + " MAD";
    produitEnCours.dataset.description = newDescription;

    if (newImageFile) {
      const newImageURL = URL.createObjectURL(newImageFile);
      produitEnCours.querySelector(".image").src = newImageURL;
    }

    let produits = Array.from(produitsContainer.querySelectorAll(".produit")).map(p => ({
      titre: p.querySelector(".titre-produit").textContent,
      prix: p.querySelector(".prix").textContent.replace(" MAD", ""),
      description: p.dataset.description,
      imageURL: p.querySelector(".image").src
    }));
    localStorage.setItem("produits", JSON.stringify(produits));

    modalModifier.classList.remove("open");
  });
}

// --- Supprimer un produit avec confirmation ---
if (produitsContainer) {
  produitsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-supprimer")) {
      const produit = e.target.closest(".produit-wrapper");

      const confirmation = confirm("Voulez-vous vraiment supprimer ce produit ?");
      if (!confirmation) return;

      produit.remove();

      let produits = Array.from(produitsContainer.querySelectorAll(".produit")).map(p => ({
        titre: p.querySelector(".titre-produit").textContent,
        prix: p.querySelector(".prix").textContent.replace(" MAD", ""),
        description: p.dataset.description,
        imageURL: p.querySelector(".image").src
      }));
      localStorage.setItem("produits", JSON.stringify(produits));
    }
  });
}

// --- Charger les produits sauvegardés au démarrage ---
window.addEventListener("DOMContentLoaded", () => {
  let produits = JSON.parse(localStorage.getItem("produits")) || [];
  if (produitsContainer) produits.forEach(p => afficherProduit(p));
});

// --- Sidebar toggle ---
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebar-close');

  if (!sidebar) return;

  if (menuBtn) {
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      document.body.classList.toggle('sidebar-open');
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
    });
  }

  // Fermer la sidebar en cliquant en dehors
  document.addEventListener('click', function(ev) {
    if (!sidebar.classList.contains('open')) return;
    const isInside = sidebar.contains(ev.target) || (menuBtn && menuBtn.contains(ev.target));
    if (!isInside) {
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
    }
  });
});

// --- Graphique Fidélité Clients avec Chart.js ---
document.addEventListener('DOMContentLoaded', function() {
  const ctxFidelite = document.getElementById('fidelite-chart');
  const chartContainer = document.getElementById('chart-container');
  const emptyMessage = document.getElementById('chart-empty-message');
  
  if (!ctxFidelite || !chartContainer) return;

  // Données : niveaux de fidélité avec nombre de clients
  const clientData = [0, 0, 0, 0]; // Bronze, Argent, Or, Platine
  const hasData = clientData.some(value => value > 0);

  if (!hasData) {
    // Aucune donnée : afficher le message
    ctxFidelite.style.display = 'none';
    if (emptyMessage) emptyMessage.style.display = 'block';
    return;
  }

  // Données présentes : afficher le graphique
  if (emptyMessage) emptyMessage.style.display = 'none';
  ctxFidelite.style.display = 'block';

  const fideliteData = {
    labels: ['Bronze', 'Argent', 'Or', 'Platine'],
    datasets: [{
      label: '',
      data: clientData,
      backgroundColor: [
        '#F6D6AD',  // Bronze pastel
        '#C0C0C0',  // Argent pastel
        '#FFD700',  // Or pastel
        '#E5E4E2'   // Platine pastel
      ],
      borderColor: [
        '#E5C494',
        '#A9A9A9',
        '#DAA520',
        '#D3D3D3'
      ],
      borderWidth: 2,
      borderRadius: 8
    }]
  };

  new Chart(ctxFidelite, {
    type: 'doughnut',
    data: fideliteData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 12, family: "'Arial', sans-serif" },
            padding: 10,
            color: '#333'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed;
            }
          }
        }
      }
    }
  });
});
