import { useRef, useImperativeHandle, forwardRef } from 'react';
import flowerImage from '../assets/images/flower-for-animation.png'; // Import the flower image
import '../styles/flowerDropAnimation.css'; // Import CSS styles for animation

const NUM_FLOWERS = 85; // Number of flowers

const FlowerDropAnimation = forwardRef(({ visible }, ref) => {
    const flowers = Array.from({ length: NUM_FLOWERS }, () => ({
        id: Math.random(), // Unique ID for each flower
    }));

    const startFlowerDrop = () => {
        // Trigger any additional logic if needed
    };

    useImperativeHandle(ref, () => ({
        startFlowerDrop,
    }));

    return visible ? (
        <div className="flower-container">
            {flowers.map((flower) => (
                <img
                    key={flower.id}
                    src={flowerImage} // Use the imported image
                    className="flower"
                    alt="flower"
                    style={{
                        left: `${Math.random() * 100}vw`, // Random horizontal start position
                        animationDelay: `${Math.random() * 5}s`, // Randomize delay for each flower
                    }}
                />
            ))}
        </div>
    ) : null;
});

export default FlowerDropAnimation;
