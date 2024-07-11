import { ButtonProps } from '../../global/interface/default'
import { ButtonConteiner } from './styles'

export function Button({ variant = 'default' }: ButtonProps) {
  return <ButtonConteiner variant={variant}>Enviar as cores</ButtonConteiner>
}
