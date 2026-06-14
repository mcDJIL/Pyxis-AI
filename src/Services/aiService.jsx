import axios from "axios";

export const analyzeBusiness = async (idea, settings = {}) => {
    const response = await axios.post(
        "http://localhost:5000/api/analyze-business",
        {
            idea,
            settings
        }
    );

    return response.data;
};
