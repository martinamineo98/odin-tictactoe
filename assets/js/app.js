
// The gameboard will be stored in an array.
// Each array contained inside the main array is a row.
// Each string contained inside each row is a cell.
// Each cell with the same index belongs to the same column.

const Gameboard = (function() {

	const arr = [
		['X', 'X', 'X'],
		['X', '', ''],
		['X', '', '']
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
	// 3) If all items in the same diagonal are equal.
	//		arr[0][0] == arr[1][1] == arr[2][2]
	//		arr[0][2] == arr[1][1] == arr[2][0]
	
	let gameTurns = 9
	let hasWinner
	
	const getGameWinner = () => {	

		// Check if all items in the same row are equal.
		const checkIfRow = (function() {		
			arr.forEach((row, index) => {
				const cells = populateDOM.container.querySelectorAll(`[data-row='${index}']`)
				
				if (!help.allEmpty(row) && help.allEqual(row)) {
					console.log(row)
					populateDOM.isWinning()
					cells.forEach((cell) => populateDOM.isWinning(cell))
					hasWinner = true
				}
			})
		})()
		
		// Check if all items in the same column are equal.
		// All the columns have the number of the row at index 0.
		
		const checkIfCol = (function() {
			const cols = help.getAllColumns(arr)
			let correctCol
			let cells
			
			cols.forEach((col, colIndex) => {
				if (!help.allEmpty(col[1]) && help.allEqual(col[1])) {
					correctCol = colIndex
					populateDOM.isWinning()
					cells = populateDOM.container.querySelectorAll(`[data-col='${correctCol}']`)
				}
			})
			
			if (cells) cells.forEach((cell) => populateDOM.isWinning(cell))
		})()
		
		// Check if all items in the same diagonal are equal.
		
		
		if (hasWinner) {
			gameTurns = 0
		} else {
			gameTurns--
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
	
	// When clicked, and it is not full, add the player's marker to the cell.
	// When clicked, and it is not full, add the player's marker to the array.
	// The Event Listener activates solely when the cell lacks the isFull class.
	
	const addMarker = (marker) => {
		cells.forEach((cell) => {
			const row = cell.getAttribute('data-row')
			const col = cell.getAttribute('data-col')
			
			if (cell.classList.contains('isFull') == false) {
				cell.addEventListener('click', () => {
					Gameboard.arr[row][col] = marker
					cell.textContent = marker
					cell.classList.toggle('isEmpty')
					cell.classList.toggle('isFull')
				})
			}
		})
	}
	
	return {
		addMarker
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
	addMarker() {
		displayController.addMarker(this.marker)
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

player1.addMarker()

Gameboard.getGameWinner()
