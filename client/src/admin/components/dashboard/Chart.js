import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";

const Chart = ({ scansPerDay }) => {

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const arrCopy = [...(scansPerDay ?? [])].reverse();
    const data = arrCopy?.map(({ date, numberOfScans }) => {
        if (!weekdays[new Date(date).getDay()-1]) console.log(new Date(date).getDay())
        return {
            numberOfScans,
            day: weekdays[new Date(date).getDay()-1] ?? 'Sunday'
        }
    });

    return (
        <>
            <Typography>Last Seven Days</Typography>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="day"
                    />
                    <YAxis
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                            }}
                        >
                            Product scans
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="numberOfScans"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default Chart;