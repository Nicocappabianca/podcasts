import Link from 'next/link'
import slug from '../helpers/slug'

export default class PodcastsList extends React.Component { 
    render() {
        const { audioClips, onClickClip } = this.props;

        return(
            <div className="podcasts">

                <h2>Últimos podcasts</h2>
                { audioClips.map((clip) => (
                    <a href={`/${slug(clip.channel.title)}.${clip.channel.id}/${slug(clip.title)}.${clip.id}`}
                    className='list-item' key={clip.id} onClick={ (event) => onClickClip(event, clip) }>
                        <div>
                            <p>{ clip.title }</p>
                            <small>{ Math.ceil(clip.duration / 60) } min.</small>
                        </div>
                        <span>▶️</span>
                    </a>
                )) }
                
                <style jsx>{`
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
                    background: #fddb3a; 
                    cursor: pointer; 
                    max-width: 450px; 
                    display: flex; 
                    justify-content: space-between; 
                    border-radius: 5px; 
                    text-decoration: none; 
                    color: #000;
                }
                .list-item p{
                    margin: 0; 
                    max-width: 350px; 
                }
                .list-item:last-child{
                    margin-bottom: 50px; 
                }
                .list-item:hover{
                    -webkit-box-shadow: 5px 5px 8px -2px rgba(0,0,0,0.27);
                    -moz-box-shadow: 5px 5px 8px -2px rgba(0,0,0,0.27);
                    box-shadow: 5px 5px 8px -2px rgba(0,0,0,0.27);
                    max-width: 455px; 
                }
                small{
                    color: #52575d; 
                }
            `}</style>
            </div>
        ) 
        
    }
}