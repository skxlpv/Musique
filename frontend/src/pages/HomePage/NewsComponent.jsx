import React, { useEffect, useState } from 'react';
import "./styles/NewsComponent.css"

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const domain = 'billboard.com';
  const url = `https://newsapi.org/v2/everything?domains=${domain}&apiKey=${apiKey}`

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const filteredNews = data.articles.filter(
            (article) => article.title !== '[Removed]'
          );
          setNews(filteredNews);
        } else {
            console.log(url)
            console.error('Error fetching news:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [url, apiKey]);

  return (
    <>
    <div className='news-info'>
        <h2 className='news-title'>MUSIC NEWS</h2>
        <h5 className='news-description'>LATEST FROM BILLBOARD.COM</h5>
    </div>
    <div className='news-container'>
        {news.length > 0 ? (
            <div className='news-text-div'>
                {news.map((article, index) => (
                    <div className='news-content' key={index}>
                        <div>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.title}
                            </a>
                            <p>
                                <i>{article.description}</i>
                            </p>
                        </div>
                        <div>
                            <img src={article.urlToImage} alt={article.title} />
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    </>
  );
};

export default NewsComponent;
