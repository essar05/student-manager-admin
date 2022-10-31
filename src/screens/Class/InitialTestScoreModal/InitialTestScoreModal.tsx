import React, { memo, useCallback } from 'react'
import { StudentPerformance } from '../../../shared/store/models/studentPerformance'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Button } from '../../../components/Button'
import { MARKS, ScoreBadge } from '../ActivityScoreModal/ActivityScoreModal'
import { useStore } from '../../../shared/hooks/useStore'

interface InitialTestScoreModalProps {
  isOpen?: boolean

  studentPerformance?: StudentPerformance

  onDismiss?: (isOpen: boolean) => void
}

export const InitialTestScoreModal = memo(({ isOpen, studentPerformance, onDismiss }: InitialTestScoreModalProps) => {
  const updateInitialTestScore = useStore(state => state.updateInitialTestScore)

  const handleUpdate = useCallback(
    (mark: number) => () => {
      studentPerformance && updateInitialTestScore(studentPerformance.classId, studentPerformance.id, mark)
    },
    [updateInitialTestScore, studentPerformance]
  )

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
          Modifica nota initiala pentru <strong>{studentPerformance?.student.lastName}</strong>{' '}
          {studentPerformance?.student.firstName}
        </h4>
      </div>

      <ModalBody>
        Nota initiala
        <div>
          <ScoreBadge className="badge badge-primary">{studentPerformance.initialTestScore || '-'}</ScoreBadge>
        </div>
      </ModalBody>

      <ModalFooter>
        {MARKS.map(mark => (
          <Button onClick={handleUpdate(mark)} key={mark} type={'btn-primary'} size={'md'}>
            {mark}
          </Button>
        ))}

        <Button onClick={handleDismiss} type="btn-secondary">
          Inchide
        </Button>
      </ModalFooter>
    </Modal>
  )
})
