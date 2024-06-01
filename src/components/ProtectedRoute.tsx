import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';



interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const Navigate = useNavigate();

    const user = useAppSelector(state => state.users.user)
    useEffect(() => {
        if (user == null) {
            Navigate("/login", { replace: true })
        }
    }, [user])

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute
