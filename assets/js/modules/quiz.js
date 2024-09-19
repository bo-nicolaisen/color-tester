

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = 'https://gbcpbrlqpjrawbsytxex.supabase.co';
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiY3BicmxxcGpyYXdic3l0eGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MjM2NjcsImV4cCI6MjA0MjI5OTY2N30.3MAI1pcCl8fKh826j3VPGR09F3uyXHJ0byqNEggRMfg";

const supabase = createClient(supabaseUrl, supabaseKey);
let selectedColor = ''
let allColors = []
//console.log(supabase);





export default async function getColors() {
    const { data, error } = await supabase
        .from('colors')
        .select()
    allColors = data
    getRandomColor()
}

function getRandomColor() {


    const randomIndex = Math.floor(Math.random() * allColors.length)
    selectedColor = allColors[randomIndex]
    buildColorQuiz()

}


function buildColorQuiz() {

    let myQuizElement = document.getElementById('colorQuiz')
    let myHTML = '<h1>Color test</h1>'

    // svg
    myHTML += `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect id="colorTile" width="250" height="250" x="25" y="25" fill="hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)"/></svg>`

    myHTML += `<button id="new">ny farve</button>`

    myHTML += `<span>H <input id="h" type="range" min="0" max="360" value="50" class="slider"></span>`
    myHTML += `<span>S <input id="s" type="range" min="0" max="360" value="50" class="slider"></span>`
    myHTML += `<span>L <input id="l" type="range" min="0" max="360" value="50" class="slider"></span>`

    myHTML += `<button id="svar">svar</button>`


    myQuizElement.innerHTML = myHTML

    document.getElementById('svar').addEventListener('click', (e) => {
        colorCallback()
    })

    document.getElementById('new').addEventListener('click', (e) => {
        getRandomColor()
    })
}

function colorCallback() {
    console.log('butt');
    let myH = document.getElementById("h").value
    let myS = document.getElementById("s").value
    let myL = document.getElementById("l").value

    console.log(myH, myL, myS);


}