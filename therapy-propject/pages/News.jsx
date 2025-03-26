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
                // console.log(response.data) 
                setNews(response.data.sources)
            } catch (error) {
                console.error(`Something went wrong fetching the news: `, error)
            }
            setLoading(false)
        }
        fetchNewsDetails()
    }, [])

    return (
        // max-w-4l is the maximum width that the element can take up even if there is avaible space. The elemtn will only reach 896px and no more and no less
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-teal-600 text-center mb-6">News Page</h1>
            {loading && <p className="text-teal-600 italic text-center">Searching for news...</p>}
            {!loading && (
                <div className="grid gap-8">
                    {/* //add the slice in here to add the limit */}
                    {news.slice(0,5).map((n) => {
                        return ( 
                            <div key={n.id}
                            // shadow adds darkness around the border and shadow adds a small "shadow" at the bottom of the lower length
                            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                                {/* my light green isn't working */}
                                <p className="text-lg font-bold text-light-green">{n.name}</p>
                                <p className="text-gray-600">{n.description}</p>
                                <p className="text-gray-500 text-sm">{n.language}</p>
                                <a href={n.url} target="_blank" className="text-teal-600 hover:underline mt-3 inline-block">{n.url}</a>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default News;