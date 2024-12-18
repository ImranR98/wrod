const shuffleLetters = (word) => {
    const letters = word.split('')
    const newLetters = []
    const randomizedIndices = new Set()
    while (randomizedIndices.size <= letters.length - 1) {
        randomizedIndices.add(Math.floor(Math.random() * (letters.length)))
    }
    randomizedIndices.forEach(i => {
        newLetters.push(letters[i])
    })
    return newLetters.join('')
}
const exchangeVowels = (word) => {
    const letters = word.split('')
    const newLetters = []
    for (let i = 0; i < letters.length; i++) {
        const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(letters[i].toLowerCase())
        if (isVowel && i < letters.length - 1) {
            newLetters.push(letters[i + 1])
            newLetters.push(letters[i])
            i++
        } else if (isVowel && i === letters.length - 1 && i !== 0 && newLetters[i - 1] === letters[i - 1]) {
            newLetters.pop()
            newLetters.push(letters[i])
            newLetters.push(letters[i - 1])
            i++
        } else {
            newLetters.push(letters[i])
        }
    }
    return newLetters.join('')
}
const makeWrod = (word, heat) => {
    const retainEnds = heat % 2 !== 0
    const switchVowelsOnly = heat <= 2
    const sectionToProcess = retainEnds ? word.slice(1, -1) : word
    return word.length > 2 ?
        (retainEnds ? word[0] : '') +
        (switchVowelsOnly ? exchangeVowels(sectionToProcess) : shuffleLetters(sectionToProcess)) +
        (retainEnds ? word[word.length - 1] : '')
        : word
}

const textInput = document.getElementById('textInput')
const responsePanel = document.getElementById('responsePanel')
const heatDropdown = document.getElementById('heatDropdown')
const responsePanelDiv = document.querySelector('#responsePanel div')
const submitButton = document.getElementById('submitButton')
const copyWrodsButton = document.getElementById('copyWrodsButton')
textInput.onclick = () => window.scrollTo(0, 0)

async function processWords() {
    responsePanel.style.display = 'none'
    const heat = Number.parseInt(heatDropdown.value)
    const wrods = textInput.value.split('\n').map(line => line.split(' ').map(word => makeWrod(word, heat)).join(' ')).join('\n')
    if (wrods.length > 0) {
        window.scrollTo(0, document.body.scrollHeight)
        responsePanelDiv.textContent = wrods
        responsePanel.style.display = 'block'
    }
}

function copyWrods() {
    if (responsePanelDiv.textContent.length > 0) {
        copyWrodsButton.setAttribute('disabled', '')
        copyWrodsButton.classList.add('is-primary')
        navigator.clipboard.writeText(responsePanelDiv.textContent)
        setTimeout(() => {
            copyWrodsButton.removeAttribute('disabled')
            copyWrodsButton.classList.remove('is-primary')
        }, 500);
    }
}