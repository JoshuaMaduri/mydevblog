import Layout from '../components/Layout'
import SigninComponent from '../components/auth/SigninComponent'

const Signin = () => {
    return(
        <Layout>
            <h3 className='text-center pt-4 pb-4'>Signin Page</h3>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <SigninComponent />
                </div>
            </div>
        </Layout>
    )
}

export default Signin;