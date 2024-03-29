import React from 'react';

function SectionHeader({ title }) {
  return (
    <div className="section__header">
      <h2 className="section__title">{ title }</h2>
    </div>
  );
}

export default SectionHeader;
