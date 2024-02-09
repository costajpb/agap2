import { findAllByTestId, fireEvent, render, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import routes from '..';

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any), // technically it passes without this too, but I'm not sure if its there for other tests to use the real thing so I left it in
  useNavigate: () => mockNavigate
}));

describe('Root', () => {
  describe('TV Show details page', () => {
    it('should call redirect on tvshow:display event', async () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ['/']
      })

      const { container } = render(<RouterProvider router={router} />)

      const firstEpisode = (await (findAllByTestId(container, 'episode')))[0]

      // xxx: prevent redirection attempt
      firstEpisode.setAttribute('href', '#')

      fireEvent(firstEpisode, new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
      }))

      await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1))
      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/episodes/1'))      
    })
  })
})
