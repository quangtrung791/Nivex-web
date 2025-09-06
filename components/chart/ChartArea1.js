'use client'
import Chart from 'react-apexcharts'

export default function ChartArea1({ options, series }) {
    // Default options if none provided
    const defaultOptions = {
        colors: ["#58BD7D"],
        chart: {
            type: "area",
            width: 100,
            height: 40,
            sparkline: { enabled: true },
        },
        plotOptions: { bar: { columnWidth: "50%" } },
        xaxis: { crosshairs: { width: 1 } },
        stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            colors: undefined,
            width: 2,
            dashArray: 0,
        },
        tooltip: {
            fixed: { enabled: false },
            x: { show: false },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    },
                },
            },
            marker: { show: false },
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                    value: 0,
                },
            },
        },
    };

    // Default series if none provided
    const defaultSeries = [
        {
            data: [
                25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80,
            ],
        },
    ];

    // Use provided options/series or defaults
    const chartOptions = options || defaultOptions;
    const chartSeries = series || defaultSeries;

    return (
        <>
            <Chart 
                options={chartOptions} 
                series={chartSeries} 
                type="area" 
                height={40} 
                width={100} 
            />
        </>
    );
}
