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

export const Value = styled.div<{$noWidth?: boolean; $noMargin?: boolean}>`
  display: inline-block;
  font-size: 16px;
  width: ${p => p.$noWidth ? 'auto' : '35px'};
  margin-right: ${p => p.$noWidth && !p.$noMargin ? '10px' : '0'};
  text-align: center;
`
