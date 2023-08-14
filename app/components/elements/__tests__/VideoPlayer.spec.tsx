import * as React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoPlayer from '../VideoPlayer'

jest
  .spyOn(window.HTMLMediaElement.prototype, 'load')
  .mockImplementation(() => console.log('loading resource'))

// jest
//   .spyOn(window.HTMLMediaElement.prototype, 'play')
//   .mockImplementation(() => console.log('playing video˝'))

describe('video player renders correctly', () => {
  test('video player renders', () => {
    render(
      <VideoPlayer src="https://firebasestorage.googleapis.com/v0/b/nissi-ogulu-433b9.appspot.com/o/Landing%20page%20GIF%20Nissi.mp4?alt=media&token=4db85cf3-abd4-48b1-80da-0f06fbc60d0e" />,
    )

    const videoElement = screen.getByTestId('videoplayer__video')
    const videoSeeker = screen.getByTestId('videoplayer__seek')

    expect(videoElement).toBeInTheDocument()
    expect(videoSeeker).toBeInTheDocument()
    expect(videoSeeker.style.length).toEqual(0)
  })

  test('video controls functionality', () => {
    render(
      <VideoPlayer src="https://firebasestorage.googleapis.com/v0/b/nissi-ogulu-433b9.appspot.com/o/Landing%20page%20GIF%20Nissi.mp4?alt=media&token=4db85cf3-abd4-48b1-80da-0f06fbc60d0e" />,
    )

    const videoElement = screen.getByTestId(
      'videoplayer__video',
    ) as HTMLVideoElement
    ;``
    videoElement.play()
    // fireEvent.keyPress(window, { key: ' ', code: 32, charCode: 32 })
    expect(videoElement.paused).toEqual(false)
  })
})
