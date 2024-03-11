const grid = document.querySelector('.grid')
const width = 30
let facing = "right"
let pacmanMoving
let ghostMoving
let currentPacmanPos = 673
let originalFacing = "right"
let ghostNum = 0
let tryBest = true
let ghosts = {1:{name:"blinky", position:343, moving:"left", target:31, targetMet:false, firstMove:false, tryBest:true},
              2:{name:"pinky", position:431, moving:"right", target:55, targetMet:false, firstMove:true, tryBest:true},
               3:{name:"scaredghost", position:433, moving:"right", target:865, targetMet:false, firstMove:true, tryBest:true},
                4:{name:"inky", position:435, moving:"right", target:841, targetMet:false, firstMove:true, tryBest:true}}
let borders = [31,32,33,34,35,36,37,38,39,40,42,45,46,47,
    48,49,50,51,52,53,54,55,61,66, 96, 126, 156, 186, 216,
     246, 276, 306,  336,366, 396, 426, 456, 486, 516, 546,
      576, 606, 636, 666, 696, 726, 756, 151, 152, 153, 154,
       155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165,
        166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 50,
         80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380,
          410, 440, 470, 500, 530, 560, 590, 620, 650, 680, 710,
           740, 770,72,102,132,162,135,105,75,55,85,115,145,175,
           205,235,265,189,219,249,250,251,252,255,256,257,261,315,312,
           262,263,264,265,282,285,427,428,399,340,341,342,343,344,
           345,346,347,339, 369, 429, 459, 489, 519,438,439, 549,
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
          863, 864, 822, 403,431,435,433]
function StartPosition(){
    ghosts[1].position = 403
    ghosts[2].position = 431
    ghosts[3].position = 433
    ghosts[4].position = 435
    currentPacmanPos = 673
}
for (let i=0; i<width*width;i++){
   const square = document.createElement('div')
   square.setAttribute("id", i)
   grid.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.grid div'))

function createroute(){
for (i=0;i<borders.length-4;i++){
    squares[borders[i]].classList.add('pellet')
}
}createroute()

squares[91].classList.replace('pellet', 'powerpellet')
squares[125].classList.replace('pellet', 'powerpellet')
squares[661].classList.replace('pellet', 'powerpellet')
squares[685].classList.replace('pellet', 'powerpellet')

function pacmanPos(pos){
    squares[currentPacmanPos].classList.remove(originalFacing)
    squares[currentPacmanPos].classList.remove('pacman')
    squares[pos].classList.add('pacman')
    squares[pos].classList.remove('pellet')
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
moveGhosts(1)
moveGhosts(2)
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
squares[ghosts[1].position].classList.add(ghosts[1].name)
squares[ghosts[2].position].classList.add(ghosts[2].name)
squares[ghosts[3].position].classList.add(ghosts[3].name)
squares[ghosts[4].position].classList.add(ghosts[4].name)
document.addEventListener('keydown', changeDirection)

pacmanMoving = setInterval(movePacman, 200);
// ghostMoving = setInterval(moveGhosts(1), 200);

function moveGhosts(ghostNum){
    if (ghosts[ghostNum].firstMove){
        squares[ghosts[ghostNum].position].classList.remove(ghosts[ghostNum].name)
        ghosts[ghostNum].position = 343
        squares[[ghosts[ghostNum].position]].classList.add(ghosts[ghostNum].name)
        ghosts[ghostNum].firstMove = false
        console.log(ghosts)

    } 
    let target = ghosts[ghostNum].target
    if (ghosts[ghostNum].targetMet){
    target = currentPacmanPos
}
squares[ghosts[ghostNum].position].classList.remove(ghosts[ghostNum].name)
switch (ghosts[ghostNum].moving){
    case "down":
        if (TargetMet(ghostNum, target)){
        } else if (MoveDown(ghostNum, true, target)){
        } else if (MoveRight(ghostNum, true, target)){
        } else if (MoveLeft(ghostNum, true, target)){
        } else if (MoveDown(ghostNum, false, target)){
        } else if (MoveUp(ghostNum, true, target)){
        } else if (MoveRight(ghostNum, false, target)){
        } else if (MoveLeft(ghostNum, false, target)){
        } else if (MoveUp(ghostNum, false, target)){}
        break
    case "left":
        if (TargetMet(ghostNum, target)){
        } else if (MoveLeft(ghostNum, true, target)){
        } else if (MoveDown(ghostNum, true, target)){
        } else if (MoveUp(ghostNum, true, target)){
        } else if (MoveLeft(ghostNum, false, target)){
        } else if (MoveRight(ghostNum, true, target)){
        } else if (MoveDown(ghostNum, false, target)){
        } else if (MoveUp(ghostNum, false, target)){
        } else if (MoveRight(ghostNum, false, target)){}
        break
    case "up":
        if (TargetMet(ghostNum, target)){
        } else if (MoveUp(ghostNum, true, target)){
        } else if (MoveRight(ghostNum, true, target)){
        } else if (MoveLeft(ghostNum, true, target)){
        } else if (MoveUp(ghostNum, false, target)){
        } else if (MoveDown(ghostNum, true, target)){
        } else if (MoveRight(ghostNum, false, target)){
        } else if (MoveLeft(ghostNum, false, target)){
        } else if (MoveDown(ghostNum, false, target)){}
        break
    case "right":
        if (TargetMet(ghostNum, target)){
        } else if (MoveRight(ghostNum, true, target)){
        } else if (MoveDown(ghostNum, true, target)){
        } else if (MoveUp(ghostNum, true, target)){
        } else if (MoveRight(ghostNum, false, target)){
        } else if (MoveLeft(ghostNum, true, target)){
        } else if (MoveDown(ghostNum, false, target)){
        } else if (MoveUp(ghostNum, false, target)){
        } else if (MoveRight(ghostNum, false, target)){}
        break
}
    TargetMet(ghostNum, target)
}

function MoveDown(ghostNum, tryBest, target){
    if (tryBest && ((Math.floor(target/30) > Math.floor(ghosts[ghostNum].position/30)) && borders.includes(ghosts[ghostNum].position + 30))){
        ghosts[ghostNum].position += 30
        ghosts[ghostNum].moving = "down"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    } else if (!tryBest && borders.includes(ghosts[ghostNum].position+30)) {
        ghosts[ghostNum].position += 30
        ghosts[ghostNum].moving = "down"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    }
    return false
}

function MoveUp(ghostNum, tryBest, target){
    if (tryBest && ((Math.floor(target/30) < Math.floor(ghosts[ghostNum].position/30)) && borders.includes(ghosts[ghostNum].position - 30))){
        ghosts[ghostNum].position -= 30
        ghosts[ghostNum].moving = "up"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    } else if (!tryBest && borders.includes(ghosts[ghostNum].position-30)) {
        ghosts[ghostNum].position -= 30
        ghosts[ghostNum].moving = "up"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    }
    return false
}

function MoveRight(ghostNum, tryBest, target){
    if (tryBest && ((target%30) > ghosts[ghostNum].position%30) && borders.includes(ghosts[ghostNum].position + 1)&& ghosts[ghostNum].position !== 440){
        ghosts[ghostNum].position++
        ghosts[ghostNum].moving = "right"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    } else if (!tryBest && borders.includes(ghosts[ghostNum].position + 1)&& ghosts[ghostNum].position !== 440) {
        ghosts[ghostNum].position++
        ghosts[ghostNum].moving = "right"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    }
    return false
}

function MoveLeft(ghostNum, tryBest, target){
    if (tryBest && (target%30 < ghosts[ghostNum].position%30) && borders.includes(ghosts[ghostNum].position-1)&& ghosts[ghostNum].position !== 426){
        ghosts[ghostNum].position--
        ghosts[ghostNum].moving = "left"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    } else if (!tryBest && borders.includes(ghosts[ghostNum].position-1)&& ghosts[ghostNum].position !== 426) {
        ghosts[ghostNum].position--
        ghosts[ghostNum].moving = "left"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    }
    return false
}

function TargetMet(ghostNum, target){
    if (ghosts[ghostNum].position === target){
        if (!ghosts[ghostNum].targetMet){
        ghosts[ghostNum].targetMet = true
        ghosts[ghostNum].moving = "right"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    } else {
        squares[ghosts[ghostNum].position].classList.remove(ghosts[ghostNum].name)
        ghosts[ghostNum].position = 343
        ghosts[ghostNum].moving = "right"
        squares[ghosts[ghostNum].position].classList.add(ghosts[ghostNum].name)
        return true
    } 
}
return false
}