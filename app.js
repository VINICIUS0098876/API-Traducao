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
const texto = document.getElementById('texto')
const traducao = document.getElementById('traducao')
const traduzir = document.getElementById('traduzir')


traduzir.addEventListener('click', function(){
    const texto = document.getElementById('texto')

    if(texto.value){
        translate()
    }else{
        return false
    }
})

function translate(){
    fetch(`https://api.mymemory.translated.net/get?q=${texto.value}&langpair=pt-BR|en-GB`)
    .then((response) => response.json())
    .then((data) => {
        console.log(texto.value)
        console.log(data);
        traducao.value = data.responseData.translatedText;
    })
}





// https://translate.googleapis.com/$discovery/rest?version=v3