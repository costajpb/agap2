import { renderHook, waitFor } from "@testing-library/react"
import useUseCase from "."
import UseCase from "../../application/shared/use-case"
import Repository from "../../domain/shared/repository"

describe('src/hooks/use-use-case', () => {
    class Dummy extends UseCase<any> {}
    const repository: Repository<any> = {}

    it('should return a use case eventually', async () => {
        const { result } = renderHook(() => useUseCase(Dummy, repository, 1))
        await waitFor(() => expect(result.current).toBeDefined())
    })
})