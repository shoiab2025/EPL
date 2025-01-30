export const handleValidationResponse = (res, errors) => {
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(', ') });
    }
    return null; // To indicate that there are no errors and processing can continue
  };

  
//   const errorResponse = handleValidationResponse(res, errors);
//   if (errorResponse) return; 