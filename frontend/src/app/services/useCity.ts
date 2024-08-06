import { create } from 'zustand';

type State = {
  city: string;
};

type Actions = {
  handleCity: (newCity: string) => void;
};

export const useCity = create<State & Actions>((set) => ({
  city: 'istanbul',

  handleCity: (newCity: string) => set({ city: newCity }),
}));
