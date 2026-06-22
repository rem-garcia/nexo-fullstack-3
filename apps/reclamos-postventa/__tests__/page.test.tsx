import Home from "../app/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

global.fetch = jest.fn();

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText("Nombre completo"), {
    target: { value: "Juan Perez" },
  });
  fireEvent.change(screen.getByLabelText("Correo electrónico"), {
    target: { value: "juan@mail.com" },
  });
  fireEvent.change(screen.getByLabelText("Teléfono"), {
    target: { value: "+56912345678" },
  });

  fireEvent.change(screen.getByLabelText("Tipo de propiedad"), {
    target: { value: "departamento" },
  });
  fireEvent.change(
    screen.getByLabelText("Número de Departamento/Oficina"),
    { target: { value: "201" } }
  );

  fireEvent.change(screen.getByLabelText("Tipo de falla"), {
    target: { value: "gasfiteria" },
  });
  fireEvent.change(screen.getByLabelText("Ubicación de la falla"), {
    target: { value: "bano" },
  });

  fireEvent.change(
    screen.getByLabelText("Descripción de la falla (opcional)"),
    { target: { value: "Fuga de agua en la ducha" } }
  );
}

describe("Home Reclamo Postventa", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it("Debe renderizar el título y la descripción", () => {
    render(<Home />);
    expect(screen.getByText("¿En qué podemos ayudarte?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ingresa tu reclamo para que el equipo de postventa pueda responder a la brevedad."
      )
    ).toBeInTheDocument();
  });

  it("debe reiniciar el formulario en caso de éxito", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: "1" }),
    });

    render(<Home />);

    // Rellenar inputs mínimos para que el submit NO quede bloqueado por zod
    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Juan Perez" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "juan@mail.com" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { value: "+56912345678" },
    });

    // Si tus SelectReclamos renderizan un <select>, usa fireEvent.change así.
    // Ajusta los labels/valores según cómo lo implemente tu @nexo/ui.
    fireEvent.change(screen.getByLabelText("Tipo de propiedad"), {
      target: { value: "departamento" },
    });
    fireEvent.change(screen.getByLabelText("Número de Departamento/Oficina"), {
      target: { value: "201" },
    });

    fireEvent.change(screen.getByLabelText("Tipo de falla"), {
      target: { value: "gasfiteria" },
    });
    fireEvent.change(screen.getByLabelText("Ubicación de la falla"), {
      target: { value: "bano" },
    });

    fireEvent.change(
      screen.getByLabelText("Descripción de la falla (opcional)"),
      { target: { value: "Fuga de agua en la ducha" } }
    );

    fireEvent.click(screen.getByRole("button", { name: "Enviar reclamo" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Opcional: verificar que se mostró el success
    await waitFor(() => {
      expect(screen.getByText("Reclamo enviado exitosamente")).toBeInTheDocument();
    });
  });

 it("muestra success cuando el backend responde ok y resetea el formulario", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: "1" }),
    });

    render(<Home />);

    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar reclamo" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(
        screen.getByText("Reclamo enviado exitosamente")
      ).toBeInTheDocument()
    );

    // Verifica reset: al menos un input vuelve a vacío
    await waitFor(() => {
      expect(screen.getByLabelText("Nombre completo")).toHaveValue("");
    });
  });

  it("muestra serverError cuando la respuesta no es ok", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: "Datos inválidos" }),
    });

    render(<Home />);

    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar reclamo" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    );
    expect(screen.getByText("Error: Datos inválidos")).toBeInTheDocument();
  });

  it("envía al endpoint correcto con método POST y body JSON", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: "1" }),
    });

    render(<Home />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "Enviar reclamo" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith(
      "https://nexo-reclamos-service.vercel.app/api/reclamos",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );

    const fetchArgs = (fetch as jest.Mock).mock.calls[0][1];
    const payload = JSON.parse(fetchArgs.body);
    expect(payload).toEqual(
      expect.objectContaining({
        nombreCliente: "Juan Perez",
        emailCliente: "juan@mail.com",
        numTelefono: "+56912345678",
        tipoPropiedad: "departamento",
        nroDpto: "201",
        tipoFalla: "gasfiteria",
        ubicacionFalla: "bano",
        descripcionFalla: "Fuga de agua en la ducha",
      })
    );
  });
});
