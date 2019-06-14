var path = require("path");
// Your `htmlRoutes.js` file should include two routes:

//    * A GET Route to `/survey` which should display the survey page.
//    * A default, catch-all route that leads to `home.html` which displays the home page.
module.exports = function(app){

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
      });
    
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    app.get("*", function(req, res, next){
       if(req.url.indexOf("/api") === 0) return next()
       if(req.url.indexOf("/assets") === 0) return next()
       if(req.url.indexOf("/css") === 0) return next()
       if(req.url.indexOf("/img") === 0) return next()

       res.sendFile(path.join(__dirname, "/../public/404.html"));
    })
};

