/* global SillyTavern */
import React, { useEffect } from 'react';


// Define the asynchronous import function
async function importFromScript(what) {
    const module = await import(/* webpackIgnore: true */ '../../../script.js');
    return module[what];
}

// Import the required items from script.js
const eventSource = await importFromScript('eventSource');
const event_types = await importFromScript('event_types');

//import { eventSource, event_types } from "../../../script.js";

eventSource.on(event_types.MESSAGE_SENT, handleOutGoingMessage);

function handleOutGoingMessage(data) {
    // Handle message
    toastr.info(
        `You have sent the message: `,
        message
      );
}


function App() {



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