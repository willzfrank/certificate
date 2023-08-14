import { AllModuleResources, ModuleContentResponse, ModuleContentTypes } from "app/types";


export function shuffle<T>(array: Array<T>): Array<T> {
  if (!array?.length) {
    return [];
  }

  const newArray: Array<T> = [];
  const arraylength = array.length;

  for (let i = 0; i < arraylength; i++) {
    newArray.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
  }

  return newArray;
}


export function getAllModuleResources(data?: ModuleContentResponse['data']): AllModuleResources {

  let list: AllModuleResources = [];

  if (data) {

    const { totalSeconds, thisOrThatInteractiveTypes, ...otherModuleContent } = data;

    const thisOrThatMap = new Map<string, { questions: ModuleContentResponse['data']['thisOrThatInteractiveTypes'], position: number, type: ModuleContentTypes.thisOrThat, isTaken: boolean, id: string }>();

    if (thisOrThatInteractiveTypes) {
      for (let i = 0; i < thisOrThatInteractiveTypes.length; i++) {
        const currentInteractive = thisOrThatInteractiveTypes[i];
        const hasGroup = currentInteractive.group !== null;
        const key = hasGroup ? currentInteractive.group : currentInteractive.id;
        const interactiveGroup = thisOrThatMap.get(key);

        if (interactiveGroup) {
          thisOrThatMap.set(key, { ...interactiveGroup, questions: [...interactiveGroup.questions, currentInteractive], id: currentInteractive.group })
        } else {
          thisOrThatMap.set(key, { id: key, questions: [currentInteractive], type: ModuleContentTypes.thisOrThat, position: currentInteractive.position, isTaken: currentInteractive.isTaken })
        }
      }
    }


    const content = Object.values(otherModuleContent)
      //remove null values
      .filter(val => val)
      .flat();

    //@ts-ignore
    list.push(...content, ...Array.from(thisOrThatMap.values()));
    list.sort((a: any, b: any) => a.position - b.position)

    // console.log(list)

  }

  return list;
}