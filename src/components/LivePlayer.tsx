import { Play, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const LivePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-glow p-4 w-72 animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">EN VIVO</span>
          </div>
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Erazno y La Chokolata</p>
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-full"
            variant={isPlaying ? "secondary" : "default"}
          >
            <Play className="mr-2 h-4 w-4" />
            {isPlaying ? "Pausar" : "Escuchar en Vivo"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LivePlayer;
