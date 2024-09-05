// Version 1.0 du 21/06/2024
// Initialisation de la grille
var lignes = 20
var colonnes = 20
var x = 1
var isRunning = true
var iteration = 1
var divcomment = document.getElementById('comment')
var tempo = 3000
var taille_cellule_px = 10 

var grid = dimensionne_tableau(lignes, colonnes)

for (let i = 0; i < lignes; i++) {
  grid[i] = [];
  for (let j = 0; j < colonnes; j++) {
    grid[i][j] = 0; // Toutes les cellules sont mortes initialement
  }
}

function affiche_tableau(grid) {

  // on vide ce que contient la div tableau
  document.getElementById('tableau').innerHTML = ''

  const tableau = document.getElementById('tableau');
  
  var compte_cellules_vivantes = 0
  for (let i = 0; i < lignes; i++) {
    for (let j = 0; j < colonnes; j++) {
      const caseCellule = document.createElement('div');
      //caseCellule.className = 'case ' + (couleur ? 'vide' : 'plein');
      if (grid[i][j] == 0) {
        caseCellule.className = 'rien'
      } else {
        caseCellule.className = 'vivant'
        compte_cellules_vivantes++
      }
      tableau.appendChild(caseCellule);
    }
  }
  document.getElementById('statistiques').textContent = "Nombre de cellules : " + (lignes * colonnes) + ", nombre de cellules vivantes : " + compte_cellules_vivantes
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("nblignes").value = lignes
  document.getElementById("nbcolonnes").value = colonnes
  document.getElementById("tempo").value = tempo
  grid = premiere_generation(grid);
  affiche_tableau(grid);
  var divcomment = document.getElementById('comment')
  divcomment.textContent = 'Lancement'
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
    var divcomment = document.getElementById('comment')
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
  var divcomment = document.getElementById('comment')
  divcomment.textContent = 'Iteration en cours, numéro : ' + iteration
  
  grid = parcours_grille(grid)
  affiche_tableau(grid)
}

function arreter() {
  isRunning = false
  iteration--
  var divcomment = document.getElementById('comment')
  divcomment.textContent = 'en pause'

}

function parcours_grille(grid) {
  var newgrid = Array.from(grid)
  for(let y = 0; y < lignes; y++) {
    for( let x = 0; x < colonnes; x++) {
      newgrid[y][x] = analyse_voisins(grid, x, y)
    }
  }
  return newgrid
}

function analyse_voisins(grid, x, y) {
  voisins = 0
  etat = 0
  vx = x-1; vy = y-1; if ( vx >=0 && vy >=0 ) { if (grid[vy][vx] === 1) { voisins++ } }
  vx = x  ; vy = y-1; if ( vy >=0 ) { if (grid[vy][vx] === 1) { voisins++ } }
  vx = x+1; vy = y-1; if ( vx < colonnes && vy >= 0 ) { if (grid[vy][vx] === 1) { voisins++ } }

  vx = x-1; vy = y; if ( vx >=0 ) { if (grid[vy][vx] === 1) { voisins++ } }
  vx = x+1; vy = y; if ( vx < colonnes ) { if (grid[vy][vx] === 1) { voisins++ } }

  vx = x-1; vy = y+1; if ( vx >=0 && vy < lignes ) { if (grid[vy][vx] === 1) { voisins++ } }
  vx = x; vy = y+1  ; if ( vy < lignes ) { if (grid[vy][vx] === 1) { voisins++ } }
  vx = x+1; vy = y+1; if ( vx < colonnes &&  vy < lignes )  { if (grid[vy][vx] === 1) { voisins++ } }

  if ( grid[y][x] === 0 ) {
    if ( voisins === 3 ) { etat = 1}
  } else {
    if ( voisins === 2 || voisins === 3) { etat = 1} else  { etat = 0}
  }

  return etat
}
