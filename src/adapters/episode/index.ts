import Episode from '../../domain/episode/entity'

const adaptSingleResource = (data: unknown): Episode => {
    if (!(!!data && typeof data === 'object' && 'id' in data && 'name' in data)) {
        throw new Error('Wrong data format!')
    }

    return {
        id: parseInt(`${data.id}`),
        title: `${data.name}`,
        summary: 'summary' in data && !!data.summary ? `${data.summary}` : undefined,
        coverImage:
            'image' in data &&
            !!data.image &&
            typeof data.image === 'object' &&
            'original' in data.image
                ? `${data.image.original}`
                : undefined
    }
}

const adaptArrayOfResources = (data: unknown[]) => {
    return data.map(adaptSingleResource)
}

export default (data: unknown): Episode | Episode[] => {
    if (Array.isArray(data)) {
        return adaptArrayOfResources(data)
    }
    return adaptSingleResource(data)
}
