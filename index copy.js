var express = require("express");
var arti = require('artifactory-api');

var app = express();
var artifactory = arti();

app.set("view engine", "jade");

app.get("/", function(req, res) {
    res.render("index", {contenido: "Json pasado por param"});
    // Clave en Base64
    let data = "a125922:EFVv3605";
    let encodedData = Buffer.from(data).toString('base64')
    console.log('Conectamos con la credencial: ' + encodedData); // output: SGVsbG8gV29ybGQh
    //
    var artifactoryCon =  artifactory.ArtifactoryAPI('https:<myServerURL>', encodedData);
})

app.listen(8080);
