$(document).ready(function() {
    //  $('button').click(function() {
    //      $("button").removeClass("selected");
    //      $(this).addClass("selected");
    $('form').submit(function(evt) {
        evt.preventDefault();
        let $searchField = $('#search');
        let $submitButton = $('#submit');

        $searchField.prop('disable', true);
        $submitButton.attr('disable', true).val('searching...');
        const flickrerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

        let flickerOptions = {
            tags: $searchField.val(),
            format: "json"
        };

        function displayPhotos(data) {
            let photoHTML = '<ul>';
            $.each(data.items, function(i, photo) {
                photoHTML += '<li class="grid-25 tablet-grid-50';
                photoHTML += '<a href="' + photo.link + '" class="photo">';
                photoHTML += '<img src="' + photo.media.m + '"></a></li>';
            });
            photoHTML += '</ul>';
            $('#photos').html(photoHTML);
            $searchField.prop('disable', false);
            $submitButton.attr('disable', false).val('search');
        }
        $.getJSON(flickrerAPI, flickerOptions, displayPhotos);

    });
}); // end ready