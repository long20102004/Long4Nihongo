"use client";

export function JapaneseText({ text, highlightClassName = "text-primary font-bold" }) {
  // Split the text by the ** markers
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        // Check if this part is a highlighted word (surrounded by **)
        if (part.startsWith("**") && part.endsWith("**")) {
          // Remove the ** markers and apply highlight styling
          const word = part.slice(2, -2);
          return (
            <span key={index} className={highlightClassName}>
              {word}
            </span>
          );
        }
        // Regular text
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
