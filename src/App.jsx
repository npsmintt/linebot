import './App.css';

const App = () => {
  const handleClick = async () => {
    const response = await fetch('/api/sendmessage', { method: 'POST' });
    const data = await response.json();
    alert(data.success ? 'Message sent!' : 'Failed to send');
  };

  return (
    <div className="App">
      <h2>Send LINE message</h2>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default App;