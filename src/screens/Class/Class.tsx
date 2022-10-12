import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Row, Col, CardHeader, CardBody, Table, Card } from 'reactstrap'
import ContentWrapper from '../../components/Layout/ContentWrapper'
import { useStore } from '../../shared/hooks/useStore'
import { TableCell, TableHeader } from './Class.styles'
import { Link, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Button } from '../../components/Button'
import { CardSpinner } from '../../components/CardSpinner'

interface ClassProps
  extends RouteComponentProps<{
    id: string
  }> {}

export const Class = withRouter(
  memo(({ match }: ClassProps) => {
    const id = parseInt(match.params.id)

    const class_ = useStore(state => state.classes[id] || undefined)
    const fetchById = useStore(state => state.fetchById)
    const addStudentToClass = useStore(state => state.addStudentToClass)
    const deleteStudentFromClass = useStore(state => state.deleteStudentFromClass)
    const isLoading = useStore(state => state.isLoading)

    const studentsToClass = class_?.studentsPerformance

    const [addStudentForm, setAddStudentForm] = useState({ firstName: '', lastName: '' })

    const handleAddStudent = useCallback(() => {
      if (addStudentForm.firstName && addStudentForm.lastName) {
        addStudentToClass(id, addStudentForm.firstName, addStudentForm.lastName)

        setAddStudentForm({ firstName: '', lastName: '' })
      }
    }, [addStudentToClass, addStudentForm, id])

    const handleDeleteStudent = useCallback(
      (studentToClassId: number) => () => {
        if (window.confirm('Acest elev si toate datele corespunzatoare lui vor fi sterse. Esti sigur ca vrei sa continui ?')) {
          deleteStudentFromClass(id, studentToClassId)
        }
      },
      [deleteStudentFromClass, id]
    )

    useEffect(() => {
      if (id) {
        fetchById(id)
      }
    }, [fetchById, id])

    return (
      <ContentWrapper>
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
        </div>

        <Row>
          <Col xs={12}>
            <Card className="card-default">
              <CardHeader className="border-bottom">Elevi</CardHeader>
              <CardBody className={'p-0 position-relative'}>
                {/* START table-responsive */}
                <CardSpinner isSpinning={isLoading} />

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <TableHeader $min>#</TableHeader>
                      <TableHeader $min>Nume</TableHeader>
                      <TableHeader>Prenume</TableHeader>
                      <TableHeader $min></TableHeader>
                    </tr>
                  </thead>

                  <tbody>
                    {!studentsToClass?.length && (
                      <tr>
                        <TableCell colSpan={4}>
                          <div className="text-center bg-light-gray">Niciun elev adaugat</div>
                        </TableCell>
                      </tr>
                    )}

                    {studentsToClass?.map(studentPerformance => {
                      return (
                        <tr key={studentPerformance.id}>
                          <TableCell $min>{studentPerformance.student.id}</TableCell>
                          <TableCell $min>{studentPerformance.student.lastName}</TableCell>
                          <TableCell>{studentPerformance.student.firstName}</TableCell>
                          <TableCell $min>
                            <Button
                              onClick={handleDeleteStudent(studentPerformance.id)}
                              type={'btn-danger'}
                              size={'xs'}
                              icon={'fas fa-times-circle'}
                            >
                              Sterge
                            </Button>
                          </TableCell>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                {/* END table-responsive */}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Card className="card-default">
              <CardHeader className="border-bottom">Adauga elev</CardHeader>
              <CardBody className="position-relative">
                <CardSpinner isSpinning={isLoading} />

                <form>
                  <div className="form-group">
                    <label>Nume</label>
                    <input
                      placeholder="Nume"
                      type="text"
                      className="form-control"
                      value={addStudentForm.lastName}
                      onChange={event => {
                        setAddStudentForm(form => ({ ...form, lastName: event.target.value }))
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Prenume</label>
                    <input
                      placeholder="Prenume"
                      type="text"
                      className="form-control"
                      value={addStudentForm.firstName}
                      onChange={event => {
                        setAddStudentForm(form => ({ ...form, firstName: event.target.value }))
                      }}
                    />
                  </div>

                  <Button size={'sm'} type={"btn-primary"} disabled={!addStudentForm.firstName || !addStudentForm.lastName} onClick={handleAddStudent}>
                    Adauga elev
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ContentWrapper>
    )
  })
)
