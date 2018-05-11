var express = require("express"),
    app = express(),
    path = require("path");

app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req, res) => {
    res.render("index");
});

app.get("/enquiry",(req, res) => {
    res.render("enquiry");
});

app.get("*",(req, res) => {
    res.redirect("/");
})
app.listen(8000);