import styled from 'styled-components'
import { ButtonConteinerProps } from '../../global/interface/default'

export const ButtonConteiner = styled.button<ButtonConteinerProps>`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
