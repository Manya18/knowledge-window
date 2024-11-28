export interface AssistantInfoType {
    id: string,
    name: string,
    files: File[],
    message: string,
    customize: string
}

interface File {
    id: string,
    name: string
}