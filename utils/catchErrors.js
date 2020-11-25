const catchErrors = (error, displayError) => {
    // initialize error
    let ErrorMessage
    
    if(error.response){
        ErrorMessage = error.response.data
        console.error("Error response", ErrorMessage)
    } else if (error.request) {
        // request was made but no response was received
        ErrorMessage = error.request
        console.error("Error request", ErrorMessage)
    } else {
        // unknown error
        ErrorMessage = error.message
        console.error("Error", ErrorMessage)
    }

    displayError(ErrorMessage)

}

export default catchErrors