import React from 'react';
import './MetricCard.css';

/**
 * MetricCard component representing a single statistical item.
 * @param {object} props
 * @param {string} props.label - Label of the metric
 * @param {string|number} props.value - Numeric or text value of the metric
 * @param {string} [props.variant] - Variant color style ('primary' | 'success' | 'warning' | 'normal')
 */
function MetricCard({ label, value, variant = 'normal' }) {
  return (
    <div className={`metric-card-container ${variant}`}>
      <span className="metric-card-label">{label}</span>
      <span className="metric-card-value">{value}</span>
    </div>
  );
}

export default MetricCard;
