import React, { useEffect } from 'react'
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
  CardBody,
  Table,
  Card,
} from 'reactstrap'
import ContentWrapper from '../../components/Layout/ContentWrapper'
import { useClassStore } from '../../stores/classStore'

interface ClassListProps {
}

export const ClassList = (props: ClassListProps) => {
  const classes = useClassStore(state => state.classes)
  const fetch = useClassStore(state => state.fetch)
  const isInitialized = useClassStore(state => state.isInitialized)
  const isLoading = useClassStore(state => state.isLoading)

  useEffect(() => {
    if (!isInitialized) {
      fetch()
    }
  }, [ fetch, isInitialized ])

  return (
    <ContentWrapper>
      <div className="content-heading">
        <div>Clase</div>
      </div>

      <Row>
        <Col xs={12}>
          <Card className="card-default">
            <CardHeader>Lista</CardHeader>
            <CardBody className={"p-0"}>
              {/* START table-responsive */}
              <Table striped bordered hover responsive>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Nume</th>
                  <th>Scoala</th>
                </tr>
                </thead>

                {!isLoading && (
                  <tbody>
                  {Object.keys(classes).map((id) => {
                    const class_ = classes[parseInt(id)]

                    return (
                      <tr key={class_.id}>
                        <td>{class_.id}</td>
                        <td>{class_.schoolYear}{class_.label}</td>
                        <td>{class_.school.name}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                )}
              </Table>
              {/* END table-responsive */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ContentWrapper>
  )
}
