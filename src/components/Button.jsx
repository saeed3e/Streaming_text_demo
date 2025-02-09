import PropTypes from 'prop-types';

export const Button = ({ onClick, disabled, children, className = '' }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`load-button ${className}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};