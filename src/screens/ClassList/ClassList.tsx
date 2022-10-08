import React from 'react'
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ContentWrapper from '../../components/Layout/ContentWrapper'

interface ClassListProps {}

export const ClassList = (props: ClassListProps) => {
  return (
    <ContentWrapper>
      <div className="content-heading">
        <div>
          Welcome
          <small>Welcome to anglss</small>
        </div>
        {/* START Language list */}
        <div className="ml-auto">
          <Dropdown isOpen={true}>
            <DropdownToggle>English</DropdownToggle>
            <DropdownMenu className="dropdown-menu-right-forced animated fadeInUpShort">
              <DropdownItem>English</DropdownItem>
              <DropdownItem>Spanish</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* END Language list */}
      </div>

      <Row>
        <Col xs={12} className="text-center">
          <h2 className="text-thin mb-4">React Typescript Starter</h2>
          <p>
            This project is an application skeleton. You can use it to quickly bootstrap your ReactJS webapp projects
            and dev environment for these projects.
            <br />
            This starter project offers some examples to work with the template using Typescript and the structure is
            based on React Create App with{' '}
            <a target="_blank" href="https://create-react-app.dev/docs/adding-typescript/" rel="noopener noreferrer">
              Typescript Support
            </a>
            .
          </p>
        </Col>
      </Row>
    </ContentWrapper>
  )
}
