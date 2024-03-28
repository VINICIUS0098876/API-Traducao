const texto = document.getElementById('texto');
const traducao = document.getElementById('traducao');
const traduzir = document.getElementById('traduzir');
const selectTo = document.getElementById('selectTo');
const selects = document.querySelectorAll("select");


document.addEventListener('DOMContentLoaded', function() {
    let trilho = document.getElementById('trilho');
    let body = document.querySelector('body')

    if (trilho) {
        trilho.addEventListener('click', () => {
            trilho.classList.toggle('dark');
            body.classList.toggle('dark')
        });
    } else {
        console.error('Elemento com o ID "trilho" não encontrado.');
    }
});

const linguas = {
    'pt-BR': 'Português',
    "en-US": "Inglês",
    "de-DE": "Alemão",
    "es-ES": "Espanhol"
}

selects.forEach((item) => {
    for (let pais in linguas) {
        let selected = "";
        if (item.classList.contains("selectFrom") && pais === "pt-BR") {
            selected = "selected";
        } else if (item.classList.contains("selectTo") && pais === "en-US") {
            selected = "selected";
        } else if (item.classList.contains("selectTo") && pais === "de-DE") {
            selected = "selected";
        }
        const option = `<option value="${pais}"${selected}>${linguas[pais]}</option>`;
        item.insertAdjacentHTML("beforeend", option);
    }
});

traduzir.addEventListener('click', function(){
    if(texto.value){
        translate();
    } else {
        return false;
    }
    if(texto.value === 'Alice'){
        document.body.classList.toggle('dark')
    }
});

function translate(){
    fetch(`https://api.mymemory.translated.net/get?q=${texto.value}&langpair=${selects[0].value}|${selects[1].value}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(texto.value)
        console.log(data);
        traducao.value = data.responseData.translatedText;

        // Usando a API de fala para falar o texto traduzido
        var speechSynthesis = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(data.responseData.translatedText);
        speechSynthesis.speak(utterance);
    })
    .catch((error) => {
        console.error('Erro ao traduzir:', error);
    });
}

window.addEventListener('DOMContentLoaded', function(e) {
    const speakbtn = document.getElementById('speakButtom');

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        speakbtn.addEventListener('click', function(e) {
            recognition.start();
        }, false);
        recognition.addEventListener('result', function(e) {
            console.log(e);
            var result = e.results[0][0].transcript; // corrigido
            console.log(result);
            if (result === 'Alice') { // corrigido
                document.body.classList.toggle('dark');
            }
            // window.location.href = 'http://' + result;
        }, false);
    } else {
        alert('Este navegador não suporta esta funcionalidade ainda!');
    }
}, false);
    





// https://translate.googleapis.com/$discovery/rest?version=v3