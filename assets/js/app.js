
let playerTurn = 0

// The gameboard will be stored in an array.
// Each array contained inside the main array is a row.
// Each string contained inside each row is a cell.
// Each cell with the same index belongs to the same column.

const Gameboard = (function() {

	const arr = [
	
		['', '', ''],
		['', '', ''],
		['', '', '']
		
	]
	
	// Populate the gameboard.
	// Each row and cell has its own data attribute to change their
	// content a little easier.
	
	const populateDOM = (function() {
		const container = document.querySelector('.gameboard')
		
		const createCells = (function(){
			arr.forEach((row, r) => {
					row.forEach((cell, c) => {
						let cellDiv = document.createElement('div')
								cellDiv.classList.toggle('cell')
								cellDiv.classList.toggle('isEmpty')
								cellDiv.setAttribute('data-row', r)
								cellDiv.setAttribute('data-col', c)
								cellDiv.textContent = ''
								
						container.appendChild(cellDiv)
				})
			})
		})()
		
		const isWinning = (el = container) => {
			el.classList.add('isWinningCombination')
		}
		
		return {
			container,
			isWinning
		}
	})()
	
	// 1) If all items in the same row are equal.
	// 2) If all items in the same column are equal.
	// 3) If all items in the same diagonal are equal. (2D Array Matrix)
	//		arr[0][0] == arr[1][1] == arr[2][2]
	//		arr[0][2] == arr[1][1] == arr[2][0]
	
	let gameTurns = 9
	let winnerMarker
	
	const getGameWinner = () => {
		
		// To change the classes of the cells easier, I've decided to push each
		// DOM row element in its own array, it follows the same order of the
		// original Gameboard.arr
		
		const arrNode = []
		
		const populateNodeArr = (function() {
			for (let i = 0; i < arr.length; i++) {
				const arrRow = populateDOM.container.querySelectorAll(`[data-row='${i}']`)
				arrNode.push(arrRow)
			}
		})()
		
		// Check if all items in the same row are equal.
		
		const checkIfRow = (function(){
			arr.forEach((row, rowIndex) => {
				if (!help.allEmpty(row) && help.allEqual(row)) {
					populateDOM.isWinning()
					arrNode[rowIndex].forEach((el) => populateDOM.isWinning(el))
					winnerMarker = arrNode[rowIndex][0].textContent
				}
			})
		})()
		
		// Check if all items in the same column are equal.
		
		const checkIfCol = (function() {
			const columns = help.getAllColumns(arr)
			let cells
			
			columns.forEach((col, colIndex) => {
				if (!help.allEmpty(col[1]) && help.allEqual(col[1])) {
					cells = populateDOM.container.querySelectorAll(`[data-col='${colIndex}']`)
					populateDOM.isWinning()
					winnerMarker = cells[colIndex].textContent
				}
			})
			
			if (cells != undefined) cells.forEach((cell) => populateDOM.isWinning(cell))
		})()
		
		// Check if all items in the same diagonal are equal.
		
		const checkIfDia = (function() {
			
			// Array Elements
			const arrLeft = []
			const arrRight = []
			
			// DOM Elements
			const diaLeft = []
			const diaRight = []
			
			// Thanks to: https://gist.github.com/Erushenko/308b4ab9dfd0bdfae12e72ccc710376a
			
			for (let i = 0; i < arr.length; i++) {
				const oppositeIndex = arr.length - i - 1
				arrLeft.push(arr[i][i])
				arrRight.push(arr[i][oppositeIndex])
				diaLeft.push(arrNode[i][i])
				diaRight.push(arrNode[i][oppositeIndex])
			}
			
			if (!help.allEmpty(arrLeft) && help.allEqual(arrLeft)) {
				populateDOM.isWinning()
				diaLeft.forEach((cell) => populateDOM.isWinning(cell))
				winnerMarker = diaLeft[0].textContent
			}
			
			if (!help.allEmpty(arrRight) && help.allEqual(arrRight)) {
				populateDOM.isWinning()
				diaRight.forEach((cell) => populateDOM.isWinning(cell))
				winnerMarker = diaRight[0].textContent
			}
		})()
		
		// If we do not have a winner, we reduce the number of turns.
		// If we have a winner, we do not have any more turns.
		
		if (winnerMarker == undefined) {
			gameTurns--
		} else {
			gameTurns = 0
		}
		
		// If the marker of the winner is 'X', player1 has won.
		// If the marker of the winner is 'O', player 2 has won.
		
		if (winnerMarker && winnerMarker == 'X') {
			player1.hasWon()
		} else if (winnerMarker && winnerMarker == 'O') {
			player2.hasWon()
		}
		
		// If there are no more turns, and we don't have a winner,
		// it is a tie.
		
		if (gameTurns == 0 && winnerMarker == undefined) {
			displayController.tie()
		}
		
	}
	
	return {
		arr,
		populateDOM,
		getGameWinner
	}
	
})()

const displayController = (function() {
	const cells = Gameboard.populateDOM.container.querySelectorAll('.cell')
	const heading = document.querySelector('.header-player')
	
	// When clicked, and it is not full, add the player's marker to the cell.
	// When clicked, and it is not full, add the player's marker to the array.
	// The Event Listener activates solely when the cell lacks the isFull class.
	
	const addMarker = () => {
		let marker = updateMarker()
		
		function updateMarker() {
			return playerTurn == 0 ? 'X' : 'O'
		}
		
		function updatePlayerTurn() {
			return playerTurn == 0 ? 1 : 0
		}
		
		cells.forEach((cell) => {
			const row = cell.getAttribute('data-row')
			const col = cell.getAttribute('data-col')
			
			if (cell.classList.contains('isFull') == false) {
				cell.addEventListener('click', () => {
					Gameboard.arr[row][col] = marker
					cell.textContent = marker
					cell.classList.remove('isEmpty')
					cell.classList.add('isFull')
					
					console.log(marker, playerTurn)
					
					playerTurn = updatePlayerTurn()
					marker = updateMarker()
					Gameboard.getGameWinner()
				})
			}
		})
	}
	
	// When the game has a winner or the game turns are finished, we need
	// to show the name of the winner on the screen.
	
	const showWinner = (name) => {
		heading.textContent = `${name} has won!`
	}
	
	const tie = () => {
		heading.textContent = 'And it\'s a tie!'
	}
	
	return {
		addMarker,
		showWinner,
		tie
	}
	
})()

const help = (function(){
	
	// Check if each elements in an array are empty strings.
	const allEmpty = (arr) => {
		return arr.every((el) => el == '' ? true : false)
	}
	
	// Check if each elements in an array is identical.
	const allEqual = (arr) => {
		return arr.every((el) => el == arr[0])
	}
	
	// Give me each item in each row with the same index in a 2D array.
	const getColumn = (arr, num) => {
		return arr.map((el) => el[num])
	}
	
	const getAllColumns = (arr) => {
		let newArr = []
		
		for (let index = 0; index < arr.length; index++) {
			let newArrInside = [index, getColumn(arr, index)]
			newArr.push(newArrInside)
		}
		
		return newArr
	}
	
	return {
		allEmpty,
		allEqual,
		getColumn,
		getAllColumns
	}
	
})()

const playerActions = {
	hasWon() {
		displayController.showWinner(this.name)
	}
}

function createPlayer(name, marker) {
	let player = Object.create(playerActions)
			player.name = name
			player.marker = marker
			
	return player
}

const player1 = createPlayer('Player 1', 'X')
const player2 = createPlayer('Player 2', '0')

displayController.addMarker()
