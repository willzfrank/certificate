import * as React from 'react'
import { Control } from 'react-hook-form'

const AddModuleTypeDocument = ({
  formControl,
  isEditing,
}: {
  formControl: Control<
    { documentName: string; documentFile: string; documentDescription: string },
    any
  >
  isEditing: boolean
}) => {
  return (
    <div>
      <div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
        <label htmlFor="documentName">Document Name</label>
        <input
          type="text"
          placeholder="Module 1"
          id="documentName"
          {...formControl.register('documentName', { required: true })}
          className="px-4 py-2 rounded border md:w-[450px] w-full text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>
      <div className="pt-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
        <label htmlFor="documentFile">Document File</label>
        <div className="relative">
          <input
            type="file"
            id="documentfile"
            accept="application/pdf"
            {...formControl.register('documentFile', { required: !isEditing })}
            className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
          />
        </div>
      </div>

      <div className="pt-4 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start">
        <label htmlFor="documentDescription">Document Description</label>
        <div className="relative">
          <textarea
            rows={4}
            id="documentDescription"
            {...formControl.register('documentDescription', { required: true })}
            className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-[100px,1fr] md:grid-cols-[150px,1fr] items-center my-2">
        <p></p>
        <p className="text-sm text-muted">
          Document size shouldn&apos;t exceed 40mb{' '}
        </p>
      </div>
    </div>
  )
}

export default AddModuleTypeDocument
