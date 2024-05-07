import Layout from '../components/Layout'
import Link from 'next/link'

const Index = () => {
    return(
        <Layout>
            <h1>Index Page</h1>
            <Link href="/signup" legacyBehavior>
                Signup
            </Link>
        </Layout>
    )
}

export default Index