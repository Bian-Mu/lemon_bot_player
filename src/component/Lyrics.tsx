import React, { useState, useEffect, useRef } from 'react';
import "./Lyrics.css"

interface LyricLine {
    time: number;
    text: string;
}

interface LyricsProps {
    lyrics: LyricLine[];
    currentTime: number;
}
const Lyrics: React.FC<LyricsProps> = ({ lyrics, currentTime }) => {
    const [currentindex, setCurrentIndex] = useState(0);
    const lyricsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const index = lyrics.findIndex(line => line.time >= currentTime);
        setCurrentIndex(index > 0 ? index - 1 : 0)

        if (lyricsRef.current) {
            const currentLyric = lyricsRef.current.children[currentindex] as HTMLDivElement;
            if (currentLyric) {
                const offset = 0.8 * lyricsRef.current.offsetHeight; //歌词容器的可视高度

                const lyricTop = currentLyric.offsetTop; // 当前行距离容器顶部的高度

                const scrollBottom = lyricsRef.current.scrollTop + lyricsRef.current.offsetHeight; // 容器当前的滚动位置加上容器的高度，得到底部的位置

                if (lyricTop > scrollBottom) {
                    lyricsRef.current.scrollTop = lyricTop - offset;//当前行距离行顶的高度减去容器高度（越小歌词越靠下）
                }
            }
        }
    }, [currentTime, lyrics])

    return (
        <div ref={lyricsRef} id="SongLyrics" >
            {lyrics.map((line, index) => (
                <div className="line" key={index}
                    style={{
                        transition: 'opacity 0.3s',
                        opacity: index === currentindex ? 1 : 0.5
                    }}>
                    {line.text}
                </div>
            ))}
        </div>
    )
}


export default Lyrics;