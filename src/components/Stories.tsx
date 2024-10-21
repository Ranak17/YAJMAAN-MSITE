import { useState } from 'react';
import '../styles/storiesStyle.css';

export default function Stories({ onStoryChange }) {
    const [selectedStory, setSelectedStory] = useState(1);

    const stories = [
        { id: 1, imageUrl: '/images/Y.png', filter: 'all', title: 'All Darshan' },
        { id: 2, imageUrl: './images/shiv-story.png', title: 'Shiv', filter: 'Shiva', },
        { id: 3, imageUrl: './images/hanuman-story.png', title: 'Hanuman', filter: 'Hanuman' },
        { id: 4, imageUrl: './images/ganesha-story.png', title: 'Ram', filter: 'Ram' },
        { id: 5, imageUrl: './images/krishna-story.png', title: 'Krishna', filter: 'Krishna' },
    ];

    const handleStoryClick = (story) => {
        setSelectedStory(story.id);
        // console.log("story.filter : ", story.filter);
        onStoryChange(story.filter); // Call the function to change the filter
    };

    return (
        <div className="stories-container">
            {stories.map((story) => (
                <div className='story-wrapper' key={story.id}>
                    <div
                        className={`story-circle ${selectedStory === story.id ? 'selected' : ''}`}
                        onClick={() => handleStoryClick(story)}
                    >
                        <img style={story.id === 1 ? {
                            height: '60%',
                            width: '60%',
                            borderRadius: '0',
                        } : {}} src={story.imageUrl} alt={story.filter} className="story-image" />
                    </div>
                    <div
                        className={`story-filter ${selectedStory === story.id ? 'filter-selected' : ''}`}
                    >
                        {story.title}
                    </div>
                </div>
            ))}
        </div>
    );
}
