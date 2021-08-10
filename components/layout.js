import { AppBar, Toolbar, Typography, Button, Divider, Box, Drawer, List, ListItem, ListItemText, makeStyles, IconButton, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './layout.module.css'


const name = 'Rain App'
export const siteTitle = 'Rain Admin App'

export default function Layout({ children, home }) {

    const useStyles = makeStyles({
        drawer: {
            borderWidth: 1,
            //position: 'static',

        },
        appBar: {

        },
        right: {
            flex: 1,
            justifyContent: 'flex-end'
        },
        footer: {
            'text-align': 'center',
            bottom: 0,
            width: '100% !important',
            'height': '100px !important',
            background: '#232423',
            color: '#e8ede8'
        }
    })

    const classes = useStyles()

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content="Rain Admin App"
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.vercel.app/${encodeURI(
                            siteTitle
                        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                <header className={styles.header}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton onClick={() => setDrawerOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Dashboard
                            </Typography>
                            <Link href="/login">
                                <Button className={classes.right} color="inherit">
                                    Login
                                </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        //variant="permanent"
                        anchor="left"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                    >
                        <List>
                            <>
                                <Link href="/">
                                    <ListItem button>
                                        <ListItemText>Home</ListItemText>
                                    </ListItem>
                                </Link>
                                <Link href="/clients">
                                    <ListItem button>
                                        <ListItemText>Client List</ListItemText>
                                    </ListItem>
                                </Link>
                                <Link href="/clientSubscriptions">
                                    <ListItem button>
                                        <ListItemText>Client Subscriptions</ListItemText>
                                    </ListItem>
                                </Link>
                                <Link href="/einvoices">
                                    <ListItem button>
                                        <ListItemText>E-Invoices</ListItemText>
                                    </ListItem>
                                </Link>

                                <Divider />
                            </>
                        </List>
                    </Drawer>
                </header>
                <main>
                    <Container>
                        {children}
                    </Container>
                </main>
            </div>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </>
    )
}