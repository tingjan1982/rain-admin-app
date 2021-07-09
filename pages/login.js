import { Box, Button, TextField } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Router from 'next/router'
import React from 'react'
import { createUser, findUser } from '../lib/user'
import { useUser } from '../lib/hooks'
import styles from '../styles/Home.module.css'


const createUserFunc = async () => {

    const defaultUser = { username: 'a', password: 'b' }
    let user = await findUser(defaultUser)
    console.log('user', user)

    if (user == undefined) {
        user = await createUser(defaultUser)
    }

    return user
}

export async function getServerSideProps() {

    const user = await createUserFunc()

    return {
        props: {
            defaultUser: user
        }
    }
}

export default function Login({ defaultUser }) {

    console.log('Created default user', defaultUser)
    useUser({ redirectTo: '/', redirectIfFound: true })

    const handleLogin = async (e) => {
        e.preventDefault()

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }
        

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
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <TextField variant="outlined" id="username" label="Username" required />
                            <TextField variant="outlined" id="password" label="Password" type="password" required />
                            <Button variant="contained" color="primary" type="submit">
                                Login
                            </Button>
                        </Box>
                    </Container>

                </form>
            </main>
        </div>
    )
}