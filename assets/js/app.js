
// The gameboard will be stored in an array.
// Each array contained inside the main array is a row.
// Each string contained inside each row is a cell.
// Each cell with the same index belongs to the same column.

// Winning combinations:
// 1. Each cell in the same row are identical.
// 2. Each cell in the same column are identical.
// 3. arr[0][0], arr[1][1] and arr[2][2] are identical.
// 4. arr[0][2], arr[1][1] and arr[2][0] are identical.

const Gameboard = (function() {
	
	const arr = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	]
	
	// Populate the gameboard.
	// Each row and cell has its own data-attribute to change their
	// content a little easier.
	
	const populateDOM = (function() {
		const container = document.querySelector('.gameboard')
		
		arr.forEach((row, r) => {
			row.forEach((cell, c) => {
				let cellDiv = document.createElement('div')
						cellDiv.classList.toggle('cell')
						cellDiv.classList.toggle('isEmpty')
						cellDiv.setAttribute('data-row', r)
						cellDiv.setAttribute('data-column', c)
						cellDiv.textContent = cell
						
				container.appendChild(cellDiv)
			})
		})
		
		return {
			container
		}
	})()
	
	return {
		arr,
		populateDOM
	}
	
})()

const displayController = (function() {
	let cells = Gameboard.populateDOM.container.querySelectorAll('.cell')
	
	// When clicked, and it is not full, add the player's marker to the cell.
	
	function addMarker(marker) {
		cells.forEach((cell) => {
			if (cell.classList.contains('isFull') == false) {
				cell.addEventListener('click', () => {
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

// How to figure out when each turn starts and ends ?

// When the game starts, it's the player1's turn. After its turn is
// finished, it's the player2's turn.

// player1Turn = true
// player2Turn = false

// if the player1Turn boolean is true, player1.addMarker()
// if the player2Turn boolean is true, player2.addMarker()

// Maybe ?

// Between each turn, the game needs to check if one of the possible
// winning combinations was reached. If there is a winner the game ends.

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
