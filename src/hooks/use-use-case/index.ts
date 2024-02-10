import { useEffect, useState } from "react";
import UseCase from "../../application/shared/use-case";
import Entity from "../../domain/shared/entity";
import Repository from "../../domain/shared/repository";

type Constructor<T extends Entity> = new (...args: any[]) => UseCase<T>

export default function useUseCase<T extends Entity>(Constructor: Constructor<T>, repository: Repository<T>, id: T['id']) {
    const [useCase, setUseCase] = useState<UseCase<T> | undefined>(undefined)
    
    useEffect(() => {
        setUseCase(new Constructor(repository, id))
    }, [Constructor, id, repository])

    return useCase
}