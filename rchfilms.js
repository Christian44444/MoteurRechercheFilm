
const btn1 = document.getElementById("btnSel");
var saisie = document.getElementById('selection');
var sec1 = document.getElementById('affichage');

btn1.addEventListener("click", (e)=>{
    e.preventDefault();

    console.log("Ecouteur d'évenement");
    let saisie = document.querySelector("#selection");
    //préparation de l'url Exemple d'envoi https://www.omdbapi.com/?s=batman&apikey=f6e256e1
    let url = "https://www.omdbapi.com/";
    url += "?s=";
    url += saisie.value.trim();
    url += "&apikey=f6e256e1";
    console.log(url);
    
    // Suppression des éléments de la section si présence
    while(sec1.firstChild){
        sec1.removeChild(sec1.firstChild);
    };    

    lanceFetch(url);
     
});


function lanceFetch(url){
    fetch(url)
        .then(response => response.json())
        .then(resultat => {
            // le résultat est une cle valeur Search:[film,film]
            // film est décomposé en un objet de valeur un [] Title, Year, imdbID, Poster
            recupeFilms(resultat);
        });       
}

function recupeFilms(resultat){
    // récupération des jsons films
    for(let propriete in resultat){
        if(resultat[propriete]){
            let films = resultat[propriete];
            if(films != null) {
                if( films instanceof Object){
                    displayFilms(films);
                }
            }
        }
    }
}

function displayFilms(films){
    // Pour chaque film on va l'inserré dans une card de la section "affichage"
    let div1 = "";
    films.forEach(film =>{
        console.log(film);
        // Création d'une card
        div1 += '<div class="card col-12 col-md-6 col-lg-3 col-xl-2 ms-2 me-2 mb-2" syle="width:18rem">';
            div1 += '<div class="card-body">';
                // constituée d'une image d'un lien https://www.imdb.com/title/tt0372784/?ref_=fn_al_tt_5
                div1 += '<a href="https://www.imdb.com/title/' + film.imdbID + '">';
                div1 += ('<img src=' +  film.Poster + ' alt="' + film.Title + '" class="card-img-top" syle="width:18rem"/>');
                div1 += '</a>';
                console.log('<img src=' +  film.Poster + ' alt="' + film.Title + '" class="card-img-top" syle="width:18rem"/>');
            div1 += "</div>";
        div1 += "</div>";
    });
    sec1.innerHTML += div1;
}
  
