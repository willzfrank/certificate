import * as React from 'react'
import { Note } from 'app/types'
import { Button, Image } from 'app/components'
import {
  useDeleteStudentNoteMutation,
  useEditStudentNoteMutation,
} from 'app/api/courseApi'
import { useNotify } from 'app/hooks'
import { getTimeDifference } from 'app/utils'

const UserNotes = (props: Note & { moduleVideoId: string }) => {
  const [noteText, setNoteText] = React.useState<string>(props.text)
  const [toEdit, setToEdit] = React.useState<boolean>(false)
  const [editNote, { isLoading: isEditingNote }] = useEditStudentNoteMutation()
  const [
    deleteNode,
    { isLoading: isDeletingNote },
  ] = useDeleteStudentNoteMutation()

  const notify = useNotify()

  const handleDeleteNote = async () => {
    const res = await deleteNode({
      noteId: props.id,
      moduleVideoId: props.moduleVideoId,
    }).unwrap()

    notify({
      title: 'Response',
      description: JSON.stringify(res),
      type: 'info',
    })
  }

  React.useEffect(() => {
    ;(async function () {
      if (!toEdit && noteText) {
        if (props.text !== noteText) {
          const res = await editNote({
            noteId: props.id,
            text: noteText,
            moduleVideoId: props.moduleVideoId,
          }).unwrap()

          if (res.errors.length === 0) {
            notify({
              type: 'success',
              description: 'You have successfully edited your note',
              title: 'Success ✔️',
            })
          } else {
            notify({
              type: 'error',
              description: 'Error while editing note',
              title: 'Error 🚫',
            })
          }
        }
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editNote, noteText, toEdit])

  React.useEffect(() => {
    setNoteText(props.text)
  }, [props.text])

  return (
    <div className="md:border border-[#EAEAEA] md:p-6 rounded-lg">
      <div className="flex gap-4">
        <div className="mt-1 md:mt-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-app-dark text-white grid place-items-center overflow-clip">
          {props.profilePictureUrl ? (
            <Image
              src={props.profilePictureUrl}
              alt={props.studentName}
              className="h-full w-full"
            />
          ) : (
            <p className="md:text-xl text-lg font-medium leading-[30px] tracking-[0.02em]">
              {props.studentName.split(' ')[0].charAt(0).toUpperCase() +
                props.studentName.split(' ')[1].charAt(0).toUpperCase()}
            </p>
          )}
        </div>

        <div className="space-y-[10px] flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="md:space-y-1">
              <p>{props.studentName}</p>
              <p className="text-muted text-sm">
                {getTimeDifference(props.dateCreated)}
              </p>
            </div>

            <div className="flex gap-3 items-center">
              {isEditingNote && <p className="text-sm text-muted">Saving...</p>}
              <Button
                loading={isEditingNote}
                onClick={() => setToEdit(!toEdit)}
                className="w-8 !h-8 grid place-items-center bg-[#EAEAEA] rounded-full"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16406 13.6287H13.9991"
                    stroke="#545454"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.52001 2.52986C9.0371 1.91186 9.96666 1.82124 10.5975 2.32782C10.6324 2.35531 11.753 3.22586 11.753 3.22586C12.446 3.64479 12.6613 4.5354 12.2329 5.21506C12.2102 5.25146 5.87463 13.1763 5.87463 13.1763C5.66385 13.4393 5.34389 13.5945 5.00194 13.5982L2.57569 13.6287L2.02902 11.3149C1.95244 10.9895 2.02902 10.6478 2.2398 10.3849L8.52001 2.52986Z"
                    stroke="#545454"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.34766 4.00049L10.9825 6.79191"
                    stroke="#545454"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>

              <Button
                loading={isDeletingNote}
                onClick={handleDeleteNote}
                className="w-8 !h-8 grid place-items-center bg-[#F6E9ED] rounded-full"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8825 6.3125C12.8825 6.3125 12.5205 10.8025 12.3105 12.6938C12.2105 13.5972 11.6525 14.1265 10.7385 14.1432C8.99921 14.1745 7.25788 14.1765 5.51921 14.1398C4.63987 14.1218 4.09121 13.5858 3.99321 12.6985C3.78188 10.7905 3.42188 6.3125 3.42188 6.3125"
                    stroke="#B61010"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.8053 4.15999H2.5"
                    stroke="#B61010"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6264 4.15998C11.1031 4.15998 10.6524 3.78998 10.5497 3.27732L10.3877 2.46665C10.2877 2.09265 9.94907 1.83398 9.56307 1.83398H6.74107C6.35507 1.83398 6.0164 2.09265 5.9164 2.46665L5.7544 3.27732C5.65173 3.78998 5.20107 4.15998 4.67773 4.15998"
                    stroke="#B61010"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
          {toEdit ? (
            <textarea
              className="outline-none"
              autoFocus
              value={noteText}
              onChange={(e) => setNoteText(e.currentTarget.value)}
            />
          ) : (
            <p
              className="text-muted leading-[160%] tracking-[0.01em]"
              style={{ overflowWrap: 'anywhere' }}
            >
              {noteText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserNotes
