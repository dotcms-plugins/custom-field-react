import React, { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function App() {
    const [data, setData] = useState('');

    useEffect(() => {
        setData(window.frameElement?.dataset?.value || '');
    }, []);

    function updateMarkdown(value) {
        const customEvent = new CustomEvent('custom-field-react-app', {
            detail: value,
            bubbles: true,
            cancelable: true,
        });
        const elem = document.querySelector('.App');
        elem.dispatchEvent(customEvent);
    }

    return (
        <div className="App">
            <SimpleMDE onChange={updateMarkdown} value={data} />
        </div>
    );
}

export default App;
