class  Carte {
    constructor(taille,carteTb,carteHtml,mur,arme,joueur,tour){
        this.taille = taille;
        this.carteTb = carteTb;
        this.carteHtml = carteHtml;
        this.mur = mur;
        this.arme = arme;
        this.joueur = joueur;
        this.tour = tour;
    }

    genereTbCarte() {
        /*Génération de la carte*/
        this.carteTb = [];
        for (let i=0; i<this.taille; i++ ){
            let ligne = [];
            for (let j=0; j<this.taille; j++ ){
                ligne[j]="_";
            }
            this.carteTb[i]=ligne;
        }
    }

    genereHtmlCarte(){
        this.carteHtml = [];
        for (let i=0; i<(this.carteTb).length; i++){
            let htmlL = [];
            for (let j=0; j<(this.carteTb).length; j++){
                switch (this.carteTb[i][j]) {
                    case "X" :
                        htmlL[j] = "<img src='image/mur.jpg'>";
                        break;
                    case "J1" :
                        htmlL[j] = "<img src='image/j1.jpg'>";
                        break;
                    case "J2" :
                        htmlL[j] = "<img src='image/j2.jpg'>";
                        break;
                    case "A0":
                        htmlL[j] = "<img src='image/arme1.jpg'>";
                        break;
                    case "A1":
                        htmlL[j] = "<img src='image/arme1.jpg'>";
                        break;
                    case "A2" :
                        htmlL[j] = "<img src='image/arme2.jpg'>";
                        break;
                    case "A3" :
                        htmlL[j] = "<img src='image/arme3.jpg'>";
                        break;
                    case "A4" :
                        htmlL[j] = "<img src='image/arme4.jpg'>";
                        break;
                    case "A5" :
                        htmlL[j] = "<img src='image/arme5.jpg'>";
                        break;
                    default :
                        htmlL[j] = "<img src='image/sol.jpg'>";
                }
            }
            this.carteHtml[i] = htmlL;
        }
    }

    afficheCarteHtml() { //Fonction qui met en forme le tableau carteHtml pour l'afficher sur la page index.html
        let html = "<div class='carte'>";
        for (let i = 0; i<(this.carteHtml).length; i++){
            html += "<div class='ligne"+i+"'>";
            for (let j = 0; j<(this.carteHtml).length; j++){
                html += this.carteHtml[i][j];
            }
            html += " </div>";
        }
        html += "</div>";
        return html;
    }

    touche(){ //Fonction qui permet de faire en sorte que le joueur 2 ne commence pas la partit à côté du joueur 1
        let i = (this.joueur[1]).position[0];
        let j = (this.joueur[1]).position[1];
        if ((i+1<=9) && (i+1>=0) && (this.carteTb[i+1][j] === "J1")) {
            (this.joueur[1]).position = this.generePos();
            this.touche();
        }else if ((i-1<=9) && (i-1>=0) && (this.carteTb[i-1][j] === "J1")){
            (this.joueur[1]).position = this.generePos();
            this.touche();
        } else if ((j+1<=9) && (j+1>=0) && (this.carteTb[i][j+1] === "J1")){
            (this.joueur[1]).position = this.generePos();
            this.touche();
        } else if ((j-1<=9) && (j-1>=0) && (this.carteTb[i][j-1] === "J1")){
           (this.joueur[1]).position = this.generePos();
            this.touche();
        }
    }

    definiZonemouvement(joueur) { //Fonction qui défini les zone de mouvement cliquable par le joueur
        let stopH = false, stopB = false, stopD = false, stopG = false;
        for (let i = 0; i<(this.carteHtml).length; i++){
            for (let j = 0; j<(this.carteHtml).length; j++){
                if (this.carteTb[i][j]===joueur){
                    for (let k = 1; k<4; k++){
                            if ((i+k <= 9) && (i+k >=0) ){
                                if (stopB === false) {
                                    switch (this.carteTb[i+k][j]) {
                                        case "X":
                                            stopB = true;
                                            break;
                                        case "J2" :
                                            stopB = true;
                                            break;
                                        case "J1" :
                                            stopB = true;
                                            break;
                                        case "A0":
                                            this.carteHtml[i + k][j] = "<a name='"+joueur+"' id='" + (i + k) + "," + j + "' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A1" :
                                            this.carteHtml[i + k][j] = "<a name='"+joueur+"' id='" + (i + k) + "," + j + "' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A2" :
                                            this.carteHtml[i + k][j] = "<a name='"+joueur+"' id='" + (i + k) + "," + j + "' href='#'><img name='img"+joueur+"' src='image/soldirectionarme2.jpg'></a>";
                                            break;
                                        case "A3" :
                                            this.carteHtml[i + k][j] = "<a name='"+joueur+"' id='" + (i + k) + "," + j + "' href='#'><img name='img"+joueur+"' src='image/soldirectionarme3.jpg'></a>";
                                            break;
                                        case "A4" :
                                            this.carteHtml[i + k][j] = "<a name='"+joueur+"' id='" + (i + k) + "," + j + "' href='#'><img name='img"+joueur+"' src='image/soldirectionarme4.jpg'></a>";
                                            break;
                                        case "A5" :
                                            this.carteHtml[i + k][j] = "<a name='"+joueur+"' id='" + (i + k) + "," + j + "' href='#'><img name='img"+joueur+"' src='image/soldirectionarme5.jpg'></a>";
                                            break;
                                        case "_" :
                                            this.carteHtml[i + k][j] = "<a name='"+joueur+"' id='" + (i + k) + "," + j + "' href='#'><img name='img"+joueur+"' src='image/soldirection.jpg'></a>";
                                            break;

                                    }
                                }
                            }
                            if ((i-k <= 9) && (i-k >=0) ){
                                if (stopH === false) {
                                    switch (this.carteTb[i-k][j]) {
                                        case "X":
                                            stopH = true;
                                            break;
                                        case "J2":
                                            stopH = true;
                                            break;
                                        case "J1":
                                            stopH = true;
                                            break;
                                        case "A1":
                                            this.carteHtml[i-k][j] = "<a name='"+joueur+"' id='"+(i-k)+","+j+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A0":
                                            this.carteHtml[i-k][j] = "<a name='"+joueur+"' id='"+(i-k)+","+j+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A2" :
                                            this.carteHtml[i-k][j] = "<a name='"+joueur+"' id='"+(i-k)+","+j+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme2.jpg'></a>";
                                            break;
                                        case "A3":
                                            this.carteHtml[i-k][j] = "<a name='"+joueur+"' id='"+(i-k)+","+j+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme3.jpg'></a>";
                                            break;
                                        case "A4" :
                                            this.carteHtml[i-k][j] = "<a name='"+joueur+"' id='"+(i-k)+","+j+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme4.jpg'></a>";
                                            break;
                                        case "A5" :
                                            this.carteHtml[i-k][j] = "<a name='"+joueur+"' id='"+(i-k)+","+j+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme5.jpg'></a>";
                                            break;
                                        case "_" :
                                            this.carteHtml[i-k][j] = "<a name='"+joueur+"' id='"+(i-k)+","+j+"' href='#'><img name='img"+joueur+"' src='image/soldirection.jpg'></a>";
                                            break;
                                    }
                                }
                            }
                            if ((j+k <= 9) && (j+k >=0)  ){
                                if (stopD === false) {
                                    switch (this.carteTb[i][j+k]) {
                                        case "X":
                                            stopD = true;
                                            break;
                                        case "J2":
                                            stopD = true;
                                            break;
                                        case "J1":
                                            stopD = true;
                                            break;
                                        case "A0":
                                            this.carteHtml[i][j+k] = "<a name='"+joueur+"' id='"+i+","+(j+k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A1":
                                            this.carteHtml[i][j+k] = "<a name='"+joueur+"' id='"+i+","+(j+k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A2" :
                                            this.carteHtml[i][j+k] = "<a name='"+joueur+"' id='"+i+","+(j+k)+"'href='#'><img name='img"+joueur+"' src='image/soldirectionarme2.jpg'></a>";
                                            break;
                                        case "A3" :
                                            this.carteHtml[i][j+k] = "<a name='"+joueur+"' id='"+i+","+(j+k)+"'href='#'><img name='img"+joueur+"' src='image/soldirectionarme3.jpg'></a>";
                                            break;
                                        case "A4" :
                                            this.carteHtml[i][j+k] = "<a name='"+joueur+"' id='"+i+","+(j+k)+"'href='#'><img name='img"+joueur+"' src='image/soldirectionarme4.jpg'></a>";
                                            break;
                                        case "A5" :
                                            this.carteHtml[i][j+k] = "<a name='"+joueur+"' id='"+i+","+(j+k)+"'href='#'><img name='img"+joueur+"' src='image/soldirectionarme5.jpg'></a>";
                                            break;
                                        case "_" :
                                            this.carteHtml[i][j+k] = "<a name='"+joueur+"' id='"+i+","+(j+k)+"' href='#'><img name='img"+joueur+"' src='image/soldirection.jpg'></a>";
                                            break;
                                    }
                                }
                            }
                            if ((j-k <= 9) && (j-k >=0)){
                                if (stopG === false) {
                                    switch (this.carteTb[i][j-k]) {
                                        case "X":
                                            stopG = true;
                                            break;
                                        case "J2":
                                            stopG = true;
                                            break;
                                        case "J1":
                                            stopG = true;
                                            break;
                                        case "A1":
                                            this.carteHtml[i][j-k] = "<a name='"+joueur+"' id='"+i+","+(j-k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A0":
                                            this.carteHtml[i][j-k] = "<a name='"+joueur+"' id='"+i+","+(j-k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme1.jpg'></a>";
                                            break;
                                        case "A2" :
                                            this.carteHtml[i][j-k] = "<a name='"+joueur+"' id='"+i+","+(j-k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme2.jpg'></a>";
                                            break;
                                        case "A3" :
                                            this.carteHtml[i][j-k] = "<a name='"+joueur+"' id='"+i+","+(j-k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme3.jpg'></a>";
                                            break;
                                        case "A4" :
                                            this.carteHtml[i][j-k] = "<a name='"+joueur+"' id='"+i+","+(j-k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme4.jpg'></a>";
                                            break;
                                        case "A5" :
                                            this.carteHtml[i][j-k] = "<a name='"+joueur+"' id='"+i+","+(j-k)+"' href='#'><img name='img"+joueur+"' src='image/soldirectionarme5.jpg'></a>";
                                            break;
                                        case "_" :
                                            this.carteHtml[i][j-k] = "<a name='"+joueur+"' id='"+i+","+(j-k)+"' href='#'><img name='img"+joueur+"' src='image/soldirection.jpg'></a>";
                                            break;
                                    }
                                }
                            }
                        }
                }
            }
        }
    }

    modeAttaque(joueur,nomD){ // Fonction qui regarde si les joueur son côte à côte pour lancer la phase de combat sinon affiche les zone de mouvement du joueur
        let stop = false;
        for (let i = 0; i<(this.carteHtml).length; i++){
            for (let j = 0; j<(this.carteHtml).length; j++){
                if (this.carteTb[i][j]===joueur){
                    if (((i+1 <= 9) && (i+1 >=0) && (stop===false))) {
                        if ((this.carteTb[i+1][j]===nomD)) {
                            $('#att'+joueur+'').show();
                            $('#def'+joueur+'').show();
                            carte.genereHtmlCarte();
                            stop = true;
                        }else {
                            this.definiZonemouvement(joueur);
                        }
                    }
                    if ((i-1 <= 9) && (i-1 >=0) && (stop===false)){
                        if ((this.carteTb[i-1][j]===nomD)) {
                            $('#att'+joueur+'').show();
                            $('#def'+joueur+'').show();
                            carte.genereHtmlCarte();
                            stop = true;
                        }else {
                            this.definiZonemouvement(joueur);
                        }
                    }
                    if ((j+1 <= 9) && (j+1 >=0) && (stop===false)){
                        if ((this.carteTb[i][j+1]===nomD)) {
                            $('#att'+joueur+'').show();
                            $('#def'+joueur+'').show();
                            carte.genereHtmlCarte();
                            stop = true;
                        }else {
                            this.definiZonemouvement(joueur);
                        }
                    }
                    if ((j-1 <= 9) && (j-1 >=0) && (stop===false)){
                        if ((this.carteTb[i][j-1]===nomD)) {
                            $('#att'+joueur.nom+'').show();
                            $('#def'+joueur.nom+'').show();
                            carte.genereHtmlCarte();
                            stop = true;
                        }else {
                            this.definiZonemouvement(joueur);
                        }
                    }
                }
            }
        }
    }

    generePos() {  //Fonction qui permet de générer une position
        let l = getRandomInt(this.taille);
        let c = getRandomInt(this.taille);
        if (this.carteTb[l][c] === "_"){
            return [l,c];
        } else {
            return this.generePos();
        }
    }

    initCarte(taille){   //Fonction qui intitilise la carte
        this.taille = taille;
        this.tour = "J1";
        this.genereTbCarte();

        /*Génération des mur*/
        this.mur = [];
        for (let i = 0; i<this.taille;i++){
            this.mur[i]= new Mur(this.generePos());
            this.carteTb[this.mur[i].position[0]][this.mur[i].position[1]] = "X";
        }

        /*Génération Arme*/
        this.arme = [];
        for (let k=0; k<6; k++){
            const nomArme = "A"+k;
            if (k > 1){
                this.arme[k] = new Arme(nomArme,this.generePos(),(10*k),k);
                this.carteTb[(this.arme[k]).position[0]][(this.arme[k]).position[1]] = nomArme;
            }else {
                this.arme[k] = new Arme(nomArme,this.generePos(),10,k);
            }
        }

        /*Génération Joueur*/
        this.joueur = [];
        let posJ1 = this.generePos();
        let posJ2 = this.generePos();
        this.joueur[0] = new Joueur("J1","",100,posJ1,this.arme[0],false);
        this.joueur[1] = new Joueur("J2","",100,posJ2,this.arme[1],false);
        this.arme[0].position = (this.joueur[0]).position;
        this.arme[1].position = (this.joueur[1]).position;
        this.carteTb[this.joueur[0].position[0]][this.joueur[0].position[1]] = this.joueur[0].nom;
        this.touche();
        this.carteTb[this.joueur[1].position[0]][this.joueur[1].position[1]] = this.joueur[1].nom;

        /*Génération carte en Html et affichage*/
        this.genereHtmlCarte();
        this.modeAttaque((this.joueur[0]).nom);
        this.afficheCarteHtml();

    }

    recharge(){ //Fonction qui permet de recharger la carte et les info des joueurs aprèes une action d'attaque ou de défense
        this.genereHtmlCarte();
        $('.joueur1').empty().append($((this.joueur[0]).infoJoueur()));
        $('.joueur2').empty().append($((this.joueur[1]).infoJoueur()));
        $('.plateau').empty().append($(this.afficheCarteHtml()));
    }

    rechargeMouvement(nomD,numeroA,nomA){ //Fonction qui permet de recharger la carte et les info des joueurs aprèes une action de déplacement d'un joueur
        (this.joueur[numeroA]).ramasseArme(carte.arme);
        for (let k=0; k<6; k++){
            this.carteTb[(this.arme[k]).position[0]][(this.arme[k]).position[1]] = (this.arme[k]).nom;
        }
        this.carteTb[(this.joueur[0]).position[0]][(this.joueur[0]).position[1]] = (this.joueur[0]).nom;
        this.carteTb[(this.joueur[1]).position[0]][(this.joueur[1]).position[1]] = (this.joueur[1]).nom;
        this.genereHtmlCarte();
        this.modeAttaque(nomD,nomA);
        $('.plateau').empty().append($(this.afficheCarteHtml()));
        $('.'+nomA+'').empty().append($((this.joueur[numeroA]).infoJoueur()));

    }







}