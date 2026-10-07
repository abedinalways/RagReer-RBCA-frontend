"use client";

import { useEffect, useState } from "react";
import { X, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { TaskAssignmentItem } from "./types";
import { AVAILABLE_TASKS, CREW_MEMBERS, INITIAL_TASKS } from "./mockTravelData";

interface AssignTasksFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tasks: TaskAssignmentItem[]) => void;
}

export function AssignTasksFormModal({
  isOpen,
  onClose,
  onSubmit,
}: AssignTasksFormModalProps) {
  const [tasks, setTasks] = useState<TaskAssignmentItem[]>(INITIAL_TASKS);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddTask = () => {
    const nextIndex = tasks.length + 1;
    const availableTask =
      AVAILABLE_TASKS[nextIndex % AVAILABLE_TASKS.length] || "Yard cleanup and debris removal";
    const availableMember =
      CREW_MEMBERS[nextIndex % CREW_MEMBERS.length] || "David Edison";

    setTasks((prev) => [
      ...prev,
      {
        id: `task-${Date.now()}`,
        taskTitle: availableTask,
        assignedMember: availableMember,
      },
    ]);
  };

  const handleRemoveTask = (taskId: string) => {
    if (tasks.length <= 1) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleTaskChange = (taskId: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, taskTitle: newTitle } : t))
    );
  };

  const handleMemberChange = (taskId: string, newMember: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, assignedMember: newMember } : t))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tasks);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-tasks-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-card-bg rounded-lg p-5 max-w-sm w-full shadow-2xl border border-border my-8 transform transition-all animate-in zoom-in-95 duration-200">
        {/* Modal Header: Title + Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2
            id="assign-tasks-modal-title"
            className="font-barlow text-xl font-bold tracking-tight text-primary-heading"
          >
            Assign Tasks
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-secondary-subheading hover:text-primary-heading rounded-md transition-colors cursor-pointer active:scale-95"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Task Assignment Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {tasks.map((taskItem, index) => {
              const taskNumber = index + 1;

              return (
                <div
                  key={taskItem.id}
                  className="space-y-2 pb-3 border-b border-border last:border-b-0"
                >
                  {/* Task Header: Label + Add/Delete Icons */}
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`task-select-${taskItem.id}`}
                      className="text-xs font-semibold text-primary-heading"
                    >
                      Select Task{taskNumber}
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleAddTask}
                        className="p-1 rounded text-primary hover:text-primary-hover hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Add another task"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                      {tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(taskItem.id)}
                          className="p-1 rounded text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove this task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Task Selection Dropdown */}
                  <div className="relative">
                    <select
                      id={`task-select-${taskItem.id}`}
                      value={taskItem.taskTitle}
                      onChange={(e) =>
                        handleTaskChange(taskItem.id, e.target.value)
                      }
                      className="w-full appearance-none rounded-md border border-border-input bg-card-bg px-3 py-2.5 pr-8 text-xs font-medium text-secondary-subheading focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-2xs"
                    >
                      {AVAILABLE_TASKS.map((taskOption) => (
                        <option key={taskOption} value={taskOption}>
                          {taskOption}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-subheading/60" />
                  </div>

                  {/* Crew Member Label (using original design wording) */}
                  <label
                    htmlFor={`member-select-${taskItem.id}`}
                    className="block text-xs font-semibold text-primary-heading pt-1"
                  >
                    Assigned Crew Memebr
                  </label>

                  {/* Member Selection Dropdown */}
                  <div className="relative">
                    <select
                      id={`member-select-${taskItem.id}`}
                      value={taskItem.assignedMember}
                      onChange={(e) =>
                        handleMemberChange(taskItem.id, e.target.value)
                      }
                      className="w-full appearance-none rounded-md border border-border-input bg-card-bg px-3 py-2.5 pr-8 text-xs font-medium text-secondary-subheading focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-2xs"
                    >
                      {CREW_MEMBERS.map((member) => (
                        <option key={member} value={member}>
                          {member}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-subheading/60" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button matching Image 5 */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <span>Submit Now</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
