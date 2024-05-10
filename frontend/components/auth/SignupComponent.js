import React, { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth';
import { FormGroup, Input, Button } from 'reactstrap';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: 'Ryan',
        email: 'ryan@gmail.com',
        password: 'rrrrrr',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        signup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup className='mb-3'>
                    <Input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        placeholder="Type your name"
                    />
                </FormGroup>

                <FormGroup className='mb-3'>
                    <Input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        placeholder="Type your email"
                    />
                </FormGroup>

                <FormGroup className='mb-3'>
                    <Input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        placeholder="Type your password"
                    />
                </FormGroup>

                <Button color="primary">Signup</Button>
            </form>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </React.Fragment>
    );
};

export default SignupComponent;