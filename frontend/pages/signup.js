import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'

const Signup = () => {
    return(
        <Layout>
            <h3 className='text-center pt-4 pb-4'>Signup Page</h3>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <SignupComponent />
                </div>
            </div>
        </Layout>
    )
}

export default Signup;