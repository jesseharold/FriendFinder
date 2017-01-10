$("#submit").click(function(){
    var answers = [];
    var name = $("#name").val();
    var photo = $("#photo").val()
    if (!name || !photo){
        alert("Please fill in all information to continue");
    } else {
        for (var i = 1; i < 11; i++){
            answers.push($("input[name=question" + i + "]:checked").val());
        }
        if (answers < 10){
            alert("Please answer all survey question to continue.");
        } else {
            var userData = {
                "name": name,
                "photo": photo,
                "scores": answers
            };
            $.ajax({
                type: "POST",
                url: "/api/friends",
                data: userData
            }).done(function(data){
                //console.log("DONE");
                showFriend(data.name, data.photo);
            });
        }
    }
});
function showFriend(name, photo){
    var resultsCode = "Your most compatible friend match is";
    resultsCode += "<div class='friendName'>" + name + "</div>";
    resultsCode += "<img src='" + photo + "' alt='" + name + "' class='friendImage'>";
    $(".modalContent").html(resultsCode);
}