import supabase from "./model.js"


let selectedColor = ''
let allColors = []
//console.log(supabase);


export default function initAdmin() {
    getColors()
}


async function getColors() {
    const { data, error } = await supabase
        .from('colors')
        .select()
    allColors = data

    buildColorView()
}


function buildColorView() {



    let myAppElement = document.getElementById('app')
    myAppElement.innerHTML = ''
    let myColortiles = document.createElement('section')
    myColortiles.classList.add('colorList')

    allColors.forEach((colorData, index) => {

        let myTile = document.createElement('figure')

        myTile.innerHTML = `${createTile(colorData.hsl)}<h3>${colorData.name}</h3><span>h:${colorData.hsl.h}&deg  s:${colorData.hsl.s}%  l:${colorData.hsl.l}%</span>`
        let editbutton = document.createElement('button')
        editbutton.innerText = 'edit'

        editbutton.addEventListener('click', (e) => {
            editView(index)
        })

        myTile.appendChild(editbutton)

        myColortiles.appendChild(myTile)
    });


    myAppElement.appendChild(myColortiles)

    let newButton = document.createElement('button')
    newButton.innerText = 'new color'

    newButton.addEventListener('click', (e) => {
        editView('new')
    })

    myAppElement.appendChild(newButton)


}

function createTile(hsl) {
    return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect id="colorTile" width="250" height="250" x="25" y="25" fill="hsl(${hsl.h},${hsl.s}%, ${hsl.l}%)"/></svg>`

}

function editView(data) {
    if (data != 'new') {

        selectedColor = allColors[data]

    } else {
        console.log('make new color');
        selectedColor = 'new'
    }

    buildEditView()
}

function buildEditView() {

    if (selectedColor == 'new') {
        selectedColor = newColor()
    }

    console.log(selectedColor);

    let myAppElement = document.getElementById('app')
    let myHTML = '<section class="quiz"> <h1>Color test</h1>'

    // svg
    myHTML += `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect id="colorTile" width="250" height="250" x="25" y="25" fill="hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)"/></svg>`



    myHTML += `<span>H <input id="h" type="range" min="0" max="360" value="50" class="slider"></span>`
    myHTML += `<span>S <input id="s" type="range" min="0" max="100" value="50" class="slider"></span>`
    myHTML += `<span>L <input id="l" type="range" min="0" max="100" value="50" class="slider"></span>`

    myHTML += `<button id="done">gem</button>`
    myHTML += `<button id="cancel">cancel</button>`
    myHTML += `</section>`

    myAppElement.innerHTML = myHTML

    // svg box
    let colorTile = document.getElementById('colorTile')
    // color controls
    document.getElementById('h').addEventListener('change', (e) => {
        selectedColor.hsl.h = e.target.value
        let color = `hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)`
        colorTile.setAttribute("fill", color);
    })

    document.getElementById('s').addEventListener('change', (e) => {
        selectedColor.hsl.s = e.target.value
        let color = `hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)`
        colorTile.setAttribute("fill", color);
    })

    document.getElementById('l').addEventListener('change', (e) => {
        selectedColor.hsl.l = e.target.value
        let color = `hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)`
        colorTile.setAttribute("fill", color);
    })

    // main controlls
    document.getElementById('done').addEventListener('click', (e) => {
        makeEditColor()
    })
    document.getElementById('cancel').addEventListener('click', (e) => {
        getColors()
    })
}

async function makeEditColor() {

    console.log(selectedColor);

    const { error } = await supabase
        .from('colors')
        .insert({ name: selectedColor.name, hsl: selectedColor.hsl, description: selectedColor.description })

    console.log(error);

    getColors()
}

function newColor() {

    let newColor = {
        hsl: { h: 100, s: 100, l: 100 },
        description: 'new color',
        name: 'new color'
    }
    return newColor
}