import React, { memo, useCallback } from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Button } from '../../../components/Button'
import { StudentPerformance } from '../../../shared/store/models/studentPerformance'
import styled from 'styled-components'
import { useStore } from '../../../shared/hooks/useStore'

interface ActivityScoreModalProps {
  isOpen?: boolean

  studentPerformance?: StudentPerformance

  onDismiss?: (isOpen: boolean) => void
}

export const ActivityScoreModal = memo(({ isOpen, studentPerformance, onDismiss }: ActivityScoreModalProps) => {
  const addActivityScore = useStore(state => state.addActivityScore)
  const deleteActivityScore = useStore(state => state.deleteActivityScore)

  const handleAdd = useCallback(
    (mark: number) => () => {
      studentPerformance && addActivityScore(studentPerformance.classId, studentPerformance.id, mark)
    },
    [addActivityScore, studentPerformance]
  )

  const handleDeleteLast = useCallback(() => {
    const lastActivityScoreId = studentPerformance?.activityScores?.[studentPerformance.activityScores.length - 1]?.id

    if (studentPerformance && lastActivityScoreId) {
      deleteActivityScore(studentPerformance.classId, studentPerformance.id, lastActivityScoreId)
    }
  }, [deleteActivityScore, studentPerformance])

  const handleDismiss = useCallback(() => {
    onDismiss?.(false)
  }, [onDismiss])

  if (!studentPerformance) {
    return null
  }

  return (
    <Modal isOpen={isOpen} toggle={handleDismiss} centered={true} size={'lg'}>
      <div className={'modal-header'}>
        <h4 className={'modal-title text-normal'}>
          Adauga nota de activitate pentru <strong>{studentPerformance?.student.lastName}</strong>{' '}
          {studentPerformance?.student.firstName}
        </h4>
      </div>

      <ModalBody>
        Note
        <div>
          {studentPerformance.activityScores?.map(as => (
            <ScoreBadge className="badge badge-primary" key={as.id}>
              {as.score}
            </ScoreBadge>
          ))}
        </div>
      </ModalBody>

      <ModalFooter>
        {MARKS.map(mark => (
          <Button key={mark} onClick={handleAdd(mark)} type={'btn-primary'} size={'md'}>
            {mark}
          </Button>
        ))}
      </ModalFooter>
      <ModalFooter>
        <Button onClick={handleDeleteLast} type="btn-danger">
          Sterge ultima nota
        </Button>
        <Button onClick={handleDismiss} type="btn-secondary">
          Inchide
        </Button>
      </ModalFooter>
    </Modal>
  )
})

export const MARKS = Array(10)
  .fill(0)
  .map((_, index) => index + 1)

export const ScoreBadge = styled.div`
  margin-right: 5px;
  padding: 0.1875rem 0.5375rem;
  font-size: 1.7rem;
  border-radius: 0.5rem;
`
