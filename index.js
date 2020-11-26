function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let carte = new Carte(10,[],[],"",[],[],[],"");

carte.initCarte(10);

/* JQUERY CODE */

$(function() {

   $('.jeu').hide();
    $('.formulaire').append("<form><label for='nomJ1'>Nom du joueur 1 :</label> <input type='text' id='nomJ1' name='nomJ1'><br><br><label for='nomJ2'>Nom du joueur 2 :</label><input type='text' id='nomJ2' name='nomJ2'><br><br><button id='jouer' name='jouer' type='button'>Jouer ! </button></form>")
    $(document).on("change",'input',function () {
        (carte.joueur[0]).pseudo = $('#nomJ1').val();
        (carte.joueur[1]).pseudo = $('#nomJ2').val();
    });

    $(document).on("click",'[name="jouer"]', function () {
        $('.formulaire').empty();
        $('.jeu').show();

        $('.plateau').append($(carte.afficheCarteHtml()));
        $('.joueur1').append($((carte.joueur[0]).infoJoueur()));
        $('.joueur2').append($((carte.joueur[1]).infoJoueur()));



/*Attaque et bouclier des joueurs*/
        $(document).on("click",'#attJ1', function () {
            (carte.joueur[0]).attaque(1,"J2");
        });
        $(document).on("click",'#attJ2', function () {
            (carte.joueur[1]).attaque(0,"J1");
        });

        $(document).on("click",'#defJ1', function () {
            (carte.joueur[0]).defense("J2");
        });

        $(document).on("click",'#defJ2', function () {
            (carte.joueur[1]).defense("J1");
        });



/*Déplacement des joueurs sur l'interface*/
        $(document).on("click",'[name="J1"]', function () {
            (carte.joueur[0]).deplacementInt(this.id,"J2");
        });


        $(document).on("click",'[name="J2"]',function () {
            (carte.joueur[1]).deplacementInt(this.id,"J1");
        });


/*Déplacement des joueurs avec touche clavier */
        document.addEventListener("keyup", function (event) {
            if (carte.tour === "J1"){
                (carte.joueur[0]).deplacementClavier(event.code, "J2");
            } else if (carte.tour === "J2") {
                (carte.joueur[1]).deplacementClavier(event.code, "J1");
            }
        });

    });


});
