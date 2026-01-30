let connecte = JSON.parse(localStorage.getItem("connecte")); 
if (!connecte) { 
    // Si personne n'est connecté → retour à la page login
     window.location.href = "compte.html"; } 
     else {
         // Afficher le message de bienvenue avec nom et prénom 
         document.getElementById("welcome").textContent = "Bienvenue " + connecte.prenom + " " + connecte.nom; }


  // Déconnexion
  document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("connecte"); // supprime la session 
  alert("Vous êtes déconnecté !");
  window.location.href = "compte.html"; // retour à la page login 
  });
//chnager le mot de passe ou lemail
document.getElementsByClassName("btn-connexion").addEventListener("click",
    ()=> {
       let email= document.getElementById("newEmail").value || connecte.email;
        let motdepasse= document.getElementById("newPassword").value || connecte.password;
       localStorage.setItem("")
    }
)