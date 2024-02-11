import { render, waitFor } from "@testing-library/react"
import Route from "."
import ReduxProvider from "../../services/redux-provider"
import * as TVShowPage from '../../pages/tv-show/index'
import Entity from '../../domain/tv-show/entity'
import * as Service from '../../services/tvshow'
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import routes from ".."
import * as Loader from "../../components/loader"

const wrapper = ({ children }: { children: any }) => (
    <ReduxProvider>{children}</ReduxProvider>
  )

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  })

describe('routes/tv-show', () => {
    it('should request the show "Powerpuff Girls" (id: 6771)', async () => {
        const mockPage = jest.fn()
        jest.spyOn(TVShowPage, 'default').mockImplementation(mockPage)

        const spy = jest.spyOn(Service, 'useFindTVShowQuery')

        render(<RouterProvider router={router} />, { wrapper })

        await waitFor(() => expect(spy).toHaveBeenCalledWith(6771))
    })

    it('should call the tv-show page', async () => {
        const mockPage = jest.fn()
        jest.spyOn(TVShowPage, 'default').mockImplementation(mockPage)
        
        const tvShow = {title: 'dummy title'} as Entity

        const spy = jest.spyOn(Service, 'useFindTVShowQuery').mockImplementation(() => ({ data: tvShow } as any))

        render(<RouterProvider router={router} />, { wrapper })

        await waitFor(() => expect(mockPage).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(mockPage.mock.calls[0][0]).toStrictEqual({
            details: tvShow
        }))
    })

    it('should render the loader if data is not ready', async () => {
        const mockLoader = jest.fn()
        jest.spyOn(Loader, 'default').mockImplementation(mockLoader)
        jest.spyOn(Service, 'useFindTVShowQuery').mockImplementation(() => ({data: undefined} as any))
  
        render(<RouterProvider router={router} />, { wrapper })
  
        await waitFor(() => expect(mockLoader).toHaveBeenCalledTimes(1))
      })
})