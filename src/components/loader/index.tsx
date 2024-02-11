import { x } from '@xstyled/styled-components'

export default function Loader() {
    return (
        <x.span>
            <x.svg
                mr="4"
                display="inline"
                fill="none"
                animation="spin"
                h="10"
                w="10"
                bg="white"
                viewBox="0 0 24 24"
            >
                <x.circle
                    opacity="0.25"
                    stroke="currentcolor"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke-width="4"
                ></x.circle>
                <x.path
                    fill="gray-400"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></x.path>
            </x.svg>
            Loading...
        </x.span>
    )
}
