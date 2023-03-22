const florestButton = document.querySelector('.florest')
const rainButton = document.querySelector('.rain')
const cafeButton = document.querySelector('.cafe')
const fireplaceButton = document.querySelector('.fireplace')
const styleCards = document.querySelectorAll('.single-card')
const styleControls = document.querySelector('.controls')
const florestSound = new Audio('https://drive.google.com/uc?authuser=0&id=1CRHkV72WUMdcqec5GT_KdsqFz0z3VAOA&export=download')
const rainSound = new Audio('https://drive.google.com/uc?authuser=0&id=1Ip8xBqAUJ-bty51Wz8JBtX_bWXCgA0P2&export=download')
const cafeSound = new Audio('https://drive.google.com/uc?authuser=0&id=1OxLKpCwg2wrxXFNUHgZxJ51QEt0ac5RA&export=download')
const fireplaceSound = new Audio('https://drive.google.com/uc?authuser=0&id=1MakaBPxJvTa_whaSM3kEbRcxiVd1GRCB&export=download')
const volumeFlorest = document.querySelector('#volume-florest')
const volumeRain = document.querySelector('#volume-rain')
const volumeCafe = document.querySelector('#volume-cafe')
const volumeFireplace = document.querySelector('#volume-fireplace')
const playButton = document.querySelector('.play')
const stopButton = document.querySelector('.stop')
const addButton = document.querySelector('.add-time')
const removeButton = document.querySelector('.remove-time')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const sunIcon = document.querySelector('.light-mode')
const moonIcon = document.querySelector('.dark-mode')
const rootVariables = document.querySelector(':root')
let minutes = Number(minutesDisplay.textContent)
let startTimeout

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function countdown() {
  startTimeout = setTimeout(function() {
  let seconds = Number(secondsDisplay.textContent)
  let minutes = Number(minutesDisplay.textContent)
  
  if (minutes <= 0 && seconds <= 0) {
    return
  }
  
  if (seconds <= 0) {
    seconds = 60
    --minutes
  }

  updateTimerDisplay(minutes, --seconds)

  countdown()

  }, 1000)
}

function SoundLoop() {
  florestSound.loop = true
  rainSound.loop = true
  cafeSound.loop = true
  fireplaceSound.loop = true
}

function themeSwitch() {
  let darkBG = getComputedStyle(rootVariables).getPropertyValue('--bg-color-dark')
  let lightBG = getComputedStyle(rootVariables).getPropertyValue('--bg-color-light')
  let darkText = getComputedStyle(rootVariables).getPropertyValue('--text-color-dark')
  let lightText = getComputedStyle(rootVariables).getPropertyValue('--text-color-light')
  
  if (sunIcon.classList.contains('hide')) {
    document.body.style.background = darkBG
    document.body.style.color = lightText
    
    for (const eachCard of styleCards) {
      eachCard.classList.add('card-dark-mode');
      eachCard.classList.add('light-icon') 
      eachCard.classList.add('light-slider') 
    }
    styleControls.classList.add('light-icon')  
    florestButton.classList.add('florest-dark')
    rainButton.classList.add('rain-dark')
    cafeButton.classList.add('cafe-dark')
    fireplaceButton.classList.add('fireplace-dark')

  } else {
    document.body.style.background = lightBG
    document.body.style.color = darkText

    for (const eachCard of styleCards) {
      eachCard.classList.remove('card-dark-mode')
      eachCard.classList.remove('light-icon')
      eachCard.classList.remove('light-slider') 
    }
    styleControls.classList.remove('light-icon')
    florestButton.classList.remove('florest-dark')
    rainButton.classList.remove('rain-dark')
    cafeButton.classList.remove('cafe-dark')
    fireplaceButton.classList.remove('fireplace-dark')
  }
}

florestButton.addEventListener('click', function() {
  SoundLoop()
  florestButton.classList.toggle('active')
  if (florestButton.classList.contains('active')) {
    florestSound.play()
    florestSound.volume = volumeFlorest.value
    volumeFlorest.value = 0.5
  } else {
    florestSound.pause()
  }
})

rainButton.addEventListener('click', function() {
  SoundLoop()
  rainButton.classList.toggle('active')
  if (rainButton.classList.contains('active')) {
    rainSound.play()
    rainSound.volume = volumeRain.value
    volumeRain.value = 0.5
  } else {
    rainSound.pause()
  }
})

cafeButton.addEventListener('click', function() {
  SoundLoop()
  cafeButton.classList.toggle('active')
  if (cafeButton.classList.contains('active')) {
    cafeSound.play()
    cafeSound.volume = volumeCafe.value
    volumeCafe.value = 0.5
  } else {
    cafeSound.pause()
  }
})

fireplaceButton.addEventListener('click', function() {
  SoundLoop()
  fireplaceButton.classList.toggle('active')
  if (fireplaceButton.classList.contains('active')) {
    fireplaceSound.play()
    fireplaceSound.volume = volumeFireplace.value
    volumeFireplace.value = 0.5
  } else {
    fireplaceSound.pause()
  }
})

playButton.addEventListener('click', function() {
  clearTimeout(startTimeout)
  countdown()
})

stopButton.addEventListener('click', function() {
  clearTimeout(startTimeout)
  minutes = 25
  updateTimerDisplay(minutes, 0)
})

addButton.addEventListener('click', function() {
  if (minutes >= 95) {
    minutes = 0
  } else {
    minutes = minutes + 5
  }
  updateTimerDisplay(minutes, 0)
  clearTimeout(startTimeout)
})

removeButton.addEventListener('click', function() {
  if (minutes <= 0) {
    minutes = 95
  } else {
    minutes = minutes - 5
  }
  updateTimerDisplay(minutes, 0)
  clearTimeout(startTimeout)
})

sunIcon.addEventListener('click', function() {
  sunIcon.classList.add('hide')
  moonIcon.classList.remove('hide')
  themeSwitch()
})

moonIcon.addEventListener('click', function() {
  moonIcon.classList.add('hide')
  sunIcon.classList.remove('hide')
  themeSwitch()
})

volumeFlorest.addEventListener('input', function() {
  florestSound.volume = volumeFlorest.value
})

volumeRain.addEventListener('input', function() {
  rainSound.volume = volumeRain.value
})

volumeCafe.addEventListener('input', function() {
  cafeSound.volume = volumeCafe.value
})

volumeFireplace.addEventListener('input', function() {
  fireplaceSound.volume = volumeFireplace.value
})