'use client';

import { useRouter } from "next/navigation";
import posts from "@/data/posts.json"; // Подключаем данные с постами
import { useEffect, useState } from "react";

const PostDetail = ({ params }: { params: { id: string } }) => {
    const [postId, setPostId] = useState<number | null>(null);

    useEffect(() => {
        // Получаем id из params, который будет доступен для динамических маршрутов
        const id = params.id ? parseInt(params.id, 10) : null;
        setPostId(id);
    }, [params]);

    if (postId === null) {
        return <div>Загрузка...</div>; // Показываем индикатор загрузки до получения id
    }

    // Ищем пост по id
    const post = posts.find((post) => post.id === postId);

    if (!post) {
        return <div>Пост не найден</div>; // Если пост не найден, выводим сообщение
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
