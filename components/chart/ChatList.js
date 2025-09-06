import dynamic from 'next/dynamic'
const ChartArea1 = dynamic(() => import('./ChartArea1'), {
    ssr: false,
})

export default function ChatList({ sparkline, isUp }) {
    // If no sparkline data is provided, don't render anything
    if (!sparkline || !Array.isArray(sparkline) || sparkline.length === 0) {
        return null;
    }

    // Create chart options based on the price direction
    const chartOptions = {
        colors: [isUp ? "#58BD7D" : "#FF6B6B"], // Green for up, Red for down
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
            enabled: true,
            shared: false,
            followCursor: true,
            x: { show: false },
            y: {
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    return '$' + value.toFixed(2);
                },
                title: {
                    formatter: function (seriesName) {
                        return "Price: ";
                    },
                },
            },
            marker: { show: false },
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
            }
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

    const chartSeries = [
        {
            data: sparkline,
        },
    ];

    return (
        <ChartArea1 options={chartOptions} series={chartSeries} />
    );
}
