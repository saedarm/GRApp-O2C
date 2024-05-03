class Markov {
    constructor() {
        this.markovtable = {};
        this.reverse_markovtable = {};
        this.stopword = "\n";
        this.w1 = this.stopword;
        this.w2 = this.stopword;
        this.stopsentence = [" ", ".", "!", "?", "\n"];
        this.sentencesep = "\n";
    }

    loadBrain(text) {
        for (let line of text.split('\n')) {
            this.addToBrain(line);
        }
        // Mark the end of the file
        this.markovtable[`${this.w1},${this.w2}`] = [this.stopword];
    }

    addToBrain(line) {
        const letters = line.split('');
        for (let letter of letters) {
            if (this.stopsentence.includes(letter)) {
                this.markovtable[`${this.w1},${this.w2}`].push(letter);
                this.w1 = this.w2;
                this.w2 = letter;
            }
            this.markovtable[`${this.w1},${this.w2}`].push(letter);
            this.reverse_markovtable[letter] = this.reverse_markovtable[letter] || [];
            this.reverse_markovtable[letter].push([this.w1, this.w2]);
            this.w1 = this.w2;
            this.w2 = letter;
        }
    }

    generateSimpleSentence(maxsentences = 30) {
        let sentencecount = 0;
        let sentence = [];
        this.w1 = this.stopword;
        this.w2 = this.stopword;
        let sentences = [];
        while (sentencecount < maxsentences) {
            let newword = this.markovtable[`${this.w1},${this.w2}`][Math.floor(Math.random() * this.markovtable[`${this.w1},${this.w2}`].length)];
            if (this.stopsentence.includes(newword)) {
                sentences.push(sentence.join(''));
                sentence = [];
                sentencecount++;
                this.w1 = this.stopword;
                this.w2 = this.stopword;
            } else {
                sentence.push(newword);
            }
            this.w1 = this.w2;
            this.w2 = newword;
        }
        return sentences;
    }
}

module.exports = Markov;
