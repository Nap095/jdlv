// Version 1.32 du 16/08/2024 : Je résoud le bug constaté sur les formes oscillantes pb dans le copie du tableau
// Version 1.31 du 12/08/2024 : Mise au point de la section chargement des modeles
// Version 1.30 du 28/06/2024 : Mise en place des stats sur l'âge des cellules
// Version 1.21 du 25/06/2024 : Possibilité de choisir un modèle de départ
// Version 1.20 du 24/06/2024 : Chargement d'un JSON contenant des schémas type
// Version 1.11 du 22/06/2024 : Colorisation des cellules en fonction de leur age
// Version 1.10 du 21/06/2024 : Incrémente la valeur de la cellule à chaque itération tant qu'elle est vivante
// Version 1.00 du 21/06/2024 : Première version opérationnelle
// Initialisation de la grille


// reférences :
// https://conwaylife.com/wiki/Conway%27s_Game_of_Life
// https://www.palais-decouverte.fr/isn/jeu-de-la-vie/manuel.html

var lignes = 20
var colonnes = 20
var x = 1
var isRunning = true
var iteration = 1
var tempo = 3000
var taille_cellule_px = 10
var naissances = 0
var morts = 0
var vivants = 0
var jsonData = ''
var stats_cellules = []

var grid = dimensionne_tableau(lignes, colonnes)

for (let i = 0; i < lignes; i++) {
  grid[i] = [];
  for (let j = 0; j < colonnes; j++) {
    grid[i][j] = 0; // Toutes les cellules sont mortes initialement
  }
}

function affiche_tableau(grid) {
  stats_cellules = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // on vide ce que contient la div tableau
  document.getElementById('tableau').innerHTML = ''

  const tableau = document.getElementById('tableau');
  
  var compte_cellules_vivantes = 0
  for (let i = 0; i < lignes; i++) {
    for (let j = 0; j < colonnes; j++) {
      const caseCellule = document.createElement('div');
      if (grid[i][j] == 0) {
        caseCellule.className = 'rien'
      } else {
        if ( grid[i][j] === 1 ) { caseCellule.className = 'vivant1'; stats_cellules[0]++ } else
        if ( grid[i][j] === 2 ) { caseCellule.className = 'vivant2'; stats_cellules[1]++ } else
        if ( grid[i][j] === 3 ) { caseCellule.className = 'vivant3'; stats_cellules[2]++ } else
        if ( grid[i][j] === 4 ) { caseCellule.className = 'vivant4'; stats_cellules[3]++ } else
        if ( grid[i][j] === 5 ) { caseCellule.className = 'vivant5'; stats_cellules[4]++ } else
        if ( grid[i][j] === 6 ) { caseCellule.className = 'vivant6'; stats_cellules[5]++ } else
        if ( grid[i][j] === 7 ) { caseCellule.className = 'vivant7'; stats_cellules[6]++ } else
        if ( grid[i][j] === 8 ) { caseCellule.className = 'vivant8'; stats_cellules[7]++ } else
        if ( grid[i][j] === 9 ) { caseCellule.className = 'vivant9'; stats_cellules[8]++ } else
        if ( grid[i][j] >= 10 ) { caseCellule.className = 'vivant10'; stats_cellules[9]++ }
        
        compte_cellules_vivantes++
      }
      tableau.appendChild(caseCellule);
    }
  }
  document.getElementById('statistiques').textContent = "Nombre de cellules : " + (lignes * colonnes) + ", nombre de cellules vivantes : " + compte_cellules_vivantes
  document.getElementById('statistiques1').textContent = "Naissances : " + naissances + ", Morts : " + morts + ", Resté en vie : " + vivants
  let tb = document.getElementById('statscellules')
  //let row = tb.rows[5]
  let cell = tb.rows[1].cells[1]; cell.textContent = stats_cellules[0]
  cell = tb.rows[2].cells[1]; cell.textContent = stats_cellules[1]
  cell = tb.rows[3].cells[1]; cell.textContent = stats_cellules[2]
  cell = tb.rows[4].cells[1]; cell.textContent = stats_cellules[3]
  cell = tb.rows[5].cells[1]; cell.textContent = stats_cellules[4]
  cell = tb.rows[6].cells[1]; cell.textContent = stats_cellules[5]
  cell = tb.rows[7].cells[1]; cell.textContent = stats_cellules[6]
  cell = tb.rows[8].cells[1]; cell.textContent = stats_cellules[7]
  cell = tb.rows[9].cells[1]; cell.textContent = stats_cellules[8]
  cell = tb.rows[10].cells[1]; cell.textContent = stats_cellules[9]
}

// Event s'executant une fois la page chargée
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("nblignes").value = lignes
  document.getElementById("nbcolonnes").value = colonnes
  document.getElementById("tempo").value = tempo
  jsonData = lire_json()

  grid = premiere_generation(grid);
  affiche_tableau(grid);
  var divcomment = document.getElementById('comment')
  divcomment.textContent = 'Lancement'
  console.log('DOMContentLoaded', jsonData)
});

function premiere_generation(grid) {
  lignes = document.getElementById("nblignes").value
  colonnes = document.getElementById("nbcolonnes").value
  tempo = document.getElementById("tempo").value
  grid = dimensionne_tableau(lignes, colonnes)
  var elementTableau = document.querySelector('.tableau');
  elementTableau.style.gridTemplateRows = 'repeat(' + lignes + ', 10px)';
  elementTableau.style.gridTemplateColumns = 'repeat(' + colonnes + ', 10px)';
  elementTableau.style.width = (colonnes * taille_cellule_px) + 'px';
  elementTableau.style.height = (lignes * taille_cellule_px) + 'px';

  // remplissage aléatoire du tableau
  for (let i = 0; i < lignes; i++) {
    grid[i] = [];
    for (let j = 0; j < colonnes; j++) {
      grid[i][j] = Math.round(Math.random());
    }
  }
  return grid
}

function reinitialiser() {
  //console.log("reinit", jsonData)
  iteration = 0
  grid = premiere_generation(grid)
  affiche_tableau(grid)
}

function dimensionne_tableau( lignes, colonnes) {
  var tb = new Array(lignes)
  for (var i = 0; i < lignes; i++) {
    tb[i] = new Array(colonnes);
  }
  return tb
}

function demarrer() {
  iteration++
  if (isRunning) {
    tempo = document.getElementById("tempo").value
    divcomment = document.getElementById('comment')
    divcomment.textContent = 'Iteration en cours, numéro : ' + iteration
    
    grid = parcours_grille(grid)
    affiche_tableau(grid)

    setTimeout(demarrer, tempo)
  } else {
    isRunning = true
  }
}

function une_iteration() {
  iteration++
  tempo = document.getElementById("tempo").value
  divcomment = document.getElementById('comment')
  divcomment.textContent = 'Iteration en cours, numéro : ' + iteration
  
  grid = parcours_grille(grid)
  affiche_tableau(grid)
}

function arreter() {
  isRunning = false
  iteration--
  divcomment = document.getElementById('comment')
  divcomment.textContent = 'en pause'

}

function parcours_grille(grid) {
  var statut = ''
  naissances = 0
  morts = 0
  vivants = 0
  //var newgrid = Array.from(grid)
  var newgrid = JSON.parse(JSON.stringify(grid))
  for(let y = 0; y < lignes; y++) {
    for( let x = 0; x < colonnes; x++) {
      [newgrid[y][x], statut] = analyse_voisins(grid, x, y)
      //console.log("x=",x, "y=", y, "g=", grid[y][x], "ng=", newgrid[y][x], "s=", statut)
      if ( statut === 'naissance' ) { naissances ++ }
      if ( statut == 'mort' ) { morts++ }
      if ( statut == 'vivant' ) { vivants++ }
    }
  }
  return newgrid
}

function analyse_voisins(grid, x, y) {
  var voisins = 0
  var statut = ''
  etat = grid[y][x]

  vx = x-1; vy = y-1; if ( vx >= 0 && vy >= 0 && grid[vy][vx] >= 1 ) { voisins++ }
  vx = x  ; vy = y-1; if ( vy >= 0 && grid[vy][vx] >= 1 ) { voisins++ }
  vx = x+1; vy = y-1; if ( vx < colonnes && vy >= 0 && grid[vy][vx] >= 1 ) { voisins++ }
  vx = x-1; vy = y  ; if ( vx >= 0 && grid[vy][vx] >= 1 ) { voisins++ }
  vx = x+1; vy = y  ; if ( vx < colonnes && grid[vy][vx] >= 1 ) { voisins++ }
  vx = x-1; vy = y+1; if ( vx >= 0 && vy < lignes && grid[vy][vx] >= 1 ) { voisins++ }
  vx = x  ; vy = y+1; if ( vy < lignes && grid[vy][vx] >= 1 ) { voisins++ }
  vx = x+1; vy = y+1; if ( vx < colonnes &&  vy < lignes && grid[vy][vx] >= 1 ) { voisins++ }

  if ( grid[y][x] === 0 ) {
    if ( voisins === 3 ) { etat = 1; statut = "naissance"; console.log(x, y, "naissance") }
  } else {
    if ( voisins === 2 || voisins === 3 ) { etat++; statut = "vivant" } else  { etat = 0; statut = "mort" }
  }

  return [etat, statut]
}

function lire_json() {
  const jsonData = {
    "bases": {
      "carre": "11111,10001,10001,10001,10001,11111",
      "croix": "10001,01010,00100,01010,10001",
      "nature morte - bloc": "11,11",
      "nature morte - ruche": "010, 101, 101, 010",
      "oscillateur - crapaud": "1110,0111",
      "oscillateur - balise": "0011,0001,1000,1100",
      "oscillateur - clignotant": "1, 1, 1",
    }
  };

  const listbox = document.getElementById('maListbox');

  Object.keys(jsonData.bases).forEach(key => {
    // Créer un nouvel élément option
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;

    // Ajouter l'option à la listbox
    listbox.appendChild(option);
  })

  return jsonData
}

function applique_modele() {
  var selectElmt = document.getElementById("maListbox");
  var textSel = selectElmt.options[selectElmt.selectedIndex].value
  //console.log("applique_modele", textSel)
  //console.log("applique_modele", jsonData['bases'][textSel])
  //console.log("applique_modele", lignes, colonnes, grid)

  // rempli une grille vide
  newgrid = []
  for ( let y = 0; y < lignes; y++ ) {
    var s = "0".repeat(colonnes)
    newgrid[y] = s.split('')
  }

  // récupère le modèle sélectionné
  var modele = jsonData['bases'][textSel].split(',')

  var modele_len = modele.length
  ligne_deb = Math.floor( (lignes - modele_len) / 2 )
  console.log(modele, modele_len, ligne_deb)

  // on place de modèle dans la grille de façon à ce qu'il soit centré
  var i = 0
  for ( let y = ligne_deb; y <= (ligne_deb + modele_len - 1); y++ ) {
    var ligne_modele = modele[i].trim()
    var lignes_len = ligne_modele.length
    depart = Math.floor( (colonnes - lignes_len) / 2 )
    var debut = "0".repeat(depart)
    var  fin = "0".repeat( colonnes - depart - ligne_modele.length )
    newligne = debut + ligne_modele + fin
    //console.log(i, ligne_modele, newligne)
    //console.log("applique_modele", newligne)
    newgrid[y] = newligne.split('')
    i++
  }

  // on charge le tableau grid en passant la valeur des cellules en int
  for ( y = 0; y < lignes; y++) {
    for ( x = 0; x < colonnes; x++ ) {
      grid[y][x] = parseInt(newgrid[y][x])
    }
  }

  console.log("applique_modele", newgrid)
  affiche_tableau(grid)
}
