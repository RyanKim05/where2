import type { Trip } from '@/types/trip';

interface TripCardProps {
  trip: Trip;
  onEdit?: (trip: Trip) => void;
  onDelete?: (tripId: string) => void;
}

export default function TripCard({ trip, onEdit, onDelete }: TripCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{trip.name}</h3>
        {trip.budget_level && (
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {trip.budget_level}
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4">{trip.destination}</p>
      
      {trip.region && (
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-medium">Region:</span> {trip.region}
        </p>
      )}
      
      {trip.ideal_durations && trip.ideal_durations.length > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium">Duration:</span> {trip.ideal_durations.join(', ')}
        </p>
      )}

      {/* Interest Levels */}
      {(trip.culture !== undefined || trip.adventure !== undefined || trip.nature !== undefined) && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Interests:</p>
          <div className="flex flex-wrap gap-2">
            {trip.culture !== undefined && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Culture: {trip.culture}
              </span>
            )}
            {trip.adventure !== undefined && (
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                Adventure: {trip.adventure}
              </span>
            )}
            {trip.nature !== undefined && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Nature: {trip.nature}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-4 border-t">
          {onEdit && (
            <button
              onClick={() => onEdit(trip)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(trip.id)}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}