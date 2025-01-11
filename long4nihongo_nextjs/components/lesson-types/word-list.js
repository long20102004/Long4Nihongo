import { Card } from "@/components/ui/card";

export function WordList({ words }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <div className="divide-y divide-gray-700">
        {words.map((word, index) => (
          <div key={index} className="p-4 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-medium text-white">{word.term}</h4>
              <p className="text-sm text-gray-400">{word.reading}</p>
            </div>
            <p className="text-gray-300">{word.meaning}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
