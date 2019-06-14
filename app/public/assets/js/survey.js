
console.log("loading..");

$("#form-submit").click(function(events){

    var formIsValid = $("#survey-form")[0].checkValidity();
    var form = $("#survey-form")[0].reportValidity();

    if (form){
        event.preventDefault(); 
        if (formIsValid){
            var user = {
                name: $("#name").val().trim(),
                photo: $("#photoLink").val().trim(),
                scores: []
            }
            $("select.question").each(function(i,e){
                console.log(e.value);
                user.scores.splice(i,1, parseInt(e.value))
                e.value = "1"
            })

            $("#name").val("");
            $("#photoLink").val(""); 
            
            getMatch(user);
        }
    };

});

function getMatch(user){
    $.post("/api/friends", user, function(res){
        console.log(res);
        $(".modal-body").empty();
        var header = $("<h1>").text("Your new buddy is:")
        var name = $("<h2>").text(res.name);
        var image = $("<img>").attr("src", res.photo).attr("alt", res.name);
        $(".modal-body").append(header, name, image);
        $(".modal").modal("show");

    })
};