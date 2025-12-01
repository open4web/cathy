import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 这里的 base 必须是 /仓库名/
export default defineConfig({
    plugins: [react()],
    base: "/cathy/"
});