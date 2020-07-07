// variables
const listaTweets = document.getElementById('lista-tweets');


// event Listeners

eventListeners();

function eventListeners() {
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',
    agregarTweet);
    // borrar tweets
    listaTweets.addEventListener('click', borrartweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
    }

//funciones

// añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
//leer el valor del textarea 
const tweet = document.getElementById('tweet').value;  
//crear boton de eliminar
const botonBorrar = document.createElement('a');
botonBorrar.classList = 'borrar-tweet';
botonBorrar.innerText = 'x';


// crear elemento y añadirle el contenido a la lsita.
const li = document.createElement('li');
li.innerText = tweet;
//añade el boton de borrar al tweet
li.appendChild(botonBorrar);
//añande el tweet a la lista
listaTweets.appendChild(li); 

// añadir a local storage

agregarTweetLocalStorage(tweet);
}
//eliminar el tweet del DOM

function borrartweet(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tweet') {
          e.target.parentElement.remove();
          borrarTweetLocalStorage(e.target.parentElement.innerText);
   }
}
// mostrar datos de localStorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        //crear boton de eliminar
const botonBorrar = document.createElement('a');
botonBorrar.classList = 'borrar-tweet';
botonBorrar.innerText = 'x';


// crear elemento y añadirle el contenido a la lsita.
const li = document.createElement('li');
li.innerText = tweet;
//añade el boton de borrar al tweet
li.appendChild(botonBorrar);
//añande el tweet a la lista
listaTweets.appendChild(li); 

       });

   }

//Agregar tweet a local storange
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

     //añadir el nuevotweet
     tweets.push(tweet);
    //convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets) );
 
    }
// Comprobar que hayan elementos en localStorage retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
// revisamos los valores de local storage    
    if(localStorage.getItem('tweets') === null) {
    tweets = [];
    } else {        
         tweets = JSON.parse(localStorage.getItem('tweets') );
    }
        return tweets;

}

// eliminmar tweet de local storage

function borrarTweetLocalStorage(tweet)  {

    let tweets, tweetBorrar;
    //elimina la x del tweet
    tweetBorrar = tweet.substring(0,tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
       if(tweetBorrar === tweet) {
            tweets.splice(index, 1);
       }
     
   }) ;    

   localStorage.setItem('tweets', JSON.stringify(tweets) );

  }
