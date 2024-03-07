const grid = document.querySelector('.grid')
const width = 30
let facing = "right"
let pacmanMoving
let currentPacmanPos = 673
let originalFacing = "right"
let borders = [31,32,33,34,35,36,37,38,39,40,42,45,46,47,
    48,49,50,51,52,53,54,55,61,66, 96, 126, 156, 186, 216,
     246, 276, 306, 336, 366, 396, 426, 456, 486, 516, 546,
      576, 606, 636, 666, 696, 726, 756, 151, 152, 153, 154,
       155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165,
        166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 50,
         80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380,
          410, 440, 470, 500, 530, 560, 590, 620, 650, 680, 710,
           740, 770,72,102,132,162,135,105,75,55,85,115,145,175,
           205,235,265,189,219,249,250,251,252,255,256,257,261,315,312,
           262,263,264,265,282,285,427,428,399,340,341,342,343,344,
           345,346,347,339, 369, 399, 429, 459, 489, 519,438,439, 549,
         579, 519, 520, 521, 522, 523, 524, 525, 526, 527, 347, 377,
          407, 437, 467, 497, 527, 557, 587,410,441,442,424,425
        ,571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582,
          585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595,
          601,631,661, 612,642,672,615,645,675,666, 667, 668, 669,
           670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680,662,663
           ,683,684,685,663,693,723,753,713,743,773,751, 752, 753, 754,
            755, 756,  759, 760, 761, 762,765, 766, 767, 770,
             771, 772, 773, 774,781,811,841,792,852,795,825,775,805,835,
             865,841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851,
         852, 853, 854, 855, 856, 857, 858,625, 655,181,211,241,242,243,
         244,245,699,729,707,737,41,91,121,197,227, 859, 860, 861, 862,
          863, 864, 822]
for (let i=0; i<width*width;i++){
   const square = document.createElement('div')
   square.setAttribute("id", i)
   grid.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.grid div'))

function createroute(){
for (i=0;i<borders.length;i++){
    squares[borders[i]].classList.add('bread')
}
}createroute()

function pacmanPos(pos){
    squares[currentPacmanPos].classList.remove(originalFacing)
    squares[currentPacmanPos].classList.remove('pacman')
    squares[pos].classList.add('pacman')
    squares[pos].classList.remove('bread')
    squares[pos].classList.add(facing)
    currentPacmanPos = pos
}
function movePacman() {
    if (facing === "right" && borders.includes(currentPacmanPos + 1)){
    updatePacmanPos = currentPacmanPos + 1
    pacmanPos(updatePacmanPos)
    originalFacing = facing
} else if (facing === "left" && borders.includes(currentPacmanPos - 1)){
    updatePacmanPos = currentPacmanPos - 1
    pacmanPos(updatePacmanPos)
    originalFacing = facing
} else if (facing === "down" && borders.includes(currentPacmanPos + 30)){
    updatePacmanPos = currentPacmanPos + width
    pacmanPos(updatePacmanPos)
    originalFacing = facing
} else if (facing === "up" && borders.includes(currentPacmanPos - 30)){
    updatePacmanPos = currentPacmanPos - width
    pacmanPos(updatePacmanPos)
    originalFacing = facing
} else {
    facing = originalFacing
}
}
function changeDirection(e){
    switch(e.key){
        case 'ArrowUp':
            if (facing !== "up"){
                facing = "up"
                movePacman()
                break
            } 
        case 'ArrowRight':
            if (facing !== "right"){
                facing = "right"
                movePacman()
                break
            } 
        case 'ArrowDown':
            if (facing !== "down"){
                facing = "down"
                movePacman()
                break
            } 
        case 'ArrowLeft':
            if (facing !== "left"){
                facing = "left"
                movePacman()
                break
            }
    }
}
document.addEventListener('keydown', changeDirection)

pacmanMoving = setInterval(movePacman, 200);