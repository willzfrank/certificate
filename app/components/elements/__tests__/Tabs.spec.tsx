import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Tabs from '../Tabs'


describe('Testing Tab Rendering', () => {
  test('renders link tab correctly', () => {
    render(
      <Tabs
        isLink={true}
        tabs={[
          { title: 'Home', href: '/' },
          { title: 'About', href: '/about' },
        ]}
      />,
    )
    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(2)
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
  })

  test('renders button tab correctly', () => {
    render(
      <Tabs
        isLink={false}
        tabs={[
          { title: 'home', onClick: () => console.log('hi') },
          { title: 'about', onClick: () => console.log('about') },
          { title: 'hello', onClick: () => console.log('about') },
          { title: 'there', onClick: () => console.log('about') },
        ]}
      />,
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(4)
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
  })

  test('the first link is active', () => {
    render(
      <Tabs
        isLink
        id={'nav tab'}
        tabs={[
          { title: 'Home', href: '/', active: true },
          { title: 'About', href: '/about' },
        ]}
      />,
    )

    const firstLink = screen.getAllByRole('link')[0]

    expect(firstLink.nextElementSibling).toBeInTheDocument()
  })
})

describe('Testing Clicking functionality', () => {

  test('clicking changes active on button tab', () => {
    render(
      <Tabs
        isLink={false}
        tabs={[
          { title: 'Home', onClick: () => {} },
          { title: 'About', onClick: () => {} },
        ]}
      />,
    )

    const firstButton = screen.getAllByRole('button')[0]
    const secondButton = screen.getAllByRole('button')[1]

    expect(firstButton.nextElementSibling).toBeInTheDocument()

    fireEvent.click(secondButton)

    expect(secondButton.nextElementSibling).toBeInTheDocument()
    expect(firstButton.nextElementSibling).not.toBeInTheDocument()
  })
})
