import React, { memo, useCallback } from 'react'
import { Button } from '../../../components/Button'
import { TableCell, Value } from '../Class.styles'
import { StudentPerformance } from '../../../shared/store/models/studentPerformance'
import { useStore } from '../../../shared/hooks/useStore'
import { ActivityScore } from '../../../shared/store/models/activityScore'

interface StudentRowProps {
  classId: number

  studentPerformance: StudentPerformance
  index: number

  onAddActivityScore?: (studentToClassId: number) => () => void
  onUpdateInitialTestScore?: (studentToClassId: number) => () => void
  onUpdateStudent?: (studentToClassId: number) => () => void
}

export const StudentRow = memo(
  ({
    classId,
    studentPerformance,
    index,
    onAddActivityScore,
    onUpdateInitialTestScore,
    onUpdateStudent,
  }: StudentRowProps) => {
    const deleteStudentFromClass = useStore(state => state.deleteStudentFromClass)
    const addActivityPoints = useStore(state => state.addActivityPoints)
    const addMissingHomework = useStore(state => state.addMissingHomework)
    const addLoudnessWarning = useStore(state => state.addLoudnessWarning)
    const deleteLastLoudnessWarning = useStore(state => state.deleteLastLoudnessWarning)

    const handleDeleteStudent = useCallback(
      (studentToClassId: number) => () => {
        if (
          window.confirm(
            'Acest elev si toate datele corespunzatoare lui vor fi sterse. Esti sigur ca vrei sa continui ?'
          )
        ) {
          deleteStudentFromClass(classId, studentToClassId)
        }
      },
      [deleteStudentFromClass, classId]
    )

    const handleUpVote = useCallback(async () => {
      addActivityPoints(studentPerformance.classId, studentPerformance.id, 1)
    }, [addActivityPoints, studentPerformance.classId, studentPerformance.id])

    const handleDownVote = useCallback(() => {
      addActivityPoints(studentPerformance.classId, studentPerformance.id, -1)
    }, [addActivityPoints, studentPerformance.classId, studentPerformance.id])

    const handleAddMissingHomework = useCallback(
      (amount: number) => () => {
        addMissingHomework(studentPerformance.classId, studentPerformance.id, amount)
      },
      [addMissingHomework, studentPerformance.classId, studentPerformance.id]
    )

    const handleAddLoudnessWarning = useCallback(() => {
      addLoudnessWarning(studentPerformance.classId, studentPerformance.id)
    }, [addLoudnessWarning, studentPerformance.classId, studentPerformance.id])

    const handleDeleteLoudnessWarning = useCallback(() => {
      deleteLastLoudnessWarning(studentPerformance.classId, studentPerformance.id)
    }, [deleteLastLoudnessWarning, studentPerformance.classId, studentPerformance.id])

    const getAverageActivityScore = useCallback((activityScores?: ActivityScore[]) => {
      return activityScores && activityScores.length > 0
        ? (
            activityScores.reduce((accumulator, activityScore) => accumulator + activityScore.score, 0) /
            activityScores.length
          ).toFixed(2)
        : null
    }, [])

    return (
      <tr>
        <TableCell $min>{index + 1}</TableCell>
        <TableCell>
          <strong>{studentPerformance.student.lastName}</strong> {studentPerformance.student.firstName}
        </TableCell>

        <TableCell $min className={'text-right'}>
          <Value $noWidth>{studentPerformance.activityScores?.map(as => as.score).join(' • ') || '-'}</Value>
          <Button
            onClick={onAddActivityScore?.(studentPerformance.id)}
            type={'btn-success'}
            size={'xs'}
            className={'ml-auto d-inline-block'}
          >
            <i className={'fas fa-plus'} />
          </Button>
        </TableCell>

        <TableCell $min className={'text-right'}>
          <Value $noWidth $noMargin>
            {getAverageActivityScore(studentPerformance.activityScores) || '-'}{' '}
          </Value>
        </TableCell>

        <TableCell $min className={'text-right'}>
          <Value $noWidth>{studentPerformance.initialTestScore || '-'}</Value>
          <Button onClick={onUpdateInitialTestScore?.(studentPerformance.id)} type={'btn-success'} size={'xs'}>
            <i className={'fas fa-pen'} />
          </Button>
        </TableCell>

        <TableCell $min>
          <Button onClick={handleDownVote} type={'btn-danger'} size={'xs'}>
            <i className={'fas fa-minus'} />
          </Button>

          <Value>{studentPerformance.activityPoints}</Value>

          <Button onClick={handleUpVote} type={'btn-success'} size={'xs'}>
            <i className={'fas fa-plus'} />
          </Button>
        </TableCell>

        <TableCell $min>
          <Button
            onClick={handleAddMissingHomework(-1)}
            disabled={!studentPerformance.missingHomeworks || studentPerformance.missingHomeworks < 1}
            type={'btn-danger'}
            size={'xs'}
          >
            <i className="fas fa-star" />
          </Button>
          &nbsp;
          <Button
            onClick={handleAddMissingHomework(-0.5)}
            disabled={!studentPerformance.missingHomeworks}
            type={'btn-danger'}
            size={'xs'}
          >
            <i className="fas fa-star-half" />
          </Button>
          <Value>{studentPerformance.missingHomeworks}</Value>
          <Button onClick={handleAddMissingHomework(0.5)} type={'btn-success'} size={'xs'}>
            <i className="fas fa-star-half" />
          </Button>
          &nbsp;
          <Button onClick={handleAddMissingHomework(1)} type={'btn-success'} size={'xs'}>
            <i className="fas fa-star" />
          </Button>
        </TableCell>

        <TableCell $min>
          <Button
            onClick={handleDeleteLoudnessWarning}
            type={'btn-danger'}
            disabled={!studentPerformance.loudnessWarnings}
            size={'xs'}
          >
            <i className={'fas fa-minus'} />
          </Button>

          <Value>{studentPerformance.loudnessWarnings}</Value>

          <Button onClick={handleAddLoudnessWarning} type={'btn-success'} size={'xs'}>
            <i className={'fas fa-plus'} />
          </Button>
        </TableCell>

        <TableCell $min>
          <Button onClick={onUpdateStudent?.(studentPerformance.id)} type={'btn-info'} size={'xs'} icon={'fas fa-pen'}>
            Modifica
          </Button>
          &nbsp;
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
  }
)
