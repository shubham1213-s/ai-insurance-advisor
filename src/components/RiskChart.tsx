import React from 'react';

interface RiskChartProps {
  responses: Record<string, any>;
}

const RiskChart: React.FC<RiskChartProps> = ({ responses }) => {
  const factors = [
    { name: 'Age', value: 70 },
    { name: 'Lifestyle', value: 40 },
    { name: 'Smoking', value: 20 },
    { name: 'Medical', value: 60 },
    { name: 'Occupation', value: 30 }
  ];

  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  const getPoint = (angle: number, value: number) => {
    const radian = (angle * Math.PI) / 180;
    const adjustedRadius = (radius * value) / 100;
    return {
      x: centerX + adjustedRadius * Math.cos(radian),
      y: centerY + adjustedRadius * Math.sin(radian)
    };
  };

  const pathData = factors.map((factor, index) => {
    const angle = (index * 360) / factors.length - 90;
    const point = getPoint(angle, factor.value);
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  return (
    <div className="bg-white p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factor Analysis</h3>
      <div className="flex justify-center">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map((percentage, index) => (
            <circle
              key={index}
              cx={centerX}
              cy={centerY}
              r={(radius * percentage) / 100}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {factors.map((_, index) => {
            const angle = (index * 360) / factors.length - 90;
            const endPoint = getPoint(angle, 100);
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Data area */}
          <path
            d={pathData}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {factors.map((factor, index) => {
            const angle = (index * 360) / factors.length - 90;
            const point = getPoint(angle, factor.value);
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3b82f6"
              />
            );
          })}
          
          {/* Labels */}
          {factors.map((factor, index) => {
            const angle = (index * 360) / factors.length - 90;
            const labelPoint = getPoint(angle, 120);
            return (
              <text
                key={index}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-gray-600"
              >
                {factor.name}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RiskChart;