export interface AssistantInfoType {
    id: string,
    name: string,
    files: string[],
    message: string,
    customize: string
}

interface File {
    id: string,
    name: string
}