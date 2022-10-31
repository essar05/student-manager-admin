import React, { forwardRef, memo, useCallback, useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap'
import { CardSpinner } from '../../../components/CardSpinner'
import { Button } from '../../../components/Button'
import { useStore } from '../../../shared/hooks/useStore'
import { StudentPerformance } from '../../../shared/store/models/studentPerformance'

interface EditStudentCardProps {
  classId: number
  studentPerformance?: StudentPerformance

  onDismiss?: () => void
}

export const EditStudentCard = memo(
  forwardRef<HTMLDivElement, EditStudentCardProps>(
    ({ classId, studentPerformance, onDismiss }: EditStudentCardProps, ref) => {
      const updateStudentInClass = useStore(state => state.updateStudentInClass)
      const isLoading = useStore(state => state.isLoading)

      const [editStudentForm, setEditStudentForm] = useState({
        firstName: studentPerformance?.student.firstName,
        lastName: studentPerformance?.student.lastName,
      })

      const handleEditStudent = useCallback(() => {
        if (editStudentForm.firstName && editStudentForm.lastName && studentPerformance?.student.id) {
          updateStudentInClass(
            classId,
            studentPerformance?.id,
            studentPerformance?.student.id,
            editStudentForm.firstName,
            editStudentForm.lastName
          )

          onDismiss?.()
        }
      }, [
        editStudentForm.firstName,
        editStudentForm.lastName,
        studentPerformance?.student.id,
        studentPerformance?.id,
        updateStudentInClass,
        classId,
        onDismiss,
      ])

      useEffect(() => {
        setEditStudentForm({
          firstName: studentPerformance?.student.firstName,
          lastName: studentPerformance?.student.lastName,
        })
      }, [studentPerformance])

      return (
        <div ref={ref} className="row">
          <Col xs={12}>
            <Card className="card-default">
              <CardHeader className="border-bottom">Modifica datele elevului</CardHeader>
              <CardBody className="position-relative">
                <CardSpinner isSpinning={isLoading} />

                <form>
                  <div className="form-group">
                    <label>Nume</label>
                    <input
                      placeholder="Nume"
                      type="text"
                      className="form-control"
                      value={editStudentForm.lastName}
                      onChange={event => {
                        setEditStudentForm(form => ({ ...form, lastName: event.target.value }))
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Prenume</label>
                    <input
                      placeholder="Prenume"
                      type="text"
                      className="form-control"
                      value={editStudentForm.firstName}
                      onChange={event => {
                        setEditStudentForm(form => ({ ...form, firstName: event.target.value }))
                      }}
                    />
                  </div>
                </form>
              </CardBody>

              <CardFooter>
                <Button
                  size={'sm'}
                  type={'btn-primary'}
                  disabled={!editStudentForm.firstName || !editStudentForm.lastName}
                  onClick={handleEditStudent}
                >
                  Salveaza
                </Button>
                &nbsp;
                <Button size={'sm'} type={'btn-secondary'} onClick={onDismiss}>
                  Renunta
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </div>
      )
    }
  )
)
