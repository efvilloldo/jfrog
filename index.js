var express = require("express");
var fetch = require("node-fetch");

var app = express();

app.set("view engine", "jade");

app.get("/", function(req, res) {
    res.render("index", {contenido: "Json pasado por param"});
    // Clave en Base64
    let data = "a125922:EFVv3605";
    let encodedData = Buffer.from(data).toString('base64')
    console.log('Conectamos con la credencial: ' + encodedData); // output: SGVsbG8gV29ybGQh
    //
    fetch('https://globaldevtools.bbva.com/artifactory/api/search/artifact?name=*inc*&repos=datio-generic-release',
        {method: 'GET',
        withCredentials: true,
        headers: {'X-Result-Detail': 'info',
                  'Authorization': 'Basic ZXN0ZWJhbi52aWxsb2xkbzpBS0NwNWUzVjJEcG5IMUd4U01zR0dSVFVyZ1VyVVVwanV4QlhRNmdnek1iM2k0TXJGZjh1bUdmMkJFWmRydGZhZFM3cVRiV25t'}
        })
    .then(function(response) {
        console.log('response = ', response);
        return response.text();
    })
    .then(function(data) {
        console.log('data = ', data);
    })
    .catch(function(err) {
        console.error(err);
    });

})

app.listen(8080);
