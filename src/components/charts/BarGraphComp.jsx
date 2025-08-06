import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

const chartData = [
  { month: "January", approved: 186, rejected: 80 },
  { month: "February", approved: 305, rejected: 200 },
  { month: "March", approved: 237, rejected: 120 },
  { month: "April", approved: 73, rejected: 190 },
  { month: "May", approved: 209, rejected: 130 },
  { month: "June", approved: 214, rejected: 140 },
]

const chartConfig = {
  approved: {
    label: "Approved",
    color: "#2a9d8f",
  },
  rejected: {
    label: "Rejected",
    color: "#e76e50",
  },
}

export function BarGraphComp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='mt-3'>Number of Approved and Rejected Deal</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="approved" fill="var(--color-approved)" radius={4} />
        <Bar dataKey="rejected" fill="var(--color-rejected)" radius={4} />
      </BarChart>
    </ChartContainer>
    </Card>
  )
}
