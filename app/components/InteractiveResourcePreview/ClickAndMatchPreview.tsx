import * as React from 'react'
import { ClickAndMatchFormValues, USERTYPES, InteractiveTypes } from 'app/types'
import InteractivePreviewContainer from './InteractivePreviewContainer'
import { useColorGenerator, ColorPair, useAppSelector } from 'app/hooks'
import { Button } from '../elements'
import { shuffle } from 'app/utils'
import { useSetInteractiveTypeAsTakenMutation } from 'app/api/subscriptionApi'

interface ClickAndMatchInteractivePreviewProps {
  shouldShow: boolean
  onClose: (isCorrect?: boolean) => void
  initialValues: ClickAndMatchFormValues
}

const ClickAndMatchInteractivePreview = (
  props: ClickAndMatchInteractivePreviewProps,
) => {
  const { roleName, id: studentId } = useAppSelector((store) => store.user)
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false)

  const matchesQuestion = React.useMemo(
    () =>
      shuffle(props.initialValues?.statements?.map((match) => match.statement)),
    [props.initialValues.statements],
  )
  const matchesAnswer = React.useMemo(
    () =>
      shuffle(
        props.initialValues?.statements?.map(
          (statement) => statement.statementMatch,
        ),
      ),
    [props.initialValues.statements],
  )

  const [currentlyActiveColor, setCurrentlyActiveColor] = React.useState<
    ColorPair
  >({ background: '', text: '' })

  const [currentlyActiveKey, setCurrentlyActiveKey] = React.useState<string>('')

  const [matches, setMatches] = React.useState<
    { key: string; value: string }[]
  >([])

  const handleMatch = React.useCallback(
    (matchValue: string) => {
      setMatches([...matches, { key: currentlyActiveKey, value: matchValue }])
    },
    [currentlyActiveKey, matches],
  )

  const checkedIfMatchedCorrectly = (): boolean => {
    if (props?.initialValues?.statements) {
      for (let match of props?.initialValues?.statements) {
        for (let _match of matches) {
          if (
            match.statement === _match.key &&
            match.statementMatch !== _match.value
          ) {
            return false
          }
        }
      }

      return true
    }

    return true
  }

  const isMatchedCorrectly = checkedIfMatchedCorrectly()

  const retry = React.useCallback(() => {
    setHasSubmitted(false)
    setMatches([])
  }, [])

  const handleButtonPress = () => {
    if (hasSubmitted) {
      if (isMatchedCorrectly) {
        props.onClose(isMatchedCorrectly)
      } else {
        retry()
      }
    } else {
      setHasSubmitted(true)
    }
  }

  const [setAsTaken] = useSetInteractiveTypeAsTakenMutation()

  React.useEffect(() => {
    if (
      isMatchedCorrectly &&
      roleName?.toLowerCase() === USERTYPES.STUDENT &&
      hasSubmitted
    ) {
      setAsTaken({
        values: [
          {
            interactiveTypeId: props.initialValues?.id as string,
            studentId: studentId as string,
            interactiveType: InteractiveTypes.clickAndMatch,
          },
        ],
        moduleId: props.initialValues.moduleId as string,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleName, studentId, hasSubmitted])

  return (
    <InteractivePreviewContainer
      isOpen={props.shouldShow}
      isCompleted={matches.length === matchesAnswer.length && hasSubmitted}
      isIncorrect={!isMatchedCorrectly}
      closeModal={() => props.onClose(isMatchedCorrectly)}
      className="flex flex-col items-center justify-around"
    >
      <div>
        <p className="text-center text-xl">Click and Match</p>
        <p className="text-muted text-center my-1">
          {props.initialValues?.title}
        </p>
      </div>

      <div className="grid w-4/5 mx-auto grid-cols-5 my-4">
        <div className="col-span-2 flex flex-col justify-around">
          {matchesQuestion.map((match, index) => (
            <MatchQuestion
              shouldRestart={matches.length === 0}
              index={index}
              key={index}
              matchText={match}
              hasSubmitted={hasSubmitted}
              matchedCorrectly={(function () {
                const find = props.initialValues.statements.find(
                  (_match) => _match.statement === match,
                )
                const current = matches.find((_match) => _match.key === match)

                return (
                  find?.statementMatch === current?.value &&
                  find?.statement === current?.key
                )
              })()}
              setCurrentColorPair={setCurrentlyActiveColor}
              setCurrentlyActiveQuestion={setCurrentlyActiveKey}
              canMakeNewSelection={
                !currentlyActiveColor.background && !currentlyActiveColor.text
              }
            />
          ))}
        </div>

        <div />

        <div className="col-span-2 flex flex-col justify-around">
          {matchesAnswer.map((match, index) => (
            <MatchAnswer
              shouldRestart={matches.length === 0}
              onMatch={(matchValue: string) => handleMatch(matchValue)}
              currentColorPair={currentlyActiveColor}
              matchText={match}
              index={index}
              hasSubmitted={hasSubmitted}
              matchedCorrectly={(function () {
                const find = props.initialValues.statements.find(
                  (_statement) => _statement.statementMatch === match,
                )
                const current = matches.find((_match) => _match.value === match)
                return (
                  find?.statementMatch === current?.value &&
                  find?.statement === current?.key
                )
              })()}
              canMakeNewSelection={Boolean(
                currentlyActiveColor.background && currentlyActiveColor.text,
              )}
              key={index}
              setCurrentColorPair={setCurrentlyActiveColor}
            />
          ))}
        </div>
      </div>

      {hasSubmitted && isMatchedCorrectly && (
        <p className="text-center text-xl my-4">
          Yaayyy🎉. You got all answers correctly
        </p>
      )}

      <Button
        disabled={matches.length !== matchesAnswer.length}
        onClick={handleButtonPress}
        className="bg-app-pink mx-auto block px-6 py-2 text-white my-4 rounded"
      >
        {hasSubmitted
          ? isMatchedCorrectly
            ? 'Close'
            : 'Incorrect, Click to Retry'
          : 'Submit'}
      </Button>
    </InteractivePreviewContainer>
  )
}

interface MatchQuestionProps {
  index: number
  matchText: string
  setCurrentColorPair: React.Dispatch<React.SetStateAction<ColorPair>>
  canMakeNewSelection: boolean
  hasSubmitted: boolean
  matchedCorrectly: boolean
}

const MatchQuestion = ({
  index,
  matchText,
  canMakeNewSelection,
  setCurrentColorPair,
  setCurrentlyActiveQuestion,
  shouldRestart,
  hasSubmitted,
  matchedCorrectly,
}: MatchQuestionProps & {
  shouldRestart: boolean
  setCurrentlyActiveQuestion: React.Dispatch<React.SetStateAction<string>>
}) => {
  const generateColor = useColorGenerator()

  const [_colors, _setColors] = React.useState<ColorPair>({
    background: '',
    text: '',
  })

  const handleMatchSelection = () => {
    if (canMakeNewSelection) {
      setCurrentlyActiveQuestion(matchText)

      const matchColorPair = generateColor()

      _setColors(matchColorPair)
      setCurrentColorPair(matchColorPair)
    }
  }

  const reset = React.useCallback(() => {
    setCurrentlyActiveQuestion('')
    _setColors({ background: '', text: '' })
    setCurrentColorPair({ background: '', text: '' })
  }, [])

  React.useEffect(() => {
    if (shouldRestart) {
      reset()
    }
  }, [shouldRestart, reset])

  return (
    <div
      style={{
        backgroundColor: hasSubmitted
          ? matchedCorrectly
            ? 'green'
            : 'red'
          : _colors.background,
        color: _colors.text,
      }}
      onClick={handleMatchSelection}
      key={'Statement' + (index + 1)}
      className="my-2 cursor-pointer flex items-center bg-[#B3B1C9] min-h-[56px] py-2 pl-3 pr-4 relative after:absolute after:h-full after:w-14 after:top-0 after:-right-[10%] after:rounded-full after:bg-inherit after:-z-10"
    >
      {matchText}
    </div>
  )
}

const MatchAnswer = ({
  index,
  matchText,
  setCurrentColorPair,
  currentColorPair,
  canMakeNewSelection,
  onMatch,
  shouldRestart,
  hasSubmitted,
  matchedCorrectly,
}: MatchQuestionProps & {
  currentColorPair: ColorPair
  onMatch: (matchValue: string) => void
  shouldRestart: boolean
}) => {
  const [_colors, _setColors] = React.useState(currentColorPair)
  const [selected, setSelected] = React.useState<boolean>(false)

  const handleSelectAnswer = () => {
    if (!selected && canMakeNewSelection) {
      setSelected(true)
      _setColors(currentColorPair)
      setCurrentColorPair({ background: '', text: '' })
      onMatch(matchText)
    }
  }

  React.useEffect(() => {
    if (shouldRestart) {
      setSelected(false)
    }
  }, [shouldRestart])

  return (
    <div
      style={{
        backgroundColor: hasSubmitted
          ? matchedCorrectly
            ? 'green'
            : 'red'
          : selected
          ? _colors.background
          : '',
        color: selected ? _colors.text : '',
      }}
      onClick={handleSelectAnswer}
      key={'Statement' + (index + 1)}
      className="my-2 cursor-pointer flex items-center justify-center bg-[#B3B1C9] min-h-[56px] pl-14 py-2 pr-4 relative after:absolute after:h-full after:w-14 after:top-0 after:-left-[10%] after:rounded-full after:bg-white after:z-10"
    >
      {matchText}
    </div>
  )
}

export default ClickAndMatchInteractivePreview
