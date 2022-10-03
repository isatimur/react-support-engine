import React, {useState} from 'react'
import axios from "axios";
import {styles} from '../styles'

import {LoadingOutlined} from '@ant-design/icons'
import Avatar from '../Avatar';

const EmailForm = props => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    function getOrCreateUser(callback) {

        axios.put('http://localhost:8080/v1/api/users',
            {username: email, email: email, secret: email},
            {headers: {"X-Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
            .then(result => callback(result.data))
            .catch(e => console.log('Get or create user error', e))
    }

    function getOrCreateChat(callback) {
        axios.put('http://localhost:8080/v1/api/chats',
            {
                "usernames": ["isatimur.it@gmail.com", email],
                "is_direct_chat": true
            }
            ,
            {headers: {"X-Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
            .then(result => callback(result.data))
            .catch(e => console.log('Get or create user error', e))
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        console.log('Sending email', email)
        getOrCreateUser(user => {
            props.setUser(user)
            getOrCreateChat(
                chat => {
                    props.setChat(chat)
                    console.log('success', chat)
                }
            )
        })
    }

    return (
        <div
            style={{
                ...styles.emailFormWindow,
                ...{
                    height: props.visible ? '100%' : '0%',
                    opacity: props.visible ? '1': '0',
                }
            }}
        >
            <div style={{height: '0px'}}>
                <div style={styles.stripe}/>
            </div>

            <div
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)',
                        left: 'calc(50% - 41px)',
                    }
                }}
            />

            <div style={{position: 'absolute', height: '100%', width: '100%', textAlign: 'center'}}>
                <Avatar
                    style={{
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />
                <div style={styles.topText}>
                    Welcome to my <br/>support 👋
                </div>
                <form
                    onSubmit={e => handleSubmit(e)}
                    style={{position: 'relative', width: '100%', top: '19.75%'}}
                >
                    <input
                        placeholder='Your email'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                </form>

                <div style={styles.bottomText}>
                    Enter your email <br/> to get started.
                </div>
            </div>
        </div>
    )
}

export default EmailForm;