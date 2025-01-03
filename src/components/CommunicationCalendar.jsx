import React, { useState } from 'react';

const CommunicationCalendar = ({ communications }) => {
  const [date, setDate] = useState(new Date());

  // Custom calendar date generation
  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendar = [];
    let week = Array(7).fill(null);

    // Fill in empty days before first day of month
    for (let i = 0; i < startingDay; i++) {
      week[i] = null;
    }

    // Generate days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay();
      
      week[dayOfWeek] = {
        date: currentDate,
        day: day,
        hasCommunication: communications.some(
          comm => new Date(comm.date).toDateString() === currentDate.toDateString()
        )
      };

      // When week is full or it's the last day of month, add to calendar
      if (dayOfWeek === 6 || day === daysInMonth) {
        calendar.push(week);
        week = Array(7).fill(null);
      }
    }

    return calendar;
  };

  const currentCalendar = generateCalendar(date.getFullYear(), date.getMonth());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const filteredCommunications = communications.filter(
    (comm) => new Date(comm.date).toDateString() === date.toDateString()
  );

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Communications on {date.toLocaleDateString()}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => handleDateChange(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              {'<'}
            </button>
            <div className="font-semibold">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <button 
              onClick={() => handleDateChange(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              {'>'}
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {daysOfWeek.map(day => (
              <div key={day} className="font-bold text-gray-600 text-sm">{day}</div>
            ))}
            {currentCalendar.flat().map((dayObj, idx) => (
              <div 
                key={idx} 
                className={`
                  p-2 border rounded 
                  ${dayObj ? 
                    (dayObj.hasCommunication ? 'bg-blue-100' : 'hover:bg-gray-100') : 'bg-gray-50'}
                  ${dayObj && dayObj.date.toDateString() === date.toDateString() ? 'border-blue-500' : ''}
                `}
                onClick={() => dayObj && handleDateChange(dayObj.date)}
              >
                {dayObj ? dayObj.day : ''}
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          {filteredCommunications.length > 0 ? (
            <ul className="space-y-2">
              {filteredCommunications.map((comm, idx) => (
                <li 
                  key={idx} 
                  className="bg-gray-50 p-2 rounded-md shadow-sm"
                >
                  <span className="font-medium text-gray-700">
                    {idx + 1}. {comm.type.name} - {comm.company.name}
                  </span>
                  <p className="text-gray-500 text-sm">{comm.notes}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No communications on this date
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationCalendar;