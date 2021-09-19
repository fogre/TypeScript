import React from "react";
import axios from "axios";
import { Button, Modal, Segment } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient, EntryFormValues } from "../types";

import AddEntryForm from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
      />  
    </Modal.Content>
  </Modal>
);

const AddEntryModalContainer = ({ patientId }: { patientId: string }) => {
  const [, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    //remove empty values (like optional values that are not set)
    const emptyValuesRemoved: EntryFormValues = { ...values };
    Object.entries(emptyValuesRemoved).forEach(([k,v]) => {
      if (!v.length && v !== 0) {
        if (typeof v === 'object') {
          Object.values(v).forEach(objV => {
            if (!objV && objV !== 0) {
              delete emptyValuesRemoved[k as keyof EntryFormValues];
            }
          });
        } else {
          delete emptyValuesRemoved[k as keyof EntryFormValues];
        }
      }
    });

    try {
      const { data: patientFromApi } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        emptyValuesRemoved
      );
      dispatch(updatePatient(patientFromApi));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default AddEntryModalContainer;
