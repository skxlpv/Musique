import axios from "axios";
import Cookies from "js-cookie";

const onSubmit = async (data) => {
    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post("http://localhost:8000/api/v1/registration/", data, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        }
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

export default onSubmit;