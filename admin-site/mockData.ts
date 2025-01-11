export const mockData = {
  courses: [
    {
      id: 1,
      title: "Beginner Japanese",
      lessons: [
        {
          id: 1,
          title: "Basic Greetings",
          sections: [
            { id: 1, title: "Hello and Goodbye", content: "こんにちは (Konnichiwa) - Hello\nさようなら (Sayounara) - Goodbye" },
            { id: 2, title: "Thank You", content: "ありがとう (Arigatou) - Thank you\nどういたしまして (Douitashimashite) - You're welcome" }
          ]
        },
        {
          id: 2,
          title: "Numbers 1-10",
          sections: [
            { id: 3, title: "Counting 1-5", content: "1 - 一 (ichi)\n2 - 二 (ni)\n3 - 三 (san)\n4 - 四 (yon/shi)\n5 - 五 (go)" },
            { id: 4, title: "Counting 6-10", content: "6 - 六 (roku)\n7 - 七 (nana/shichi)\n8 - 八 (hachi)\n9 - 九 (kyuu/ku)\n10 - 十 (juu)" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Intermediate Japanese",
      lessons: [
        {
          id: 3,
          title: "Basic Kanji",
          sections: [
            { id: 5, title: "Kanji for Nature", content: "山 (yama) - Mountain\n川 (kawa) - River\n木 (ki) - Tree" },
            { id: 6, title: "Kanji for Time", content: "日 (hi/nichi) - Day\n月 (tsuki/getsu) - Month\n年 (toshi/nen) - Year" }
          ]
        }
      ]
    }
  ]
};

