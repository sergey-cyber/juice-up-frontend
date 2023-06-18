import { Modal, ModalProps } from "antd";
import React from "react";

export const TrackerModal = (props: ModalProps) => {
  return (
    <Modal width={"90%"} {...props}>
      {props.children}
    </Modal>
  );
};
