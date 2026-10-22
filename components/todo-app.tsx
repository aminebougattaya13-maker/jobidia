"use client";

import { useEffect, useMemo, useState } from "react";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

type Filter = "all" | "active" | "completed";

const STORAGE_KEY = "jobidia-todos";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function TodoApp() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as TodoItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch (error) {
      console.error("Failed to parse saved todos", error);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const filteredItems = useMemo(() => {
    if (filter === "active") return items.filter((item) => !item.completed);
    if (filter === "completed") return items.filter((item) => item.completed);
    return items;
  }, [filter, items]);

  const remainingCount = items.filter((item) => !item.completed).length;

  function addTodo() {
    const trimmed = newTodo.trim();
    if (!trimmed) return;

    const nextItem: TodoItem = {
      id: generateId(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setItems((current) => [nextItem, ...current]);
    setNewTodo("");
  }

  function toggleTodo(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteTodo(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCompleted() {
    setItems((current) => current.filter((item) => !item.completed));
  }

  return (
    <div className="todo-shell">
      <div className="todo-card">
        <div className="todo-header">
          <div>
            <p className="todo-kicker">Productivity</p>
            <h1>To-do list</h1>
          </div>
          <div className="todo-counter">{remainingCount} left</div>
        </div>

        <div className="todo-input-row">
          <input
            aria-label="Add a new task"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addTodo();
              }
            }}
            placeholder="Add a task..."
          />
          <button className="primary-button" onClick={addTodo} type="button">
            Add
          </button>
        </div>

        <div className="todo-filters" role="tablist" aria-label="Todo filters">
          {(["all", "active", "completed"] as Filter[]).map((option) => (
            <button
              key={option}
              type="button"
              className={filter === option ? "filter-button active" : "filter-button"}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {!mounted ? (
            <p className="empty-state">Loading tasks...</p>
          ) : filteredItems.length === 0 ? (
            <p className="empty-state">No tasks here yet.</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className={item.completed ? "todo-item completed" : "todo-item"}>
                <label className="todo-check">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTodo(item.id)}
                  />
                  <span>{item.text}</span>
                </label>

                <button type="button" className="delete-button" onClick={() => deleteTodo(item.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="todo-footer">
          <span>{items.length} total tasks</span>
          <button type="button" className="secondary-button" onClick={clearCompleted} disabled={items.every((item) => !item.completed)}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}
