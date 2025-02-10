export interface Storable<T> {
    serialize(): string;

    deserialize(data: string): T;
}