"use client";

import { useUIStore } from "@/app/store/ui-store";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

import Joyride from "react-joyride";
const Tour = () => {
  const stepIndex = useUIStore((state) => state.stepIndex);
  const router = useRouter();
  const setStepIndex = useUIStore((state) => state.setStepIndex);
  const setRun = useUIStore((state) => state.setRun);
  const run = useUIStore((state) => state.run);
  console.log("---", stepIndex);
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const [run, setRun] = useState(false);

  const steps = [
    {
      target: "body",
      content: "This is the dasboard!",
      placement: "center",
      data: {
        previous: null,
        next: null,
      },
    },
    {
      target: "#donut",
      content: "This is the graphic in dashboard!",
      placement: "top",
      data: {
        previous: "/dashboard",
        next: "/dashboard/customers",
      },
    },
    {
      target: "#customers",
      content: "This is the  customer table",
      placement: "center",
      data: {
        previous: "/dashboard",
        next: "/dashboard/customers",
      },
    },
  ];
  // useEffect(() => {
  //   setRun(true);
  // }, []);
  console.log("-run--", run);

  const handleJoyrideCallback = (data) => {
    const {
      action,
      index,
      step: {
        data: { next, previous },
      },
      type,
    } = data;
    const isPreviousAction = action === "prev";

    if (type === "step:after") {
      // if (next == null || previous == null) {
      //   console.log("---", next, previous, index);
      //   setStepIndex(index + (isPreviousAction ? -1 : 1));
      // }
      if (index < 2) {
        setRun(true);
        if (next || previous) {
          console.log("entro aca 1");
          router.replace(isPreviousAction && previous ? previous : next);
        }
        if (index === 0) {
          setStepIndex(index + (isPreviousAction ? -1 : 1));
        }
        if (index === 1 && isPreviousAction) {
          setStepIndex(index + (isPreviousAction ? -1 : 1));
        }
      }

      if (index === 2) {
        if (isPreviousAction && previous) {
          console.log("entro aca 2");
          // if (previous !== "/dashboard") {
          //   setRun(false);
          // }
          if (next || previous) {
            router.replace(previous);
          }
          if (index === 1) {
            setStepIndex(index - 1);
          }
        } else {
          setRun(false);
          setStepIndex(0);
        }
      }
    }
    // if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
    //   // Update state to advance the tour
    //   setTimeout(() => {
    //     setstepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    //   }, 1500);
    // } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
    //   // Need to set our running state to false, so we can restart if we click start again.
    //   setRun(false);
    //   setstepIndex(0);
    // }
  };
  // useEffect(() => {
  //   // Prefetch the dashboard page
  //   router.prefetch("/dashboard/customers");
  // }, [router]);
  return (
    run && (
      <Joyride
        steps={steps}
        stepIndex={stepIndex}
        run={run}
        showProgress
        showSkipButton
        continuous
        callback={handleJoyrideCallback}
        locale={{
          back: "Anterior",
          close: "Cerrar",
          last: "Finalizar",
          next: "Siguiente", // Traducción del botón "Next"
          skip: "Saltar",
        }}
        // callback={(data) => {
        //   if (data.action === "close") {
        //     const params = new URLSearchParams(searchParams);
        //     params.set("run", "false");
        //     params.set("page", pathname);
        //     params.delete("step");
        //   }
        // }}
      />
    )
  );
};
export default Tour;
