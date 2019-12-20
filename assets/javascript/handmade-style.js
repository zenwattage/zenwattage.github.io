(function () {
    var images;

    images = ["./images/rainTent1920.png", "./images/rocksdark.png", "./images/PalmTraaaee.jpg", "./images/goatssunset.png"];
    // images = ["https://source.unsplash.com/featured/?mountains", "https://source.unsplash.com/featured/?hiking", "https://source.unsplash.com/featured/?kayak", "https://source.unsplash.com/featured/?forest", "https://source.unsplash.com/featured/?mountain", "https://source.unsplash.com/featured/?trail", "https://source.unsplash.com/featured/?outdoors", "https://source.unsplash.com/featured/?norway"];

    $('div.card-image').each(function () {
        var random_image_index;
        random_image_index = Math.floor(images.length * Math.random());

        return $(this).css('background-image', 'url(' + images[random_image_index] + ')');
    });

}).call(this);
