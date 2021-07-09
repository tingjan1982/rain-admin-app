import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Head from 'next/head';
import { useEffect, useState } from "react";
import Layout from '../components/layout';

export async function getServerSideProps() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAIN_HOST}/admin/clients`, {
        'headers': {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
    })

    if (!res.ok) {
        console.error(`Get response: ${res.statusText}`)
        return [null, res]
    }

    const data = await res.json()
    console.log('data', data)

    return {
        props: {
            clients: data.results
        }
    }
}

export default function Client({ clients }) {

    const [toggleDialog, setToggleDialog] = useState(false)
    const [editClient, setEditClient] = useState(null)

    function openDialog(client) {
        setEditClient(client)
        setToggleDialog(true)
    }

    function closeDialog() {
        setToggleDialog(false)
    }

    async function handleConfirm(newUsername) {
        closeDialog()
        console.log('Prepare for updating client account username', newUsername)

        const request = {
            newUsername: newUsername
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_RAIN_HOST}/admin/clients/${editClient.id}/username`, {
            method: 'PATCH',
            'headers': {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_API_KEY
            },
            body: JSON.stringify(request)
        })
    
        console.debug(res)

        if (!res.ok) {
            console.error(`Get response: ${res.statusText}`)
            return [null, res]
        }
    
    }

    return (
        <Layout>
            <Head>
                <title>Rain Admin - Client List</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box>
                <EditUsernameDialog
                    editClient={editClient}
                    toggleDialog={toggleDialog}
                    handleCancelAction={() => closeDialog()}
                    handleConfirmAction={handleConfirm}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="clients">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name (id)</TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Last Order Date</TableCell>
                                <TableCell align="right">Total Order Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.clientName} ({row.id})
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.username}
                                        <IconButton onClick={() => openDialog(row)} color="inherit">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.lastOrderDate}</TableCell>
                                    <TableCell align="right">{row.orderCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout >
    )

}

function EditUsernameDialog(props) {

    const { editClient, toggleDialog, handleCancelAction, handleConfirmAction } = props
    const [newUsername, setNewUsername] = useState(null)

    useEffect(() => {
        setNewUsername(editClient?.username)        

    }, [editClient])

    return (
        <Dialog open={toggleDialog} onClose={handleCancelAction} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Client Account Username</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can update client account name.
                </DialogContentText>
                <TextField                    
                    margin="dense"
                    id={newUsername}
                    label="Username (Email)"
                    type="email"
                    value={newUsername}
                    fullWidth
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelAction} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleConfirmAction(newUsername)} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}