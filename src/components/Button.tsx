import React, { memo, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'

interface ButtonProps {
  className?: string
  icon?: string
  children: ReactNode
  type?: string

  size?: 'xs' | 'sm' | 'md' | 'lg'

  disabled?: boolean

  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = memo(
  ({ className, size = 'md', children, disabled, icon, type = 'btn-primary', onClick }: ButtonProps) => {
    return (
      <button
        type="button"
        disabled={disabled}
        className={classNames('btn', `btn-${size}`, { 'btn-labeled': !!icon }, disabled ? 'btn-' : type, className)}
        onClick={onClick}
      >
        {icon && (
          <span className="btn-label">
            <i className={icon} />
          </span>
        )}
        {children}
      </button>
    )
  }
)
