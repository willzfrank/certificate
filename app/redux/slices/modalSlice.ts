import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalToggleState {
  isOpen: boolean;
}

const initialState: ModalToggleState = {
  isOpen: false,
};

const modalToggleSlice = createSlice({
  name: 'modalToggle',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closePdfModal: (state) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openModal, closePdfModal, toggleModal } = modalToggleSlice.actions;

export default modalToggleSlice;
