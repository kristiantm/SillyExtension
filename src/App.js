// Define the asynchronous import function
async function importFromScript(what) {
    const module = await import(/* webpackIgnore: true */ '../../script.js'); // Adjust path as needed
    return module[what];
}

// Main function to handle the event and trigger character response
(async function setupMessageListener() {
    // Import required modules dynamically
    const eventSource = await importFromScript('eventSource');
    const event_types = await importFromScript('event_types');
    const sendMessageAsUser = await importFromScript('sendMessageAsUser');


    // Attach the event listener for user messages
    eventSource.on(event_types.MESSAGE_RECEIVED, handleIncomingMessage);
    
    // Simulate sending a user command
    function sendUserCommand(command) {
        console.log('Simulating user command: ${command}');


        const textArea = document.getElementById('send_textarea');
        if (!textArea || !(textArea instanceof HTMLTextAreaElement)) {
            console.log('Cannot find textArea');
            return;
        }
        const characterName = "Debate moderator";
        textArea.value = `/trigger name="${characterName}"`;
        textArea.focus();
    

        /*
        // Emit the event to send the command
        eventSource.emit(event_types.MESSAGE_RECEIVED, {
            message: command, // Command to send
            sender: "user",   // Simulate the user as the sender
        });
        */
    }

    // Handler function for when a user sends a message
    function handleIncomingMessage(data) {
        console.log("User sent a message:", data);

        // Check for a specific keyword or condition in the user's message
        const userMessage = data.message;
        console.log('Triggering a response.');
        // Send a /trigger command
        sendMessageAsUser('/trigger await=false "Debate moderator"', "");
        //triggerCharacterResponse("Debate moderator");
        
    }

    // Function to trigger a character to generate a response
    /*function triggerCharacterResponse(characterName) {
        console.log(`Triggering ${characterName} to generate a response.`);

        // Assuming the system has an event for prompting a character's response
        const characterGenerateResponseEvent = event_types.CHARACTER_GENERATE_RESPONSE; // Adjust if needed
        eventSource.emit(characterGenerateResponseEvent, {
            character: characterName,
        });
    }*/

    
})();

function App() {



    // Example button click event for testing purposes
    function handleClick() {
        alert(`Hello, ${SillyTavern.getContext().characters}!`);
    }

    return (
        <div onClick={() => handleClick()} className="menu_button">
            Click me
        </div>
    );
}

export default App;