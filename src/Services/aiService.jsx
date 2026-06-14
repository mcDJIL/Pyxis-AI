import axios from "axios";

export const analyzeBusiness = async (idea) => {
    const response = await axios.post(
        "http://localhost:5000/api/analyze-business",
        { idea }
    );

    return response.data;
};