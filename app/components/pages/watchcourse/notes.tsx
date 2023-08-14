import * as React from "react";
import { useAppSelector, useNotify } from "app/hooks";
import {
  useGetStudentsNotesPerVideoQuery,
  useAddStudentNoteMutation,
} from "app/api/courseApi";
import { ModuleContentResponse, ModuleContentTypes } from "app/types";
import { Button, UserNotes } from "app/components";
import { WatchCourseContext } from "app/contexts";
import { motion } from "framer-motion";
import { isVideo } from "app/types/guards";

const Notes = () => {
  const {
    activeResourceIndex,
    allResourses,
    activeResourceType,
    courseDetails,
  } = React.useContext(WatchCourseContext);

  const { id: studentId } = useAppSelector((store) => store.user);

  const [textAreaValue, setTextAreaValue] = React.useState("");

  const {
    data = { data: { pagedList: [], metaData: {} }, errors: [] },
    isFetching: isFetchingNotes,
    isError: isGettingNotesError,
  } = useGetStudentsNotesPerVideoQuery(
    {
      studentId: studentId as string,
      videoId: (
        allResourses[
          activeResourceIndex
        ] as ModuleContentResponse["data"]["videos"][number]
      )?.id,
      page: 1,
      perPage: 10,
    },
    { skip: !studentId || activeResourceType !== ModuleContentTypes.video }
  );

  const [addNote, { data: addNoteRes, isLoading: isAddingNote }] =
    useAddStudentNoteMutation();
  const notify = useNotify();

  const handleAddNote = React.useCallback(async () => {
    const resource = allResourses[activeResourceIndex];
    if (isVideo(resource)) {
      const res = await addNote({
        studentId: studentId as string,
        moduleVideoId: resource.id,
        text: textAreaValue,
      }).unwrap();

      if (res.errors.length === 0) {
        notify({
          title: "Note Added ✔️",
          description: "Note has been added successfully",
          type: "success",
        });

        setTextAreaValue("");
      } else {
        notify({
          title: "Error 🚫",
          description: "Error while adding note. Please try again",
          type: "error",
        });
      }
    } else {
      notify({
        title: "Error 🚫",
        description: "You can only add notes to videos",
        type: "error",
      });
    }
  }, [
    textAreaValue,
    addNote,
    studentId,
    allResourses,
    activeResourceIndex,
    notify,
  ]);

  return (
    <>
      <div className="my-6 md:w-[90%] space-y-4 flex flex-col items-end">
        <textarea
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          className="w-full h-[102px] outline-none border border-app-gray rounded p-4"
          placeholder="Add new note"
        />
        <Button
          loading={isAddingNote}
          onClick={handleAddNote}
          className="bg-app-pink py-3 px-8 text-sm rounded text-white"
        >
          Add note
        </Button>
      </div>

      <div className="my-6 md:w-[90%] mb-40">
        <p className="font-medium text-xl my-6">My notes</p>
        <motion.div className="space-y-8" layout>
          {data?.data.pagedList.length === 0 ? (
            <div className="h-60 grid place-items-center">
              <h1 className="text-2xl">No Notes Found</h1>
            </div>
          ) : (
            data?.data.pagedList.map((note) => (
              <motion.div layout key={note.id}>
                <UserNotes
                  {...note}
                  moduleVideoId={
                    (
                      allResourses[
                        activeResourceIndex
                      ] as ModuleContentResponse["data"]["videos"][number]
                    )?.id
                  }
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Notes;
