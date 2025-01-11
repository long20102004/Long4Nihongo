export class FlashCardd {
  constructor(type, word, meaning, example) {
    this.type = type;
    this.word = word;
    this.meaning = meaning;
    this.example = example;
  }
}

export class Word {
  constructor(type, hiragana, kanji, meaning) {
    this.type = type;
    this.hiragana = hiragana;
    this.kanji = kanji;
    this.meaning = meaning;
  }
}

export class Question {
  constructor(
    type,
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer
  ) {
    this.type = type;
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correctAnswer = correctAnswer - 1;
    this.options = [answer1, answer2, answer3, answer4];
  }
}
