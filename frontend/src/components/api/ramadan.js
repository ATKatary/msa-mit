import axios from 'axios';

const apiUrl = 'https://jmi2gxpho8.execute-api.us-east-1.amazonaws.com/abgtQuiz?event=';

const createFullUrl = (jsonData) => `${apiUrl}${encodeURIComponent(JSON.stringify(jsonData))}`;

const makeApiCall = async (jsonData) => {
    const fullUrl = createFullUrl(jsonData);
    try {
        const response = await axios.get(fullUrl);
        return response.data; // axios automatically parses the JSON response
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
}
};

export const getSpecificDay = async (date) => {
    return makeApiCall({ "t": "get_specific_day", "date": date });
};

export const submitSignUp = async (date, name, email, mitId, guestName) => {
    return makeApiCall({ "t": "submission", "date": date, "mit_name": name , "email": email, 
    "mit_id": mitId, "guest_name": guestName});
};

// export const listNonAvailableDays = async () => { // not used tbh
//     return makeApiCall({ "t": "list_of_non_available_days" });
// };