export default class extends React.Component {
    static async getInitialProps({query}){
        let idPodcast = query.id
   
        let req = await fetch(`https://api.audioboom.com/audio_clips/${idPodcast}.mp3`)
        let dataPodcast = await req.json()
        let podcast = dataPodcast.body.audio_clip
        return { podcast }
    }
    
    render(){
        const { podcast } = this.props
        return <>    
            <header>Podcast de {podcast.channel.title}</header> 
            <h1>{ podcast.title }</h1>
            <img src={ podcast.urls.image } alt={ podcast.title }/>
            <audio controls>
                <source src={ podcast.urls.high_mp3 } />
            </audio>

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
                img{
                    display: block; 
                    margin: 0 auto 50px auto;
                    max-width: 250px;  
                }
                audio{
                    width: 400px;
                    display: block; 
                    margin: 0 auto;   
                }
                audio:focus{
                    outline: none; 
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