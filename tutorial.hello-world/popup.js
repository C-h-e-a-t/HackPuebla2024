const GEMINI_API_KEY = ""; //Insertar API KEY
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

function getResponse(url, input, place) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: input
                }]
            }]
        }),
    })
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        console.log(result); // Log the entire result for debugging
        if (result && result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
            var new_text = result.candidates[0].content.parts[0].text;
            if (new_text=="A"){
                place.src = "./resources/A.png";
            }
            else if (new_text=="B"){
                place.src = "./resources/B.png";
            }
            else if (new_text=="C"){
                place.src = "./resources/C.png";
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        place.innerText = 'Error: API request failed';
    });
}

function getResponseFinal(url, input) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: input
                }]
            }]
        }),
    })
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        console.log(result); // Log the entire result for debugging
        if (result && result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
            var new_text = result.candidates[0].content.parts[0].text;
            console.log(new_text);
            if (new_text=="FUENTE CONFIABLE"){
                document.getElementById("green").src = "./resources/Yes.png";
                document.getElementById("fuente").innerText="FUENTE";
                document.getElementById("confiabletexto").innerText="CONFIABLE";
                fuente
            }
            else if (new_text=="FUENTE NO CONFIABLE"){
                document.getElementById("green").src  = "./resources/No.png";
                document.getElementById("fuente").innerText="FUENTE";
                document.getElementById("confiabletexto").innerText="NO CONFIABLE";
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        place.innerText = 'Error: API request failed';
    });
}
function getConf(){
    document.addEventListener('DOMContentLoaded', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const url = tabs[0].url;
            //console.log(url);

            getResponse(GEMINI_API_URL, "Responde la siguiente respuesta solamente con un con una letra de 'A' a 'C', 'A' siendo muy confiable y 'C' siendo nada confiable:¿Es el sitio web '"+url+"' un sitio confiable?", document.getElementById('confiable'));

            chrome.tabs.sendMessage(tabs[0].id, {action: "extractText"}, function(reply) {
                if (reply && reply.text) {
                    getResponse(GEMINI_API_URL, "Responde la siguiente respuesta solamente con un con una letra de 'A' a 'C', 'A' siendo muy correcta y 'C' siendo nada correcta:¿El siguiente texto está escrito con una ortografia correcta? "+ reply.text, document.getElementById('ortografia'));
                    getResponse(GEMINI_API_URL,"Responde la siguiente respuesta solamente con un con una letra de 'A' a 'C', 'A' siendo muy neutral y 'C' siendo nada neutral:¿El siguiente texto está escrito con un lenguaje neutral? "+ reply.text,document.getElementById('neutral'));
                    getResponse(GEMINI_API_URL, "Responde la siguiente respuesta solamente con un con una letra de 'A' a 'C', 'A' siendo muy relevante y 'C' siendo nada relevante:¿El siguiente texto es relevante? "+ reply.text, document.getElementById('relevancia'));
                    getResponse(GEMINI_API_URL, "Responde la siguiente respuesta solamente con un con una letra de 'A' a 'C', 'A' siendo incluye buenas estadisticas y 'C' siendo no incluye estadisticas:¿El siguiente texto incluye estadisticas? "+ reply.text, document.getElementById('estadisticas'));
                    getResponse(GEMINI_API_URL, "Responde la siguiente respuesta solamente con un con una letra de 'A' a 'C', 'A' siendo muy confiables y 'C' siendo nada confiables:¿Cómo clasificarias las fuentes del siguiente texto? "+ reply.text, document.getElementById('fuentes'));
                    getResponse(GEMINI_API_URL, "Responde la siguiente respuesta solamente con un con una letra de 'A' a 'C', 'A' siendo confiable y 'C' siendo nada confiable:¿Cómo clasificarias el siguiente texto? "+ reply.text, document.getElementById('analisis'));
                    getResponseFinal(GEMINI_API_URL, "tomando en cuenta aspectos como el lenguaje neutral, la relevancia, la fiabilidad de las fuentes bibliograficas y la fiabilidad del contenido solo respondo con un FUENTE CONFIABLE o con un FUENTE NO CONFIABLE en base al siguiente texto "+ reply.text);
                }
            });
        });


    });

}
getConf();
