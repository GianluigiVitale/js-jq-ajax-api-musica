/*
Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
Bonus: Creare una select con i seguenti generi: pop, rock, metal e jazz.
In base a cosa scegliamo nella select vedremo i corrispondenti cd.
*/


$(document).ready(function() {

    var source = $("#card-song-template").html();
    var template = Handlebars.compile(source);

    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/array/music',
        method: 'GET',
        success: function (data) {
            var canzoni = data.response;
            for (var i = 0; i < canzoni.length; i++) {
                var canzone = canzoni[i];
                var elementiCanzone = {
                    songImg: canzone.poster,
                    songName: canzone.title,
                    author: canzone.author,
                    year: canzone.year,
                    genre: canzone.genre
                }
                var copiaCanzoni = template(elementiCanzone);
                $('.cds-container').append(copiaCanzoni);
            }
        }
    });

    $('.genre-selector').change(function() {
        var selectedGenre = $(this).val();
        if (selectedGenre == '') {
            $('.cd').show();
        } else {
            $('.cd').each(function(){
                if (selectedGenre.toLowerCase() == $(this).data('genre').toLowerCase()) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });


});
