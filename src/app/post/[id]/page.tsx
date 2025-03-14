'use client';

import { useParams } from 'next/navigation'; // Импортируем useParams для получения параметров маршрута
import posts from "@/data/posts.json"; // Подключаем данные с постами
import { useEffect, useState } from "react";

// Определяем тип поста
interface Post {
    id: number;
    title: string;
    url: string;
    image: string;
    price?: string;
    stores?: { name: string; link: string }[];
    ingredients?: string;
    images?: string[];
}

const PostDetail = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();  // Получаем параметр id через useParams

    useEffect(() => {
        if (id) {
            const postId = typeof id === 'string' ? parseInt(id, 10) : parseInt(id[0], 10);  // Проверяем и обрабатываем id
            const foundPost = posts.find((post) => post.id === postId);
            setPost(foundPost || null);
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>;  // Показываем индикатор загрузки, пока данные не загружены
    }

    if (!post) {
        return <div>Пост не найден</div>;  // Если пост не найден
    }

    return (
        <div className="post-detail">
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} className="post-image" />
            <div>
                <strong>Цена:</strong> {post.price || 'Не указано'}
            </div>
            <div>
                <strong>Ингредиенты:</strong> {post.ingredients || 'Не указано'}
            </div>
            <div>
                <strong>Магазины:</strong>
                {post.stores ? (
                    <ul>
                        {post.stores.map((store, index) => (
                            <li key={index}><a href={store.link}>{store.name}</a></li>
                        ))}
                    </ul>
                ) : (
                    'Не указано'
                )}
            </div>
            <div>
                <strong>Дополнительные изображения:</strong>
                {post.images && post.images.length > 0 ? (
                    <div>
                        {post.images.map((image, index) => (
                            <img key={index} src={image} alt={`Additional ${index}`} />
                        ))}
                    </div>
                ) : (
                    'Нет дополнительных изображений'
                )}
            </div>
        </div>
    );
};

export default PostDetail;
