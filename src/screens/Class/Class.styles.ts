import styled, { css } from 'styled-components'

export const TableHeader = styled.th<{ $min?: boolean }>`
  ${p => p.$min && css`
    width: 1%;
    white-space: nowrap;
  `}
`

export const TableCell = styled.td<{ $min?: boolean }>`
  ${p => p.$min && css`
    width: 1%;
    white-space: nowrap;
  `}
`
