import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useDealStore from "@/stores/useDealStore"
import { useEffect } from "react"

export const description = "A linear line chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function LineChartComp({ data }) {
  const { deals, getAllDeals } = useDealStore();
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  useEffect(() => {
    const run = async () => {
      await getAllDeals();
    }

    run();
  }, []);

  const chartData = [
    { month: "January", total_deals: 186 },
    { month: "February", total_deals: 305 },
    { month: "March", total_deals: 237 },
    { month: "April", total_deals: 73 },
    { month: "May", total_deals: 209 },
    { month: "June", total_deals: 214 },
  ]

  // console.log(deals);

  const dealsOnEachMonth = deals.filter(deal => new Date(deal.created_at).getMonth() === 6)
  const totalDeals = deals.map(deal => ({ month: new Date(deal.created_at).getMonth(), total_deals: dealsOnEachMonth.length }))
 
  console.log(totalDeals);
  // console.log(deals.filter(deal => new Date(deal.created_at).getMonth() === 6));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>{previousYear} - {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
