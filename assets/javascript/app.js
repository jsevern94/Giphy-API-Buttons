$(document).ready(function () {
    //array of countries to make into buttons
    var countries = ["Greece", "Germany", "Hungary", "Italy", "France", "Spain", "England", "Russia", "Finland", "Sweden", "Denmark"]
    //function to create the buttons
    function createButtons() {
        $("#button-div").empty();
        for (var i = 0; i < countries.length; i++) {
            var newButton = $("<button>");
            newButton.attr("class", "country-button btn btn-success")
            newButton.attr("country", countries[i]);
            newButton.text(countries[i]);
            $("#button-div").append(newButton);
        }
    }
    //function to create an on-click event to start/stop gifs
    function gifClick() {
        $("img").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    }
    //function to get gifs and push them gif div
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
                console.log(results);
                $("#gif-div").empty();
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>").attr("class", "gif-div");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var countryImage = $("<img>");
                    countryImage.attr("src", results[i].images.fixed_height_still.url);
                    countryImage.attr("data-still", results[i].images.fixed_height_still.url);
                    countryImage.attr("data-animate", results[i].images.fixed_height.url);
                    countryImage.attr("data-state", "still");
                    gifDiv.prepend(p);
                    gifDiv.prepend(countryImage);
                    $("#gif-div").prepend(gifDiv);
                }
                gifClick();
            });
    });
    //function for creating new buttons
    $("#add-country").on("click", function (event) {
        event.preventDefault();
        if ($("#country-input").val().trim()) {
            countries.push($("#country-input").val().trim());
            $("#country-input").val("");
            createButtons();
        }
    });
    createButtons();
});