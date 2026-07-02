"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const CAL_NAMESPACE = "cita-showroom";
const CAL_LINK = "oscar-arredondo-fs6wzu/cita-showroom";

/**
 * Botón flotante de Cal.com (pedido en la retro del sitio, PDF/comentario de
 * Oscar). Se inicializa una sola vez a nivel de layout, mismo patrón de
 * montaje global que FeedbackWidget.
 */
export function CalFloatingButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("floatingButton", {
        calLink: CAL_LINK,
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return null;
}
