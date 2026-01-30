/* connexion */
let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
const adminemail="labyadyasmine@gmail.com";
const adminmp="yasmine123";

document.getElementById("form-login").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const mp = document.getElementById("password").value;

    // Vérifier si l'email existe
    const existemail = utilisateurs.find(u => u.email === email);
    // Vérifier si email + mot de passe correspondent
    const uti = utilisateurs.find(u => u.email === email && u.mp === mp);

    if (existemail && !uti) {
        alert("❌ Mot de passe incorrect");
        return;
    } else if (!existemail) {
        alert("❌ Email incorrect");
        return;
    } else if (!uti) {
        alert("❌ Email et mot de passe incorrects");
        return;
    }

    // Si tout est bon
   
//verifier si cest ladmin 
if(email===adminemail && mp===adminmp)
{
    localStorage.setItem("connecte",JSON.stringify({role:"admin" ,uti}))
    //La clé est toujours ce que tu mets dans les guillemets quand tu fais setItem("clé", valeur).
//La valeur est ce que tu mets en deuxième paramètre.
/*Clé = "connecte"

Valeur = {"role":"admin","email":"yasmine@gmail.com"} (après JSON.stringify, c’est du texte)*/
    window.location.href="admin.html"
}else{
    // Sauvegarder l'utilisateur connecté
    localStorage.setItem("connecte", JSON.stringify({role:"user",uti}));

    
   
        window.location.href = "html.html"; // page d'accueil après connexion
   
} if(connecte && connecte.role==="admin")
    alert("👋 Ravi de vous revoir administrateur"+ uti.prenom+" "+uti.nom);
alert("👋 Ravi de vous revoir " + uti.prenom + " " + uti.nom);
} );