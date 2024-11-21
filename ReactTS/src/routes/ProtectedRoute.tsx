import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/mainStore'

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}: any) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const role = useSelector((state: RootState) => state.auth.role)
  if (isAllowed === 'simple' && !isAuth) {
    return <Navigate to={redirectPath} replace />
  }
  if (isAllowed === 'rights' && !isAuth && !role.includes('child')) {
    return <Navigate to={redirectPath} replace />
  }
  return children ? children : <Outlet />
}
export default ProtectedRoute
