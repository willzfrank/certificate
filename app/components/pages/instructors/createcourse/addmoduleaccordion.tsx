import * as React from 'react'
import { Accordion } from 'app/components'
import { CourseModules, ModuleContentTypes } from 'app/types'
import AddModuleAccordion__Head from './addmoduleaccordionhead'
import AddModuleAccordion__Body from './addmoduleaccordionbody'

const AddModuleAccordion = React.memo(function AddModuleAccordionUnmemo(
  moduleDetails: Omit<CourseModules, 'moduleId'> & { id: string },
) {
  const [currentResourceType, setCurrentResourceType] = React.useState<
    ModuleContentTypes
  >(ModuleContentTypes.NULL)

  const [isSaving, setIsSaving] = React.useState(false)

  return (
    <div>
      <Accordion.Item
        head={({ open: openAccordion }) => (
          <AddModuleAccordion__Head
            moduleDetails={{ ...moduleDetails, moduleId: moduleDetails.id }}
            setResourceType={setCurrentResourceType}
            resourceType={currentResourceType}
            openAccordion={openAccordion}
            isSaving={isSaving}
          />
        )}
        body={
          <AddModuleAccordion__Body
            setResourceType={setCurrentResourceType}
            moduleId={moduleDetails.id}
            currentResourceType={currentResourceType}
            setIsSaving={setIsSaving}
          />
        }
        withBodyPadding={false}
      />
    </div>
  )
})

export default AddModuleAccordion
