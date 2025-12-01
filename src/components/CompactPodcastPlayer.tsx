import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import playerThumbnail from "@/assets/player-thumbnail.png";

const CompactPodcastPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 bg-black rounded-lg px-3 py-2 shadow-lg">
      <audio
        ref={audioRef}
        src="https://stream.example.com/podcast"
        preload="metadata"
      />

      {/* Thumbnail */}
      <div className="hidden lg:block w-8 h-8 rounded overflow-hidden flex-shrink-0">
        <img src={playerThumbnail} alt="Podcast" className="w-full h-full object-cover" />
      </div>

      {/* Episode Info with Progress Bar */}
      <div className="hidden md:flex flex-col min-w-[120px] max-w-[200px] overflow-hidden">
        <div className="overflow-hidden">
          <span className="text-white text-xs font-doto font-medium whitespace-nowrap inline-block animate-scroll-fast">
            En Vivo. E2065. Las 10 de Erazno, el Chokolatazo, Parodias y mucho más...
          </span>
        </div>
        <div className="relative w-full h-[3px] bg-gray-700 rounded-full mt-1">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: "#ffd400",
            }}
          />
        </div>
      </div>

      {/* Animated Waveform */}
      <div className="flex items-center gap-[3px] h-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full transition-all duration-150"
            style={{
              backgroundColor: "#ffd400",
              height: isPlaying ? "100%" : "4px",
              animation: isPlaying
                ? `wave 0.8s ease-in-out infinite ${i * 0.1}s`
                : "none",
            }}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110"
        style={{ backgroundColor: "#ff0000" }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 text-white fill-white" />
        ) : (
          <Play className="h-4 w-4 text-white fill-white ml-[2px]" />
        )}
      </button>

      {/* Timer */}
      <span className="hidden lg:block text-white text-xs font-mono min-w-[40px]">
        {formatTime(currentTime)}
      </span>

      <style>
        {`
          @keyframes wave {
            0%, 100% {
              height: 30%;
            }
            50% {
              height: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CompactPodcastPlayer;
