import { getByTestId, render, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import routes from '..';
import ReduxProvider from '../../services/redux-provider';

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any), // technically it passes without this too, but I'm not sure if its there for other tests to use the real thing so I left it in
  useNavigate: () => mockNavigate
}));

describe('routes/root', () => {
  const wrapper = ({ children }: { children: any }) => (
    <ReduxProvider>{children}</ReduxProvider>
  )

  const router = createMemoryRouter(routes, {
    initialEntries: ['/']
  })

  test('navigate to episode', async () => {
    const { container } = render(<RouterProvider router={router} />, { wrapper })

    const root = getByTestId(container, 'root')

    const id = 1

    root.dispatchEvent(new CustomEvent('tvshow:display', {
      detail: {
        id
      }
    }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/episodes/${id}`))
  })

  test('navigate back to TV show', async () => {
    const { container } = render(<RouterProvider router={router} />, { wrapper })

    const root = getByTestId(container, 'root')

    root.dispatchEvent(new CustomEvent('episode:return'))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/`))
  })
})
