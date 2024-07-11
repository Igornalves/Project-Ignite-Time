import { HearderConteiner } from './styles'
import logoIgnite from '../../assets/Logo.png'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HearderConteiner>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to={'/'}>
          <Timer size={24} />
        </NavLink>
        <NavLink to={'/history'} title="historico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HearderConteiner>
  )
}
