import { useState } from "react";

export default function App() {
    const [apiKey, setApiKey] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (!apiKey || !question) {
            alert("请输入 API Key 和问题");
            return;
        }

        setLoading(true);
        setAnswer("");

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: question }]
                })
            });

            const data = await response.json();
            setAnswer(data.choices[0].message.content);
        } catch (e) {
            setAnswer("请求失败：" + e.message);
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "Arial" }}>
            <h2>AI 小助手</h2>

            <div>
                <label>API Key:</label>
                <input
                    type="password"
                    style={{ width: "100%" }}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
            </div>

            <div style={{ marginTop: 20 }}>
                <label>输入你的问题:</label>
                <textarea
                    style={{ width: "100%", height: 120 }}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
            </div>

            <button
                style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
                onClick={askAI}
            >
                {loading ? "思考中..." : "提问"}
            </button>

            {answer && (
                <div style={{ marginTop: 20, whiteSpace: "pre-line" }}>
                    <h3>回答：</h3>
                    <div>{answer}</div>
                </div>
            )}
        </div>
    );
}