import { ModuleContentResponse, ModuleContentTypes } from "./apiresponses";
import {
    AssessmentResourceType,
    ClickAndMatchInteractiveResourceType,
    DocumentResourceType,
    FillInTheBlanksInteractiveResourceType,
    SelectAllThatApplyInteractiveResourceType,
    SelectAnAnswerInteractiveResourceType,
    ThisOrThatInteractiveResourceType,
    VideoResourceType,
    AllInteractiveResourceTypes,
    AllModuleResources,
    ClickForMoreInteractiveResourceType,
    BoxWithOptionsInteractiveResourceType
} from "./coursetypes";

export function isVideo(resource: any): resource is ModuleContentResponse['data']['videos'][number] {
    return resource?.type === ModuleContentTypes.video;
}

export function isAssessment(resource: any): resource is ModuleContentResponse['data']['assessments'][0] {
    return resource?.type === ModuleContentTypes.assessment
}

export function isDocument(resource: any): resource is ModuleContentResponse['data']['documents'][0] {
    return resource?.type === ModuleContentTypes.document
}

export function isClickAndMatch(resource: any): resource is ModuleContentResponse['data']['clickAndMatchInteractiveTypes'][0] {
    return resource?.type === ModuleContentTypes.clickAndMatch
}

export function isThisOrThat(resource: any): resource is ModuleContentResponse['data']['thisOrThatInteractiveTypes'][0] {
    return resource?.type === ModuleContentTypes.thisOrThat
}

export function isAllThatApply(resource: any): resource is ModuleContentResponse['data']['selectAllThatApplyInteractiveTypes'][0] {
    return resource?.type === ModuleContentTypes.allThatApply
}

export function isSelectAnAnswer(resource: any): resource is ModuleContentResponse['data']['selectAnswerInteractiveTypes'][0] {
    return resource?.type === ModuleContentTypes.selectAnAnswer
}

export function isFillInTheBlank(resource: any): resource is ModuleContentResponse['data']['fillInTheBlanksInteractiveTypes'][0] {
    return resource?.type === ModuleContentTypes.fillInTheBlank
}


export function isVideoResource(resource: any): resource is VideoResourceType {
    return resource?.value?.type === ModuleContentTypes.video;
}

export function isAssessmentResource(resource: any): resource is AssessmentResourceType {
    return resource?.value?.type === ModuleContentTypes.assessment
}

export function isDocumentResource(resource: any): resource is DocumentResourceType {
    return resource?.value?.type === ModuleContentTypes.document
}

export function isClickAndMatchResource(resource: any): resource is ClickAndMatchInteractiveResourceType {
    return resource?.value?.type === ModuleContentTypes.clickAndMatch
}

export function isThisOrThatResource(resource: any): resource is ThisOrThatInteractiveResourceType {
    return resource?.value?.type === ModuleContentTypes.thisOrThat
}

export function isAllThatApplyResource(resource: any): resource is SelectAllThatApplyInteractiveResourceType {
    return resource?.value?.type === ModuleContentTypes.allThatApply
}

export function isClickForMoreExplanationResource(resource: any): resource is ClickForMoreInteractiveResourceType {
    return resource?.value?.type === ModuleContentTypes.clickForMore
}

export function isBoxWithOptionsResource(resource: any): resource is BoxWithOptionsInteractiveResourceType {
    return resource?.value?.type === ModuleContentTypes.boxWithOption;
}

export function isSelectAnAnswerResource(resource: any): resource is SelectAnAnswerInteractiveResourceType {
    return resource?.value?.type === ModuleContentTypes.selectAnAnswer
}

export function isFillInTheBlankResource(resource: any): resource is FillInTheBlanksInteractiveResourceType {
    return resource?.value?.type === ModuleContentTypes.fillInTheBlank
}

export function isInteractiveResource(resource: any): resource is AllInteractiveResourceTypes {
    return (
        resource?.value.type === ModuleContentTypes.allThatApply ||
        resource?.value.type === ModuleContentTypes.clickAndMatch ||
        resource?.value.type === ModuleContentTypes.fillInTheBlank ||
        resource?.value.type === ModuleContentTypes.selectAnAnswer ||
        resource?.value.type === ModuleContentTypes.thisOrThat 
    );
}
