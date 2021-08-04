
/****LES DIFFERENTS API DU PROJET*****/
//export const API_USE = "http://localhost:8080";
//export const API_USE = "http://api.cahis.cm";
export const API_USE = "http://api.syrem-ctd.cm";


/****FUNCTION TRANSLATE TEXTE DANS LOGIQUE CODE****/
export function translateContenufunction(valeurFR : string, valeurEN : string) : string{
 if (localStorage.getItem("langue") === "EN"){
    return valeurEN;
 }
 return valeurFR;
}



