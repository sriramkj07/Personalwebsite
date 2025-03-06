'use client'

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalendarWidget() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("floatingButton", {
        calLink: "sriramkj/15min",
        config: { layout: "month_view" }
      });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return null; // This component doesn't render anything directly
}
