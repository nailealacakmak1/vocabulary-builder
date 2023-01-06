
function getNumberOfWords() {
    return words.length
}

function getNumberOfWordsAlreadyShown(){
    return getShownWords().length
}

function resetCache() {
  localStorage.removeItem("shownWords");
  init();
}

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  if (isAlreadyShown(word)) {
    return pickRandomWord();
  } else {
    markAsShown(word);
    return word;
  }
}

function isAlreadyShown(item) {
  return getShownWords().some((a) => {
    return (
      a.word === item.word &&
      a.type === item.type &&
      a.belongTo === item.belongTo
    );
  });
}

function markAsShown(item) {
  if (isAlreadyShown(item)) {
    return;
  }
  const shownWords = getShownWords();
  shownWords.push(item);
  localStorage.setItem("shownWords", JSON.stringify(shownWords));
}

function getShownWords() {
  const shownWordsJSON = localStorage.getItem("shownWords");
  if (!shownWordsJSON) {
    return [];
  }
  return JSON.parse(shownWordsJSON);
}
