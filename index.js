const fetch = require('isomorphic-fetch');

const getWordList = () => new Promise((resolve, reject) => {
  fetch('https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt')
  .then(x => x.text())
  .then(x => {
    const wordObj = x.split('\n').reduce((obj, current) => {
      const split = current.split('\t');
      const num = split[0];
      const word = split[1];

      obj[num] = word;
      return obj;
    }, {});

    resolve(wordObj);
  });
});

const rollDice = () => Math.floor(Math.random() * 6) || 1;

const genWord = () => {
  const times = [1, 2, 3, 4, 5];
  return times.map(() => rollDice()).join('');
};

const genWords = (length) => new Promise((resolve, reject) => {
  getWordList().then(list => {
    const phrase = new Array(length).fill(null).map(() => genWord());
    resolve(phrase.map(x => list[x]).join(' '));
  });
});

genWords(5).then(phrase => console.log(phrase));


module.exports = genWords;
