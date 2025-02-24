import axios from "axios"

export interface metaInfo {
    title: string
    artists: string[]
    album: string
}

export interface allInfo {
    flac: string
    cover: string
    lyrics: string
    meta: metaInfo
}


export async function getInfo(session: string): Promise<allInfo> {
    // const head_url = "https://lemonyaweb.top:10721" 由于跨域问题，在vite.config.ts中配置代理

    const flacResp = axios.get(`/get?session=${session}`, {
        responseType: "blob",
    })
    const flacData = (await flacResp).data
    const flacBlob = new Blob([flacData], { type: "audio/flac" })
    const flacUrl = URL.createObjectURL(flacBlob)


    const metaResp = axios.get(`/metadata?session=${session}`)
    const metaData = (await metaResp).data


    let coverUrl = ""
    try {
        const coverResp = await axios.get(`/image?session=${session}`, { responseType: "blob" });
        const coverBlob = new Blob([coverResp.data], { type: "image/jpeg" });
        coverUrl = URL.createObjectURL(coverBlob);
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.warn("封面图片未找到");
            coverUrl = "";
        }
    }

    let lyricsData = ""
    try {
        const lyricsResp = await axios.get(`/lyrics?session=${session}`);
        lyricsData = lyricsResp.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.warn("歌词未找到");
            lyricsData = "";
        }
    }


    const result: allInfo = {
        flac: flacUrl,
        cover: coverUrl,
        lyrics: lyricsData,
        meta: {
            title: metaData["title"],
            artists: metaData["artists"],
            album: metaData["album"]
        }
    }
    return result
}