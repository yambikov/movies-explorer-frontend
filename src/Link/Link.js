import React from 'react';

function Link({ href, label, className }) {
  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export default Link;
