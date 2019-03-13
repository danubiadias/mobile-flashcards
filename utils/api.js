import { AsyncStorage } from 'react-native';

const STORAGE_KEY_FLASHCARDS = 'flashcards: decks';

const initialData = {}

export function getDecks (deck) {
    return AsyncStorage.getItem(STORAGE_KEY_FLASHCARDS)
    .then(results => {
      if(results === null) {
        AsyncStorage.setItem(STORAGE_KEY_FLASHCARDS, JSON.stringify(initialData))
        return initialData
      }else {
        return JSON.parse(results)
      }
    })
  }

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    STORAGE_KEY_FLASHCARDS,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    })
  );
}

export function addCardToDeck(name, card) {
  return AsyncStorage.getItem(STORAGE_KEY_FLASHCARDS)
    .then(results => JSON.parse(results))
    .then(results => {
      results[name].questions.push(card);
      AsyncStorage.setItem(STORAGE_KEY_FLASHCARDS, JSON.stringify(results));
      return results;
    });
}