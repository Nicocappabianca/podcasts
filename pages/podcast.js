import Layout from "../components/Layout"

export default class extends React.Component {
    static async getInitialProps({query}){
        let idPodcast = query.id
   
        let req = await fetch(`https://api.audioboom.com/audio_clips/${idPodcast}.mp3`)
        let clip = (await req.json()).body.audio_clip
        return { clip }
    }
    
    render(){
        const { clip } = this.props
        return <Layout title={clip.channel.title}>     
            <h1>{ clip.title }</h1>
            <img src={ clip.channel.urls.logo_image.original } alt={ clip.title }/>
            <audio controls>
                <source src={ clip.urls.high_mp3 } />
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
        </Layout>
    }
}