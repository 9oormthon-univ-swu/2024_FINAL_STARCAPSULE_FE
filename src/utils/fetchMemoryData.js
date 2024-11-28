import axios from 'axios';

/**
 * Fetch memory data for a specific date and user.
 *
 * @param {string} dateInFormat - The date in 'YYYY-MM-DD' format.
 * @returns {Promise<Object|null>} - The memory data if available, otherwise null.
 */
export const fetchMemoryData = async (dateInFormat) => {
    const token = localStorage.getItem('token'); // 사용자 인증 토큰 가져오기
    const apiUrl = `${import.meta.env.VITE_API_URL}/calendar/memories/${dateInFormat}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = response?.data?.result;

        if (
            result &&
            (result.my_memory?.length > 0 || result.memories?.length > 0)
        ) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching memory data:', error);
        throw new Error('Failed to fetch memory data');
    }
};
