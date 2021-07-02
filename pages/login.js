import React from 'react'
import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container'
import { Box, TextField, Button } from '@material-ui/core'
import { createUser, findUser } from '../lib/user'
import Router from 'next/router'


const createUserFunc = async () => {
        
    const userToCheck = { username: 'a', password: 'b' }
    const user = await findUser(userToCheck)    
    console.log('user', user)

    if (user == 'undefined') {
        await createUser(userToCheck)
    }    
}

export default function Login() {

    createUserFunc()

    const handleLogin = async (e) => {
        e.preventDefault()

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }

        console.log({ body })

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            if (res.status === 200) {
                Router.push('/')
            } else {
                throw new Error(await res.text())
            }

        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
        }
    }

    return (


        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Login
                </h1>

                <form onSubmit={handleLogin}>
                    <Container maxWidth="sm">                    
                        <TextField variant="outlined" id="username" label="Username" required />
                        <TextField variant="outlined" id="password" label="Password" type="password" required />
                        <Button variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                    </Container>

                </form>
            </main>
        </div>
    )
}