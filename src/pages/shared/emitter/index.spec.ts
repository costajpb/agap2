import { Emitter } from "."

describe('pages/shared/emitter', () => {
    test('emit', () => {
        const element = {
            dispatchEvent: jest.fn()
        }
        const name = 'dummy'
        const detail = {
            foo: 'bar'
        }
        const emitter = new Emitter(element as any)

        emitter.emit(name)

        expect(element.dispatchEvent).toHaveBeenCalledTimes(1)
        expect(element.dispatchEvent).toHaveBeenCalledWith(new CustomEvent(name, {
            bubbles: true,
            detail
        }))
    })

    test('on', () => {
        const element = {
            addEventListener: jest.fn()
        }
        const name = 'dummy'
        const handler = jest.fn()

        const emitter = new Emitter(element as any)

        emitter.on(name, handler)

        expect(element.addEventListener).toHaveBeenCalledTimes(1)
        expect(element.addEventListener).toHaveBeenCalledWith(name, handler)

    })
})