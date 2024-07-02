'use client';
import { ParentSize } from "@visx/responsive";
import Donut from "@/app/ui/dashboard/donut";
export default function DonutPreload() {
  return <ParentSize key={"donutGraphic"}>
  {({ width, height }) => <Donut width={width} height={height} />}
</ParentSize>
}