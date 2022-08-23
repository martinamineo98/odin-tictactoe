
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
		
		arr.forEach((row, r) => {
			row.forEach((cell, c) => {
				let cellDiv = document.createElement('div')
						cellDiv.classList.toggle('cell')
						cellDiv.classList.toggle('isEmpty')
						cellDiv.setAttribute('data-row', r)
						cellDiv.setAttribute('data-col', c)
						cellDiv.textContent = cell
						
				container.appendChild(cellDiv)
			})
		})
		
		return {
			container
		}
	})()
	
	// I need to verify if there is a winning combination present in the
	// array.
	
	// 1) If all items in the same row are equal.
	// 2) If all items in the same column are equal.
	// 3) If all items in the same diagonal are equal.
	//		arr[0][0] == arr[1][1] == arr[2][2]
	//		arr[0][2] == arr[1][1] == arr[2][0]
	
	// I need to get the value of one of the winning cells and
	// confront it with each of the players' markers.
	
	// If each item of the arr is not empty and there is no winner,
	// the game ends in a tie.
	
	// I might keep track of the number of turns to avoiding checking
	// if the array is empty. If there are no more turns, the game ends
	// in a tie.
	
	const getGameWinner = () => {
		
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
