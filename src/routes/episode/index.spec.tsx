import { render, waitFor } from '@testing-library/react'
import ReduxProvider from '../../services/redux-provider'
import * as Page from '../../pages/episode/index'
import * as Service from '../../services/episode'
import * as Loader from '../../components/loader'
import Entity from '../../domain/episode/entity'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import routes from '..'

const wrapper = ({ children }: { children: any }) => (
    <ReduxProvider>{children}</ReduxProvider>
  )

  const router = createMemoryRouter(routes, {
    initialEntries: ['/episodes/:episodeId'],
    initialIndex: 1
  })

describe('routes/episode', () => {
    it('should call the episode page considering the route params', async () => {
      const mockPage = jest.fn()
      jest.spyOn(Page, 'default').mockImplementation(mockPage)

      const episode = {title: 'dummy title'} as Entity

      jest.spyOn(Service, 'useFindEpisodeQuery').mockImplementation(() => ({ data: episode } as any))

      render(<RouterProvider router={router} />, { wrapper })

      await waitFor(() => expect(mockPage).toHaveBeenCalledTimes(1))
      await waitFor(() => expect(mockPage.mock.calls[0][0]).toStrictEqual({
        details: episode
      }))
    })

    it('should render the loader if data is not ready', async () => {
      const mockLoader = jest.fn()
      jest.spyOn(Loader, 'default').mockImplementation(mockLoader)
      jest.spyOn(Service, 'useFindEpisodeQuery').mockImplementation(() => ({data: undefined} as any))

      render(<RouterProvider router={router} />, { wrapper })

      await waitFor(() => expect(mockLoader).toHaveBeenCalledTimes(1))
    })
})