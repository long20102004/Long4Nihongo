export class FlashCardd {
  constructor(word, meaning, example) {
    this.word = word;
    this.meaning = meaning;
    this.example = example;
  }
}

export class Word {
  constructor(hiragana, kanji, meaning) {
    this.hiragana = hiragana;
    this.kanji = kanji;
    this.meaning = meaning;
  }
}

export class Question {
  constructor(question, options, correctAnswer) {
    this.question = question;
    this.correctAnswer = correctAnswer - 1;
    this.options = options;
  }
}
