export default function Sidebar({ levels, currentLevel, setCurrentLevel }) {
  return (
    <div className="w-48 mr-8 sticky top-20 self-start">
      <nav>
        <ul className="space-y-2">
          {levels.map((level) => (
            <li key={level}>
              <button
                onClick={() => {
                  setCurrentLevel(level);
                  document.querySelector(`[data-level="${level}"]`).scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-300 ${
                  currentLevel === level
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                {level}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

