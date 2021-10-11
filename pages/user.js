import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import React from 'react';

export default function Profile() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        user && (
            <div>
                <Image src={user.picture} alt={user.name} width="200" height="200"/>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
}