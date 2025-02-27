
//------------------------------
// FRÅGOR
//------------------------------

const quizFrågor = [
    {
        kategori: "Böcker",
        frågor: [
            { fråga: "Vem skrev Brott och Straff?", svar: ["Fjodor Dostojevskij", "Astrid Lindgren", "Maria Gripe", "Jack Kerouac"], korrekt: 0 },
            { fråga: "Hur många böcker om Barnen i Bullerbyn skrev Astrid Lindgren?", svar: ["3", "5", "1", "7"], korrekt: 0 },
            { fråga: "Vilken bok förbjöds i Nazi-Tyskland?", svar: ["Frankenstein", "Den store Gatsby", "På västfronten intet nytt", "Koranen"], korrekt: 2 },
            { fråga: "Vad heter huvudpersonen i Stolthet och Fördom?", svar: ["Maria", "Evelyn", "Sarah", "Elizabeth"], korrekt: 3 },
            { fråga: "Hur dör Romeo i Romeo och Julia?", svar: ["Med en kniv", "Med gift", "Drunknar", "Kvävs"], korrekt: 1 }
        ]
    },
    {
        kategori: "Länder",
        frågor: [
            { fråga: "Vad heter Frankrikes huvudstad?", svar: ["Skopje", "Stockholm", "Paris", "Athen"], korrekt: 2 },
            { fråga: "Hur många länder finns det i världen?", svar: ["168", "209", "287", "195"], korrekt: 3 },
            { fråga: "Vilket land har störst befolkning?", svar: ["Indien", "Usa", "Kina", "Brasilien"], korrekt: 2 },
            { fråga: "Vilket land är världens minsta till ytan?", svar: ["Monaco", "Liechtenstein", "Vatikanstaten", "San Marino"], korrekt: 2 },
            { fråga: "Vilket land har flest tidszoner??", svar: ["USA", "Ryssland", "Kina", "Frankrike"], korrekt: 3 }
        ]
    }
]



//------------------------------
// STARTA
//------------------------------

const kategoriKnapp = document.querySelectorAll(".kategori")
const introDiv = document.getElementById("intro")
const quizDiv = document.getElementById("quiz")

let aktuellKategori
let aktuellFrågaIndex = 0
let poäng = 0

//Loopa igenom kategori-knapparna
kategoriKnapp.forEach(function(knapp){

    //Sätt eventlistener på kategoriknapp
    knapp.addEventListener("click", function(event){

        //Nollställ räkning av aktuell fråga och poäng
        aktuellFrågaIndex = 0
        poäng = 0

        // Spara knappens text i variabel
        // Hämtar listan med frågor som matchar texten på knappen
        const valdKategoriNamn = knapp.textContent
        aktuellKategori = quizFrågor.find(function(kategori){
            return kategori.kategori === valdKategoriNamn
        })

        //Döljer intro, visar quiz
        introDiv.classList.remove("visible")
        introDiv.classList.add("hidden")
        quizDiv.classList.remove("hidden") 
        quizDiv.classList.add("visible")

        //Skapa frågestruktur och funktionalitet
        visaFråga()

    })
})


//------------------------------
// QUIZ
//------------------------------

function visaFråga(){

    //Hämta aktuell fråga
    const aktuellFråga = aktuellKategori.frågor[aktuellFrågaIndex]

    //Töm hela quizDiv
    quizDiv.innerHTML = ""

    //Skapa fråge-elementet och lägg in den aktuella frågan
    const frågetext = document.createElement("h4")
    frågetext.textContent = aktuellFråga.fråga
    quizDiv.appendChild(frågetext)

    //Loopa igenom svaren kopplade till den aktuella frågan
    aktuellFråga.svar.forEach(function(svar, index){

        //Skapa svarsknapp, lägg in aktuell svarstext
        const svarsknapp = document.createElement("button")
        svarsknapp.textContent = svar;
        svarsknapp.classList.add("svarsknapp")

        //Evenlistener som räknar antal korrekta resultat
        svarsknapp.addEventListener("click", function() {
                if (index === aktuellFråga.korrekt) {
                    poäng++
                }

            //Låter användaren gå vidare till nästa fråga
            nästaFråga()
        })

        quizDiv.appendChild(svarsknapp)

    })
}


//------------------------------
// NÄSTA FRÅGA
//------------------------------

function nästaFråga() {
    aktuellFrågaIndex++

    if (aktuellFrågaIndex < aktuellKategori.frågor.length){
        visaFråga()
    } else {
        visaResultat() 
    }
}

//------------------------------
// AVSLUTA
//------------------------------

const resultatDiv = document.getElementById("resultat")

function visaResultat() {
    //Dölj quiz, visa resultat
    quizDiv.classList.remove("visible")
    quizDiv.classList.add("hidden")
    resultatDiv.classList.remove("hidden")
    resultatDiv.classList.add("visible") 
    
    //Töm resultatDiv
    resultatDiv.innerHTML = ""

    resultatDiv.textContent = `Du fick ${poäng} av ${aktuellKategori.frågor.length} rätt!`

    //Skapa en avsluta-knapp
    const avslutaKnapp = document.createElement("button")
    avslutaKnapp.textContent = "Avsluta"
    avslutaKnapp.id = "avsluta"
    avslutaKnapp.classList.add("avslutaknapp")
    resultatDiv.appendChild(avslutaKnapp)

    //Om avsluta väljs så visas introDiv
    avslutaKnapp.addEventListener("click", function() { 

        resultatDiv.classList.remove("visible")
        resultatDiv.classList.add("hidden")
        introDiv.classList.remove("hidden")
        introDiv.classList.add("visible")
    })
}
