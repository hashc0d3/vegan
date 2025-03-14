'use client';

import { useState, useEffect } from 'react';
import PostCard from "@/components/PostCard";
import posts from "@/data/posts.json";
import './globals.css';
import { useRouter } from "next/navigation";

const Home = () => {
    const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, 9));
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Состояние для поискового запроса
    const [filteredPosts, setFilteredPosts] = useState(posts); // Состояние для отфильтрованных постов
    const router = useRouter(); // Для навигации на страницу с подробным описанием

    // Фильтрация постов на основе поискового запроса
    useEffect(() => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтрация по заголовку
        );
        setFilteredPosts(filtered);
        setVisiblePosts(filtered.slice(0, 9)); // Сбрасываем видимые посты
    }, [searchQuery]);

    const loadMorePosts = () => {
        if (loading || visiblePosts.length >= filteredPosts.length) return;

        setLoading(true);
        setTimeout(() => {
            setVisiblePosts((prevPosts) => [
                ...prevPosts,
                ...filteredPosts.slice(prevPosts.length, prevPosts.length + 9),
            ]);
            setLoading(false);
        }, 1000);
    };

    const handleCardClick = (id: number) => {
        router.push(`/post/${id}`); // Навигация на страницу с подробным описанием
    };

    useEffect(() => {
        const onScroll = (e: any) => {
            if (e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight) {
                loadMorePosts();
            }
        };

        const postContainer = document.getElementById('post-container');
        postContainer?.addEventListener('scroll', onScroll);

        return () => {
            postContainer?.removeEventListener('scroll', onScroll);
        };
    }, [visiblePosts, loading, filteredPosts]);

    return (
        <div id="post-container" style={{ overflowY: 'auto', height: '100vh' }}>
            {/* Поисковая форма */}
            <div className="search-container" style={{ margin: '20px' }}>
                <input
                    type="text"
                    placeholder="Поиск по заголовкам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Обновляем запрос
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>

            <div className="post-cards">
                {visiblePosts.map((post) => (
                    <PostCard key={post.id} post={post} onClick={() => handleCardClick(post.id)} />
                ))}
            </div>

            {loading && <div>Загрузка...</div>}
        </div>
    );
};

export default Home;
