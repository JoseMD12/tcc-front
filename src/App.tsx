import { AppProvider } from "./context/AppContext";
import AppRoutes from "./routes/Routes";

function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    );
}

export default App;
