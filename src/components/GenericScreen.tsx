import '../styles/genericScreen.css';  // Import CSS for styling
import rangoliBackground from '../../public/images/rangoli-background.png';  // Assuming the image is stored in the same location

const GenericScreen = ({ content }) => {
    return (
        <div
            className="background-image"
            style={{ backgroundImage: `url(${rangoliBackground})`, backgroundColor: '#160c00' }}
        >
            <div className="scroll-container">
                {content.map((item, index) => (
                    <div className="section" key={index}>
                        <h2 className="heading-text" >{item.headingText}</h2>
                        <p className="paragraph-text">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenericScreen;
