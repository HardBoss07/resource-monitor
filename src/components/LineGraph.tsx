'use client'

import {LineGraphInterface} from "@/util/interfaces/LineGraphInterface";

export default function LineGraph({dataPoints, label, maxPoints = 100, upperRange = 100}: LineGraphInterface) {
    const data = dataPoints.slice(-maxPoints);

    const width = 300;
    const height = 100;
    const padding = 0;

    const points = data.length > 1
        ? data
            .map((value, i) => {
                const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                const y = height - padding - (value / upperRange) * (height - 2 * padding);
                return `${x},${y}`;
            })
            .join(' ')
        : data.length === 1
            ? `${width / 2},${height / 2}`
            : "";

    return (
        <div className="line-graph" style={{maxWidth: width, width: '100%'}}>
            {label && <h3 style={{marginBottom: 4}}>{label}</h3>}
            <svg
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                height={height}
                style={{display: "block"}}
            >
                <polyline
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    points={points}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
