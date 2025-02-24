import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useSearchParams } from 'react-router-dom'
import { getInfo } from './utils/getInfo'
import { parseLyrics } from "./utils/parseLyrics"

import { useQuery } from 'react-query'
import { allInfo, metaInfo } from './utils/getInfo'
import NoCover from "./assets/NoCover.png"
import Lyrics from './component/Lyrics'

let initialInfo: allInfo = {
  flac: "",
  cover: NoCover,
  lyrics: "",
  meta: {
    title: "",
    artists: [],
    album: ""
  }
}

function App() {

  const [searchParams] = useSearchParams()
  const session = searchParams.get("session")
  // const session = "f4ea6faa-2e8c-43d0-832c-83c3c995a08e"
  if (!session) {
    return (
      <>
        <div id="main-content">
          "参数为空"
        </div>
      </>
    )
  }

  const [flac, setFlac] = useState<string | undefined>()
  const [cover, setCover] = useState(NoCover)
  const [lyrics, setLyrics] = useState("歌曲暂无歌词")
  const [meta, setMeta] = useState<metaInfo>()

  const { data: initialData } = useQuery([session],
    async () => {
      let result = initialInfo
      result = await getInfo(session)
      return result
    }
  )
  useEffect(() => {
    if (initialData) {
      setFlac(initialData.flac)
      setMeta(initialData.meta)
      if (initialData.cover !== "") {
        setCover(initialData.cover)
      }
      if (initialData.lyrics !== "") {
        setLyrics(initialData.lyrics)
      }
    }
  }, [initialData])


  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const TimeUpdate = () => {
    //时刻将当前状态传递给“currentTime”
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <>
      <div id="main-content">
        <div id="visible">
          <div id="SongMeta">
            <div id="songName">《 {meta?.title} 》</div>
            <div id="SongCover">
              <img src={cover} alt="歌曲封面" className='Image' />
            </div>
            <div>{meta?.artists} 《{meta?.album}》</div>
          </div>

          <div >
            <Lyrics lyrics={parseLyrics(lyrics)} currentTime={currentTime} />
          </div>
        </div>

        <div id="SongFlac">
          <audio controls
            ref={audioRef}
            src={flac}
            onTimeUpdate={TimeUpdate}
          />
        </div>

      </div>
    </>
  )
}

export default App

