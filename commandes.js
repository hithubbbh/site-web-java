// Données fictives de commandes
const commandesData = [];

// État global
let commandesAffichees = [...commandesData];
let commandeActuelle = null;

// Fonction pour afficher le tableau des commandes
function afficherCommandes() {
  const tbody = document.getElementById('commandes-tbody');
  const noResults = document.getElementById('no-results-message');
  
  if (commandesAffichees.length === 0) {
    tbody.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  tbody.innerHTML = commandesAffichees.map(cmd => `
    <tr>
      <td class="numero">${cmd.id}</td>
      <td>${cmd.client}</td>
      <td>${formatDate(cmd.date)}</td>
      <td>${cmd.montant} MAD</td>
      <td>
        <span class="statut ${getStatusClass(cmd.statut)}">${cmd.statut}</span>
      </td>
      <td>
        <div class="actions-cell">
          <button class="btn-details" onclick="ouvrirDetailsCommande('${cmd.id}')">Voir détails</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Fonction pour formatter la date
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('fr-FR');
}

// Fonction pour obtenir la classe CSS du statut
function getStatusClass(statut) {
  const statusMap = {
    'En attente': 'en-attente',
    'Confirmée': 'confirmee',
    'En préparation': 'en-preparation',
    'Livrée': 'livree',
    'Annulée': 'annulee'
  };
  return statusMap[statut] || '';
}

// Fonction pour filtrer les commandes
function filtrerCommandes() {
  const searchInput = document.getElementById('search-global').value.toLowerCase();
  const statusFilter = document.getElementById('filter-status').value;

  commandesAffichees = commandesData.filter(cmd => {
    const matchClient = cmd.client.toLowerCase().includes(searchInput);
    const matchStatus = statusFilter === '' || cmd.statut === statusFilter;
    return matchClient && matchStatus;
  });

  afficherCommandes();
}

// Fonction pour ouvrir les détails d'une commande
function ouvrirDetailsCommande(id) {
  commandeActuelle = commandesData.find(cmd => cmd.id === id);
  
  if (!commandeActuelle) return;

  // Remplir la modale
  document.getElementById('detail-numero').textContent = commandeActuelle.id;
  document.getElementById('detail-client').textContent = commandeActuelle.client;
  document.getElementById('detail-date').textContent = formatDate(commandeActuelle.date);
  document.getElementById('detail-status').textContent = commandeActuelle.statut;
  document.getElementById('detail-montant').textContent = commandeActuelle.montant;
  document.getElementById('detail-adresse').textContent = commandeActuelle.adresse;

  // Afficher les produits
  const produitsList = document.getElementById('detail-produits');
  produitsList.innerHTML = commandeActuelle.produits.map(p => `<li>${p}</li>`).join('');

  // Ouvrir la modale
  document.getElementById('modal-details').classList.add('open');
}

// Fonction pour fermer les modales
function fermerModale(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

// Fonction pour changer le statut
function ouvrirChangeStatus() {
  if (!commandeActuelle) return;
  document.getElementById('new-status').value = commandeActuelle.statut;
  document.getElementById('modal-change-status').classList.add('open');
}

function sauvegarderStatut() {
  if (!commandeActuelle) return;
  
  const newStatus = document.getElementById('new-status').value;
  const commande = commandesData.find(cmd => cmd.id === commandeActuelle.id);
  if (commande) {
    commande.statut = newStatus;
    commandeActuelle.statut = newStatus;
  }
  
  // Mettre à jour le tableau
  filtrerCommandes();
  
  // Fermer les modales
  fermerModale('modal-change-status');
  fermerModale('modal-details');
  
  alert('Statut de la commande ' + commandeActuelle.id + ' mis à jour avec succès !');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Afficher les commandes initiales
  afficherCommandes();

  // Recherche
  const searchInput = document.getElementById('search-global');
  const searchBtn = document.querySelector('.search-button');
  const statusFilter = document.getElementById('filter-status');

  if (searchInput) searchInput.addEventListener('input', filtrerCommandes);
  if (searchBtn) searchBtn.addEventListener('click', filtrerCommandes);
  if (statusFilter) statusFilter.addEventListener('change', filtrerCommandes);

  // Modales - Fermeture
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) fermerModale(modal.id);
    });
  });

  const closeBtns = document.querySelectorAll('.btn-close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) fermerModale(modal.id);
    });
  });

  // Fermer en cliquant en dehors
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      fermerModale(event.target.id);
    }
  });

  // Bouton Modifier le statut
  const btnChangeStatus = document.getElementById('btn-change-status');
  if (btnChangeStatus) btnChangeStatus.addEventListener('click', ouvrirChangeStatus);

  // Bouton Enregistrer le statut
  const btnSave = document.querySelector('#modal-change-status .btn-save');
  if (btnSave) btnSave.addEventListener('click', sauvegarderStatut);
});
