import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Class } from '../../../shared/store/models/class'
import { Button } from '../../../components/Button'

interface HeaderProps {
  class_?: Class

  onAddStudent?: () => void
}

export const Header = memo(({ class_, onAddStudent }: HeaderProps) => {
  return (
    <div className="content-heading d-flex">
      <div className="pr-3">
        <Link to="/classes">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
      <div>
        <div>
          {class_?.schoolYear}
          {class_?.label}
        </div>
        <small>{class_?.school.name}</small>

        <ol className="breadcrumb breadcrumb px-0 pb-0">
          <li className="breadcrumb-item">
            <Link to="/classes">Clase</Link>
          </li>
          <li className="breadcrumb-item active">
            {class_?.schoolYear}
            {class_?.label}
          </li>
        </ol>
      </div>
      <div className="ml-auto">
        <Button
          onClick={onAddStudent}
          type={'btn-primary'}
          size={'md'}
          icon={'fas fa-plus'}
        >
          Adauga
        </Button>
      </div>
    </div>
  )
})
