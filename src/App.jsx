import { useState } from 'react';
import ChatPage from './pages/ChatPage';
import ToolsPage from './pages/ToolsPage';
import LibraryPage from './pages/LibraryPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
    const [tab, setTab] = useState("chat");

    const renderPage = () => {
        switch (tab) {
            case "chat": return <ChatPage />;
            case "tools": return <ToolsPage />;
            case "library": return <LibraryPage />;
            case "settings": return <SettingsPage />;
            default: return <ChatPage />;
        }
    };

    return (
        <div className="app-container">
            <div className="app-content">{renderPage()}</div>

            <div className="tab-bar">
                <button onClick={() => setTab("chat")} className={tab === "chat" ? "active" : ""}>💬 Chat</button>
                <button onClick={() => setTab("tools")} className={tab === "tools" ? "active" : ""}>🧰 Tools</button>
                <button onClick={() => setTab("library")} className={tab === "library" ? "active" : ""}>📚 Library
                </button>
                <button onClick={() => setTab("settings")} className={tab === "settings" ? "active" : ""}>⚙️ Settings
                </button>
            </div>
        </div>
    );
}