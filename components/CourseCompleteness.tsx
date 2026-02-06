import { Lightbulb, Check } from "lucide-react";

interface CourseCompletenessProps {
  courseTitle: string;
  moduleCount: number;
  videoCount: number;
  hasResources: boolean;
  hasPreview: boolean;
}

export default function CourseCompleteness({
  courseTitle,
  moduleCount,
  videoCount,
  hasResources,
  hasPreview,
}: CourseCompletenessProps) {
  const tasks = [
    {
      label: "Name your course",
      completed: !!courseTitle,
      note: "Completed in step 1.",
    },
    {
      label: "Add at least 2 modules",
      completed: moduleCount >= 2,
      note: `You have ${moduleCount} modules now.`,
    },
    {
      label: "Upload 5+ video lessons",
      completed: videoCount >= 5,
      note: `Currently ${videoCount}/5 videos.`,
    },
    {
      label: "Add course resources",
      completed: hasResources,
      note: "Attach PDFs or links.",
    },
    {
      label: "Set a free preview",
      completed: hasPreview,
      note: "Help students sample content.",
    },
  ];

  const completedCount = tasks.filter((t) => t.completed).length;
  const percentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Course Completeness
      </h3>

      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${(percentage / 100) * 351.86} 351.86`}
              className="text-[#030256]"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-start">
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
                task.completed
                  ? "bg-[#030256] border-[#030256]"
                  : "border-gray-300"
              }`}
            >
              {task.completed && (
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              )}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm ${
                  task.completed ? "text-gray-700" : "text-gray-500"
                }`}
              >
                {task.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{task.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tip */}
      <div className="mt-6 bg-[#e8e8f5] border border-[#0a0a7d]/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg bg-[#030256]/10 text-[#030256]">
            <Lightbulb className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#030256] mb-1">
              Quick Tip
            </p>
            <p className="text-xs text-[#030256]/90">
              Courses with a Free Preview lesson have a 25% higher conversion
              rate. Try enabling it for your first introductory video!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
