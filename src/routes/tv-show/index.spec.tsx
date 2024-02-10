import { render, waitFor } from "@testing-library/react"
import Route from "."
import ReduxProvider from "../../services/redux-provider"
import * as TVShowPage from '../../pages/tv-show/index'

const wrapper = ({ children }: { children: any }) => (
    <ReduxProvider>{children}</ReduxProvider>
  )


describe('routes/tv-show', () => {
    it('should call the tv-show page', async () => {
        const mockPage = jest.fn()
        jest.spyOn(TVShowPage, 'default').mockImplementation(mockPage)
        
        render(<Route />, {wrapper})
        
        await waitFor(() => expect(mockPage).toHaveBeenCalledTimes(1))
    })
})