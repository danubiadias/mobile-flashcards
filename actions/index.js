export const CREATE_DECK = 'CREATE_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function createDeck (deck) {
	return {
		type: CREATE_DECK,
		deck
	}
}

export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function addCard (card) {
	return {
		type: ADD_CARD_TO_DECK,
		card
	}
}