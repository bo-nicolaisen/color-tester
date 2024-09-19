import supabase from "./model.js"

let selectedColor = { id: 'none' }
let allColors = []
let lastId = 'new'






export default async function getColors() {
    const { data, error } = await supabase
        .from('colors')
        .select()
    allColors = data
    getRandomColor()
}

function getRandomColor() {
    console.log('getRandomColor');
    const randomIndex = Math.floor(Math.random() * allColors.length)
    selectedColor = allColors[randomIndex]

    while (lastId == selectedColor.id) {
        console.log('finding new');

        const randomIndex = Math.floor(Math.random() * allColors.length)
        selectedColor = allColors[randomIndex]
    }


    lastId = selectedColor.id
    buildColorQuiz()

}


function buildColorQuiz() {

    let myQuizElement = document.getElementById('app')
    let myHTML = '<section class="quiz"> <h1>Color Challenge</h1>'

    // svg
    myHTML += `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect id="colorTile" width="250" height="250" x="25" y="25" fill="hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)"/></svg>`

    myHTML += `<button id="new">ny farve</button>`

    myHTML += `<span>H <input id="h" type="range" min="0" max="360" value="0" class="slider"> <div id="hVal">0&deg</div></span>`
    myHTML += `<span>S <input id="s" type="range" min="0" max="100" value="0" class="slider"><div id="sVal">0%</div></span>`
    myHTML += `<span>L <input id="l" type="range" min="0" max="100" value="0" class="slider"><div id="lVal">0%</div></span>`

    myHTML += `<div id="feedback"></div>`

    myHTML += `<button id="svar">svar</button>`
    myHTML += `</section>`

    myQuizElement.innerHTML = myHTML

    /// realtime sliders
    document.getElementById('h').addEventListener('input', (e) => {
        document.getElementById('hVal').innerHTML = `${e.target.value}&deg`
    })
    document.getElementById('s').addEventListener('input', (e) => {
        document.getElementById('sVal').innerText = `${e.target.value}%`
    })
    document.getElementById('l').addEventListener('input', (e) => {
        document.getElementById('lVal').innerText = `${e.target.value}%`
    })
    ///






    document.getElementById('svar').addEventListener('click', (e) => {
        colorCallback()
    })

    document.getElementById('new').addEventListener('click', (e) => {
        getRandomColor()
    })
}

function colorCallback() {
    console.log('ansver');
    let myH = document.getElementById("h").value
    let myS = document.getElementById("s").value
    let myL = document.getElementById("l").value

    let myLevel = 10

    let test = 0

    if (myH <= selectedColor.hsl.h + myLevel && myH >= selectedColor.hsl.h - myLevel) {

        test++
    }

    if (myS <= selectedColor.hsl.s + myLevel && myS >= selectedColor.hsl.s - myLevel) {

        test++
    }

    if (myL <= selectedColor.hsl.l + myLevel && myL >= selectedColor.hsl.l - myLevel) {


        test++
    }

    if (test == 3) {
        console.log('yay');
        document.getElementById('feedback').innerHTML = `Sådan den rigtigr farve er:<br>"hsl(${selectedColor.hsl.h}&deg,${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)"`

    } else {
        console.log(`nope`);
        document.getElementById('feedback').innerHTML = `forkert!`

    }

}