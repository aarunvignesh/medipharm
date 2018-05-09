var app = require("express")(),
    path = require("path");

app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.get("/",(req, res) => {
    res.render("index");
});

app.get("*",(req, res) => {
    res.redirect("/");
})
app.listen(8000);