/*inscription*/
let utilisateurs=JSON.parse(localStorage.getItem("utilisateurs")) || [];
/*JSON.parse(...) = transforme ce texte en vrai tableau ou objet JavaScript.
getItem("utilisateurs") = va chercher ce qui est stocké sous la clé "utilisateurs".*/
document.getElementById("form-login").addEventListener("submit",function(e)
{e.preventDefault();
/* empêche le rechargement automatique ar défaut, quand tu soumets un formulaire :

le navigateur recharge la page,

et envoie les données comme si c’était un vrai site avec serveur.

👉 preventDefault() dit au navigateur :
“Ne fais pas ton comportement automatique, laisse-moi gérer avec mon code JavaScript.”*/
const nom= document.getElementById("nom").value;
const prenom=document.getElementById("prenom").value;
const email=document.getElementById("email").value;
const date=document.getElementById("date").value;
const mp=document.getElementById("password").value;
const mp2=document.getElementById("cpassword").value;
const Message=document.getElementById("message");

const existemail = utilisateurs.find(u=>u.email===email);
if(existemail)
{
   alert("email existant");
    return;
}
if(mp!==mp2)
{
   alert("les mots de passe ne se sont pas identiques ");
    return;
}
const existemp=utilisateurs.find(m=>m.mp===mp);
if(existemp)
{
    alert("mot de passe existant veuillez changer le mot de passe");
    return;
}
const nv ={nom, prenom, email, date,mp};
utilisateurs.push(nv);
localStorage.setItem("utilisateurs",JSON.stringify(utilisateurs));//stringfy stock lelement sous forme de chaine de caractere et quand je veux lutiliser je le transforme sous dobjet ou tableau 
// Message + redirection 
alert( "✅ Compte créé avec succès !");
  setTimeout(() => { window.location.href = "compte.html"; // aller à la page connexion elle ne retourne jamais une erreur rejected donc on a pas besoin de catch
  }, 1200);
})
