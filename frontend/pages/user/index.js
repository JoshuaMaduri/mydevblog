import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'
import Link from 'next/link'

const UserIndex = () => {
    return(
        <Layout>
            <Private>
                <h1>User Dashboard</h1>
            </Private>
        </Layout>
    )
}

export default UserIndex