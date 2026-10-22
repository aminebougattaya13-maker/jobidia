import { TodoApp } from "@/components/todo-app";

export default function TodoPage() {
  return (
    <main className="todo-page-shell">
      <div className="page-topbar">
        <a href="/" className="back-link">
          ← Back to home
        </a>
      </div>
      <TodoApp />
    </main>
  );
}
