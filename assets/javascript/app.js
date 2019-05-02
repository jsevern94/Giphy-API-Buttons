$(document).ready(function () {

    var countries = ["Greece", "Germany", "Hungary", "Italy", "France", "Spain", "England", "Russia", "Finland", "Sweden", "Denmark"]

    function createButtons() {
        $("#button-div").empty();
        for (var i = 0; i < countries.length; i++) {
            var newButton = $("<button>");
            newButton.attr("class", "country-button")
            newButton.attr("country", countries[i]);
            newButton.text(countries[i]);
            $("#button-div").append(newButton);
        }
    }

    $(document.body).on("click", ".country-button", function () {
        var search = $(this).attr("country");
        console.log(search);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            search + "&api_key=5fFbOm9VsoajPNTVkMX6MGsP0hIHTABz&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                $("#gif-div").empty();
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>");
                    var personImage = $("<img>");
                    p.text("Rating: " + rating);
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gif-div").prepend(gifDiv);
                }
            });
    });

    // This function handles events where the add movie button is clicked
    $("#add-country").on("click", function (event) {
        event.preventDefault();
        countries.push($("#country-input").val());
        $("#country-input").val("");
        createButtons();
    });

    createButtons();



    // if (state === "still") {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    // } else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    // }

});