import React, { cloneElement} from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { BUTTON } from 'defaults.js';

// HELPERS
import { modalLightbox } from '../helpers/modalLightbox';

// BOOTSTRAP COMPONENTS
import { Col, Row, Modal } from 'react-bootstrap';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './dialogModal.module.scss';

// MAIN COMPONENT
const DialogModal = compose(
  modalLightbox
)(({
  children,
  className,
  graphic,
  title,
  body,
  buttons = [],
  size,
  closeButton = false,
  onClose
}) => (<>
  {closeButton &&
    <Button
      className={styles.close}
      variant="secondary"
      icon={BUTTON.cancel.icon}
      onClick={onClose}
      block={false}
    />
  }
  <Modal.Dialog
    className={clsx(
      styles.dialog,
      styles[size],
      className
    )}
    centered
  >
    {children || (<>
      {(title || graphic) &&
        <Modal.Header className={styles.header}>
          {graphic &&
            <div className={styles.graphic}>
              {graphic}
            </div>
          }
          {title &&
            <Modal.Title as="h2" className={styles.title}>
              {title}
            </Modal.Title>
          }
        </Modal.Header>
      }
      {body &&
        <Modal.Body as={typeof body === 'string' ? 'h4' : undefined} className={styles.body}>
          {body}
        </Modal.Body>
      }
      {buttons.length > 0 &&
        <Modal.Footer className={styles.footer}>
          <div>
            <Row className={styles.buttons}>
              {buttons.map((button, i) => !button ? null : (
                <Col key={i} xs={12}>
                  {cloneElement(button, {
                    onClick: () => onClose(button.props.onClick),
                    fullWidth: true
                  })}
                </Col>
              ))}
            </Row>
          </div>
        </Modal.Footer>
      }
    </>)}
  </Modal.Dialog>
</>))

// EXPORT
export default DialogModal;
