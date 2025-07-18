'use client'

import {LineGraphInterface} from "@/util/interfaces/LineGraphInterface";

export default function LineGraph({dataPoints, label, maxPoints = 100, upperRange = 100}: LineGraphInterface) {
    const data = dataPoints.slice(-maxPoints); // Keep only the last N points

    const width = 300;
    const height = 100;

    const points = data.map((value, i) => {
        const x = (i / (data.length - 1 || 1)) * width;
        const y = height - (value / upperRange) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full max-w-md">
            <h3>{label}</h3>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24">
                <polyline
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    points={points}
                />
            </svg>
        </div>
    );
}
