
import { useMemo } from 'react';
import { CourseModules } from 'app/types';

import * as React from 'react';

const useFreeModulesAvailable = (modules: CourseModules[]) => {

  const freeModulesAvailable = useMemo(() => {
    if (modules?.length === 0) return false;
    return modules?.some((module: CourseModules) => module.paymentRequired === false);
  }, [modules]);
  return freeModulesAvailable;
}

export default useFreeModulesAvailable;