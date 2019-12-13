var express = require("express");
var fetch = require("node-fetch");

var app = express();

app.set("view engine", "jade");

function getDataFromArtifactory(myFilter, dArtifactory){
    let dataPage;
    let url = 'https://globaldevtools.bbva.com/artifactory/api/search/artifact?name=' + myFilter + '&repos=datio-generic-release';
    console.log('URL: ' + url)
    // Busca la info desde artifactory
    fetch(url,
        {method: 'GET',
        withCredentials: true,
        headers: {'X-Result-Detail': 'info',
                  'Authorization': 'Basic ZXN0ZWJhbi52aWxsb2xkbzpBS0NwNWUzVjJEcG5IMUd4U01zR0dSVFVyZ1VyVVVwanV4QlhRNmdnek1iM2k0TXJGZjh1bUdmMkJFWmRydGZhZFM3cVRiV25t'}
        })
    .then(function(response) {
        //console.log('response = ', response);
        return response.text();
    })
    .then(function(data) {
        console.log('data = ', data);
        dArtifactory = data
    })
    .catch(function(err) {
        console.error(err);
    });
}

app.get("/", function(req, res) {
    if (req.query.tFilter > ""){
        console.log('Filtro: ' + req.query.tFilter);
        var myFilter = "Filtro componentes: " + req.query.tFilter // *inc.conf
        var dArtifactory;
        console.log("antes de obtener info");
        getDataFromArtifactory(req.query.tFilter, dArtifactory);
        console.log("despues de obtener info");
        res.render("index", {contenido: myFilter, datos: dArtifactory });
    }
    else
        res.render("index");
})


app.post("/", function(req,res){
    /*console.log(req.query);
    var myFilter = "Filtro componentes: " + req.query.tFilter
    var dArtifactory;
    getDataFromArtifactory(req.query.tFilter, dArtifactory)
    res.render("index", {contenido: myFilter, datos: dArtifactory });*/
})

app.listen(8080);
