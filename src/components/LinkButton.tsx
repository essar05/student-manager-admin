import { Link } from 'react-router-dom'
import React, { memo, ReactNode } from 'react'
import classNames from 'classnames'

interface LinkButtonProps {
  className?: string
  to: string
  icon?: string
  children: ReactNode

  size?: 'small' | 'regular' | 'large'

  type?: string
}

export const LinkButton = memo(({ className, to, children, icon, type = 'btn-primary' }: LinkButtonProps) => {
  return (
    <Link to={to} className={classNames('btn btn-xs', { 'btn-labeled': !!icon }, type, className)} replace={false}>
      {icon && (
        <span className="btn-label">
          <i className={icon} />
        </span>
      )}
      {children}
    </Link>
  )
})
