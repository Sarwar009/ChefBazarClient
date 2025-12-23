
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../Shared/LoadingSpinner';

const DashboardRedirector = () => {
    const { role, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && role) {
            switch (role) {
                case 'admin':
                    navigate('/dashboard/statistics', { replace: true });
                    break;
                case 'chef':
                    navigate('/dashboard/manage-orders', { replace: true });
                    break;
                case 'user':
                    navigate('/dashboard/my-orders', { replace: true });
                    break;
                default:
                    navigate('/', { replace: true });
            }
        }
    }, [role, loading, navigate]);

    return <LoadingSpinner />; 
};

export default DashboardRedirector;