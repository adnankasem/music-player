import ibo from "./ibo.mp3";
import chillpop from "./chillpop.mp3";
import AudioPlayer from "./AudioPlayer";
import { useRef } from "react";

function App() {
  const appRef = useRef();

  const tracks = [
    {
      title: "Mutlu Ol Yeter",
      artist: "Ibrahim Tatlises",
      audioSrc: ibo,
    },
    {
      title: "Chill Pop",
      artist: "Fantasium",
      audioSrc: chillpop,
    },
  ];

  return (
    <div className="App" ref={appRef}>
      <AudioPlayer appRef={appRef} tracks={tracks} />
    </div>
  );
}

export default App;
