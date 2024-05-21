import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import Link from 'next/link'

const AdminIndex = () => {
    return(
        <Layout>
            <Admin>
                <h1>Admin Dashboard</h1>
            </Admin>
            
        </Layout>
    )
}

export default AdminIndex