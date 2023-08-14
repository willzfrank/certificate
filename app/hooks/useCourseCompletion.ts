import * as React from 'react'
import { useLazyGetCourseModuleContentQuery } from 'app/api/subscriptionApi'
import { useMarkCourseAsCompletedMutation } from 'app/api/courseApi'

const useCourseCompletion = (courseId: string, courseModulesIds: string[]) => {

    const [getModuleResources] = useLazyGetCourseModuleContentQuery()
    const [isCompleted, setIsCompleted] = React.useState(false)
    const [markCourseAsCompleted, { isSuccess }] = useMarkCourseAsCompletedMutation()


    React.useEffect(() => {
        (
            async function () {
                const resources = await Promise.all(courseModulesIds.map(id => getModuleResources({ courseId, moduleId: id }).unwrap()))
                const allVideos = resources.map(resource => resource.data.videos).flat()
                const allAssessments = resources.map(resource => resource.data.assessments).flat()
                const allDocuments = resources.map(resources => resources.data.documents).flat()
                const isCourseCompleted =
                    allVideos.every(video => video.isWatched) &&
                    allAssessments.every(assessment => assessment.isCompleted) &&
                    allDocuments.every(document => document.isRead)

                setIsCompleted(isCourseCompleted)

                if (isCourseCompleted) {
                    const res = await markCourseAsCompleted(courseId);
                }
            }
        )()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isCompleted && isSuccess;
}

export default useCourseCompletion;