import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

const CompactPodcastPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [showVolume, setShowVolume] = useState(false);
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

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioRef}
        src="https://stream.example.com/podcast" // Replace with actual podcast stream URL
        preload="none"
      />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="h-8 w-8 p-0"
        aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      <div 
        className="relative"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          aria-label="Volume"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
        
        {showVolume && (
          <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-md p-3 shadow-lg w-32">
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-full"
              aria-label="Volume control"
            />
          </div>
        )}
      </div>

      <span className="text-xs text-muted-foreground hidden lg:inline-block">
        Podcast
      </span>
    </div>
  );
};

export default CompactPodcastPlayer;
