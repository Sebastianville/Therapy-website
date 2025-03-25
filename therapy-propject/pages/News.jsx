import axios from "axios";
import { useState, useEffect } from "react";

function News () {

    const [news, setNews] = useState([])
    const [loading, setLoading] =useState(true)
    axios.defaults.baseURL = 'https://newsapi.org/v2/top-headlines/';

    useEffect(() => {
        const fetchNewsDetails = async() => {
            try {
                //this page limit isn't working 
                const response = await axios.get(`sources?apiKey=${import.meta.env.VITE_NEWS_API_KEY}&pageSize=5`)
                setNews(response.data.sources)
                console.log(response.data) 
            } catch (error) {
                console.error(`Something went wrong fetching the news: `, error)
            }
            setLoading(false)
        }
        fetchNewsDetails()

    }, [])

    return (
        <div>
            <h1>News Page</h1>
            {loading && <p>Searching for news...</p>}
            {!loading && (
                <div>
                    {/* //add the slice in here to add the limit */}
                    {news.slice(0,5).map((n) => {
                        return ( 
                            <div key={n.id}>
                                <p>{n.name}</p>
                                <p>{n.description}</p>
                                <p>{n.language}</p>
                                <a href={n.url} target="_blank">{n.url}</a>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default News;