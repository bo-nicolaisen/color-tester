import supabase from "./model.js"
import { logOut } from "./model.js"
import initGame from "../site.js";

let selectedColor = ''
let allColors = []

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

    let newButton = document.createElement('button')
    newButton.innerText = '+'

    newButton.addEventListener('click', (e) => {
        editView('new')
    })

    myAppElement.appendChild(newButton)


    let logOutButton = document.createElement('button')
    logOutButton.innerText = 'Log Out'

    logOutButton.addEventListener('click', (e) => {

        logOut()
        initGame()
    })



    myAppElement.appendChild(logOutButton)

    let myColortiles = document.createElement('section')
    myColortiles.classList.add('colorList')

    allColors.forEach((colorData, index) => {

        let myTile = document.createElement('figure')

        myTile.innerHTML = `${createTile(colorData.hsl)}<span><h3>${colorData.name}</h3>h:${colorData.hsl.h}&deg  s:${colorData.hsl.s}%  l:${colorData.hsl.l}%</span>`


        let myButtons = document.createElement('div')
        myButtons.id = "tileButtons"

        let editbutton = document.createElement('button')
        editbutton.innerText = 'edit'

        editbutton.addEventListener('click', (e) => {
            editView(index)
        })

        myButtons.appendChild(editbutton)


        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'

        deleteButton.addEventListener('click', (e) => {

            deleteColor(index)
        })

        myButtons.appendChild(deleteButton)

        myTile.appendChild(myButtons)
        myColortiles.appendChild(myTile)
    });


    myAppElement.appendChild(myColortiles)


}

function createTile(hsl) {
    return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect id="colorTile" width="250" height="250" x="0" y="0" fill="hsl(${hsl.h},${hsl.s}%, ${hsl.l}%)"/></svg>`

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

    //console.log(selectedColor);

    let myAppElement = document.getElementById('app')
    let myHTML = '<section class="quiz"> <h1>Color test</h1>'

    // svg
    myHTML += `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect id="colorTile" width="250" height="250" x="25" y="25" fill="hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)"/></svg>`

    myHTML += `<span>H <input id="myName" type="text" value="${selectedColor.name}"></span>`

    myHTML += `<span>H <input id="h" type="range" min="0" max="360" value="${selectedColor.hsl.h}" class="slider"> <div id="hVal">${selectedColor.hsl.h}&deg</div></span>`
    myHTML += `<span>S <input id="s" type="range" min="0" max="100" value="${selectedColor.hsl.s}" class="slider"><div id="sVal">${selectedColor.hsl.s}%</div></span>`
    myHTML += `<span>L <input id="l" type="range" min="0" max="100" value="${selectedColor.hsl.l}" class="slider"><div id="lVal">${selectedColor.hsl.l}%</div></span>`

    myHTML += `<div class="buttonRow"><button id="done">gem</button>`
    myHTML += `<button id="cancel">cancel</button></div>`
    myHTML += `</section>`

    myAppElement.innerHTML = myHTML

    // svg box
    let colorTile = document.getElementById('colorTile')
    // color controls
    document.getElementById('h').addEventListener('input', (e) => {
        selectedColor.hsl.h = e.target.value
        document.getElementById('hVal').innerHTML = `${e.target.value}&deg`
        let color = `hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)`
        colorTile.setAttribute("fill", color);
    })

    document.getElementById('s').addEventListener('input', (e) => {
        selectedColor.hsl.s = e.target.value
        document.getElementById('sVal').innerText = `${e.target.value}%`
        let color = `hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)`
        colorTile.setAttribute("fill", color);
    })

    document.getElementById('l').addEventListener('input', (e) => {
        selectedColor.hsl.l = e.target.value
        document.getElementById('lVal').innerText = `${e.target.value}%`
        let color = `hsl(${selectedColor.hsl.h},${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%)`
        colorTile.setAttribute("fill", color);
    })

    // main controlls
    document.getElementById('done').addEventListener('click', (e) => {
        selectedColor.name = document.getElementById('myName').value

        makeEditColor()
    })
    document.getElementById('cancel').addEventListener('click', (e) => {
        getColors()
    })
}

async function makeEditColor() {

    console.log();
    if (selectedColor.id) {

        const { error } = await supabase
            .from('colors')
            .update({ name: selectedColor.name, hsl: selectedColor.hsl, description: selectedColor.description })
            .eq('id', selectedColor.id)

    } else {
        const { error } = await supabase
            .from('colors')
            .insert({ name: selectedColor.name, hsl: selectedColor.hsl, description: selectedColor.description })
    }
    getColors()
}

function newColor() {
    let newColor = {
        hsl: { h: 100, s: 100, l: 50 },
        description: 'new color',
        name: 'new color'
    }
    return newColor
}

async function deleteColor(index) {


    const response = await supabase
        .from('colors')
        .delete()
        .eq('id', allColors[index].id)

    getColors()
}