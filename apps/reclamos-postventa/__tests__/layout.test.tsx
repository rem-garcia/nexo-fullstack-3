import RootLayout, { metadata } from "../app/layout";
import React from "react";

describe("RootLayout", () => {
  it('metadata tiene title "Nexo - Reclamos"', () => {
    expect(metadata.title).toBe("Nexo - Reclamos");
  });

  it("coloca children dentro de body", () => {
    const childText = "Contenido de prueba";

    const element = RootLayout({
      children: <div>{childText}</div>,
    } as any);

    // element es: <html ...><body>...children...</body></html>
    expect(element.type).toBe("html");

    const body = element.props.children;
    expect(body.type).toBe("body");

    const bodyChildren = body.props.children;
    // Aquí bodyChildren incluye el <div> que pasamos
    expect(JSON.stringify(bodyChildren)).toContain(childText);
  });
});

