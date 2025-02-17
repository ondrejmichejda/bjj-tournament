export interface FirebaseState<T> {
    items: T[],
    deleted: T[],
    error: string | null,
    status: Status
}

export enum Status {
    Pending = 'Pending',
    Loading = 'Loading',
    Error = 'Error',
    Success = 'Success'
}