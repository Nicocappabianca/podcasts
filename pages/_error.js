import Layout from "../components/Layout"
import Link from 'next/link'

function Error({ statusCode }) {
    return (
            <Layout title="Oh no!">
                { statusCode === 404 ? 
                    <div className="message">
                        <h1>This page does not exist 😰</h1>
                        <p><Link href="/"><a>← Back to Home</a></Link></p>
                    </div>
                    : 
                    <div className="message">
                        <h1>There was a problem 😰</h1>
                        <p>Please try again in a few seconds.</p>
                    </div>
                }

                <style jsx>{`
                    .message{
                        padding: 100px 30px;
                        text-align: center;  
                    }
                    h1{
                        margin-bottom: 1.5em; 
                    }
                    a {
                        color: #8756CA; 
                        text-decoration: none; 
                        font-weight: 600; 
                    }
                `}</style>
            </Layout>
        )
    }

    Error.getInitialProps = ({ res, err }) => {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 404
        return { statusCode }
    }

export default Error