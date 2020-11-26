
class Joueur {
    constructor(nom,pseudo,vie,position,arme,bouclier){
        this.nom=nom;
        this.pseudo = pseudo;
        this.vie=vie;
        this.position = position;
        this.arme = arme;
        this.bouclier = bouclier;
    }

   infoJoueur() {
        let html = "<p>";
        if (this.nom === "J1") {
            html += "<img alt='image du J1' src='image/j1.jpg'><br>";
        }else if (this.nom === "J2") {
            html += "<img alt='image du J2' src='image/j2.jpg'><br>";
        }
        html += "Nom : "+this.pseudo+"<br>Arme : "+(this.arme).nom+"<br>Vie : <br><progress id='vie"+this.nom+"' max='100' value='"+this.vie+"'> "+this.vie+"% </progress><br>Position : "+this.position+"<br><br><button id='att"+this.nom+"' hidden>Attaquer</button> <button id='def"+this.nom+"' hidden>Défendre</button> <br><br><img id='bouclier"+this.nom+"' alt='image de bouclier' src='image/icons8-shield-64.png' hidden><br></p>";
        return html;
    }


    ramasseArme(arme) {
        let stop = false;
        for (let i=0; i<(arme).length; i++){
            if (stop === false){
                if ((this.position[0] === (arme[i]).position[0]) && (this.position[1] === (arme[i]).position[1])){
                    if ((arme[i]).nom !== (this.arme).nom){
                        (this.arme).position = (arme[i]).position;
                        this.arme = arme[i];
                        (arme[i]).position = this.position;
                        stop = true;
                    }
                }
            }
        }
    }

    attaque(numeroD,nomD) {
        if ((carte.joueur[numeroD]).bouclier === true){
            (carte.joueur[numeroD]).vie -= ((this.arme).degat)/2;
            $('#bouclier'+nomD+'').hide();
        } else if((carte.joueur[numeroD]).bouclier === false){
            (carte.joueur[numeroD]).vie -= (this.arme).degat;
        }
        if ((carte.joueur[numeroD]).vie <= 0){
            $('.jeu').empty();
            $('.formulaire').empty();
            $('.victoire').append("<div><img id='imgvictoire' src='image/victoire.png'><h1>Victoire de "+this.pseudo+"</h1> <a class='button' href='index.html'>Rejouer</a></div>")
        }
        carte.recharge();
        $('#att'+nomD+'').show();
        $('#def'+nomD+'').show();
        carte.tour = nomD;
    }

    defense(nomA) {
        this.bouclier = true;
        carte.recharge();
        $('#bouclier'+this.nom+'').show();
        $('#att'+nomA+'').show();
        $('#def'+nomA+'').show();
        this.tour = nomA;

    }

    deplacementInt(id,nomD){
        carte.carteTb[this.position[0]][this.position[1]] = "_";
        let pos = (id).split(',');
        this.position[0] = parseInt(pos[0]);
        this.position[1] = parseInt(pos[1]);

        carte.rechargeMouvement(nomD,(carte.joueur).indexOf(this),this.nom);
        this.tour = nomD;
    }

    verifieChemin(position,direction) {
        let chemin = false;
        if (direction === "ArrowLeft"){
            chemin = (carte.carteTb[position[0]][(position[1] - 1)] !== "X") && (carte.carteTb[position[0]][(position[1] - 1)] !== "J1") && (carte.carteTb[position[0]][(position[1] - 1)] !== "J2");
        } else if (direction === "ArrowRight"){
            chemin = (carte.carteTb[position[0]][(position[1] + 1)] !== "X") && (carte.carteTb[position[0]][(position[1] + 1)] !== "J1") && (carte.carteTb[position[0]][(position[1] + 1)] !== "J2");
        } else if (direction === "ArrowUp") {
            chemin = (carte.carteTb[(position[0] - 1)][position[1]] !== "X") && (carte.carteTb[(position[0] - 1)][position[1]] !== "J1") && (carte.carteTb[(position[0] - 1)][position[1]] !== "J2");
        }else if (direction === "ArrowDown") {
            chemin = (carte.carteTb[(position[0] + 1)][position[1]] !== "X") && (carte.carteTb[(position[0] + 1)][position[1]] !== "J1") && (carte.carteTb[(position[0] + 1)][position[1]] !== "J2");
        }
        return chemin;
    }

    deplacementClavier(code,nomD) {
        if (code === 'ArrowUp' ){
            if ((this.position[0]-1)>=0  ){
                if (this.verifieChemin(this.position,code)) {
                    carte.carteTb[this.position[0]][this.position[1]] = "_";
                    this.position[0] -= 1;
                }
            }
        }
        if (code === 'ArrowDown' ){
            if ((this.position[0]+1)<=9 ){
                if (this.verifieChemin(this.position,code)) {
                    carte.carteTb[this.position[0]][this.position[1]] = "_";
                    this.position[0] += 1;
                }
            }
        }
        if (code === 'ArrowRight' ){
            if ((this.position[1]+1)<=9 ){
                if (this.verifieChemin(this.position,code)) {
                    carte.carteTb[this.position[0]][this.position[1]] = "_";
                    this.position[1] += 1;
                }

            }
        }
        if (code === 'ArrowLeft' ){
            if ((this.position[1]-1)>=0  ){
                if (this.verifieChemin(this.position,code)) {
                    carte.carteTb[this.position[0]][this.position[1]] = "_";
                    this.position[1] -= 1;
                }
            }
        }
        carte.rechargeMouvement(nomD,(carte.joueur).indexOf(this),this.nom);
        carte.tour = nomD;
    }
}

