/**
 * Represents the base state structure for managing a collection of items
 * along with their metadata.
 *
 * @template T - The type of items managed by this state.
 *
 * @property {T[]} items - The current list of items in the state.
 * @property {T[]} deleted - A list of items that have been marked as deleted.
 * @property {string | null} error - An error message, or null if no error exists.
 * @property {Status} status - The current status of the state.
 */
export interface BaseState<T> {
    items: T[],
    deleted: T[],
    error: string | null,
    status: Status
}

/**
 * Enum representing the various statuses of an operation or process.
 *
 * The `Status` enum can be used to define and manage the state of an ongoing or completed operation.
 * By using this enum, the state can be easily communicated and handled in a consistent manner throughout an
 * application.
 *
 * Enum values:
 * - `Pending`: Indicates the operation has not started yet or is waiting to be processed.
 * - `Loading`: Indicates the operation is currently in progress.
 * - `Error`: Indicates the operation has failed or encountered an issue.
 * - `Success`: Indicates the operation completed successfully without errors.
 */
export enum Status {
    Pending = 'Pending',
    Loading = 'Loading',
    Error = 'Error',
    Success = 'Success'
}

//todo: refactor ngrx to generics