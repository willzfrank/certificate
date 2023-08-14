import {
  AllModuleResources,
  ModuleContentResponse,
  ModuleContentTypes,
  SingleCourseDetailsResponse,
} from 'app/types'
import * as React from 'react'


interface WatchCourseContextType {
  allResourses: AllModuleResources
  activeResourceIndex: number
  setActiveResourceIndex: React.Dispatch<React.SetStateAction<number>>
  activeResourceType: ModuleContentTypes
  setActiveResourceType: React.Dispatch<React.SetStateAction<ModuleContentTypes>>
  courseDetails?: SingleCourseDetailsResponse
  activeModuleIndex: number,
  setActiveModuleIndex: React.Dispatch<React.SetStateAction<number>>
}

const WatchCourseContext = React.createContext<WatchCourseContextType>({
  allResourses: [],
  activeResourceIndex: 0,
  setActiveResourceIndex: () => {},
  activeResourceType: ModuleContentTypes.video,
  setActiveResourceType: () => {},
  courseDetails: undefined,
  activeModuleIndex: 0,
  setActiveModuleIndex: () => {}
})

export default WatchCourseContext
