import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Row, Col, CardHeader, CardBody, Table, Card } from 'reactstrap'
import ContentWrapper from '../../components/Layout/ContentWrapper'
import { useStore } from '../../shared/hooks/useStore'
import { TableCell, TableHeader } from './Class.styles'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { CardSpinner } from '../../components/CardSpinner'
import { Header } from './Header/Header'
import { StudentRow } from './StudentRow/StudentRow'
import { AddStudentCard } from './AddStudentCard/AddStudentCard'
import { ActivityScoreModal } from './ActivityScoreModal/ActivityScoreModal'
import { InitialTestScoreModal } from './InitialTestScoreModal/InitialTestScoreModal'
import { EditStudentCard } from './EditStudentCard/EditStudentCard'

interface ClassProps
  extends RouteComponentProps<{
    id: string
  }> {}

enum CrudState {
  None = 'NONE',
  Add = 'ADD',
  Update = 'UPDATE',
  AddActivityScore = 'ADD_ACTIVITY_SCORE',
  UpdateInitialTestScore = 'UPDATE_INITIAL_TEST_SCORE',
}

export const Class = withRouter(
  memo(({ match }: ClassProps) => {
    const addStudentCardRef = useRef<HTMLDivElement | null>(null)
    const editStudentCardRef = useRef<HTMLDivElement | null>(null)

    const id = parseInt(match.params.id)

    const class_ = useStore(state => state.classes[id] || undefined)
    const fetchById = useStore(state => state.fetchById)
    const isLoading = useStore(state => state.isLoading)

    const [crudState, setCrudState] = useState<CrudState>(CrudState.None)
    const [selectedStudentPerformanceId, setSelectedStudentPerformanceId] = useState<number | undefined>()

    const studentsToClass = class_?.studentsPerformance

    const handleAddActivityScore = useCallback(
      (studentToClassId: number) => () => {
        setCrudState(CrudState.AddActivityScore)
        setSelectedStudentPerformanceId(studentToClassId)
      },
      []
    )

    const handleUpdatingInitialTestScore = useCallback(
      (studentToClassId: number) => () => {
        setCrudState(CrudState.UpdateInitialTestScore)
        setSelectedStudentPerformanceId(studentToClassId)
      },
      []
    )

    const selectedStudentPerformance = useMemo(
      () => studentsToClass?.find(stc => stc.id === selectedStudentPerformanceId),
      [selectedStudentPerformanceId, studentsToClass]
    )

    const handleUpdatingStudent = useCallback(
      (studentToClassId: number) => () => {
        setCrudState(CrudState.Update)
        setSelectedStudentPerformanceId(studentToClassId)
      },
      []
    )

    useLayoutEffect(() => {
      if (crudState === CrudState.Update) {
        editStudentCardRef.current?.scrollIntoView()
      }
      if (crudState === CrudState.Add) {
        addStudentCardRef.current?.scrollIntoView()
      }
    }, [crudState, selectedStudentPerformanceId])

    useEffect(() => {
      if (id) {
        fetchById(id)
      }
    }, [fetchById, id])

    return (
      <ContentWrapper>
        <Header class_={class_} onAddStudent={() => setCrudState(CrudState.Add)} />

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
                      <TableHeader>Nume</TableHeader>
                      <TableHeader $min>Activitate</TableHeader>
                      <TableHeader $min>Nota activitate</TableHeader>
                      <TableHeader $min>Nota initiala</TableHeader>
                      <TableHeader $min>Puncte</TableHeader>
                      <TableHeader $min>Teme nefacute</TableHeader>
                      <TableHeader $min>Puncte zgomot</TableHeader>
                      <TableHeader $min />
                    </tr>
                  </thead>

                  <tbody>
                    {!studentsToClass?.length && (
                      <tr>
                        <TableCell colSpan={5}>
                          <div className="text-center bg-light-gray">Niciun elev adaugat</div>
                        </TableCell>
                      </tr>
                    )}

                    {studentsToClass?.map((studentPerformance, index) => {
                      return (
                        <StudentRow
                          key={studentPerformance.id}
                          classId={id}
                          studentPerformance={studentPerformance}
                          index={index}
                          onAddActivityScore={handleAddActivityScore}
                          onUpdateInitialTestScore={handleUpdatingInitialTestScore}
                          onUpdateStudent={handleUpdatingStudent}
                        />
                      )
                    })}
                  </tbody>
                </Table>
                {/* END table-responsive */}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {crudState === CrudState.Update && (
          <EditStudentCard
            ref={editStudentCardRef}
            classId={id}
            studentPerformance={selectedStudentPerformance}
            onDismiss={() => setCrudState(CrudState.None)}
          />
        )}

        {crudState === CrudState.Add && (
          <AddStudentCard ref={addStudentCardRef} classId={id} onDismiss={() => setCrudState(CrudState.None)} />
        )}

        <ActivityScoreModal
          isOpen={crudState === CrudState.AddActivityScore}
          studentPerformance={selectedStudentPerformance}
          onDismiss={() => setCrudState(CrudState.None)}
        />

        <InitialTestScoreModal
          isOpen={crudState === CrudState.UpdateInitialTestScore}
          studentPerformance={selectedStudentPerformance}
          onDismiss={() => setCrudState(CrudState.None)}
        />
      </ContentWrapper>
    )
  })
)
