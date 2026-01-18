import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { BlogPost } from './types';

const API_URL = 'http://localhost:3001/blogs';

export const useBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: async (): Promise<BlogPost[]> => {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });
};

export const useBlog = (id: string) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: async (): Promise<BlogPost> => {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!id,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newBlog: Omit<BlogPost, 'id'>) => {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newBlog,
                    id: crypto.randomUUID(), // Generate ID on client side for json-server
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create blog');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};
