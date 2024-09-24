

const radioButtons = document.querySelectorAll('.radioButtons')
radioButtons.forEach(button => button.addEventListener('click', () => 
updatePhotoAlbum(button.id)))

function updatePhotoAlbum(selection) {
    if(selection == "radio1"){
        document.getElementById('photos1').style.display = 'flex'
        document.getElementById('photos2').style.display = 'none'
        document.getElementById('photos3').style.display = 'none'
    }
    if(selection == "radio2"){
        document.getElementById('photos1').style.display = 'none'
        document.getElementById('photos2').style.display = 'flex'
        document.getElementById('photos3').style.display = 'none'
    }
    if(selection == "radio3"){
        document.getElementById('photos1').style.display = 'none'
        document.getElementById('photos2').style.display = 'none'
        document.getElementById('photos3').style.display = 'flex'
    }
}

const menuButtons = document.querySelectorAll('.menuButton')
menuButtons.forEach(button => button.addEventListener('click', () => 
updateMenuAlbum(button.innerText)))
const menuPage = document.querySelectorAll('.rowOfMenu')

function updateMenuAlbum(selection) {
    menuPage.forEach(menu => setStyleNone(menu))
    menuPage.forEach(menu => {
        if(selection == menu.id){
            setStyleFlex(menu)
        }
    })
}
function setStyleNone(div) {
    div.style.display = 'none'
}
function setStyleFlex(div) {
    div.style.display = 'flex'
}

