/* global SillyTavern */
import React, { useEffect } from 'react';

function App() {
    useEffect(() => {
        // Event listener for user input submission
        const handleUserSubmit = (message) => {
            console.log('User submitted message:', message);

            // Trigger the specific character
            triggerCharacter('Debate moderator', message);
        };

        // Register the listener when the component mounts
        SillyTavern.events.on('input:submit', handleUserSubmit);

        // Cleanup the listener when the component unmounts
        return () => {
            SillyTavern.events.off('input:submit', handleUserSubmit);
        };
    }, []);

    // Function to trigger a character with the given message
    function triggerCharacter(characterID, userMessage) {
        SillyTavern.events.emit('character:trigger', {
            id: characterID,
            message: userMessage,
        });
        console.log(`Triggered character ${characterID} with message:`, userMessage);
    }

    // Example button click event for testing purposes
    function handleClick() {
        alert(`Hello, ${SillyTavern.getContext().name1}!`);
    }

    return (
        <div onClick={() => handleClick()} className="menu_button">
            Click me
        </div>
    );
}

export default App;