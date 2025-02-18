export interface Project {
    id: string;
    name: string;
}

export interface Task {
    id: string;
    name: string;
    project: Project;
    createdAt: string;
} 