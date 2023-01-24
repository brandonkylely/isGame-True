module.exports = {
    // Helper function to format date 
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    //add additional custom helpers here if needed
  };