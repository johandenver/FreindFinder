// Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friendsData = require("../data/friends")

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {

        return res.json(friendsData);
      });
    
    app.post("/api/friends", function(req, res) {
        
        // new freind variable is data from form body:
        var newFriend = req.body;
        console.log(newFriend);

        var newFreindScores = newFriend.scores;
        var bestMatch = null;
        var lowestDiff = 1000;

        for (let i = 0; i < friendsData.length; i++) {
            var currentFriend = friendsData[i];
            var currentFriendScores = currentFriend.scores;
            var currentDiff = 0;
            for (let j = 0; j < currentFriendScores.length; j++) {
                currentDiff = currentDiff + Math.abs(parseInt(currentFriendScores[j])-parseInt(newFreindScores[j]));  
            }
            if (currentDiff < lowestDiff) {
                lowestDiff = currentDiff
                bestMatch = currentFriend
            }
        
        }
        friendsData.push(newFriend);
        res.json(bestMatch);
    });  
};
