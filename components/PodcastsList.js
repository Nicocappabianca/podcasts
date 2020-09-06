import Link from 'next/link'

export default class PodcastsList extends React.Component { 
    render() {
        const { audioClips } = this.props;

        return(
            <div className="podcasts">

                <h2>Últimos podcasts</h2>
                { audioClips.map((clip) => (
                    <Link href={`/podcast?id=${clip.id}`} key={clip.id}>
                        <div className="list-item">{ clip.title }<span>▶️</span></div>
                    </Link>
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
            `}</style>
            </div>
        ) 
        
    }
}