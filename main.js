// create functions
function handleActive(element) {
  element.parentElement.querySelectorAll(".active").forEach(ele => {
    ele.classList.remove("active")
  })
  element.classList.add("active")
}

function scrollTo(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault()
      document.querySelector(e.target.dataset.sec).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}

// gear
document.querySelector(".fa-gear").onclick = function () {
  this.classList.toggle("fa-spin")
  document.querySelector(".settings").classList.toggle("open")
}

// settings
let setarr = document.querySelector(".settings").children

document.addEventListener("click", (e) => {
  let arrrr = Array.from(document.body.querySelector(".settings").querySelectorAll("*"))
  if (e.target !== document.querySelector(".settings") && !arrrr.includes(e.target)) {
    document.querySelector(".settings").classList.remove("open")
  }

  if (document.querySelector(".settings").className == "settings open") {
    document.querySelector(".fa-gear").classList.add("fa-spin")
  } else {
    document.querySelector(".fa-gear").classList.remove("fa-spin")

  }
})


// colors
let colorLocal = window.localStorage.getItem("color")

if (colorLocal !== null) {
  document.documentElement.style.setProperty("--maincolor", colorLocal)
  document.body.style.setProperty("--maincolor", colorLocal)
  document.querySelectorAll(".dark").forEach(section => {
    section.style.setProperty("--maincolor", colorLocal)
  })


  document.querySelectorAll(".colors li").forEach(ele => {
    ele.classList.remove("active")
    if (ele.dataset.color === colorLocal) {
      ele.classList.add("active")
    }
  })
}

document.querySelectorAll(".colors li").forEach(li => {
  li.addEventListener("click", (e) => {
    handleActive(e.target)
    document.documentElement.style.setProperty("--maincolor", e.target.dataset.color)
    document.querySelectorAll(".dark").forEach(section => {
      section.style.setProperty("--maincolor", e.target.dataset.color)
    })
    document.body.style.setProperty("--maincolor", e.target.dataset.color)
    window.localStorage.setItem("color", e.target.dataset.color)
  })
})

//bg shuffle
let land = document.querySelector(".landing");
let imgArr = [];
for (let i = 1; i < 9; i++) {
  imgArr.push(`imgs/0${i}.jpg`);
}
let lastBg
let shuffle = function () {
  let ran = Math.floor(Math.random() * imgArr.length);
  land.style.backgroundImage = 'url(' + imgArr[ran] + ')';
  window.localStorage.setItem("lastbg", 'url(' + imgArr[ran] + ')')
}

// get last BG
window.onload = (e) => {
  land.style.backgroundImage = window.localStorage.getItem("lastbg")
}

//bg yes or no + active class
let bgValue
let bgLocal = window.localStorage.getItem("bg")
let bgInterval

if (bgLocal !== null) {
  bgValue = bgLocal
}

if (bgValue === "no") {
  clearInterval(bgInterval)
  handleActive(document.querySelector(".bg-box .no"))
} else {
  bgInterval = setInterval(shuffle, 5000)
  handleActive(document.querySelector(".bg-box .yes"))
}

document.querySelectorAll(".bg-box div").forEach(div => {
  div.addEventListener("click", (e) => {
    bgValue = e.target.dataset.value
    window.localStorage.setItem("bg", e.target.dataset.value)
    handleActive(e.target)
    if (bgValue === "no") {
      clearInterval(bgInterval)
    } else {
      bgInterval = setInterval(shuffle, 5000)
    }
  })
})

// dark theme

let darkValue
let darkLocal = window.localStorage.getItem("dark")

if (darkLocal !== null) {
  darkValue = darkLocal
}

if (darkValue === "no") {
  document.documentElement.classList.remove("dark")
  handleActive(document.querySelector(".light"))
} else {
  document.documentElement.classList.add("dark")
  handleActive(document.querySelector(".dark-but"))
}

document.querySelectorAll(".theme-box div").forEach(div => {
  div.addEventListener("click", (e) => {
    handleActive(e.target)
    darkValue = e.target.dataset.th
    window.localStorage.setItem("dark", e.target.dataset.th)
    if (darkValue === "no") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  })
})

//links scroll
scrollTo(document.querySelectorAll(".links a"))

//bullets scroll

scrollTo(document.querySelectorAll(".bullet"))

//bullets yes or no
let bulValue
let bulLocal = window.localStorage.getItem("bul")

if (bulLocal != null) {
  bulValue = bulLocal
}

if (bulValue == "no") {
  document.querySelector(".bullets").style.display = "none"
  handleActive(document.querySelector(".bul-box .no"))
} else {
  document.querySelector(".bullets").style.display = "block"
  handleActive(document.querySelector(".bul-box .yes"))
}

document.querySelectorAll(".bul-box div").forEach(div => {
  div.addEventListener("click", (e) => {
    handleActive(e.target)
    bulValue = e.target.dataset.value
    window.localStorage.setItem("bul", bulValue)
    if (bulValue === "no") {
      document.querySelector(".bullets").style.display = "none"
    } else {
      document.querySelector(".bullets").style.display = "block"
    }
  })
})


//skills
window.onscroll = () => {
  if (window.pageYOffset >= document.querySelector(".skills").offsetTop + document.querySelector(".skills").offsetHeight - this.innerHeight) {
    document.querySelectorAll(".prbar span").forEach(skill => {
      skill.style.width = skill.dataset.pr
    })
  }
}

//gallery
let imgs = document.querySelectorAll(".gallery img")
imgs.forEach(img => {
  img.addEventListener("click", (e) => {

    let over = document.createElement("div")
    over.className = "over"
    document.body.appendChild(over)

    let pop = document.createElement("div")
    pop.className = "pop"
    document.body.appendChild(pop)

    if (img.alt != null) {
      let head = document.createElement("h3")
      head.className = "pophead"
      head.textContent = img.alt
      pop.appendChild(head)
    }

    let image = document.createElement("img")
    image.className = "popimage"
    image.src = img.src
    pop.appendChild(image)

    let close = document.createElement("span")
    close.textContent = "X"
    close.className = "close"
    pop.appendChild(close)

    close.addEventListener("click", (e) => {
      e.target.parentElement.remove()
      over.remove()
    })

    over.addEventListener("click", (e) => {
      pop.remove()
      over.remove()
    })

  })

})
console.log(imgs)

// reset

document.querySelector(".reset").addEventListener("click", (e) => {
  window.localStorage.clear()
  window.location.reload()
})

// toggle menue
document.querySelector(".bars").onclick = function (e) {
  e.stopPropagation()
  this.classList.toggle("open")
  document.querySelector(".links").classList.toggle("open")
}

document.addEventListener("click", (e) => {

  if (e.target !== document.querySelector(".bars") && e.target !== document.querySelector(".links")) {
    e.stopPropagation()
    document.querySelector(".bars").classList.remove("open")
    document.querySelector(".links").classList.remove("open")
  }
})