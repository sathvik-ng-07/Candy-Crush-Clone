document.addEventListener('DOMContentLoaded',() =>{
    const grid = document.querySelector('.grid')
    const width = 8
    const squares =[]
    let score = 0

    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue',
        
        

    ]

    // Create Board
    function createBoard() {
        for (let i=0; i< width*width; i++){
            const square = document.createElement('div')
            square.setAttribute('draggable' , true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random()* candyColors.length)
            square.style.backgroundColor = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)

        }
    }
    createBoard()

    //Drag the candies
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(){
        
        colorBeingDragged = this.style.backgroundColor
        squareIdBeingDragged = parseInt(this.id)
    }
    function dragOver(e){
        e.preventDefault()
    }
    function dragEnter(e){
        e.preventDefault()
    }
    function dragLeave(){
        this.style.backgroundColor = ''
    }
    
    function dragDrop(){
        colorBeingReplaced = this.style.backgroundColor
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundColor = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced

    }
    function dragEnd(){
        console.log(this.id,'dragend')

        // what is valid move?
        let validMoves = [
            squareIdBeingDragged -1, squareIdBeingDragged -width,
            squareIdBeingDragged +1, squareIdBeingDragged +width]

            let validMove = validMoves.includes(squareIdBeingReplaced)
           
            if(squareIdBeingReplaced && validMove){
                squareIdBeingReplaced = null
            }
            else if(squareIdBeingReplaced && !validMove){
                squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
                squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
            }
            else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
        }

        //Checking for matches
        //check for a row of three
        function checkRowForThree() {
            for (i = 0; i < 61; i ++) {
              let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                    })
                  }
                }
    }
    checkRowForThree()

             //check for column of three
             function checkColumnForThree() {
                for (i = 0; i < 47; i ++) {
                  let columnOfThree = [i, i+width, i+width*2]
                  let decidedColor = squares[i].style.backgroundColor
                  const isBlank = squares[i].style.backgroundColor === ''

                  if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                    score += 3
                    columnOfThree.forEach(index => {
                        squares[index].style.backgroundColor = ''
                        })
                      }
                    }
        }
        checkColumnForThree()






        window.setInterval(function(){
            checkRowForThree()
          }, 100)

























})