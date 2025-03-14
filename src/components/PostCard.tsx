// src/components/PostCard.tsx
import React from "react";
import { Card, Text, Image } from "@mantine/core";

interface Post {
    id: number;  // Добавьте id, чтобы использовать его в навигации
    title: string;
    url: string;
    image: string;
    price?: string;
    stores?: { name: string; link: string }[];
    ingredients?: string;
    images?: string[];
}

interface PostCardProps {
    post: Post;
    onClick: () => void;  // Используйте onClick для обработки клика
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
    return (
        <Card
            shadow={'sm'}
            padding={'md'}
            onClick={onClick}
            style={{ cursor: "pointer"}}
            withBorder
        >
            <Card.Section>
                <Image src={post.image} alt={post.title} />
            </Card.Section>
            <Text
                weight={500}
                size="lg"
                style={{ marginTop: 10, lineHeight: "1.2" }}
                color="dark"
            >
                {post.title}
            </Text>
        </Card>
    );
};

export default PostCard;
