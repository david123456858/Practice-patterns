import AppRouter from "./router/appRouter";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <Toaster
                richColors
                closeButton
                position="top-center"
            />
            <AppRouter />
        </>
    );
}

export default App;
