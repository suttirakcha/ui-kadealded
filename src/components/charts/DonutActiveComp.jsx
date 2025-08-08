import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"

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
import useCategoryStore from "@/stores/useCategoryStore"
import { useEffect } from "react"

export const description = "A donut chart with an active sector"

const chartData = [
  { browser: "Category 1", visitors: 275, fill: "var(--color-category1)" },
  { browser: "Category 2", visitors: 200, fill: "var(--color-category2)" },
  { browser: "Category 3", visitors: 187, fill: "var(--color-category3)" },
  { browser: "Category 4", visitors: 173, fill: "var(--color-category4)" },
  { browser: "Category 5", visitors: 90, fill: "var(--color-category5)" },
]

const chartConfig = {
  dealsNum: {
    label: "Deals",
  },
  category1: {
    label: "category1",
    color: "var(--chart-1)",
  },
  category2: {
    label: "category2",
    color: "var(--chart-2)",
  },
  category3: {
    label: "category3",
    color: "var(--chart-3)",
  },
  category4: {
    label: "category4",
    color: "var(--chart-4)",
  },
  category5: {
    label: "category5",
    color: "var(--chart-5)",
  },
}

export function DonutActiveComp() {
  const { categories, fetchAllCategories } = useCategoryStore();

  useEffect(() => {
    const run = async () => {
      await fetchAllCategories();
    }

    run();
  }, [])

  return (
    <Card className="flex flex-col p-4">
      <CardHeader className="items-center px-0">
        {/* <CardDescription></CardDescription> */}
        <CardTitle>Number of Deals by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
