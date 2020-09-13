const API_TOKEN="68bcdb149feb6f14343dc9b6b72012f6" // l'API UTILISER VIENT DE THEMOVIEDB.ORG

export function getFilmsFromApiWithSearchText(text,page){
    const uri='https://api.themoviedb.org/3/search/movie?api_key='+API_TOKEN+'&language=fr&query='+text+'&page='+page;
    
    return fetch(uri) // on va lancée notre requete
           .then((response)=>response.json()) // cas ou il ya succes
           .catch((error)=>console.log(error)) // cas ou il erreur
}

// fonction pour obtenir le nom de l'image
export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300'+name;

}
// fonction pour obtenir les details d'un films
export function getFilmDetailFromApi(id){
    const uri='https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_TOKEN+'&language=fr'
    return fetch(uri) // on va lancée notre requete
    .then((response)=>response.json()) // cas ou il ya succes
    .catch((error)=>console.log(error)) // cas ou il erreur
}