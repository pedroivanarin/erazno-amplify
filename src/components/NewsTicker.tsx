import { useState } from "react";

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Latest tweets from @ERAZNOYLACHOKO
  const tweets = [
    "Tweet 1 text here",
    "Tweet 2 text here",
    "Tweet 3 text here",
    "Tweet 4 text here",
  ];

  return (
    <div className="bg-accent py-3 overflow-hidden relative">
      <div className="container mx-auto px-4 flex items-center gap-4">
        
        <div 
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-12 ${isPaused ? '' : 'animate-scroll'}`}>
            {/* Duplicamos los items para crear el efecto infinito */}
            {[...tweets, ...tweets].map((item, index) => (
              <span
                key={index}
                className="text-black font-medium whitespace-nowrap text-sm md:text-base"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
