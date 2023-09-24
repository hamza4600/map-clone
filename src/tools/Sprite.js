import React from 'react';

// FEATHER ICONS COMPONENT
import FeatherIcon from 'feather-icons-react';

// MAIN COMPONENT
const Sprite = ({
  className,
  use,
  width
}) => (
  <FeatherIcon
    className={className}
    icon={use}
    size={width}
  />
)

export default Sprite;
