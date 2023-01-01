import Editor from './components/Editor';
import ThemeProvider from './providers/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <Editor />
    </ThemeProvider>
  );
};

export default App;
