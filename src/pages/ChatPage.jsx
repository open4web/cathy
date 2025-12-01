import { useState } from "react";
import axios from "axios";

export default function ChatTab() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input) return;

        // 添加用户消息
        setMessages([...messages, { sender: "user", text: input }]);
        const userMessage = input;
        setInput("");

        try {
            // 调用 Hugging Face 免费模型接口
            const response = await axios.post(
                "https://api-inference.huggingface.co/models/google/flan-t5-small",
                { inputs: userMessage },
                {
                    headers: { Authorization: `Bearer ` },
                }
            );

            // 模型回复
            const reply = response.data[0]?.generated_text || "AI 没有回答";
            setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { sender: "ai", text: "AI 请求失败" }]);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ margin: "5px 0" }}>
                        <b>{msg.sender === "user" ? "你" : "AI"}:</b> {msg.text}
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", padding: 10 }}>
                <input
                    style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="输入你的问题..."
                />
                <button
                    style={{ marginLeft: 6, padding: "8px 12px", borderRadius: 6 }}
                    onClick={handleSend}
                >
                    发送
                </button>
            </div>
        </div>
    );
}