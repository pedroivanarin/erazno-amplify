import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import podcastArtwork from "@/assets/podcast-artwork.png";

const PodcastSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes as default
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    // Skip forward 15 seconds
    const newTime = Math.min(currentTime + 15, duration);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handlePrevious = () => {
    // Skip backward 15 seconds
    const newTime = Math.max(currentTime - 15, 0);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <section 
      id="podcast" 
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ff416c, #ff4b2b)'
      }}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Big Player */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
            
            {/* Podcast Artwork */}
            <div className="flex justify-center mb-8">
              <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/30">
                <img 
                  src={podcastArtwork} 
                  alt="Erazno y La Chokolata Podcast" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Episode Title - Scrolling */}
            <div className="mb-8 overflow-hidden">
              <div className="animate-scroll-fast whitespace-nowrap">
                <span className="text-white text-2xl font-doto font-bold inline-block px-4">
                  Las 10 con Infieles, Parodias, el Chokolatazo, Hembras vs Machos, Asesinos Inesperados y más....
                </span>
                <span className="text-white text-2xl font-doto font-bold inline-block px-4">
                  Las 10 con Infieles, Parodias, el Chokolatazo, Hembras vs Machos, Asesinos Inesperados y más....
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-6
                  [&::-moz-range-thumb]:h-6
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:shadow-lg"
                style={{
                  background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%)`
                }}
              />
            </div>

            {/* Time Display */}
            <div className="flex items-center justify-between mb-12">
              <span className="text-white text-sm font-semibold tabular-nums">
                {formatTime(currentTime)}
              </span>
              <span className="text-white/70 text-sm font-semibold tabular-nums">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              {/* Speed Control Button */}
              <button
                className="text-white bg-white/10 px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors"
                aria-label="Playback speed"
              >
                1x
              </button>

              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className="text-white hover:scale-110 transition-transform active:scale-95"
                aria-label="Previous"
              >
                <SkipBack size={40} fill="white" />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="bg-white text-[#ff416c] rounded-full p-6 hover:scale-110 transition-transform active:scale-95 shadow-2xl"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={48} fill="currentColor" />
                ) : (
                  <Play size={48} fill="currentColor" className="ml-1" />
                )}
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="text-white hover:scale-110 transition-transform active:scale-95"
                aria-label="Next"
              >
                <SkipForward size={40} fill="white" />
              </button>

              {/* More Episodes Button */}
              <button
                className="text-white bg-white/10 px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors whitespace-nowrap"
                aria-label="More episodes"
              >
                Más episodios
              </button>
            </div>

            {/* Hidden audio element for future implementation */}
            <audio ref={audioRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
