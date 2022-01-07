import { render } from '@testing-library/react'
import App from '../App'

it('runs the first test', () => {
  expect(true).toBe(true)
})
// Test that the App Component renders without crashing
// describe('App', () => {
//   test('renders App component', () => {
//     render(<App />)
//   })
// })
//Test that the App Component renders without crashing
describe('App', () => {
  test('renders App component', () => {
    render(<App />)
  })
})
