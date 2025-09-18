export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface User {
    name: string;
    email: string;
}

export type Post = {
    id: number;
    title: string;
    body: string;
    slug: string;
    published: boolean;
    createdAt: string;
}

export type PostData = {
    data: Post[];
    links: {
        first: string;
        last: string;
        prev: string;
        next: string;
    }
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}