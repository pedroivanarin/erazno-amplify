import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import podcastArtwork from "@/assets/podcast-artwork.png";

const PodcastSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes as default
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState({
    number: "E2062",
    title: "Las 10 con Infieles, Parodias, el Chokolatazo, Hembras vs Machos, Asesinos Inesperados y más....",
    duration: "01:45:01"
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  const speeds = [1, 1.2, 1.5, 1.8, 2];

  const cycleSpeed = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const episodes = [
    { number: "E2066", title: "Las 10 de Erazno y el America, el Chokolatazo, Parodias, y llamadas de Santa", duration: "01:32:09" },
    { number: "E2065", title: "Las 10 de Erazno, el Chokolatazo, Parodias y mucho mas", duration: "01:12:35" },
    { number: "E2064", title: "Las 10 de Erazno, el Chokolatazo, Parodias y mas", duration: "01:13:14" },
    { number: "E2063", title: "Las 10 de Erazno, el Chokolatazo, Parodias, Hembras vs Machos y mas", duration: "01:33:20" },
    { number: "E2062", title: "Las 10 con Infieles, Parodias, el Chokolatazo, Hembras vs Machos, Asesinos Inesperados y mas", duration: "01:45:01" },
    { number: "E2061", title: "Las 10 con Miss Universo Mexico, el Chokolatazo, Parodias, Nacadas, futbol y mas", duration: "01:33:52" },
    { number: "E2060", title: "Las 10 de Erazno, Entrevista con Estrellas de Sinaloa, el Chokolatazo, Parodias y mas", duration: "01:34:36" },
    { number: "E2059", title: "Las 10 de Erazno, Super Amigos, el Chokolatazo, Adrian Gutierrez, Asesinos Inesperados y mas", duration: "01:32:37" },
    { number: "E2058", title: "Las 10 de Erazno, el Chokolatazo", duration: "01:35:35" },
    { number: "E2057", title: "Las 10 de Erazno, Parodias, el Chokolatazo, Asesinos Inesperados y mas", duration: "01:33:36" },
    { number: "E2056", title: "Las 10 de Erazno, Parodias, el Chokolatazo, Las manifestaciones en Mexico, Nacadas y mas", duration: "01:15:50" },
    { number: "E2055", title: "Desde Las Vegas en los Latin Grammy con Luciano Luna, Mar Solis, Regulo Caro, Danny Lux, Alison Solis, Banda Renovacion y mas", duration: "01:50:59" },
    { number: "E2054", title: "Desde Las Vegas en Los Latin Grammy con entrevistas de Christial Nodal, Lupita Infante, el Plan, Carolina Ross, Aleman, Miguel Bueno, Vivir Quintana, Primos del Este, Victor Garcia y mas", duration: "03:25:46" },
    { number: "E2053", title: "Desde Las Vegas con Entrevistas como El Flaco, Luciano Lunas y mas, ademas el Chokolatzo y mas", duration: "02:05:02" },
    { number: "E2052", title: "Las 10 con Infieles, el Chokolatazo, entrevista con Lupillo Rivera, Asesinos Inesperados y mas", duration: "01:28:53" },
    { number: "E2051", title: "Las 10 de Erazno, el Chokolatazo, Parodidas, la 2da parte con el Coyote y Chuy, Nacadas y mas", duration: "01:25:29" },
    { number: "E2050", title: "Las 10 de Erazno, Parodias, el Chokolatazo, Hector Zagal y las Catrinas, Jesus de Google y mas", duration: "01:51:08" },
    { number: "E2049", title: "Las 10 de Erazno, Super Amigos, Entrevista con Chuy y el Coyote, el Chokolatazo, Asesinos y mas", duration: "01:38:50" },
    { number: "E2048", title: "Las 10 de Erazno, el Chokolatazo, Parodias, Hembras vs Machos, Deportes con Cantu y mas", duration: "01:31:20" },
    { number: "E2047", title: "Las 10 con Infieles, el Chokolatazo, Parodias, Asesinos Inesperados y mas", duration: "01:36:02" },
  ];

  const handleEpisodeSelect = (episode: typeof episodes[0]) => {
    setCurrentEpisode(episode);
    setCurrentTime(0);
    setIsPlaying(true);
    // Parse duration string to seconds
    const [hours, mins, secs] = episode.duration.split(':').map(Number);
    setDuration(hours * 3600 + mins * 60 + secs);
  };

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
    const currentIndex = episodes.findIndex(ep => ep.number === currentEpisode.number);
    const nextIndex = (currentIndex + 1) % episodes.length;
    handleEpisodeSelect(episodes[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = episodes.findIndex(ep => ep.number === currentEpisode.number);
    const prevIndex = currentIndex - 1 < 0 ? episodes.length - 1 : currentIndex - 1;
    handleEpisodeSelect(episodes[prevIndex]);
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
      className="min-h-screen flex items-center relative overflow-hidden animate-gradient-slow"
      style={{
        background: 'linear-gradient(-45deg, #ff416c, #ff4b2b, #ff6a50, #ff416c)',
        backgroundSize: '400% 400%'
      }}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="text-5xl font-bold text-white text-center mb-12 animate-fade-in">
            Shows Destacados
          </h2>
          {/* Big Player */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20 relative">
            
            {/* Speed Control Button - Top Left */}
            <button
              onClick={cycleSpeed}
              className="absolute top-6 left-6 text-white bg-white/10 px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors"
              aria-label="Playback speed"
            >
              {playbackSpeed}x
            </button>

            {/* More Episodes Button - Top Right */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="absolute top-6 right-6 text-white bg-white/10 px-4 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors whitespace-nowrap"
              aria-label="More episodes"
            >
              Más episodios
            </button>

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
            <div className="mb-8 overflow-hidden relative">
              <div key={currentEpisode.number} className="flex animate-scroll-seamless whitespace-nowrap">
                <span className="text-white text-2xl font-doto font-bold inline-block px-8">
                  {currentEpisode.title}
                </span>
                <span className="text-white text-2xl font-doto font-bold inline-block px-8">
                  {currentEpisode.title}
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

            {/* Controls - Centered */}
            <div className="flex items-center justify-center gap-8">
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
            </div>

            {/* Hidden audio element for future implementation */}
            <audio ref={audioRef} />
          </div>

          {/* Slide-in Playlist Panel */}
          <div 
            className={`absolute top-[10%] right-0 h-[80%] w-full md:w-[450px] bg-white/10 backdrop-blur-lg border-l border-white/20 shadow-2xl transition-transform duration-500 ease-in-out overflow-hidden rounded-l-2xl ${
              showPlaylist ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full flex flex-col p-6">
              {/* Playlist Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-2xl font-bold">Episodios</h3>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                  aria-label="Close playlist"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Episodes List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {episodes.map((episode) => (
                  <div
                    key={episode.number}
                    onDoubleClick={() => handleEpisodeSelect(episode)}
                    className={`flex gap-4 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/20 ${
                      currentEpisode.number === episode.number ? 'bg-white/20 ring-2 ring-white/50' : 'bg-white/5'
                    }`}
                  >
                    <img 
                      src={podcastArtwork} 
                      alt={episode.number}
                      className="w-16 h-16 rounded-lg flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm mb-1">{episode.number}</p>
                      <p className="text-white/80 text-xs line-clamp-2 mb-1">{episode.title}</p>
                      <p className="text-white/60 text-xs">{episode.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
