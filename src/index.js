const containter = document.querySelector("#dog-image-container")
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const ulContainter = document.querySelector("#dog-breeds")
const dropDown = document.querySelector("#breed-dropdown")
breedObj = []

ulContainter.addEventListener('click', handleClick)
dropDown.addEventListener('change', handleChange)

function getImages () {
    //1. Get images
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
    
        //We now have an array of images
        const imgs = images.message
        let imgsArray = CreateImgElement(imgs)
        renderImgs(imgsArray)
    })
}

//turn it into img elements that we can append
function CreateImgElement(imgs){
    return imgs.map((img) => {
        let i = `<img src=${img}>`
        return i
    })
}

 // Now append each img element to the DOM so that they can be rendered
function renderImgs(imgsArray) { 
    imgsArray.forEach(element => {
        //containter.innerHTML += element
        renderElement(element)
    })
}

function renderElement(element) {
    ulContainter.innerHTML += element
}

function getBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        breedObj = Object.keys(breeds.message)
        const breedLis = CreateLiElement(breedObj)
        renderLi(breedLis)
    })
}

function CreateLiElement(breedObj){
    return breedObj.map((breed) => {
        let li = `<li>${breed}</li`
        return li
    })
}

function renderLi(BreedLis) { 
    BreedLis.forEach(element => {
        //containter.innerHTML += element
        renderElement(element)
    })
}

function handleClick(event) {
    if(event.target.nodeName === 'LI') {
        if(event.target.style.color === 'red'){
            event.target.style.color = 'black'
        }
        else {
        event.target.style.color = 'red'  
        }
    }
}

function handleChange(event) {
    const letter = event.target.value
    //filter out the breeds that start with the letter
    const filterBreeds = breedObj.filter(breed => breed.startsWith(letter))
    const filterBreedsLis = CreateLiElement(filterBreeds)
    ulContainter.innerHTML = ''
    renderLi(filterBreedsLis)
}

//getImages()
getBreeds()
