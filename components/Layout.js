import Link from 'next/link'
import Head from 'next/head'
export default class Layout extends React.Component {
    render() {
        const { children, title } = this.props

        return <>
            <Head>
                <title>Podcasts | { title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>
            <header><Link href="/"><a>Podcasts</a></Link></header>
            
            { children }

            <style jsx>{`
                header{
                    color: #fff; 
                    background: #8756CA; 
                    padding: 15px; 
                    text-align: center; 
                }
                header a{
                    color: #fff; 
                    text-decoration: none; 
                    font-weight: 600; 
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