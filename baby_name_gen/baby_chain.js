const fs = require('fs');
const Markov = require('./markov');

if (process.argv.length === 3) {
    var numberNames = parseInt(process.argv[2]);
} else {
    var numberNames = 30;
}

const trainingText = 'names.lst';
const markovChain = new Markov();
const data = fs.readFileSync(trainingText, 'utf8');

console.log("Loading " + trainingText + " into brain.");
markovChain.loadBrain(data);
console.log('Brain Reloaded');

const names = markovChain.generateSimpleSentence(numberNames);
console.log("Outputting " + numberNames + " generated names");
console.log(names.join('\n'));
