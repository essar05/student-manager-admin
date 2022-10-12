import React, { memo, useCallback, useEffect, useState } from 'react'
import { Row, Col, CardHeader, CardBody, Table, Card } from 'reactstrap'
import ContentWrapper from '../../components/Layout/ContentWrapper'
import { useStore } from '../../shared/hooks/useStore'
import { TableCell, TableHeader } from './ClassList.styles'
import { Link, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { LinkButton } from '../../components/LinkButton'
import { CardSpinner } from '../../components/CardSpinner'
import { Button } from '../../components/Button'

interface ClassListProps extends RouteComponentProps {}

export const ClassList = withRouter(
  memo(({ location }: ClassListProps) => {
    const classes = useStore(state => state.classes)
    const fetch = useStore(state => state.fetch)
    const addClass = useStore(state => state.addClass)
    const deleteClass = useStore(state => state.deleteClass)
    const error = useStore(state => state.error)

    const schools = useStore(state => state.schools)
    const fetchSchools = useStore(state => state.fetchSchools)

    const isInitialized = useStore(state => state.isInitialized)
    const isLoading = useStore(state => state.isLoading)

    const [addClassForm, setAddClassForm] = useState<AddClassForm>({
      schoolYear: undefined,
      label: '',
      schoolId: undefined,
    })

    const handleAddClass = useCallback(() => {
      if (addClassForm.schoolYear && addClassForm.label && addClassForm.schoolId) {
        addClass(addClassForm.schoolYear, addClassForm.label, addClassForm.schoolId)

        setAddClassForm({
          schoolYear: undefined,
          label: '',
          schoolId: undefined,
        })
      }
    }, [addClassForm.schoolYear, addClassForm.label, addClassForm.schoolId, addClass])

    const handleDeleteClass = useCallback(
      (id: number) => () => {
        if (window.confirm('Aceasta clasa si toti elevii din ea vor fi stersi. Esti sigur ca vrei sa continui ?')) {
          deleteClass(id)
        }
      },
      [deleteClass]
    )

    useEffect(() => {
      if (!isInitialized) {
        fetch()
        fetchSchools()
      }
    }, [fetch, fetchSchools, isInitialized])

    return (
      <ContentWrapper>
        <div className="content-heading">
          <div>Clase</div>
        </div>

        <Row>
          <Col xs={12}>
            <Card className="card-default">
              <CardHeader className="border-bottom">Lista</CardHeader>
              <CardBody className={'p-0 position-relative'}>
                <CardSpinner isSpinning={isLoading} />

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <TableHeader $min>#</TableHeader>
                      <TableHeader>Nume</TableHeader>
                      <TableHeader>Scoala</TableHeader>
                      <TableHeader $min></TableHeader>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.keys(classes).length === 0 && (
                      <tr>
                        <TableCell colSpan={4}>
                          <div className="text-center bg-light-gray">Nicio clasa adaugata</div>
                        </TableCell>
                      </tr>
                    )}

                    {Object.keys(classes).map(id => {
                      const class_ = classes[parseInt(id)]

                      return (
                        <tr key={class_.id}>
                          <TableCell $min>{class_.id}</TableCell>
                          <TableCell $min>
                            {class_.schoolYear}
                            {class_.label}
                          </TableCell>
                          <TableCell>{class_.school.name}</TableCell>
                          <TableCell $min>
                            <LinkButton to={`/classes/${class_.id}`} icon={'fa fa-eye'}>
                              Detalii
                            </LinkButton>

                            <Button
                              onClick={handleDeleteClass(class_.id)}
                              type={'btn-danger'}
                              size={'xs'}
                              icon={'fas fa-times-circle'}
                              className={'ml-2'}
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
              <CardHeader className="border-bottom">Adauga clasa</CardHeader>
              <CardBody className="position-relative">
                <CardSpinner isSpinning={isLoading} />

                {error && <div className={'text-danger pb-2'}>{error}</div>}

                <form>
                  <div className="form-group">
                    <label>An de studiu (liceu: 9, 10, 11, 12)</label>
                    <input
                      placeholder="An de studiu"
                      type="text"
                      className="form-control"
                      value={addClassForm.schoolYear || ''}
                      onChange={event => {
                        setAddClassForm(form => ({ ...form, schoolYear: parseInt(event.target.value) || undefined }))
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Eticheta (A, B, C, D, E, F)</label>
                    <input
                      placeholder="Eticheta"
                      type="text"
                      className="form-control"
                      value={addClassForm.label}
                      onChange={event => {
                        setAddClassForm(form => ({ ...form, label: event.target.value }))
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Scoala</label>
                    <select
                      className="custom-select custom-select-sm"
                      value={addClassForm.schoolId || ''}
                      onChange={event => {
                        setAddClassForm(form => ({ ...form, schoolId: parseInt(event.target.value) || undefined }))
                      }}
                    >
                      <option key={''} value={''}>
                        -
                      </option>

                      {schools.order?.map(schoolId => {
                        const school = schools.entries?.[schoolId]

                        if (!school) return null

                        return (
                          <option key={school.id} value={school.id}>
                            {school.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  <Button
                    size={'sm'}
                    type={"btn-primary"}
                    disabled={!addClassForm.schoolYear || !addClassForm.schoolId || !addClassForm.label}
                    onClick={handleAddClass}
                  >
                    Adauga clasa
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

interface AddClassForm {
  schoolYear?: number
  label?: string
  schoolId?: number
}
