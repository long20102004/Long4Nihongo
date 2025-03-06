import { formatDistanceToNow } from "@/lib/utils"

export default function RecentActivity({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-muted-foreground">{formatDistanceToNow(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function getActivityColor(type) {
  switch (type) {
    case "enrollment":
      return "bg-blue-100 text-blue-700"
    case "completion":
      return "bg-green-100 text-green-700"
    case "content":
      return "bg-purple-100 text-purple-700"
    case "rating":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

function getActivityIcon(type) {
  switch (type) {
    case "enrollment":
      return "👤"
    case "completion":
      return "🎓"
    case "content":
      return "📝"
    case "rating":
      return "⭐"
    default:
      return "📌"
  }
}

