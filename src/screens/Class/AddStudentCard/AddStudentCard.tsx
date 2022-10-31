import React, { forwardRef, memo, useCallback, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap'
import { CardSpinner } from '../../../components/CardSpinner'
import { Button } from '../../../components/Button'
import { useStore } from '../../../shared/hooks/useStore'

interface AddStudentCardProps {
  classId: number

  onDismiss?: () => void
}

export const AddStudentCard = memo(
  forwardRef<HTMLDivElement, AddStudentCardProps>(({ classId, onDismiss }: AddStudentCardProps, ref) => {
    const addStudentToClass = useStore(state => state.addStudentToClass)
    const isLoading = useStore(state => state.isLoading)

    const [addStudentForm, setAddStudentForm] = useState({ firstName: '', lastName: '' })

    const handleAddStudent = useCallback(() => {
      if (addStudentForm.firstName && addStudentForm.lastName) {
        addStudentToClass(classId, addStudentForm.firstName, addStudentForm.lastName)

        setAddStudentForm({ firstName: '', lastName: '' })
        onDismiss?.()
      }
    }, [addStudentForm.firstName, addStudentForm.lastName, addStudentToClass, classId, onDismiss])

    return (
      <div ref={ref} className="row">
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
              </form>
            </CardBody>

            <CardFooter>
              <Button
                size={'sm'}
                type={'btn-primary'}
                disabled={!addStudentForm.firstName || !addStudentForm.lastName}
                onClick={handleAddStudent}
              >
                Adauga elev
              </Button>
              &nbsp;
              <Button
                size={'sm'}
                type={'btn-secondary'}
                onClick={onDismiss}
              >
                Renunta
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </div>
    )
  })
)
