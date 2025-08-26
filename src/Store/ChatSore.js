import { create } from "zustand";

const useChatStore = create((set) => ({
  contactos: [
    { id: 1, nick: "Miguel", status: "online" },
    { id: 2, nick: "Laura", status: "away" },
    { id: 3, nick: "Carlos", status: "busy" },
  ],
  activoConectado: null,
  mensajes: {},

  setActivoConectado: (contactId) =>
    set({ activoConectado: contactId }),

  sendMensaje: (contactId, mensaje) =>
    set((state) => {
      const prevMessages = state.mensajes[contactId] || [];
      return {
        mensajes: {
          ...state.mensajes,
          [contactId]: [
            ...prevMessages,
            {
              from: "me",
              text: mensaje,
              timestamp: Date.now(),
            },
          ],
        },
      };
    }),

  recibirMensaje: (contactId, mensaje) =>
    set((state) => {
      const prevMessages = state.mensajes[contactId] || [];
      return {
        mensajes: {
          ...state.mensajes,
          [contactId]: [
            ...prevMessages,
            {
              from: "them",
              text: mensaje,
              timestamp: Date.now(),
            },
          ],
        },
      };
    }),
}));

export default useChatStore;