import PropTypes from 'prop-types';

export const MessageContainer = ({ error, streamedText, containerRef }) => (
  <div className="message-wrapper">
    <div ref={containerRef} className="chat-container">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        streamedText && (
          <div className="message">
            {streamedText}
          </div>
        )
      )}
    </div>
  </div>
);

MessageContainer.propTypes = {
  error: PropTypes.string,
  streamedText: PropTypes.string,
  containerRef: PropTypes.object.isRequired
};