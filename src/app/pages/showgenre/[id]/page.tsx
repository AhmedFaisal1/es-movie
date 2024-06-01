'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const MoviePage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { id } = params;
    
    return (
        <div>
            Movie Details for ID: {id}
        </div>
    );
}

export default MoviePage;
