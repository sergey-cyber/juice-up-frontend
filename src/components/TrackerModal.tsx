import { Modal, ModalProps } from "antd";

export const TrackerModal = (props: ModalProps) => {
  return (
    <Modal width={"90%"} {...props}>
      {props.children}
    </Modal>
  );
};
