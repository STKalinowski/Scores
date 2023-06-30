import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenAI API key
      const prompt = 'testPrompt';

      try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 100
          })
        });

        const data = await response.json();
        const completion = data.choices[0].text;

        setResponse(completion);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Response: {response}</p>
    </div>
  );
}

export default MyComponent;

/*
{
  "model": "text-davinci-003",
  "prompt": "Say this is a test",
  "max_tokens": 7,
  "temperature": 0,
  "top_p": 1,
  "n": 1,
  "stream": false,
  "logprobs": null,
  "stop": "\n"
}
*/