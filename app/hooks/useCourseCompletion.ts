import * as React from 'react'
import { useLazyGetCourseModuleContentQuery } from 'app/api/subscriptionApi'
import { useMarkCourseAsCompletedMutation } from 'app/api/courseApi'

const useCourseCompletion = (courseId: string, courseModulesIds: string[], shouldShowCertificate: boolean) => {
    // The introduction of the active resource index is to recall this hook whenever a new resource is active
    const [getModuleResources] = useLazyGetCourseModuleContentQuery()
    const [isCompleted, setIsCompleted] = React.useState(false)
    const [markCourseAsCompleted, { isSuccess }] = useMarkCourseAsCompletedMutation()


    React.useEffect(() => {
        if (!shouldShowCertificate) return
        async function markCompleted() {
            const resources = await Promise.all(courseModulesIds.map(id => getModuleResources({ courseId, moduleId: id }).unwrap()))
            const allVideos = resources.map(resource => resource.data.videos).flat()
            const allAssessments = resources.map(resource => resource.data.assessments).flat()
            const allDocuments = resources.map(resources => resources.data.documents).flat()
            const isCourseCompleted =
                allVideos.every(video => video.isWatched) &&
                allAssessments.every(assessment => assessment.isCompleted) &&
                allDocuments.every(document => document.isRead)

            setIsCompleted(isCourseCompleted)
            // So if had the isComplete property set on the schema , we will say
            // if(!isComplete && isCourseCompleted){
            //  const res = await markCourseAsCompleted(courseId);
            // }
            // where isComplete is yet to be passed

            if (isCourseCompleted) {
                const res = await markCourseAsCompleted(courseId);
            }
        }
        const timer = setTimeout(markCompleted, 300)

        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldShowCertificate])

    // return isCompleted && isSuccess;
    return { isCompleted, hasCertificate: isSuccess }
}

export default useCourseCompletion;