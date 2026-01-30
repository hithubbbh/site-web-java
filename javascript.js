const searchinput=document.querySelector(".barrederecherche");
const searchbtn=document.querySelector(".search-button");
const produit=document.querySelectorAll(".produits div");
function rechercher() {
    const query =searchinput.value.toLowerCase();
    produit.forEach(prd => {
        const nom=prd.querySelector("h3").textContent.toLowerCase();
        if(nom.includes(query))
        {
            prd.style.display= "block"; //montre

        }else{
            prd.style.display="none";
        }
        
    });
}
searchbtn.addEventListener("click",rechercher);
/*Ici, on donne la fonction comme “référence” à addEventListener.

Ça veut dire : “Quand il y a un clic, appelle cette fonction.”

On ne l’exécute pas tout de suite, on dit juste quelle fonction utiliser plus tard.

👉 C’est comme donner l’adresse d’une maison sans y aller tout de suite.

2. Quand on écrit rechercher() (avec parenthèses)
js
rechercher();
Ici, on exécute la fonction immédiatement.*/
searchinput.addEventListener("input",rechercher);


// Récupère la modale
const modal = document.getElementById("fiche-detaillee");
const modalImage = document.getElementById("modal-image");
const modalTitre = document.getElementById("modal-titre");
const modalPrix = document.getElementById("modal-prix");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close");

// Quand on clique sur une image produit
document.querySelectorAll(".produit .image").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImage.src = img.src;
    // Exemple : récupérer titre et prix depuis le parent
    const parent = img.closest(".produit");
    modalTitre.textContent = parent.querySelector(".titre-produit").textContent;
    modalPrix.textContent = "Prix : " + parent.querySelector(".prix").textContent;
    modalDescription.textContent = "Une belle bougie artisanale pour décorer votre intérieur.";
  });
});

// Fermer la modale
closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


/*document.getElementById("fiche-detaillee") → récupère la modale par son id.

document.querySelectorAll(".produit .image") → sélectionne toutes les images dans .produit.

.addEventListener("click", () => { ... }) → ajoute une fonction qui s’exécute quand on clique.

modal.style.display = "flex"; → affiche la modale (avant elle était none).

modalImage.src = img.src; → met l’image cliquée dans la fiche.

img.closest(".produit") → remonte au parent .produit pour récupérer titre et prix.
modalTitre.textContent = ... → change le texte du titre.

modalPrix.textContent = ... → change le texte du prix.

closeBtn.onclick = () => { ... } → ferme la modale quand on clique sur la croix.

window.onclick = (event) => { ... } → ferme la modale si on clique en dehors.*/


// Sélection du menu
const selectTri = document.getElementById("tri");
const produitsContainer = document.querySelector(".produits");

selectTri.addEventListener("change", () => {
  const valeur = selectTri.value;
  let produits = Array.from(produitsContainer.querySelectorAll(".produit-wrapper"));
  /*Array.from(...) → convertit cette NodeList en Array.

Avantage : tu peux utiliser toutes les méthodes puissantes des tableaux (sort, map, filter, reduce, etc.).
document.querySelectorAll(...) → cherche partout dans la page.

produitsContainer.querySelectorAll(...) → cherche seulement dans un bloc précis.*/

  if (valeur === "alphabetique") {
    produits.sort((a, b) => {
      let titreA = a.querySelector(".titre-produit").textContent.toLowerCase();
      let titreB = b.querySelector(".titre-produit").textContent.toLowerCase();
      return titreA.localeCompare(titreB);
    });
  }
  /*.sort() est une méthode des tableaux en JavaScript.
sort change les place des element et localecompare dit quel element doit etre en envoyant 0 1 OU MOINS 1 
Elle sert à trier les éléments d’un tableau.

Elle prend en paramètre une fonction de comparaison.
Voici comment sort travaille :

Il prend le tableau : [Produit1, Produit2, Produit3, Produit4].

Il compare deux éléments (par exemple Produit1 et Produit2).

Il appelle ta fonction avec a = Produit1, b = Produit2.

Si ta fonction retourne < 0, Produit1 reste avant Produit2.

Si ta fonction retourne > 0, Produit2 passe avant Produit1.

Il recommence avec d’autres paires (Produit2 et Produit3, etc.).

Il continue jusqu’à ce que tout le tableau soit trié.

👉 C’est comme un jeu de cartes : il compare deux cartes, décide laquelle doit venir avant, puis continue avec les autres.
Mais attention : .sort() ne sait pas tout seul comment comparer deux éléments.

Il a besoin d’une fonction de comparaison pour décider l’ordre.*/

  if (valeur === "prix") {
    produits.sort((a, b) => {
      let prixA = parseInt(a.querySelector(".prix").textContent);
      let prixB = parseInt(b.querySelector(".prix").textContent);
      return prixA - prixB;
    });
  }

  if (valeur === "theme") {
    produits.sort((a, b) => {
      let themeA = a.querySelector(".titre-produit").textContent.includes("Fleur") ? 1 : 0;
      let themeB = b.querySelector(".titre-produit").textContent.includes("Fleur") ? 1 : 0;
      return themeB - themeA; // exemple : les "Fleur" en premier
    });

  }
  if (valeur === "default") 
    { return; // on sort de la fonction, rien ne change 
      }

  // Réinjecter les produits triés dans le container
  produitsContainer.innerHTML = "";
  produits.forEach(p => produitsContainer.appendChild(p));
});
/*document.getElementById("tri") → récupère le menu déroulant.

addEventListener("change", ...) → déclenche une fonction quand tu choisis une option.

Array.from(...querySelectorAll(".produit-wrapper")) → récupère tous les produits dans un tableau pour pouvoir les trier.

sort(...) → trie le tableau selon la règle choisie :

alphabetique → compare les titres avec localeCompare.

prix → convertit le texte du prix en nombre (parseInt) et compare.

theme → exemple simple : met les produits contenant “Fleur” en premier. Tu peux adapter selon tes thèmes.

innerHTML = "" → vide le container.
appendChild(...) → réinjecte les produits triés dans le bon ordre.*/
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
