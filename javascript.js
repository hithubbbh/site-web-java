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