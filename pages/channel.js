import Layout from '../components/Layout'
import PodcastsList from '../components/PodcastsList'
import Error from './_error'
import PodcastPlayer from '../components/PodcastPlayer'

export default class extends React.Component {
    
    constructor(props){
        super(props)
        this.state = { openClip: null }; 
    }

    static async getInitialProps({ query, res }){
        let idChannel = query.id

        try{
            let [reqChannel, reqAudios] = await Promise.all([
                fetch(`https://api.audioboom.com/channels/${idChannel}`), 
                fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
            ])

            if( reqChannel.status >= 400 ){
                res.statusCode = reqChannel.status; 
                return { channel: null, audioClips: null, statusCode: 404 }
            }
    
            let [dataChannel, dataAudios] = await Promise.all([
                reqChannel.json(),
                reqAudios.json()
            ])

            let channel = dataChannel.body.channel
            let audioClips = dataAudios.body.audio_clips
    
            return { channel, audioClips, statusCode: 200 }
        } catch(e) {
            return { channel: null, audioClips: null, statusCode: 503 }
        }
    }

    openClip = (event, clip) => {
        event.preventDefault(); 
        this.setState({
            openClip: clip 
        })
    }

    closeClip = (event) => {
        event.preventDefault()
        this.setState({
            openClip: null
        })
    }
    
    render(){
        const { channel, audioClips, statusCode } = this.props
        const { openClip } = this.state

        if(statusCode !== 200) {
            return <Error  statusCode={ statusCode }/>
        }

        return <Layout title={ channel.title }>
            <div className="hero"></div>
            <PodcastsList onClickClip={ this.openClip } audioClips={ audioClips }/>
            { openClip &&
                <div className="modal">
                    <PodcastPlayer clip={ openClip } onClose={ this.closeClip } />
                </div> 
            }

            <style jsx>{`
                img {
                    max-width: 200px; 
                    display: block; 
                    margin: 0 auto 30px auto; 
                }
                .hero {
                    width: 100%; 
                    height: 200px; 
                    background-image: url(${channel.urls.banner_image.original});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover; 
                    margin-bottom: 20px;
                }
                @media (min-width: 768px) {
                   .hero {
                       height: 350px; 
                    } 
                }
                .modal{
                    position: fixed; 
                    top: 0px; 
                    right: 0px; 
                    bottom: 0px; 
                    top: 0px; 
                    z-index: 99999; 
                    width: 100%; 
                    height: 100%; 
                }
            `}</style>
        </Layout>
    }
}