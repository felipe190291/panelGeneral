"use client";
import { ParentSize } from "@visx/responsive";
import Donut from "@/app/ui/dashboard/donut";
import { useUIStore } from "@/app/store/ui-store";
export default function DonutPreload({
  paid,
  pending,
  cancel,
  onRoute,
}: {
  paid: any;
  pending: any;
  cancel: any;
  onRoute: any;
}) {
  return (
    <ParentSize key={"donutGraphic"} id="donut">
      {({ width, height }) => (
        <Donut
          width={width}
          height={height}
          paid={paid}
          pending={pending}
          cancel={cancel}
          onRoute={onRoute}
        />
      )}
    </ParentSize>
  );
}
