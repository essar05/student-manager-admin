import { memo } from 'react'
import styled from 'styled-components'

export interface CardSpinnerProps {
  isSpinning?: boolean
}

export const CardSpinner = memo(({ isSpinning }: CardSpinnerProps) => {
  return isSpinning ? (
    <Wrapper>
      <div className="sk-double-bounce">
        <SkChild className="sk-child sk-double-bounce1"></SkChild>
        <SkChild className="sk-child sk-double-bounce2"></SkChild>
      </div>
    </Wrapper>
  ) : null
})

const Wrapper = styled.div`
  position: absolute;

  background-color: #ffffff99;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;
`

const SkChild = styled.div`
  background-color: #5d9cec !important;
`
