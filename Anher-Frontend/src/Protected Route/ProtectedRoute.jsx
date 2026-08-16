import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const tokenIsCurrent = (token) => {
    if (!token) return false
    try {
        const parts = token.split('.')
        // Accept the backend's compact `payload.signature` token as well as a
        // standard three-part JWT if the signing format changes later.
        const payload = parts.length === 3 ? parts[1] : parts.length === 2 ? parts[0] : null
        if (!payload) return false
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
        const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
        const data = JSON.parse(atob(padded))
        return Number(data.exp) * 1000 > Date.now()
    } catch {
        return false
    }
}

export const ProtectedRoute = ({ children }) => {
    const admin = useSelector((state) => state.hvac.users)
    const location = useLocation()

    if (admin?.role === 'admin' && tokenIsCurrent(admin.token)) return children

    return <Navigate to="/admin-login" state={{ from: location.pathname }} replace />
}
