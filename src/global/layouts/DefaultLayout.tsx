import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/intex'
import { LayoutConteiner } from './styles'

export default function DefaultLayout() {
  return (
    <LayoutConteiner>
      <Header />
      <Outlet />
    </LayoutConteiner>
  )
}
