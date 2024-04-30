// Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Register.module.css';
import api from '../api';

export const Register = () => {
    const history = useHistory();
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.registerUser(inputs);
            if (response.data && response.data.status) {
                console.log('Registration success:', response.data.message);
                // Redirect to login page after successful registration
                history.push('/products');
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during registration.');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
            <label className={classes.label}>
                <span className={classes.labelText}>Username:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="username"
                    value={inputs.username || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Email:</span>
                <input
                    className={classes.input}
                    type="email"
                    name="email"
                    value={inputs.email || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Password:</span>
                <input
                    className={classes.input}
                    type="password"
                    name="password"
                    value={inputs.password || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>status:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="status"
                    value={inputs.status || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Type:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="type"
                    value={inputs.type || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>phone:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="phone"
                    value={inputs.phone || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <input className={classes.submit} type="submit" value="Register"/>
            {error && <p className={classes.errorMsg}>{error}</p>}
            {isLoading && <p>Loading...</p>}
        </form>
    );
};
