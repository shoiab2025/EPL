const generateRegId = () => {
    return 'reg' + Math.random().toString(36).substr(2, 5); // Simple random alphanumeric string
  };

  export default generateRegId