import React from 'react';
import { useParams } from 'react-router-dom';

const Lease = () => {
    const { leaseId } = useParams();

    return (
        <div>
            Lease: {leaseId}
        </div>
    );
};

export default Lease;