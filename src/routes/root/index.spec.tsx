import { findAllByTestId, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '.';
import * as Router from 'react-router-dom'

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any), // technically it passes without this too, but I'm not sure if its there for other tests to use the real thing so I left it in
  redirect: jest.fn()
}));

describe('App', () => {
  describe('TV Show details page', () => {
    it.only('should call redirect on tvshow:display event', async () => {
      const { container } = render(<App />)
      const firstEpisode = (await (findAllByTestId(container, 'episode')))[0]

      // xxx: prevent redirection attempt
      firstEpisode.setAttribute('href', '#')

      fireEvent(firstEpisode, new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
      }))

      await waitFor(() => expect(Router.redirect).toHaveBeenCalledTimes(1))
      await waitFor(() => expect(Router.redirect).toHaveBeenCalledWith('/episodes/1'))      
    })
  })
})
