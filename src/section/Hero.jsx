import React, { useState, useEffect, useRef } from "react";

import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";
import img5 from "../assets/image5.jpg";
import img6 from "../assets/image6.jpg";
import img7 from "../assets/image7.jpg";
import img8 from "../assets/image8.jpg";
import img9 from "../assets/image9.jpg";
import img10 from "../assets/image10.jpg";
import img11 from "../assets/image11.jpg";
import img12 from "../assets/image12.jpg";
import img13 from "../assets/image13.jpg";
import img14 from "../assets/image14.jpg";
import img15 from "../assets/image15.jpg";
import img16 from "../assets/image16.jpg";


// ----------------------------------------------
// Main Hero Component - WITH AUTO-PLAY MUSIC
// ----------------------------------------------
const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicNotice, setShowMusicNotice] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const audioRef = useRef(null);

  // Detect if device supports touch
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Initialize audio
  useEffect(() => {
    // Using a reliable audio URL
    audioRef.current = new Audio(
      "/music.mp3",
    );

    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // 50% volume

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Function to try playing music (handles browser restrictions)
  const tryPlayMusic = async (fromUserInteraction = false) => {
    if (!audioRef.current || isPlaying) return true;

    // If this is from user interaction, mark it
    if (fromUserInteraction) {
      setHasUserInteracted(true);
    }

    // Browsers require user interaction to play audio
    // But if we already had interaction, we can try
    if (hasUserInteracted || fromUserInteraction) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowMusicNotice(false);
        return true;
      } catch (e) {
        console.log("Audio play failed:", e);
        return false;
      }
    }
    return false;
  };

  // Handle manual music toggle
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await tryPlayMusic(true);
    }
  };

  // Handle card click - OPENS PHOTOS AND PLAYS MUSIC
  const handleCardClick = async () => {
    setShowPhotos(true);

    // Try to auto-play music when photos open
    setTimeout(async () => {
      const played = await tryPlayMusic(true);
      if (!played && !isPlaying) {
        // If auto-play failed, show a gentle reminder
        setShowMusicNotice(true);
      }
    }, 100);
  };

  // Handle any click on the page (to enable audio)
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  // Mouse hover functions
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
    }
  };

  // YOUR PHOTOS - using imported images
  const photos = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-[hsla(340,57%,64%,0.266)] p-4 relative">
      {/* ===== MUSIC PLAYER BUTTON ===== */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
        {/* Music notice - shows when music is off */}
        {showMusicNotice && !isPlaying && (
          <div className="bg-white/90 text-pink-600 p-3 rounded-lg mb-2 text-sm shadow-lg animate-bounce">
            <div className="flex items-center gap-2">
              <span>🎵</span>
              <span>
                {showPhotos
                  ? "Click play for music!"
                  : "Music will play when you open photos!"}
              </span>
            </div>
          </div>
        )}

        {/* Music control button */}
        <button
          onClick={toggleMusic}
          className={`
            bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg 
            hover:scale-110 transition-all duration-300
            ${isPlaying ? "text-pink-600" : "text-gray-600"}
            border-2 ${isPlaying ? "border-pink-400" : "border-gray-300"}
          `}
        >
          {isPlaying ? (
            <span className="text-2xl flex items-center gap-2">
              🔊 <span className="text-sm hidden sm:inline">Playing</span>
            </span>
          ) : (
            <span className="text-2xl flex items-center gap-2">
              🔈 <span className="text-sm hidden sm:inline">Play Music</span>
            </span>
          )}
        </button>

        {/* Now playing indicator */}
        {isPlaying && (
          <div className="mt-2 bg-white/80 p-2 rounded-lg text-xs text-pink-600 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                <span className="animate-pulse">❤️</span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                >
                  ❤️
                </span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                >
                  ❤️
                </span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                >
                  ❤️
                </span>
              </div>
              <span className="text-[10px] mt-1">Now Playing</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Valentine Card Container */}
      <div
        className="relative scale-[0.8] sm:scale-[0.9] md:scale-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Valentine envelope – bounces with animate-up */}
        <div className="relative top-[30px] sm:top-[40px] md:top-[50px] cursor-pointer animate-up">
          {/* Envelope body */}
          <div className="relative w-[250px] h-[167px] sm:w-[280px] sm:h-[187px] md:w-[300px] md:h-[200px] bg-[#db7090]">
            {/* Envelope flap */}
            <div className="absolute w-[177px] h-[177px] sm:w-[195px] sm:h-[195px] md:w-[212px] md:h-[212px] bg-[#db7090] rotate-45 top-[-88px] left-[36px] sm:top-[-96px] sm:left-[42px] md:top-[-105px] md:left-[44px]" />
          </div>

          {/* Front flaps */}
          <div className="absolute left-[100px] sm:left-[110px] md:left-[120px] top-[5px] w-0 h-0 border-r-[150px] sm:border-r-[165px] md:border-r-[180px] border-r-[#f4978e] border-t-[79px] sm:border-t-[87px] md:border-t-[95px] border-t-transparent border-b-[83px] sm:border-b-[92px] md:border-b-[100px] border-b-transparent z-10" />
          <div className="absolute left-0 top-[5px] w-0 h-0 border-l-[250px] sm:border-l-[275px] md:border-l-[300px] border-l-[#f4978d] border-t-[163px] sm:border-t-[179px] md:border-t-[195px] border-t-transparent z-10" />

          {/* Card – CLICK TO OPEN PHOTOS (and play music) */}
          <div
            onClick={handleCardClick}
            className={`absolute bg-white w-[225px] h-[142px] sm:w-[250px] sm:h-[158px] md:w-[270px] md:h-[170px] top-5 left-[12px] sm:left-[14px] md:left-[15px] shadow-[-5px_-5px_100px_rgba(0,0,0,0.4)] transition-transform duration-700 ease-in-out cursor-pointer ${
              isHovered
                ? "-translate-y-16 sm:-translate-y-20 md:-translate-y-24"
                : "translate-y-0"
            }`}
          >
            {/* Dotted border */}
            <div className="absolute border-2 border-dotted border-[#003049] w-[200px] h-[116px] sm:w-[222px] sm:h-[130px] md:w-[240px] md:h-[140px] left-3 top-3" />

            {/* Message */}
            <div className="absolute font-['Brush_Script_MT',cursive] text-[22px] sm:text-[25px] md:text-[28px] leading-5 sm:leading-6 text-center top-[15px] sm:top-[17px] md:top-[19px] left-[60px] sm:left-[70px] md:left-[83px]">
              Happy <br /> Valentine's <br /> Day!
            </div>

         
            {/* Large heart */}
            <div className="absolute top-[90px] sm:top-[100px] md:top-[110px] left-[95px] sm:left-[105px] md:left-[112px] text-2xl sm:text-3xl md:text-3xl text-red-600">
              ❤️
            </div>
          </div>

          {/* Floating small hearts */}
          <div className="absolute top-[10px] left-8 sm:left-12 md:left-16 w-full">
            <div className="absolute left-[5px] sm:left-[8px] md:left-[10px] top-[50px] text-red-600 text-xs sm:text-sm animate-heart">
              ❤️
            </div>
            <div
              className="absolute left-[25px] sm:left-[28px] md:left-[30px] top-[50px] text-red-600 text-xs sm:text-sm animate-heart"
              style={{ animationDelay: "0.5s", animationDuration: "2s" }}
            >
              ❤️
            </div>
            <div
              className="absolute left-[45px] sm:left-[48px] md:left-[50px] top-[50px] text-red-600 text-xs sm:text-sm animate-heart"
              style={{ animationDelay: "0.2s", animationDuration: "1.5s" }}
            >
              ❤️
            </div>
            <div
              className="absolute left-[65px] sm:left-[68px] md:left-[70px] top-[50px] text-red-600 text-xs sm:text-sm animate-heart"
              style={{ animationDelay: "0.7s", animationDuration: "2.3s" }}
            >
              ❤️
            </div>
            <div
              className="absolute left-[85px] sm:left-[88px] md:left-[90px] top-[50px] text-red-600 text-xs sm:text-sm animate-heart"
              style={{ animationDelay: "0.4s", animationDuration: "1.7s" }}
            >
              ❤️
            </div>
          </div>
        </div>

        {/* Shadow under envelope */}
        <div className="absolute w-[275px] h-[20px] sm:w-[300px] sm:h-[22px] md:w-[330px] md:h-[25px] bg-black/5 rounded-full top-[220px] sm:top-[240px] md:top-[265px] left-1/2 -translate-x-1/2 animate-scale" />
      </div>

      {/* ===== PHOTO POPUP MODAL ===== */}
      {showPhotos && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPhotos(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with music status */}
            <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-pink-50">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-['Brush_Script_MT',cursive] text-pink-600">
                  Our Memories ❤️
                </h2>
                <div className="text-xs text-pink-400 flex items-center gap-2 mt-1">
                  {isPlaying ? (
                    <>
                      <span className="animate-pulse">🎵</span>
                      <span>Music is playing</span>
                    </>
                  ) : (
                    <>
                      <span>🔈</span>
                      <button
                        onClick={toggleMusic}
                        className="text-pink-600 underline"
                      >
                        Click to play music
                      </button>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowPhotos(false)}
                className="text-gray-500 hover:text-red-600 text-2xl sm:text-3xl font-bold px-2 sm:px-3 hover:bg-pink-100 rounded-full transition"
              >
                ×
              </button>
            </div>

            {/* Photo Grid */}
            <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img
                        src={photo}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Heart overlay for desktop */}
                    {!isTouchDevice && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg sm:rounded-xl">
                        <span className="text-2xl sm:text-3xl md:text-4xl animate-pulse">
                          ❤️
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Floating hearts */}
              <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2 text-pink-400">
                <span className="text-sm sm:text-base animate-bounce">❤️</span>
                <span
                  className="text-sm sm:text-base animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  ❤️
                </span>
                <span
                  className="text-sm sm:text-base animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  ❤️
                </span>
                <span
                  className="text-sm sm:text-base animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                >
                  ❤️
                </span>
              </div>

              {/* Mobile close button */}
              <div className="flex justify-center mt-4 sm:hidden">
                <button
                  onClick={() => setShowPhotos(false)}
                  className="bg-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
