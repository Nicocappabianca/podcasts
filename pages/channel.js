import Link from 'next/link'

export default class extends React.Component {
    
    static async getInitialProps({query}){
        let idChannel = query.id

        let [reqChannel, reqSeries, reqAudios] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${idChannel}`), 
            fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`), 
            fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
        ])

        let [dataChannel, dataSeries, dataAudios] = await Promise.all([
            reqChannel.json(),
            reqSeries.json(),  
            reqAudios.json()
        ])

        let channel = dataChannel.body.channel
        let audioClips = dataAudios.body.audio_clips
        let series = dataSeries.body.channels

        return { channel, audioClips, series }
    }
    
    render(){
        const { channel, audioClips, series } = this.props

        return <>    
            <header>Podcasts de { channel.title }</header> 
            <h1>{ channel.title }</h1>
            <img src={ channel.urls.logo_image.original } alt=""/>
            <h2>Últimos podcasts</h2>
            { audioClips.map((clip) => (
                <Link href={`/podcast?id=${clip.id}`} key={clip.id}>
                    <div className="list-item">{ clip.title }<span>▶️</span></div>
                </Link>
            )) }
            
            { series.length > 0 &&
                <> 
                    <h2 className="series-title">Series</h2>
                    { series.map((serie) => (
                        <div className="list-item">{ serie.title }<span>▶️</span></div>
                    )) }
                </>
            }

            <style jsx>{`
                header{
                    color: #fff; 
                    background: #8756CA; 
                    padding: 15px; 
                    text-align: center; 
                }
                h1 {
                    font-weight: 600; 
                    padding: 15px; 
                    text-align: center; 
                }
                h2{
                    padding: 5px; 
                    font-size: 18px; 
                    font-weight: 600; 
                    margin: 0; 
                    text-align: center; 
                }
                .list-item{
                    padding: 10px;
                    margin: 20px auto 0 auto; 
                    background: #FFDFD3; 
                    cursor: pointer; 
                    max-width: 450px; 
                    display: flex; 
                    justify-content: space-between; 
                }
                .list-item:hover{
                    -webkit-box-shadow: 5px 5px 8px -2px rgba(0,0,0,0.27);
                    -moz-box-shadow: 5px 5px 8px -2px rgba(0,0,0,0.27);
                    box-shadow: 5px 5px 8px -2px rgba(0,0,0,0.27);
                }
                .series-title{
                    margin-top: 20px; 
                }
                img{
                    max-width: 200px; 
                    display: block; 
                    margin: 0 auto 30px auto; 
                }
            `}</style>
            <style jsx global>{`
                body{
                    margin: 0; 
                    background: #fff; 
                    font-family: system-ui;  
                }
            `}</style>
        </>
    }
}