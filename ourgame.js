const grid = document.querySelector('.grid')
const width = 30
let borders = [1, 2]


for (let i=0; i<width*width;i++){
   const square = document.createElement('div')
   square.setAttribute("id", i)
   grid.appendChild(square)
}
for (let i=0;i<width;i++){
    borders.push(i)
}
for (let i=width;i<width*width;){
    borders.push(i)
    i += width
}
for (let i=59;i<width*width;){
    borders.push(i)
    i += width
}
console.log(borders)