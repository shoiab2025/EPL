import validator from 'validator';

export const validateMaterial = (data) => {
  const errors = [];

  // Validate ID (required, unique assumption handled by database)
  if (!data.id || validator.isEmpty(data.id.trim())) {
    errors.push('ID is required');
  } else if (!/^[a-zA-Z0-9_-]+$/.test(data.id)) {
    errors.push('ID must only contain alphanumeric characters, dashes, or underscores');
  }

  // Validate content_type (required and must match specific values)
  const validContentTypes = ['text', 'image', 'video', 'audio', 'pdf'];
  if (!data.content_type || validator.isEmpty(data.content_type.trim())) {
    errors.push('Content type is required');
  } else if (!validContentTypes.includes(data.content_type)) {
    errors.push(`Content type must be one of: ${validContentTypes.join(', ')}`);
  }

  // Validate content (conditional: required if content_type is 'text')
  if (data.content_type === 'text' && (!data.content || validator.isEmpty(data.content.trim()))) {
    errors.push('Content is required when content_type is "text"');
  }

  // Validate file_url (optional but must be a valid URL if provided)
  if (data.file_url && !validator.isURL(data.file_url, { protocols: ['http', 'https'], require_protocol: true })) {
    errors.push('File URL must be a valid URL (e.g., https://example.com)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
