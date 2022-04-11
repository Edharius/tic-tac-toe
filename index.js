VANTA.TOPOLOGY({
    el: "#intro",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x206778,
    backgroundColor: 0x0
  })

let field = document.querySelector('.field')
let move = 0
let result = document.querySelector('.result')
let btnGame = document.querySelector('.btn-newgame')
let box = document.querySelectorAll('.box')
let audio = new Audio('./audio/cross.mp3')
let countZero = 0;
let countCross = 0;

let zero = `<svg class="zero"> 
<circle r="35" cx="50" cy="50" stroke="#245bd3"
stroke-width="4" fill="none" stroke-linecap="round"  />
</svg>`
let cross = `<svg class="cross">
<line class="first" x1="25" y1="17" x2="80" y2="82" 
stroke="#045812" stroke-width="4" stroke-linecap="round" />
<line class="first" x1="80" y1="17" x2="25" y2="82" 
stroke="#045812" stroke-width="4" stroke-linecap="round" />
</svg>`


const init = (ev) => {
    if (ev.target.className = 'box') {
        move % 2 === 0 ? ev.target.innerHTML = cross : ev.target.innerHTML = zero
        move % 2 === 0 ? ev.target.classList.add('x') : ev.target.classList.add('o')
        move++
        audio.play()
        check()
    } 
}

field.addEventListener('click', init)

const check = () => {
    const boxes = document.getElementsByClassName('box')
    const arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (i = 0; i < arr.length; i++) {
            if (boxes[arr[i][0]].classList.contains('x') && boxes[arr[i][1]].classList.contains('x') && boxes[arr[i][2]].classList.contains('x')) {
                boxes[arr[i][0]].classList.add('active');
                boxes[arr[i][1]].classList.add('active');
                boxes[arr[i][2]].classList.add('active');
                countCross++
                result.innerText = `Crosses! ${countCross} win on move ${move}`
                field.removeEventListener('click', init)
            } else if (boxes[arr[i][0]].classList.contains('o') && boxes[arr[i][1]].classList.contains('o') && boxes[arr[i][2]].classList.contains('o')) {
                boxes[arr[i][0]].classList.add('active');
                boxes[arr[i][1]].classList.add('active');
                boxes[arr[i][2]].classList.add('active');
                countZero++
                result.innerText = `Zeroses! ${countZero} win on move ${move}`
                field.removeEventListener('click', init)
            } else if (move === 9) {
                result.innerText = 'No one wins. Happens...'
                field.removeEventListener('click', init)
        }    
    }
}

const newGame = () => {
	move = 0;
	result.innerText = ''
    box.forEach(item => {
		item.innerHTML = '';
		item.classList.remove('x', 'o', 'active');
	});
    field.addEventListener('click', init)
}

btnGame.addEventListener('click', newGame);


